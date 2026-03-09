import { createClient } from '@supabase/supabase-js'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? 'avi.moodley23@gmail.com,gareth.rasmussen@icloud.com')
  .split(',').map(e => e.trim()).filter(Boolean)

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {
  // Verify the caller is an admin
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

  const [studentsRes, bookingsRes, waitlistRes, verifyRes] = await Promise.all([
    supabase.from('students').select('*').order('created_at', { ascending: false }),
    supabase.from('bookings').select('*, students(name, skill)').order('created_at', { ascending: false }).limit(50),
    supabase.from('waitlist').select('*').order('created_at', { ascending: false }),
    supabase.from('verification_requests').select('*, students(name, university)').eq('status', 'pending').order('submitted_at', { ascending: true }),
  ])

  return NextResponse.json({
    students: studentsRes.data || [],
    bookings: bookingsRes.data || [],
    waitlist: waitlistRes.data || [],
    pendingVerifications: verifyRes.data || [],
  })
}
