import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    const { id } = await req.json()
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

    // Fetch the waitlist entry so we can email them
    const { data: entry } = await supabase
      .from('waitlist')
      .select('name, email')
      .eq('id', id)
      .single()

    const { error } = await supabase.from('waitlist').update({ status: 'rejected' }).eq('id', id)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    // Send rejection email if we have their details
    if (entry?.email) {
      const base = `font-family: sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; background: #100F0D; color: #F5EFE3;`
      const logo = `<div style="font-size: 24px; font-weight: 700; letter-spacing: 2px; margin-bottom: 24px;">SKILL<span style="color: #FF4B1F;">ZA</span></div>`
      const footer = `<p style="font-size: 11px; color: rgba(245,239,227,.25); margin-top: 32px;">Skillza · Built for SA students · hello@skillza.co.za</p>`
      const firstName = entry.name?.split(' ')[0] ?? 'there'

      await resend.emails.send({
        from: 'Skillza <hello@skillza.co.za>',
        to: entry.email,
        subject: `Your Skillza application — update`,
        html: `<div style="${base}">
          ${logo}
          <h2 style="font-size: 20px; margin-bottom: 8px;">Application update</h2>
          <p style="color: rgba(245,239,227,.6); font-size: 14px; line-height: 1.7; margin-bottom: 24px;">
            Hey ${firstName}, thank you for applying to join Skillza. After reviewing your application, we aren't able to approve it at this time.
          </p>
          <div style="background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.07); border-radius: 12px; padding: 20px; margin-bottom: 28px;">
            <p style="font-size: 14px; color: rgba(245,239,227,.7); line-height: 1.7; margin: 0;">
              This could be because your skill or portfolio doesn't yet match what our clients are looking for, or we may already have capacity in your area. We encourage you to build your portfolio and reapply — we review applications regularly as Skillza grows.
            </p>
          </div>
          <p style="font-size: 13px; color: rgba(245,239,227,.4); margin-top: 24px; line-height: 1.6;">
            Questions? Reach us at <a href="mailto:hello@skillza.co.za" style="color: #FF4B1F;">hello@skillza.co.za</a>
          </p>
          ${footer}
        </div>`,
      }).catch(() => { /* Don't fail the reject if email fails */ })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Reject error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
