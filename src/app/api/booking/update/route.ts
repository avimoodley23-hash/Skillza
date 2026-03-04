import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  try {
    const { bookingId, status, studentId } = await req.json()

    const validStatuses = ['confirmed', 'in_progress', 'completed', 'rejected', 'unavailable']
    if (!bookingId || !status || !validStatuses.includes(status)) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    // Verify the booking belongs to this student
    const { data: booking, error: fetchError } = await supabase
      .from('bookings')
      .select('student_id, client_name, client_email, reference')
      .eq('id', bookingId)
      .single()

    if (fetchError || !booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    if (booking.student_id !== studentId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const { error: updateError } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', bookingId)

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Update booking error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
