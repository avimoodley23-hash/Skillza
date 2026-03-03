import { supabase } from '@/lib/supabase'
import type { Student } from '@/types/database'
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

async function getStudents(): Promise<Student[]> {
  const { data, error } = await supabase
    .from('students')
    .select('*')
    .eq('verified', true)
    .eq('active', true)
    .order('created_at', { ascending: true })

  if (error) {
    console.error('Error fetching students:', error)
    return []
  }
  return data || []
}

export default async function HomePage() {
  const students = await getStudents()

  return (
    <>
      <Nav />
      <div style={{ scrollBehavior: 'smooth' }}>
        <HeroSection />
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
