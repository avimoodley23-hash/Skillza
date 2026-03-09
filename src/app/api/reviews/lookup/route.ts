import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const ref = searchParams.get('ref')

  if (!ref) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 })
  }

  const { data: booking, error } = await supabase
    .from('bookings')
    .select('id, status, student_id, reference, students(name)')
    .eq('reference', ref)
    .single()

  if (error || !booking) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 })
  }

  if (booking.status !== 'completed') {
    return NextResponse.json({ error: 'not_completed' }, { status: 200 })
  }

  // Check if a review already exists for this booking
  const { data: existing } = await supabase
    .from('student_reviews')
    .select('id')
    .eq('booking_id', booking.id)
    .maybeSingle()

  if (existing) {
    return NextResponse.json({ error: 'already_reviewed' }, { status: 200 })
  }

  const studentName = (booking.students as any)?.name ?? 'the student'

  return NextResponse.json({
    booking_id: booking.id,
    student_id: booking.student_id,
    student_name: studentName,
    reference: booking.reference,
  })
}
