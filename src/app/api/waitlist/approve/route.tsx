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
    const { id, name, email, university, year, skill } = await req.json()

    if (!id || !name || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // 1. Create the student row with defaults for all required fields
    const { error: studentError } = await supabase.from('students').insert({
      name,
      email,
      university: university || null,
      year: year || null,
      skill: skill || null,
      short_name: name.split(' ').length >= 2
        ? `${name.split(' ')[0]} ${name.split(' ')[1][0]}.`
        : name,
      verified: false,
      active: false,
      emoji: '🎓',
      city: 'South Africa',
      starting_price: 'TBC',
      price_unit: 'session',
      rating: 5.0,
      review_count: 0,
      category: skill?.toLowerCase().replace(/ /g, '_') || 'other',
      degree: 'Student',
    })

    if (studentError) {
      console.error('Student insert error:', studentError)
      return NextResponse.json({ error: studentError.message }, { status: 500 })
    }

    // 1b. Add to approved_emails so auth works
    const { error: approvedEmailError } = await supabase
      .from('approved_emails')
      .insert({ email })

    if (approvedEmailError && approvedEmailError.code !== '23505') {
      console.error('Approved email insert error:', approvedEmailError)
    }

    // 2. Generate a magic link via Supabase admin
    const { data: linkData, error: linkError } = await supabase.auth.admin.generateLink({
      type: 'magiclink',
      email,
      options: {
        redirectTo: 'https://skillza.co.za/dashboard',
      },
    })

    if (linkError || !linkData) {
      console.error('Magic link error:', linkError)
      return NextResponse.json({ error: 'Failed to generate magic link' }, { status: 500 })
    }

    const magicLink = linkData.properties?.action_link

    // 3. Update waitlist status to approved
    await supabase.from('waitlist').update({ status: 'approved' }).eq('id', id)

    // 4. Send approval email with magic link
    const base = `font-family: sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; background: #100F0D; color: #F5EFE3;`
    const logo = `<div style="font-size: 24px; font-weight: 700; letter-spacing: 2px; margin-bottom: 24px;">SKILL<span style="color: #FF4B1F;">ZA</span></div>`
    const footer = `<p style="font-size: 11px; color: rgba(245,239,227,.25); margin-top: 32px;">Skillza · Built for SA students · hello@skillza.co.za</p>`

    await resend.emails.send({
      from: 'Skillza <hello@skillza.co.za>',
      to: email,
      subject: `You're in — set up your Skillza profile`,
      html: `<div style="${base}">
        ${logo}
        <h2 style="font-size: 20px; margin-bottom: 8px;">You're approved 🎉</h2>
        <p style="color: rgba(245,239,227,.6); font-size: 14px; line-height: 1.7; margin-bottom: 24px;">
          Hey ${name.split(' ')[0]}, your Skillza application has been approved. Click the button below to log in and set up your profile — no password needed.
        </p>
        <div style="background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.07); border-radius: 12px; padding: 20px; margin-bottom: 28px;">
          <div style="font-size: 11px; font-weight: 700; color: rgba(245,239,227,.4); margin-bottom: 14px; text-transform: uppercase; letter-spacing: 1px;">Once you're in, complete your profile</div>
          <div style="font-size: 14px; color: rgba(245,239,227,.8); line-height: 2.2;">
            01 &nbsp; Add your bio, pricing and availability<br/>
            02 &nbsp; Upload portfolio links<br/>
            03 &nbsp; Complete your profile and submit for Skillza verification<br/>
            04 &nbsp; We verify and your profile goes live within 24hrs
          </div>
        </div>
        <a href="${magicLink}" style="display: inline-block; background: #FF4B1F; color: #fff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 15px;">
          Set Up My Profile →
        </a>
        <p style="font-size: 12px; color: rgba(245,239,227,.3); margin-top: 16px; line-height: 1.6;">
          This link expires in 24 hours and can only be used once. If it expires, just go to <a href="https://skillza.co.za/login" style="color: #FF4B1F;">skillza.co.za/login</a> and enter your email to get a new one.
        </p>
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