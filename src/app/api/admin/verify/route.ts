import { createClient } from '@supabase/supabase-js'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? 'avi.moodley23@gmail.com,gareth.rasmussen@icloud.com,info.garethras@gmail.com')
  .split(',').map(e => e.trim()).filter(Boolean)

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function PATCH(req: NextRequest) {
  const cookieStore = await cookies()
  const supabaseAuth = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll() } }
  )
  const { data: { session } } = await supabaseAuth.auth.getSession()
  if (!session || !ADMIN_EMAILS.includes(session.user.email ?? '')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json() as { id: string; action: 'approve' | 'reject' }
  const { id, action } = body

  if (!id || !['approve', 'reject'].includes(action)) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  if (action === 'approve') {
    const { data: verReq, error: fetchErr } = await supabase
      .from('verification_requests')
      .select('student_id')
      .eq('id', id)
      .single()

    if (fetchErr || !verReq) {
      return NextResponse.json({ error: 'Verification request not found' }, { status: 404 })
    }

    const { error: verUpdateErr } = await supabase
      .from('verification_requests')
      .update({ status: 'approved', reviewed_at: new Date().toISOString() })
      .eq('id', id)

    if (verUpdateErr) {
      return NextResponse.json({ error: verUpdateErr.message }, { status: 500 })
    }

    if (verReq.student_id) {
      const { error: studentUpdateErr } = await supabase
        .from('students')
        .update({ verified: true })
        .eq('id', verReq.student_id)

      if (studentUpdateErr) {
        return NextResponse.json({ error: studentUpdateErr.message }, { status: 500 })
      }
    }
  } else {
    const { error: rejectErr } = await supabase
      .from('verification_requests')
      .update({ status: 'rejected', reviewed_at: new Date().toISOString() })
      .eq('id', id)

    if (rejectErr) {
      return NextResponse.json({ error: rejectErr.message }, { status: 500 })
    }
  }

  return NextResponse.json({ success: true })
}
