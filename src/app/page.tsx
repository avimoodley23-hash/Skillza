import { supabase } from '@/lib/supabase'
import type { StudentFull } from '@/types/database'
import Link from 'next/link'
import Nav from '@/components/Nav'
import HeroSection from '@/components/HeroSection'
import FindTalentSection from '@/components/FindTalentSection'
import TickerSection from '@/components/TickerSection'
import TalentGrid from '@/components/TalentGrid'
import HowItWorksSection from '@/components/HowItWorksSection'
import JoinSection from '@/components/JoinSection'
import Footer from '@/components/Footer'
export const revalidate = 60 // revalidate every 60 seconds

async function getStudents(): Promise<StudentFull[]> {
  const { data, error } = await supabase
    .from('students')
    .select('*, student_pricing(*), student_portfolio(*), student_reviews(*)')
    .eq('verified', true)
    .eq('active', true)
    .order('created_at', { ascending: true })

  if (error) {
    console.error('Error fetching students:', error)
    return []
  }

  return (data || []).map((student: any) => ({
    ...student,
    emoji: student.emoji ?? '🎓',
    student_pricing: (student.student_pricing || []).sort((a: any, b: any) => a.sort_order - b.sort_order),
    student_portfolio: (student.student_portfolio || []).sort((a: any, b: any) => a.sort_order - b.sort_order),
    student_reviews: student.student_reviews || [],
  })) as StudentFull[]
}

export default async function HomePage() {
  const students = await getStudents()

  return (
    <>
      <Nav />
      <div style={{ scrollBehavior: 'smooth' }}>
        <HeroSection students={students} />
        <TickerSection />
        <TalentGrid students={students} />

        {/* Split CTA band — routes both audiences */}
        <div style={{
          background: 'var(--black-3)',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
          padding: 'clamp(32px, 5vw, 48px) clamp(20px, 5vw, 80px)',
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
        }}>
          {/* Row 1 — clients */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', paddingBottom: 20 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--muted)', margin: 0 }}>Looking to hire?</p>
              <p style={{ fontSize: 'clamp(15px, 2vw, 18px)', fontWeight: 700, color: 'var(--cream)', margin: 0 }}>
                No account needed. Fill a short form — the creative WhatsApps you within 24 hours.
              </p>
            </div>
            <Link href="/#talent-grid" style={{
              fontSize: 13, fontWeight: 700, padding: '10px 22px',
              borderRadius: 100, background: 'var(--orange)', color: '#fff',
              whiteSpace: 'nowrap', textDecoration: 'none', flexShrink: 0,
            }}>Browse Talent →</Link>
          </div>

          <div style={{ height: 1, background: 'var(--border)', margin: '0 0' }} />

          {/* Row 2 — students */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', paddingTop: 20 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--muted)', margin: 0 }}>Looking to earn?</p>
              <p style={{ fontSize: 'clamp(15px, 2vw, 18px)', fontWeight: 700, color: 'var(--cream)', margin: 0 }}>
                Free to list forever. Your first booking is waiting.
              </p>
            </div>
            <Link href="/join" style={{
              fontSize: 13, fontWeight: 700, padding: '10px 22px',
              borderRadius: 100,
              border: '1px solid rgba(224,228,70,.4)',
              background: 'rgba(224,228,70,.08)', color: 'var(--citrus)',
              whiteSpace: 'nowrap', textDecoration: 'none', flexShrink: 0,
            }}>Join as a Creative →</Link>
          </div>
        </div>
        <FindTalentSection />
        <HowItWorksSection />
        <JoinSection />
        <Footer />
      </div>
    </>
  )
}
