import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {
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
