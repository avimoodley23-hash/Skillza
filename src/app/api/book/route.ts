import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const { studentId, clientName, clientEmail, clientWhatsapp, description } = await req.json()

  // 1. Get student + email
  const { data: student, error: studentError } = await supabase
    .from('students')
    .select('id, name, email')
    .eq('id', studentId)
    .single()

  if (studentError || !student) {
    return NextResponse.json({ error: 'Student not found' }, { status: 404 })
  }

  // 2. Insert booking
  const { data: booking, error: bookingError } = await supabase
    .from('bookings')
    .insert({
      student_id: studentId,
      client_name: clientName,
      client_email: clientEmail,
      client_whatsapp: clientWhatsapp,
      description,
      status: 'pending',
    })
    .select('reference')
    .single()

  if (bookingError || !booking) {
    return NextResponse.json({ error: 'Booking failed' }, { status: 500 })
  }

  // 3. Send email to student
  if (student.email) {
    await resend.emails.send({
      from: 'Skillza <onboarding@resend.dev>',
      to: student.email,
      subject: `New booking request from ${clientName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; background: #100F0D; color: #F5EFE3;">
          <div style="font-size: 24px; font-weight: 700; letter-spacing: 2px; margin-bottom: 24px;">
            SKILL<span style="color: #FF4B1F;">ZA</span>
          </div>
          <h2 style="font-size: 20px; margin-bottom: 8px;">You have a new booking request</h2>
          <p style="color: rgba(245,239,227,.6); font-size: 14px; line-height: 1.6; margin-bottom: 24px;">
            A client wants to book you on Skillza. Log in to your dashboard to view the details.
          </p>
          <div style="background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.07); border-radius: 12px; padding: 20px; margin-bottom: 24px;">
            <div style="font-size: 12px; color: rgba(245,239,227,.4); margin-bottom: 4px; text-transform: uppercase; letter-spacing: 1px;">From</div>
            <div style="font-size: 16px; font-weight: 600; margin-bottom: 16px;">${clientName}</div>
            <div style="font-size: 12px; color: rgba(245,239,227,.4); margin-bottom: 4px; text-transform: uppercase; letter-spacing: 1px;">WhatsApp</div>
            <div style="font-size: 15px; margin-bottom: 16px;">${clientWhatsapp}</div>
            <div style="font-size: 12px; color: rgba(245,239,227,.4); margin-bottom: 4px; text-transform: uppercase; letter-spacing: 1px;">What they need</div>
            <div style="font-size: 14px; color: rgba(245,239,227,.7); line-height: 1.6;">${description || 'No description provided'}</div>
          </div>
          <div style="background: rgba(255,74,28,.08); border: 1px solid rgba(255,74,28,.2); border-radius: 10px; padding: 14px 18px; margin-bottom: 24px;">
            <div style="font-size: 11px; font-weight: 700; color: #FF4B1F; margin-bottom: 4px;">BOOKING REFERENCE</div>
            <div style="font-size: 22px; font-weight: 700; letter-spacing: 3px; color: #FF4B1F;">${booking.reference}</div>
          </div>
          <p style="font-size: 13px; color: rgba(245,239,227,.5); line-height: 1.6;">
            You have <strong style="color: #F5EFE3;">24 hours</strong> to respond. Reach out to the client on WhatsApp to confirm availability and agree on scope.
          </p>
          <a href="https://skillza-app.vercel.app/dashboard" style="display: inline-block; margin-top: 24px; background: #FF4B1F; color: #fff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">
            View in Dashboard →
          </a>
          <p style="font-size: 11px; color: rgba(245,239,227,.25); margin-top: 32px;">
            Skillza · Built for SA students · hello@skillza.co.za
          </p>
        </div>
      `,
    })
  }

  return NextResponse.json({ reference: booking.reference })
}