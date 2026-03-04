import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const STATUS_INFO: Record<string, { subject: string; clientHeading: string; clientBody: string; adminLabel: string }> = {
  confirmed: {
    subject: 'Your booking has been confirmed',
    clientHeading: 'Your booking is confirmed ✅',
    clientBody: 'Great news — the student has accepted your booking request. They will be in touch on WhatsApp shortly to finalise scope and arrange the 30% deposit.',
    adminLabel: 'CONFIRMED',
  },
  in_progress: {
    subject: 'Your job is now in progress',
    clientHeading: 'Work has started 🚀',
    clientBody: 'The student has marked your job as in progress. They are working on your project now.',
    adminLabel: 'IN PROGRESS',
  },
  completed: {
    subject: 'Your job has been completed',
    clientHeading: 'Job completed 🎉',
    clientBody: 'The student has marked your job as completed. Please arrange the remaining 70% payment directly with them. We hope it went well!',
    adminLabel: 'COMPLETED',
  },
  rejected: {
    subject: 'Booking update from Skillza',
    clientHeading: 'Booking not available',
    clientBody: 'Unfortunately the student was unable to take on your booking at this time. Head back to Skillza to find another talented student for your project.',
    adminLabel: 'REJECTED',
  },
  unavailable: {
    subject: 'Booking update from Skillza',
    clientHeading: 'Student unavailable',
    clientBody: 'Unfortunately the student is not available for your requested dates or project. Head back to Skillza to find another talented student.',
    adminLabel: 'UNAVAILABLE',
  },
}

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    const { bookingId, status, studentId } = await req.json()

    const validStatuses = ['confirmed', 'in_progress', 'completed', 'rejected', 'unavailable']
    if (!bookingId || !status || !validStatuses.includes(status)) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    // Get booking + student details for emails
    const { data: booking, error: fetchError } = await supabase
      .from('bookings')
      .select('*, students(name, email)')
      .eq('id', bookingId)
      .eq('student_id', studentId)
      .single()

    if (fetchError || !booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    // Update status
    const { error: updateError } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', bookingId)

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 })
    }

    // Fire emails
    const info = STATUS_INFO[status]
    if (info) {
      const base = `font-family: sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; background: #100F0D; color: #F5EFE3;`
      const logo = `<div style="font-size: 24px; font-weight: 700; letter-spacing: 2px; margin-bottom: 24px;">SKILL<span style="color: #FF4B1F;">ZA</span></div>`
      const footer = `<p style="font-size: 11px; color: rgba(245,239,227,.25); margin-top: 32px;">Skillza · Built for SA students · hello@skillza.co.za</p>`
      const refBadge = `
        <div style="background: rgba(255,74,28,.08); border: 1px solid rgba(255,74,28,.2); border-radius: 10px; padding: 12px 16px; margin-bottom: 24px; display: inline-block;">
          <div style="font-size: 10px; font-weight: 700; color: #FF4B1F; margin-bottom: 2px; text-transform: uppercase; letter-spacing: 1px;">Reference</div>
          <div style="font-size: 20px; font-weight: 700; letter-spacing: 3px; color: #FF4B1F;">${booking.reference}</div>
        </div>`

      const studentName = (booking.students as any)?.name ?? 'the student'
      const studentEmail = (booking.students as any)?.email

      await Promise.allSettled([

        // Email to client
        resend.emails.send({
          from: 'Skillza <onboarding@resend.dev>',
          to: booking.client_email,
          subject: `${info.subject} — ${booking.reference}`,
          html: `<div style="${base}">
            ${logo}
            <h2 style="font-size: 20px; margin-bottom: 8px;">${info.clientHeading}</h2>
            <p style="color: rgba(245,239,227,.6); font-size: 14px; line-height: 1.7; margin-bottom: 24px;">
              Hey ${booking.client_name}, here is an update on your booking with <strong style="color: #F5EFE3;">${studentName}</strong>.
            </p>
            <p style="font-size: 14px; line-height: 1.7; color: rgba(245,239,227,.8); margin-bottom: 24px;">${info.clientBody}</p>
            ${refBadge}
            ${status === 'rejected' || status === 'unavailable' ? `
              <a href="https://skillza.co.za/#find-talent" style="display: inline-block; margin-top: 8px; background: #FF4B1F; color: #fff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">
                Find Another Student →
              </a>` : ''}
            ${status === 'completed' ? `
              <div style="background: rgba(255,74,28,.06); border: 1px solid rgba(255,74,28,.15); border-radius: 10px; padding: 14px 18px; margin-top: 16px;">
                <div style="font-size: 11px; font-weight: 700; color: #FF4B1F; margin-bottom: 4px;">Payment reminder</div>
                <p style="font-size: 13px; color: rgba(245,239,227,.7); line-height: 1.6; margin: 0;">Please arrange the remaining 70% payment directly with the student as agreed.</p>
              </div>` : ''}
            <p style="font-size: 13px; color: rgba(245,239,227,.4); margin-top: 24px; line-height: 1.6;">
              Questions? Email us at <a href="mailto:hello@skillza.co.za" style="color: #FF4B1F;">hello@skillza.co.za</a>
            </p>
            ${footer}
          </div>`,
        }),

        // Email to admin (you)
        resend.emails.send({
          from: 'Skillza <onboarding@resend.dev>',
          to: 'avi.moodley23@gmail.com',
          subject: `Booking ${info.adminLabel} — ${booking.reference} · ${studentName} → ${booking.client_name}`,
          html: `<div style="${base}">
            ${logo}
            <h2 style="font-size: 20px; margin-bottom: 8px;">Booking status updated</h2>
            <p style="color: rgba(245,239,227,.6); font-size: 14px; line-height: 1.6; margin-bottom: 24px;">
              A booking has been updated to <strong style="color: #FF4B1F;">${info.adminLabel}</strong>.
            </p>
            <div style="background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.07); border-radius: 12px; padding: 20px; margin-bottom: 24px;">
              <div style="font-size: 12px; color: rgba(245,239,227,.4); margin-bottom: 4px; text-transform: uppercase; letter-spacing: 1px;">Student</div>
              <div style="font-size: 15px; font-weight: 600; margin-bottom: 14px;">${studentName}</div>
              <div style="font-size: 12px; color: rgba(245,239,227,.4); margin-bottom: 4px; text-transform: uppercase; letter-spacing: 1px;">Client</div>
              <div style="font-size: 15px; font-weight: 600; margin-bottom: 14px;">${booking.client_name}</div>
              <div style="font-size: 12px; color: rgba(245,239,227,.4); margin-bottom: 4px; text-transform: uppercase; letter-spacing: 1px;">New Status</div>
              <div style="font-size: 15px; font-weight: 700; color: #FF4B1F;">${info.adminLabel}</div>
            </div>
            ${refBadge}
            <a href="https://skillza.co.za/admin" style="display: inline-block; margin-top: 8px; background: #FF4B1F; color: #fff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">
              View in Admin →
            </a>
            ${footer}
          </div>`,
        }),

      ])
    }

    return NextResponse.json({ success: true })

  } catch (err) {
    console.error('Update booking error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
