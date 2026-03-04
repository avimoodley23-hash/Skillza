import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

function genRef() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let r = 'SKZ-'
  for (let i = 0; i < 4; i++) r += chars[Math.floor(Math.random() * chars.length)]
  return r
}

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    const { studentId, clientName, clientEmail, clientWhatsapp, description } = await req.json()

    if (!studentId || !clientName || !clientEmail || !clientWhatsapp) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // 1. Get student
    const { data: student, error: studentError } = await supabase
      .from('students')
      .select('id, name, email')
      .eq('id', studentId)
      .single()

    if (studentError || !student) {
      console.error('Student fetch error:', studentError)
      return NextResponse.json({ error: 'Student not found' }, { status: 404 })
    }

    // 2. Insert booking
    const reference = genRef()
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .insert({
        student_id: studentId,
        client_name: clientName,
        client_email: clientEmail,
        client_whatsapp: clientWhatsapp,
        description: description || '',
        status: 'pending',
        reference,
      })
      .select('reference')
      .single()

    if (bookingError || !booking) {
      console.error('Booking insert error:', bookingError)
      return NextResponse.json({ error: 'Booking failed: ' + bookingError?.message }, { status: 500 })
    }

    // 3. Fire all 3 emails in parallel — booking never fails if email fails
    const base = `font-family: sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; background: #100F0D; color: #F5EFE3;`
    const logo = `<div style="font-size: 24px; font-weight: 700; letter-spacing: 2px; margin-bottom: 24px;">SKILL<span style="color: #FF4B1F;">ZA</span></div>`
    const footer = `<p style="font-size: 11px; color: rgba(245,239,227,.25); margin-top: 32px;">Skillza · Built for SA students · hello@skillza.co.za</p>`

    const refBadge = `
      <div style="background: rgba(255,74,28,.08); border: 1px solid rgba(255,74,28,.2); border-radius: 10px; padding: 14px 18px; margin-bottom: 24px;">
        <div style="font-size: 11px; font-weight: 700; color: #FF4B1F; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 1px;">Booking Reference</div>
        <div style="font-size: 26px; font-weight: 700; letter-spacing: 4px; color: #FF4B1F;">${booking.reference}</div>
      </div>`

    const detailsCard = `
      <div style="background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.07); border-radius: 12px; padding: 20px; margin-bottom: 24px;">
        <div style="font-size: 12px; color: rgba(245,239,227,.4); margin-bottom: 4px; text-transform: uppercase; letter-spacing: 1px;">Client</div>
        <div style="font-size: 15px; font-weight: 600; margin-bottom: 14px;">${clientName}</div>
        <div style="font-size: 12px; color: rgba(245,239,227,.4); margin-bottom: 4px; text-transform: uppercase; letter-spacing: 1px;">WhatsApp</div>
        <div style="font-size: 15px; margin-bottom: 14px;">${clientWhatsapp}</div>
        <div style="font-size: 12px; color: rgba(245,239,227,.4); margin-bottom: 4px; text-transform: uppercase; letter-spacing: 1px;">Email</div>
        <div style="font-size: 15px; margin-bottom: 14px;">${clientEmail}</div>
        <div style="font-size: 12px; color: rgba(245,239,227,.4); margin-bottom: 4px; text-transform: uppercase; letter-spacing: 1px;">Student</div>
        <div style="font-size: 15px; margin-bottom: 14px;">${student.name}</div>
        <div style="font-size: 12px; color: rgba(245,239,227,.4); margin-bottom: 4px; text-transform: uppercase; letter-spacing: 1px;">Description</div>
        <div style="font-size: 14px; color: rgba(245,239,227,.7); line-height: 1.6;">${description || 'No description provided'}</div>
      </div>`

    await Promise.allSettled([

      // Email 1 — Student
      student.email ? resend.emails.send({
        from: 'Skillza <onboarding@resend.dev>',
        to: student.email,
        subject: `New booking request — ${booking.reference}`,
        html: `<div style="${base}">
          ${logo}
          <h2 style="font-size: 20px; margin-bottom: 8px;">You have a new booking request</h2>
          <p style="color: rgba(245,239,227,.6); font-size: 14px; line-height: 1.6; margin-bottom: 24px;">
            A client wants to book you on Skillza. Reach out on WhatsApp within 24 hours before they book someone else.
          </p>
          ${detailsCard}
          ${refBadge}
          <p style="font-size: 13px; color: rgba(245,239,227,.5); line-height: 1.6;">
            Message the client on WhatsApp to confirm availability, agree on scope, and arrange the 30% deposit.
          </p>
          <a href="https://skillza-app.vercel.app/dashboard" style="display: inline-block; margin-top: 24px; background: #FF4B1F; color: #fff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">
            View in Dashboard
          </a>
          ${footer}
        </div>`,
      }) : Promise.resolve(),

      // Email 2 — Admin (you)
      resend.emails.send({
        from: 'Skillza <onboarding@resend.dev>',
        to: 'avi.moodley23@gmail.com',
        subject: `New booking — ${booking.reference} · ${clientName} booked ${student.name}`,
        html: `<div style="${base}">
          ${logo}
          <h2 style="font-size: 20px; margin-bottom: 8px;">New booking received</h2>
          <p style="color: rgba(245,239,227,.6); font-size: 14px; line-height: 1.6; margin-bottom: 24px;">
            A client just submitted a booking on Skillza.
          </p>
          ${detailsCard}
          ${refBadge}
          <a href="https://skillza-app.vercel.app/admin" style="display: inline-block; margin-top: 8px; background: #FF4B1F; color: #fff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">
            View in Admin
          </a>
          ${footer}
        </div>`,
      }),

      // Email 3 — Client confirmation
      resend.emails.send({
        from: 'Skillza <onboarding@resend.dev>',
        to: clientEmail,
        subject: `Booking confirmed — ${booking.reference}`,
        html: `<div style="${base}">
          ${logo}
          <h2 style="font-size: 20px; margin-bottom: 8px;">Your booking request is in</h2>
          <p style="color: rgba(245,239,227,.6); font-size: 14px; line-height: 1.6; margin-bottom: 24px;">
            Hey ${clientName}, your request to book <strong style="color: #F5EFE3;">${student.name}</strong> has been received.
            They will reach out on WhatsApp within 24 hours.
          </p>
          ${refBadge}
          <div style="background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.07); border-radius: 12px; padding: 20px; margin-bottom: 24px;">
            <div style="font-size: 12px; font-weight: 700; color: rgba(245,239,227,.4); margin-bottom: 14px; text-transform: uppercase; letter-spacing: 1px;">What happens next</div>
            <div style="font-size: 14px; color: rgba(245,239,227,.8); line-height: 2.2;">
              1. ${student.name.split(' ')[0]} will WhatsApp you within 24 hours<br/>
              2. You will agree on scope, timing and price<br/>
              3. Pay a 30% deposit to lock in the booking<br/>
              4. Pay the remaining 70% on completion
            </div>
          </div>
          <div style="background: rgba(255,74,28,.06); border: 1px solid rgba(255,74,28,.15); border-radius: 10px; padding: 14px 18px; margin-bottom: 24px;">
            <div style="font-size: 11px; font-weight: 700; color: #FF4B1F; margin-bottom: 4px;">Safety reminder</div>
            <p style="font-size: 13px; color: rgba(245,239,227,.7); line-height: 1.6; margin: 0;">
              Only pay the 30% deposit once scope is agreed on WhatsApp. Never pay the full amount upfront.
            </p>
          </div>
          <p style="font-size: 13px; color: rgba(245,239,227,.5); line-height: 1.6;">
            Questions? Email us at <a href="mailto:hello@skillza.co.za" style="color: #FF4B1F;">hello@skillza.co.za</a>
          </p>
          ${footer}
        </div>`,
      }),

    ])

    return NextResponse.json({ reference: booking.reference })

  } catch (err) {
    console.error('Unexpected error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
