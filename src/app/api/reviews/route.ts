import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { getIp, rateLimit } from '@/lib/api'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  try {
    const ip = getIp(req)
    if (!rateLimit(`review:${ip}`, 5, 60 * 60 * 1000)) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
    }

    const body = await req.json()
    const { booking_id, student_id, reviewer_name, stars, text } = body

    if (!booking_id || !student_id || !reviewer_name?.trim()) {
      return NextResponse.json({ error: 'booking_id, student_id and reviewer_name are required.' }, { status: 400 })
    }

    const starsNum = Number(stars)
    if (!Number.isInteger(starsNum) || starsNum < 1 || starsNum > 5) {
      return NextResponse.json({ error: 'stars must be a whole number between 1 and 5.' }, { status: 400 })
    }

    // Verify the booking exists and is completed
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .select('id, status, student_id')
      .eq('id', booking_id)
      .single()

    if (bookingError || !booking) {
      return NextResponse.json({ error: 'Booking not found.' }, { status: 404 })
    }

    if (booking.status !== 'completed') {
      return NextResponse.json({ error: 'This booking has not been completed yet.' }, { status: 400 })
    }

    // Extra safety: student_id on the booking must match what was submitted
    if (booking.student_id !== student_id) {
      return NextResponse.json({ error: 'Invalid booking.' }, { status: 400 })
    }

    // Prevent duplicate reviews for the same booking
    const { data: existing } = await supabase
      .from('student_reviews')
      .select('id')
      .eq('booking_id', booking_id)
      .maybeSingle()

    if (existing) {
      return NextResponse.json({ error: 'A review has already been submitted for this booking.' }, { status: 409 })
    }

    // Insert the review
    const { error: insertError } = await supabase
      .from('student_reviews')
      .insert({
        booking_id,
        student_id,
        reviewer_name: reviewer_name.trim(),
        stars: starsNum,
        text: text?.trim() || null,
        verified: true,
      })

    if (insertError) {
      console.error('Review insert error:', insertError)
      return NextResponse.json({ error: 'Failed to save review.' }, { status: 500 })
    }

    // Recalculate and update the student's aggregate rating and review count
    const { data: agg, error: aggError } = await supabase
      .from('student_reviews')
      .select('stars')
      .eq('student_id', student_id)

    if (!aggError && agg && agg.length > 0) {
      const count = agg.length
      const avg = agg.reduce((sum, r) => sum + r.stars, 0) / count
      const rounded = Math.round(avg * 10) / 10

      await supabase
        .from('students')
        .update({ rating: rounded, review_count: count })
        .eq('id', student_id)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Review submission error:', err)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
