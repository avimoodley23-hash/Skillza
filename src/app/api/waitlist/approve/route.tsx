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
    const { id, name, email } = await req.json()

    if (!id || !name || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Update waitlist status to approved
    const { error: updateError } = await supabase
      .from('waitlist')
      .update({ status: 'approved' })
      .eq('id', id)

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 })
    }

    const base = `font-family: sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; background: #100F0D; color: #F5EFE3;`
    const logo = `<div style="font-size: 24px; font-weight: 700; letter-spacing: 2px; margin-bottom: 24px;">SKILL<span style="color: #FF4B1F;">ZA</span></div>`
    const footer = `<p style="font-size: 11px; color: rgba(245,239,227,.25); margin-top: 32px;">Skillza · Built for SA students · hello@skillza.co.za</p>`

    // Send approval email to student
    await resend.emails.send({
      from: 'Skillza <hello@skillza.co.za>',
      to: email,
      subject: `You're approved — set up your Skillza profile`,
      html: `<div style="${base}">
        ${logo}
        <h2 style="font-size: 20px; margin-bottom: 8px;">You're approved 🎉</h2>
        <p style="color: rgba(245,239,227,.6); font-size: 14px; line-height: 1.7; margin-bottom: 24px;">
          Hey ${name.split(' ')[0]}, great news — your Skillza application has been reviewed and approved.
          It's time to set up your profile and go live.
        </p>
        <div style="background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.07); border-radius: 12px; padding: 20px; margin-bottom: 24px;">
          <div style="font-size: 11px; font-weight: 700; color: rgba(245,239,227,.4); margin-bottom: 14px; text-transform: uppercase; letter-spacing: 1px;">To go live you need to</div>
          <div style="font-size: 14px; color: rgba(245,239,227,.8); line-height: 2.2;">
            01 &nbsp; Log in to your dashboard with this email<br/>
            02 &nbsp; Fill in your full profile (bio, pricing, portfolio)<br/>
            03 &nbsp; Upload your student card for verification<br/>
            04 &nbsp; We verify and your profile goes live within 24hrs
          </div>
        </div>
        <a href="https://skillza.co.za/login" style="display: inline-block; background: #FF4B1F; color: #fff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 15px;">
          Set Up My Profile →
        </a>
        <p style="font-size: 13px; color: rgba(245,239,227,.4); margin-top: 24px; line-height: 1.6;">
          Questions? Reply to this email or reach us at <a href="mailto:hello@skillza.co.za" style="color: #FF4B1F;">hello@skillza.co.za</a>
        </p>
        ${footer}
      </div>`,
    })

    return NextResponse.json({ success: true })

  } catch (err) {
    console.error('Approve error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
