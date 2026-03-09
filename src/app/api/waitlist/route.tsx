import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { h, rateLimit, getIp } from '@/lib/api'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  // Rate limit: 3 waitlist submissions per IP per hour
  if (!rateLimit(getIp(req), 3, 60 * 60 * 1000)) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    const { name, email, university, year, skill } = await req.json()

    if (!name || !email || !university || !skill) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const { error: dbError } = await supabase.from('waitlist').insert({ name, email, university, year, skill })

    if (dbError) {
      if (dbError.code === '23505') {
        return NextResponse.json({ error: 'already_on_waitlist' }, { status: 409 })
      }
      return NextResponse.json({ error: dbError.message }, { status: 500 })
    }

    const base = `font-family: sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; background: #100F0D; color: #F5EFE3;`
    const logo = `<div style="font-size: 24px; font-weight: 700; letter-spacing: 2px; margin-bottom: 24px;">SKILL<span style="color: #FF4B1F;">ZA</span></div>`
    const footer = `<p style="font-size: 11px; color: rgba(245,239,227,.25); margin-top: 32px;">Skillza · Built for SA students · hello@skillza.co.za</p>`

    await Promise.allSettled([

      // Email 1 — Student confirmation
      resend.emails.send({
        from: 'Skillza <hello@skillza.co.za>',
        to: email,
        subject: `You're on the Skillza waitlist, ${name.split(' ')[0]}`,
        html: `<div style="${base}">
          ${logo}
          <h2 style="font-size: 20px; margin-bottom: 8px;">You're on the list 🎉</h2>
          <p style="color: rgba(245,239,227,.6); font-size: 14px; line-height: 1.7; margin-bottom: 24px;">
            Hey ${h(name.split(' ')[0])}, we've received your application. We'll review it and reach out within 48 hours with next steps.
          </p>
          <div style="background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.07); border-radius: 12px; padding: 20px; margin-bottom: 24px;">
            <div style="font-size: 11px; font-weight: 700; color: rgba(245,239,227,.4); margin-bottom: 14px; text-transform: uppercase; letter-spacing: 1px;">What happens next</div>
            <div style="font-size: 14px; color: rgba(245,239,227,.8); line-height: 2.2;">
              01 &nbsp; We review your application<br/>
              02 &nbsp; You get an email with your profile link<br/>
              03 &nbsp; Complete your profile and submit for Skillza verification<br/>
              04 &nbsp; We verify you and your profile goes live
            </div>
          </div>
          <p style="font-size: 13px; color: rgba(245,239,227,.4); line-height: 1.6;">
            Questions? Reply to this email or reach us at <a href="mailto:hello@skillza.co.za" style="color: #FF4B1F;">hello@skillza.co.za</a>
          </p>
          ${footer}
        </div>`,
      }),

      // Email 2 — Admin notification
      resend.emails.send({
        from: 'Skillza <hello@skillza.co.za>',
        to: (process.env.ADMIN_EMAIL ?? 'avi.moodley23@gmail.com').split(',').map(e => e.trim()).filter(Boolean),
        subject: `New waitlist application — ${name} · ${skill} · ${university}`,
        html: `<div style="${base}">
          ${logo}
          <h2 style="font-size: 20px; margin-bottom: 8px;">New waitlist application</h2>
          <div style="background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.07); border-radius: 12px; padding: 20px; margin-bottom: 24px;">
            <div style="font-size: 12px; color: rgba(245,239,227,.4); margin-bottom: 4px; text-transform: uppercase; letter-spacing: 1px;">Name</div>
            <div style="font-size: 15px; font-weight: 600; margin-bottom: 14px;">${h(name)}</div>
            <div style="font-size: 12px; color: rgba(245,239,227,.4); margin-bottom: 4px; text-transform: uppercase; letter-spacing: 1px;">Email</div>
            <div style="font-size: 15px; margin-bottom: 14px;">${h(email)}</div>
            <div style="font-size: 12px; color: rgba(245,239,227,.4); margin-bottom: 4px; text-transform: uppercase; letter-spacing: 1px;">University</div>
            <div style="font-size: 15px; margin-bottom: 14px;">${h(university)}${year ? ` · ${h(year)}` : ''}</div>
            <div style="font-size: 12px; color: rgba(245,239,227,.4); margin-bottom: 4px; text-transform: uppercase; letter-spacing: 1px;">Skill</div>
            <div style="font-size: 15px; font-weight: 600; color: #FF4B1F;">${h(skill)}</div>
          </div>
          <a href="https://skillza.co.za/admin" style="display: inline-block; background: #FF4B1F; color: #fff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">
            View in Admin →
          </a>
          ${footer}
        </div>`,
      }),

    ])

    return NextResponse.json({ success: true })

  } catch (err) {
    console.error('Waitlist error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
