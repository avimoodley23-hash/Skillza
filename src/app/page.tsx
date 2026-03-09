import { supabase } from '@/lib/supabase'
import type { StudentFull } from '@/types/database'
import Nav from '@/components/Nav'
import HeroSection from '@/components/HeroSection'
import FindTalentSection from '@/components/FindTalentSection'
import TickerSection from '@/components/TickerSection'
import TalentGrid from '@/components/TalentGrid'
import HowItWorksSection from '@/components/HowItWorksSection'
import VerifySection from '@/components/VerifySection'
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
        <FindTalentSection />
        <TickerSection />
        <TalentGrid students={students} />
        <HowItWorksSection />
        <VerifySection />
        <JoinSection />
        <Footer />
      </div>
    </>
  )
}
