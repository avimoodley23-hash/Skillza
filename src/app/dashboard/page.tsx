'use client'
import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { SKILLS, SKILL_EMOJIS, SKILL_CATEGORIES } from '@/lib/skills'

interface Student {
  id: string
  name: string
  short_name: string
  university: string
  skill: string
  secondary_skill?: string
  bio: string
  city: string
  starting_price: string
  price_unit: string
  verified: boolean
  year: string
  email: string
  degree: string
  whatsapp?: string
  student_number?: string
  portfolio_links?: string
  availability?: string[]
  extra_info?: string
  tags?: string[]
  emoji?: string
  photo_url?: string
  category?: string
}

interface Booking {
  id: string
  client_name: string
  client_email: string
  client_whatsapp: string
  description: string
  status: string
  reference: string
  created_at: string
}

interface PricingPackage {
  id?: string
  student_id?: string | null
  name: string
  description: string | null
  price: string
  featured: boolean | null
  sort_order?: number | null
}

interface PortfolioImage {
  id: string
  image_url: string
  label: string
  emoji: string
  sort_order: number | null
  storage_path: string
}

const UNIVERSITIES = ['UCT', 'Wits', 'AFDA', 'Red & Yellow', 'ICA', 'Stellenbosch', 'UJ', 'CPUT', 'Other']
const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Postgrad']
const PRICE_UNITS = ['session', 'hour', 'project', 'event', 'day', 'order', 'package', 'piece', 'block']
const CITIES = ['Cape Town', 'Johannesburg', 'Pretoria', 'Durban', 'Other']
const AVAILABILITY_OPTIONS = ['Weekdays', 'Weekday evenings', 'Saturdays', 'Sundays', 'Flexible']
const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  pending:     { label: 'PENDING',     color: '#C04A20', bg: 'rgba(255,113,68,.18)' },
  confirmed:   { label: 'CONFIRMED',   color: '#1B7A50', bg: 'rgba(192,240,170,.35)' },
  in_progress: { label: 'IN PROGRESS', color: '#5E3FD0', bg: 'rgba(199,176,255,.35)' },
  completed:   { label: 'COMPLETED',   color: '#1B7A50', bg: 'rgba(192,240,170,.35)' },
  rejected:    { label: 'REJECTED',    color: '#555555', bg: 'rgba(0,0,0,.07)' },
  unavailable: { label: 'UNAVAILABLE', color: '#555555', bg: 'rgba(0,0,0,.07)' },
}

const STATUS_ACTIONS: Record<string, { label: string; next: string; color: string }[]> = {
  pending: [
    { label: 'Accept',      next: 'confirmed',   color: '#3CB97D' },
    { label: 'Unavailable', next: 'unavailable', color: '#888888' },
    { label: 'Reject',      next: 'rejected',    color: '#E05A2E' },
  ],
  confirmed:   [{ label: 'Mark In Progress', next: 'in_progress', color: '#7C4FF7' }, { label: 'Reject', next: 'rejected', color: '#E05A2E' }],
  in_progress: [{ label: 'Mark Completed', next: 'completed', color: '#3CB97D' }],
  completed: [], rejected: [], unavailable: [],
}

const emptyPackage = (): PricingPackage => ({ name: '', description: '', price: '', featured: false })

function extractStoragePath(url: string): string {
  const marker = '/object/public/student-media/'
  const idx = url.indexOf(marker)
  return idx !== -1 ? url.slice(idx + marker.length) : ''
}

export default function DashboardPage() {
  const router = useRouter()
  const [screen, setScreen] = useState<'loading' | 'not-approved' | 'register' | 'dashboard'>('loading')
  const [student, setStudent] = useState<Student | null>(null)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [tab, setTab] = useState<'profile' | 'bookings' | 'verification'>('profile')
  const [authUserId, setAuthUserId] = useState('')
  const [authEmail, setAuthEmail] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [cardFile, setCardFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadDone, setUploadDone] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [uploadingPhoto, setUploadingPhoto] = useState(false)
  const [updatingBooking, setUpdatingBooking] = useState<string | null>(null)
  const [packages, setPackages] = useState<PricingPackage[]>([])
  const [customSkill, setCustomSkill] = useState('')
  const [portfolioImages, setPortfolioImages] = useState<PortfolioImage[]>([])
  const [uploadingPortfolio, setUploadingPortfolio] = useState(false)
  const [portfolioError, setPortfolioError] = useState('')
  const [deletingPortfolioId, setDeletingPortfolioId] = useState<string | null>(null)
  const portfolioInputRef = useRef<HTMLInputElement>(null)

  const [reg, setReg] = useState({
    name: '', whatsapp: '', university: '', year: '', student_number: '',
    skill: '', secondary_skill: '', bio: '', starting_price: '', price_unit: 'session',
    city: '', portfolio_links: '', student_card_link: '', extra_info: '',
    availability: [] as string[],
    degree: '',
    pkg1: emptyPackage(), pkg2: emptyPackage(), pkg3: emptyPackage(),
    agreed: false,
  })
  const [regError, setRegError] = useState('')
  const [regStepError, setRegStepError] = useState('')
  const [regSaving, setRegSaving] = useState(false)
  const [regStep, setRegStep] = useState(1)

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) { router.push('/login'); return }

      setAuthUserId(session.user.id)
      const email = session.user.email ?? ''
      setAuthEmail(email)

      let { data: studentData } = await supabase
        .from('students').select('*').eq('auth_user_id', session.user.id).single()

      if (!studentData) {
        const { data: byEmail } = await supabase
          .from('students').select('*').eq('email', email.toLowerCase()).single()

        if (byEmail) {
          await supabase
            .from('students')
            .update({ auth_user_id: session.user.id })
            .eq('id', byEmail.id)
          studentData = { ...byEmail, auth_user_id: session.user.id }
        }
      }

      if (studentData) {
        setStudent(studentData as Student)
        const { data: bookingData } = await supabase
          .from('bookings').select('*').eq('student_id', studentData.id).order('created_at', { ascending: false })
        setBookings((bookingData as Booking[]) || [])
        const { data: pkgData } = await supabase
          .from('student_pricing').select('*').eq('student_id', studentData.id).order('sort_order')
        setPackages(pkgData || [])

        const { data: portfolioData } = await supabase
          .from('student_portfolio')
          .select('*')
          .eq('student_id', studentData.id)
          .not('image_url', 'is', null)
          .order('sort_order', { ascending: true })
        setPortfolioImages(
          (portfolioData || []).map((p: any) => ({
            id: p.id,
            image_url: p.image_url,
            label: p.label || '',
            emoji: p.emoji || '🖼️',
            sort_order: p.sort_order,
            storage_path: extractStoragePath(p.image_url),
          }))
        )

        setScreen('dashboard')
        return
      }

      const { data: approvedData } = await supabase
        .from('approved_emails').select('email').eq('email', email.toLowerCase()).single()
      setScreen(approvedData ? 'register' : 'not-approved')
    })
  }, [])

  const toggleAvailability = (opt: string) => {
    setReg(r => ({
      ...r,
      availability: r.availability.includes(opt)
        ? r.availability.filter(a => a !== opt)
        : [...r.availability, opt]
    }))
  }

  // When skill changes, auto-update emoji and category
  const handleSkillChange = (newSkill: string) => {
    const emoji = SKILL_EMOJIS[newSkill] || '⭐'
    const category = SKILL_CATEGORIES[newSkill] || 'other'
    setStudent(s => s ? { ...s, skill: newSkill, emoji, category } : s)
    if (newSkill !== 'Other') setCustomSkill('')
  }

  const handleRegister = async () => {
    setRegError('')
    const { name, whatsapp, university, year, student_number, skill, bio, starting_price, price_unit, city, pkg1, pkg2, agreed, degree } = reg
    if (!name || !whatsapp || !university || !year || !student_number || !skill || !bio || !starting_price || !city || !degree) {
      setRegError('Please fill in all required fields.')
      return
    }
    if (!agreed) { setRegError('Please agree to the Terms and Privacy Policy.'); return }
    if (!pkg1.name || !pkg1.price || !pkg2.name || !pkg2.price) {
      setRegError('Please fill in at least Package 1 and Package 2.'); return
    }
    setRegSaving(true)

    const parts = name.trim().split(' ')
    const short_name = parts.length > 1 ? parts[0] + ' ' + parts[parts.length - 1][0] + '.' : parts[0]
    const finalSkill = skill === 'Other' && customSkill ? customSkill : skill
    const emoji = SKILL_EMOJIS[skill] || '⭐'
    const category = SKILL_CATEGORIES[skill] || 'other'

    const { data, error } = await supabase
      .from('students')
      .insert({
        name: name.trim(), short_name, university, degree: degree.trim(), year,
        skill: finalSkill, secondary_skill: reg.secondary_skill || null,
        bio: bio.trim(), city, starting_price: starting_price.trim(), price_unit,
        whatsapp, student_number, portfolio_links: reg.portfolio_links,
        student_card_link: reg.student_card_link,
        availability: reg.availability, extra_info: reg.extra_info,
        emoji, category, verified: false, auth_user_id: authUserId, email: authEmail,
        rating: 0, review_count: 0,
      })
      .select().single()

    if (error) {
      setRegError('Something went wrong. Please try again or contact hello@skillza.co.za')
      setRegSaving(false); return
    }

    const packages = [
      { ...pkg1, student_id: data.id, sort_order: 1, featured: false, unit: price_unit },
      { ...pkg2, student_id: data.id, sort_order: 2, featured: true, unit: price_unit },
      ...(reg.pkg3.name ? [{ ...reg.pkg3, student_id: data.id, sort_order: 3, featured: false, unit: price_unit }] : []),
    ]
    await supabase.from('student_pricing').insert(packages)

    setStudent(data as Student)
    setScreen('dashboard')
    setRegSaving(false)
  }

  const handleSaveProfile = async () => {
    if (!student) return
    setSaving(true)

    const finalSkill = student.skill === 'Other' && customSkill ? customSkill : student.skill
    const emoji = SKILL_EMOJIS[student.skill] || student.emoji || '⭐'
    const category = SKILL_CATEGORIES[student.skill] || 'other'

    await supabase.from('students').update({
      bio: student.bio,
      city: student.city,
      starting_price: student.starting_price,
      price_unit: student.price_unit,
      whatsapp: student.whatsapp,
      portfolio_links: student.portfolio_links,
      extra_info: student.extra_info,
      secondary_skill: student.secondary_skill || null,
      availability: student.availability || [],
      skill: finalSkill,
      emoji,
      category,
    }).eq('id', student.id)

    for (const pkg of packages) {
      if (pkg.id) {
        await supabase.from('student_pricing').update({
          name: pkg.name, description: pkg.description, price: pkg.price,
        }).eq('id', pkg.id)
      }
    }
    setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 2500)
  }

  const handleUpdateBookingStatus = async (bookingId: string, newStatus: string) => {
    if (!student) return
    setUpdatingBooking(bookingId)
    try {
      const res = await fetch('/api/booking/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId, status: newStatus, studentId: student.id }),
      })
      if (res.ok) setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: newStatus } : b))
    } catch (err) {
      console.error(err)
    } finally {
      setUpdatingBooking(null)
    }
  }

  const handlePhotoUpload = async (file: File) => {
    if (!student) return
    setUploadingPhoto(true)
    const ext = file.name.split('.').pop()
    const path = `${student.id}/avatar.${ext}`
    const { data, error } = await supabase.storage.from('avatars').upload(path, file, { upsert: true })
    if (!error && data) {
      const { data: urlData } = supabase.storage.from('avatars').getPublicUrl(path)
      await supabase.from('students').update({ photo_url: urlData.publicUrl }).eq('id', student.id)
      setStudent({ ...student, photo_url: urlData.publicUrl })
    }
    setUploadingPhoto(false)
  }

  const handleCardUpload = async () => {
    if (!cardFile || !student) return
    setUploading(true)
    setUploadError('')
    try {
      const ext = cardFile.name.split('.').pop()
      const path = 'student-cards/' + student.id + '.' + ext
      const { data, error } = await supabase.storage.from('verification').upload(path, cardFile, { upsert: true })
      if (error || !data) {
        setUploadError('Upload failed. Please try again.')
      } else {
        const { data: urlData } = supabase.storage.from('verification').getPublicUrl(path)
        await supabase.from('verification_requests').upsert({ student_id: student.id, card_image_url: urlData.publicUrl, status: 'pending', submitted_at: new Date().toISOString() }, { onConflict: 'student_id' })
        setUploadDone(true)
      }
    } catch {
      setUploadError('Upload failed. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const handlePortfolioUpload = async (files: FileList) => {
    if (!student) return
    const remaining = 6 - portfolioImages.length
    if (remaining <= 0) {
      setPortfolioError('You can upload a maximum of 6 portfolio images.')
      return
    }
    setPortfolioError('')
    setUploadingPortfolio(true)

    const filesToUpload = Array.from(files).slice(0, remaining)
    const newImages: PortfolioImage[] = []

    for (const file of filesToUpload) {
      const ext = file.name.split('.').pop() || 'jpg'
      const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
      const storagePath = `portfolio/${student.id}/${filename}`

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('student-media')
        .upload(storagePath, file, { upsert: false })

      if (uploadError || !uploadData) {
        setPortfolioError('One or more uploads failed. Please try again.')
        continue
      }

      const { data: urlData } = supabase.storage
        .from('student-media')
        .getPublicUrl(storagePath)

      const label = file.name.replace(/\.[^/.]+$/, '')
      const { data: rowData, error: insertError } = await supabase
        .from('student_portfolio')
        .insert({
          student_id: student.id,
          image_url: urlData.publicUrl,
          emoji: '🖼️',
          label,
          sort_order: portfolioImages.length + newImages.length + 1,
        })
        .select()
        .single()

      if (!insertError && rowData) {
        newImages.push({
          id: (rowData as any).id,
          image_url: urlData.publicUrl,
          label,
          emoji: '🖼️',
          sort_order: (rowData as any).sort_order,
          storage_path: storagePath,
        })
      }
    }

    setPortfolioImages(prev => [...prev, ...newImages])
    setUploadingPortfolio(false)
    if (portfolioInputRef.current) portfolioInputRef.current.value = ''
  }

  const handlePortfolioDelete = async (image: PortfolioImage) => {
    setDeletingPortfolioId(image.id)
    try {
      if (image.storage_path) {
        await supabase.storage.from('student-media').remove([image.storage_path])
      }
      await supabase.from('student_portfolio').delete().eq('id', image.id)
      setPortfolioImages(prev => prev.filter(p => p.id !== image.id))
    } catch {
      // silently ignore
    } finally {
      setDeletingPortfolioId(null)
    }
  }

  const validateStep = (step: number): string => {
    if (step === 1) {
      if (!reg.name.trim()) return 'Please enter your full name.'
      if (!reg.whatsapp.trim()) return 'Please enter your WhatsApp number.'
      if (!reg.university) return 'Please select your university.'
      if (!reg.year) return 'Please select your year of study.'
      if (!reg.student_number.trim()) return 'Please enter your student number.'
      if (!reg.city) return 'Please select your city.'
      if (!reg.degree.trim()) return 'Please enter your degree / programme.'
    }
    if (step === 2) {
      if (!reg.skill) return 'Please select your primary skill.'
      if (!reg.bio.trim()) return 'Please write a short bio.'
      if (reg.bio.trim().length < 20) return 'Your bio must be at least 20 characters.'
    }
    if (step === 3) {
      if (!reg.starting_price.trim()) return 'Please enter your starting price.'
      if (!reg.pkg1.name.trim() && !reg.pkg2.name.trim() && !reg.pkg3.name.trim()) {
        return 'Please fill in at least one package name.'
      }
    }
    return ''
  }

  const handleSignOut = async () => { await supabase.auth.signOut(); router.push('/') }
  const pendingCount = bookings.filter(b => b.status === 'pending').length

  const tabStyle = (t: string): React.CSSProperties => ({
    flex: 1, padding: '10px 16px', borderRadius: 9, border: 'none', cursor: 'pointer',
    fontFamily: 'Bebas Neue, sans-serif', letterSpacing: 1, fontSize: 14,
    background: tab === t ? '#334ED8' : 'transparent',
    color: tab === t ? '#fff' : 'rgba(17,17,16,.5)', transition: 'all .2s',
    boxShadow: tab === t ? '0 2px 10px rgba(51,78,216,.3)' : 'none',
  })

  // ── SCREENS ──────────────────────────────────────────

  if (screen === 'loading') return (
    <main style={{ minHeight: '100vh', background: '#FAFAF6', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden="true" style={{ position: 'absolute', top: '-10%', left: '-8%', width: 320, height: 280, background: '#C7B0FF', borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%', opacity: .22, pointerEvents: 'none' }} />
      <div aria-hidden="true" style={{ position: 'absolute', bottom: '-8%', right: '-6%', width: 280, height: 260, background: '#C0F0AA', borderRadius: '40% 60% 30% 70%', opacity: .28, pointerEvents: 'none' }} />
      <p style={{ color: '#111110', fontFamily: 'Bebas Neue, sans-serif', fontSize: 20, letterSpacing: 3, opacity: .45, position: 'relative', zIndex: 1 }}>Loading...</p>
    </main>
  )

  if (screen === 'not-approved') return (
    <main style={{ minHeight: '100vh', background: '#FAFAF6', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden="true" style={{ position: 'absolute', top: '-8%', left: '-6%', width: 340, height: 300, background: '#C7B0FF', borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%', opacity: .25, pointerEvents: 'none', animation: 'dblob1 6.4s ease-in-out infinite' }} />
      <div aria-hidden="true" style={{ position: 'absolute', bottom: '-6%', right: '-5%', width: 260, height: 240, background: '#C0F0AA', borderRadius: '40% 60% 30% 70%', opacity: .32, pointerEvents: 'none', animation: 'dblob3 4.7s ease-in-out infinite' }} />
      <div style={{ textAlign: 'center', maxWidth: 440, position: 'relative', zIndex: 1 }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#FF7144', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', boxShadow: '0 6px 24px rgba(255,113,68,.3)' }}>
          <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 28, color: '#fff', letterSpacing: 1 }}>!</span>
        </div>
        <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 36, letterSpacing: 1, color: '#111110', marginBottom: 10, lineHeight: .95 }}>Not on the list yet</div>
        <p style={{ color: 'rgba(17,17,16,.55)', fontSize: 14, lineHeight: 1.8, marginBottom: 32 }}>
          <span style={{ color: '#111110', fontWeight: 600 }}>{authEmail}</span> hasn&apos;t been approved yet. Reach out and we&apos;ll get you set up.
        </p>
        <a href="mailto:hello@skillza.co.za?subject=Student profile request" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#334ED8', color: '#fff', borderRadius: 100, padding: '14px 28px', fontSize: 15, fontWeight: 700, fontFamily: 'Bebas Neue, sans-serif', letterSpacing: 1.5, textDecoration: 'none', boxShadow: '0 4px 20px rgba(51,78,216,.35)' }}>
          Contact hello@skillza.co.za
        </a>
        <br />
        <button onClick={handleSignOut} style={{ background: 'transparent', border: 'none', color: 'rgba(17,17,16,.45)', fontSize: 12, cursor: 'pointer', textDecoration: 'underline', marginTop: 18 }}>Sign out</button>
      </div>
      <style>{dblobStyles}</style>
    </main>
  )

  // ── REGISTRATION FORM ─────────────────────────────────
  if (screen === 'register') {
    const stepTitles = ['About You', 'Your Skill', 'Packages & Portfolio', 'Final Details']
    const stepColors = ['#334ED8', '#FF7144', '#C0F0AA', '#E0E446']
    return (
      <main style={{ minHeight: '100vh', background: '#FAFAF6', padding: '60px 24px 80px', position: 'relative', overflow: 'hidden' }}>
        {/* Blob decorations */}
        <div aria-hidden="true" style={{ position: 'fixed', top: '-6%', left: '-5%', width: 300, height: 260, background: '#C7B0FF', borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%', opacity: .22, pointerEvents: 'none', animation: 'dblob1 6.4s ease-in-out infinite' }} />
        <div aria-hidden="true" style={{ position: 'fixed', bottom: '-5%', right: '-4%', width: 240, height: 220, background: '#C0F0AA', borderRadius: '40% 60% 30% 70%', opacity: .28, pointerEvents: 'none', animation: 'dblob3 4.7s ease-in-out infinite' }} />
        <div aria-hidden="true" style={{ position: 'fixed', top: '45%', right: '-3%', width: 180, height: 180, background: '#E0E446', borderRadius: '50% 50% 70% 30%', opacity: .18, pointerEvents: 'none', animation: 'dblob4 5.1s ease-in-out infinite' }} />
        <div style={{ maxWidth: 580, margin: '0 auto', position: 'relative', zIndex: 1 }}>

          <div style={{ marginBottom: 32 }}>
            <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 36, letterSpacing: 1.5, color: '#111110', marginBottom: 5, lineHeight: .95 }}>Create your profile</div>
            <p style={{ color: 'rgba(17,17,16,.5)', fontSize: 13, lineHeight: 1.6 }}>Signed in as <span style={{ color: '#111110', fontWeight: 600 }}>{authEmail}</span></p>
          </div>

          <div style={{ display: 'flex', gap: 6, marginBottom: 28 }}>
            {stepTitles.map((title, i) => (
              <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i + 1 <= regStep ? stepColors[i] : 'rgba(0,0,0,.1)', transition: 'background .3s' }} />
            ))}
          </div>
          <p style={{ color: 'rgba(17,17,16,.45)', fontSize: 11, marginBottom: 24, textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 700 }}>Step {regStep} of 4 — {stepTitles[regStep - 1]}</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

            {regStep === 1 && <>
              <FormField label="Full Name *" hint="As it appears on your student card">
                <input value={reg.name} onChange={e => setReg(r => ({ ...r, name: e.target.value }))} placeholder="e.g. Sipho Dlamini" style={inputStyle} />
              </FormField>
              <FormField label="WhatsApp Number *" hint="e.g. 082 000 0000">
                <input value={reg.whatsapp} onChange={e => setReg(r => ({ ...r, whatsapp: e.target.value }))} placeholder="+27 82 000 0000" style={inputStyle} type="tel" />
              </FormField>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <FormField label="University *">
                  <select value={reg.university} onChange={e => setReg(r => ({ ...r, university: e.target.value }))} style={inputStyle}>
                    <option value="">Select...</option>
                    {UNIVERSITIES.map(u => <option key={u}>{u}</option>)}
                  </select>
                </FormField>
                <FormField label="Year of Study *">
                  <select value={reg.year} onChange={e => setReg(r => ({ ...r, year: e.target.value }))} style={inputStyle}>
                    <option value="">Select...</option>
                    {YEARS.map(y => <option key={y}>{y}</option>)}
                  </select>
                </FormField>
              </div>
              <FormField label="Degree / Programme *">
                <input value={reg.degree} onChange={e => setReg(r => ({ ...r, degree: e.target.value }))} placeholder="e.g. BA Visual Communication" style={inputStyle} />
              </FormField>
              <FormField label="Student Number *" hint="Used for verification only — not shown on your profile">
                <input value={reg.student_number} onChange={e => setReg(r => ({ ...r, student_number: e.target.value }))} placeholder="e.g. UCT2021-4872" style={inputStyle} />
              </FormField>
              <FormField label="City *">
                <select value={reg.city} onChange={e => setReg(r => ({ ...r, city: e.target.value }))} style={inputStyle}>
                  <option value="">Select...</option>
                  {CITIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </FormField>
            </>}

            {regStep === 2 && <>
              <FormField label="Primary Skill *" hint="The main service you want to offer on Skillza">
                <select value={reg.skill} onChange={e => setReg(r => ({ ...r, skill: e.target.value }))} style={inputStyle}>
                  <option value="">Select...</option>
                  {SKILLS.map(s => <option key={s}>{s}</option>)}
                </select>
              </FormField>
              {reg.skill === 'Other' && (
                <FormField label="Describe your skill *" hint="Tell us what you do — we'll add it to the platform">
                  <input value={customSkill} onChange={e => setCustomSkill(e.target.value)} placeholder="e.g. 3D Modelling, Podcast Production..." style={inputStyle} />
                </FormField>
              )}
              <FormField label="Secondary Skill (optional)">
                <select value={reg.secondary_skill} onChange={e => setReg(r => ({ ...r, secondary_skill: e.target.value }))} style={inputStyle}>
                  <option value="">None</option>
                  {SKILLS.filter(s => s !== reg.skill).map(s => <option key={s}>{s}</option>)}
                </select>
              </FormField>
              <FormField label="Your Bio *" hint="3-4 sentences. Who are you, what do you do, what makes you great? Write like you're talking to a client.">
                <textarea value={reg.bio} onChange={e => setReg(r => ({ ...r, bio: e.target.value }))} rows={5} placeholder="e.g. I'm a third year photography student at UCT specialising in events and portraits..." style={{ ...inputStyle, resize: 'vertical' }} />
              </FormField>
              <FormField label="General Availability">
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 4 }}>
                  {AVAILABILITY_OPTIONS.map(opt => (
                    <button key={opt} type="button" onClick={() => toggleAvailability(opt)} style={{
                      padding: '7px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: 'pointer', transition: 'all .15s',
                      background: reg.availability.includes(opt) ? '#334ED8' : 'transparent',
                      color: reg.availability.includes(opt) ? '#fff' : 'rgba(17,17,16,.5)',
                      border: `1px solid ${reg.availability.includes(opt) ? '#334ED8' : 'rgba(0,0,0,.15)'}`,
                    }}>{opt}</button>
                  ))}
                </div>
              </FormField>
            </>}

            {regStep === 3 && <>
              <div style={{ background: 'rgba(51,78,216,.08)', border: '1px solid rgba(51,78,216,.2)', borderRadius: 10, padding: '12px 16px', marginBottom: 4 }}>
                <p style={{ fontSize: 13, color: 'rgba(17,17,16,.7)', lineHeight: 1.6 }}>
                  Set your pricing packages. These appear on your public profile. Package 2 is marked as &quot;Popular&quot;.
                </p>
              </div>
              <FormField label="Starting Price in Rands *" hint="Your lowest price. Clients see 'from R___'">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <input value={reg.starting_price} onChange={e => setReg(r => ({ ...r, starting_price: e.target.value }))} placeholder="e.g. 500" style={inputStyle} />
                  <select value={reg.price_unit} onChange={e => setReg(r => ({ ...r, price_unit: e.target.value }))} style={inputStyle}>
                    {PRICE_UNITS.map(u => <option key={u}>{u}</option>)}
                  </select>
                </div>
              </FormField>
              {([['pkg1', 'Package 1 *', false], ['pkg2', 'Package 2 * (Popular)', true], ['pkg3', 'Package 3 (optional)', false]] as [keyof typeof reg, string, boolean][]).map(([key, label, isFeatured]) => (
                <FormField key={key as string} label={label}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, background: isFeatured ? 'rgba(51,78,216,.06)' : '#F2F0EA', border: isFeatured ? '1px solid rgba(51,78,216,.2)' : '1px solid rgba(0,0,0,.08)', borderRadius: 10, padding: 14 }}>
                    <input value={(reg[key] as PricingPackage).name} onChange={e => setReg(r => ({ ...r, [key]: { ...(r[key] as PricingPackage), name: e.target.value } }))} placeholder="Package name e.g. Basic / Standard / Premium" style={inputStyle} />
                    <input value={(reg[key] as PricingPackage).description ?? ''} onChange={e => setReg(r => ({ ...r, [key]: { ...(r[key] as PricingPackage), description: e.target.value } }))} placeholder="Description e.g. 2-hr shoot, 30 edited photos" style={inputStyle} />
                    <input value={(reg[key] as PricingPackage).price} onChange={e => setReg(r => ({ ...r, [key]: { ...(r[key] as PricingPackage), price: e.target.value } }))} placeholder="Price e.g. R550" style={inputStyle} />
                  </div>
                </FormField>
              ))}
              <FormField label="Portfolio Links *" hint="Instagram, Behance, Google Drive, website — one per line">
                <textarea value={reg.portfolio_links} onChange={e => setReg(r => ({ ...r, portfolio_links: e.target.value }))} rows={4} placeholder={'https://instagram.com/yourhandle\nhttps://behance.net/yourprofile'} style={{ ...inputStyle, resize: 'vertical' }} />
              </FormField>
            </>}

            {regStep === 4 && <>
              <FormField label="Student Card — Google Drive Link" hint="Upload to Drive, make viewable by anyone with the link, paste here. Required before your profile goes live.">
                <input value={reg.student_card_link} onChange={e => setReg(r => ({ ...r, student_card_link: e.target.value }))} placeholder="https://drive.google.com/..." style={inputStyle} />
              </FormField>
              <FormField label="Anything else we should know?" hint="Equipment you own, languages you work in, areas you cover, special skills">
                <textarea value={reg.extra_info} onChange={e => setReg(r => ({ ...r, extra_info: e.target.value }))} rows={3} placeholder="e.g. I own a Sony A7III, I shoot in Cape Town and surrounds, I speak isiXhosa and English" style={{ ...inputStyle, resize: 'vertical' }} />
              </FormField>
              <div style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,.1)', borderRadius: 10, padding: '16px' }}>
                <label style={{ display: 'flex', gap: 12, alignItems: 'flex-start', cursor: 'pointer' }}>
                  <input type="checkbox" checked={reg.agreed} onChange={e => setReg(r => ({ ...r, agreed: e.target.checked }))} style={{ marginTop: 2, accentColor: '#334ED8', width: 16, height: 16, flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: 'rgba(17,17,16,.65)', lineHeight: 1.6 }}>
                    I have read and agree to Skillza&apos;s{' '}
                    <a href="/privacy" target="_blank" style={{ color: '#334ED8' }}>Privacy Policy</a> and{' '}
                    <a href="/terms" target="_blank" style={{ color: '#334ED8' }}>Terms of Service</a>.
                    I consent to Skillza collecting and storing my personal information for the purpose of creating my student profile. *
                  </span>
                </label>
              </div>
            </>}

            {regError && (
              <p style={{ color: '#E05A2E', fontSize: 13, background: 'rgba(255,113,68,.08)', border: '1px solid rgba(255,113,68,.25)', borderRadius: 10, padding: '10px 14px', lineHeight: 1.5 }}>{regError}</p>
            )}

            {regStepError && (
              <p style={{ color: '#E05A2E', fontSize: 13, background: 'rgba(255,113,68,.08)', border: '1px solid rgba(255,113,68,.25)', borderRadius: 10, padding: '10px 14px', lineHeight: 1.5 }}>{regStepError}</p>
            )}

            <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
              {regStep > 1 && (
                <button onClick={() => { setRegStep(s => s - 1); setRegError(''); setRegStepError('') }} style={{ flex: 1, background: 'transparent', border: '1px solid rgba(0,0,0,.15)', color: 'rgba(17,17,16,.55)', borderRadius: 10, padding: '14px', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
                  ← Back
                </button>
              )}
              {regStep < 4 ? (
                <button onClick={() => {
                  const err = validateStep(regStep)
                  if (err) { setRegStepError(err); return }
                  setRegStepError('')
                  setRegError('')
                  setRegStep(s => s + 1)
                }} style={{ flex: 2, background: '#334ED8', color: '#fff', border: 'none', borderRadius: 10, padding: '14px', fontSize: 15, fontWeight: 700, fontFamily: 'Bebas Neue, sans-serif', letterSpacing: 1.5, cursor: 'pointer', boxShadow: '0 4px 18px rgba(51,78,216,.3)' }}>
                  Next →
                </button>
              ) : (
                <button onClick={handleRegister} disabled={regSaving} style={{ flex: 2, background: '#334ED8', color: '#fff', border: 'none', borderRadius: 10, padding: '14px', fontSize: 15, fontWeight: 700, fontFamily: 'Bebas Neue, sans-serif', letterSpacing: 1.5, cursor: regSaving ? 'not-allowed' : 'pointer', opacity: regSaving ? .7 : 1, boxShadow: '0 4px 18px rgba(51,78,216,.3)' }}>
                  {regSaving ? 'Creating profile...' : 'Submit Profile →'}
                </button>
              )}
            </div>

            <p style={{ color: 'rgba(17,17,16,.4)', fontSize: 12, textAlign: 'center', lineHeight: 1.6 }}>
              Your profile won&apos;t go live until your Student Card is verified. We review within 24 hours.
            </p>
            <button onClick={handleSignOut} style={{ background: 'transparent', border: 'none', color: 'rgba(17,17,16,.4)', fontSize: 12, cursor: 'pointer', textDecoration: 'underline', textAlign: 'center' }}>Sign out</button>
          </div>
        </div>
        <style>{dblobStyles}</style>
      </main>
    )
  }

  // ── DASHBOARD ─────────────────────────────────────────
  return (
    <main style={{ minHeight: '100vh', background: '#FAFAF6', padding: '80px 24px 48px', position: 'relative', overflow: 'hidden' }}>
      {/* Subtle blob decorations */}
      <div aria-hidden="true" style={{ position: 'fixed', top: '-8%', left: '-6%', width: 320, height: 280, background: '#C7B0FF', borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%', opacity: .18, pointerEvents: 'none', animation: 'dblob1 6.4s ease-in-out infinite' }} />
      <div aria-hidden="true" style={{ position: 'fixed', bottom: '-6%', right: '-5%', width: 260, height: 240, background: '#C0F0AA', borderRadius: '40% 60% 30% 70%', opacity: .22, pointerEvents: 'none', animation: 'dblob3 4.7s ease-in-out infinite' }} />
      <div aria-hidden="true" style={{ position: 'fixed', top: '38%', right: '-2%', width: 160, height: 160, background: '#E0E446', borderRadius: '50% 50% 70% 30%', opacity: .15, pointerEvents: 'none', animation: 'dblob4 5.1s ease-in-out infinite' }} />
      <div aria-hidden="true" style={{ position: 'fixed', bottom: '28%', left: '-4%', width: 180, height: 180, background: '#FF7144', borderRadius: '50% 50% 40% 60% / 40% 60% 50% 50%', opacity: .13, pointerEvents: 'none', animation: 'dblob2 5.2s ease-in-out infinite' }} />
      <div aria-hidden="true" style={{ position: 'fixed', top: '16%', right: '12%', width: 100, height: 100, background: '#5BC4F5', borderRadius: '50%', opacity: .18, pointerEvents: 'none', animation: 'dblob5 4.3s ease-in-out infinite' }} />

      <div style={{ maxWidth: 680, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Header banner */}
        <div style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,.07)', borderRadius: 20, padding: '20px 24px', marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 2px 12px rgba(0,0,0,.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            {student!.photo_url ? (
              <img src={student!.photo_url} alt="" style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', objectPosition: 'center top', flexShrink: 0, border: '2px solid rgba(51,78,216,.2)' }} />
            ) : (
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#334ED8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 22, color: '#fff', letterSpacing: 1 }}>{student!.short_name.charAt(0)}</span>
              </div>
            )}
            <div>
              <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 24, letterSpacing: 1.5, color: '#111110', lineHeight: 1 }}>Hey, {student!.short_name}</div>
              <p style={{ color: 'rgba(17,17,16,.5)', fontSize: 12, marginTop: 3 }}>{student!.university} · {student!.skill}</p>
            </div>
          </div>
          <button onClick={handleSignOut} style={{ background: 'transparent', border: '1px solid rgba(0,0,0,.12)', color: 'rgba(17,17,16,.5)', borderRadius: 8, padding: '8px 16px', fontSize: 12, cursor: 'pointer', fontWeight: 600 }}>Sign out</button>
        </div>

        <div style={{ display: 'flex', gap: 4, marginBottom: 28, background: 'rgba(0,0,0,.04)', padding: 4, borderRadius: 12, border: '1px solid rgba(0,0,0,.07)' }}>
          <button style={tabStyle('profile')} onClick={() => setTab('profile')}>Profile</button>
          <button style={tabStyle('bookings')} onClick={() => setTab('bookings')}>
            Bookings ({bookings.length}){pendingCount > 0 && <span style={{ marginLeft: 6, background: '#334ED8', color: '#fff', borderRadius: 100, fontSize: 10, padding: '1px 6px', fontFamily: 'sans-serif' }}>{pendingCount}</span>}
          </button>
          <button style={tabStyle('verification')} onClick={() => setTab('verification')}>Verification</button>
        </div>

        {/* PROFILE TAB */}
        {tab === 'profile' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Profile Photo */}
            <div style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,.07)', borderRadius: 16, padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,.04)' }}>
              <label style={labelStyle}>Profile Photo</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 8 }}>
                <div style={{ width: 76, height: 76, borderRadius: 16, overflow: 'hidden', background: '#F2F0EA', border: '2px solid rgba(51,78,216,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {student!.photo_url
                    ? <img src={student!.photo_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
                    : <span style={{ fontSize: 32 }}>{student!.emoji}</span>
                  }
                </div>
                <div>
                  <p style={{ color: 'rgba(17,17,16,.5)', fontSize: 12, lineHeight: 1.5, marginBottom: 10 }}>Square crops work best. Max 5MB.</p>
                  <label style={{ display: 'inline-block', background: 'transparent', border: '1px solid rgba(0,0,0,.15)', color: uploadingPhoto ? 'rgba(17,17,16,.4)' : '#334ED8', borderRadius: 8, padding: '8px 16px', fontSize: 12, fontWeight: 600, cursor: uploadingPhoto ? 'not-allowed' : 'pointer' }}>
                    {uploadingPhoto ? 'Uploading...' : student!.photo_url ? 'Change Photo' : 'Upload Photo'}
                    <input type="file" accept="image/*" style={{ display: 'none' }} disabled={uploadingPhoto} onChange={e => { const f = e.target.files?.[0]; if (f) handlePhotoUpload(f) }} />
                  </label>
                </div>
              </div>
            </div>

            {/* Locked info */}
            <div style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,.07)', borderRadius: 16, padding: '20px', display: 'flex', flexDirection: 'column', gap: 12, boxShadow: '0 2px 8px rgba(0,0,0,.04)' }}>
              <Field label="Name" value={student!.name} disabled />
              <Field label="University" value={student!.university} disabled />
              <Field label="Degree" value={student!.degree} disabled />
              <Field label="Year" value={student!.year} disabled />
            </div>

            {/* Editable fields */}
            <div style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,.07)', borderRadius: 16, padding: '20px', display: 'flex', flexDirection: 'column', gap: 16, boxShadow: '0 2px 8px rgba(0,0,0,.04)' }}>

          {/* Editable Primary Skill */}
            <div>
              <label style={labelStyle}>Primary Skill</label>
              <p style={{ color: 'rgba(17,17,16,.45)', fontSize: 11, marginBottom: 8, lineHeight: 1.5 }}>
                Update this if you've developed new skills or want to change your main offering.
              </p>
              <select
                value={student!.skill}
                onChange={e => handleSkillChange(e.target.value)}
                style={inputStyle}
              >
                {SKILLS.map(s => <option key={s}>{s}</option>)}
              </select>
              {student!.skill === 'Other' && (
                <input
                  value={customSkill}
                  onChange={e => setCustomSkill(e.target.value)}
                  placeholder="Describe your skill e.g. 3D Modelling, Podcast Production..."
                  style={{ ...inputStyle, marginTop: 8 }}
                />
              )}
              {/* Show what category this maps to */}
              <p style={{ color: 'rgba(17,17,16,.4)', fontSize: 11, marginTop: 6 }}>
                Appears in: <span style={{ color: '#334ED8', fontWeight: 600 }}>
                  {SKILL_CATEGORIES[student!.skill] || 'other'}
                </span> filter on the browse page
              </p>
            </div>

            {/* Secondary Skill */}
            <div>
              <label style={labelStyle}>Secondary Skill</label>
              <select value={student!.secondary_skill || ''} onChange={e => setStudent({ ...student!, secondary_skill: e.target.value })} style={inputStyle}>
                <option value="">None</option>
                {SKILLS.filter(s => s !== student!.skill).map(s => <option key={s}>{s}</option>)}
              </select>
            </div>

            <Field label="WhatsApp" value={student!.whatsapp || ''} onChange={v => setStudent({ ...student!, whatsapp: v })} />
            <div>
              <label style={labelStyle}>Bio</label>
              <textarea value={student!.bio} onChange={e => setStudent({ ...student!, bio: e.target.value })} rows={4} style={{ ...inputStyle, resize: 'vertical' }} />
            </div>
            <div>
              <label style={labelStyle}>Availability</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 4 }}>
                {AVAILABILITY_OPTIONS.map(opt => (
                  <button key={opt} type="button"
                    onClick={() => setStudent(s => {
                      const avail = s!.availability || []
                      return { ...s!, availability: avail.includes(opt) ? avail.filter(a => a !== opt) : [...avail, opt] }
                    })}
                    style={{
                      padding: '7px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: 'pointer', transition: 'all .15s',
                      background: (student!.availability || []).includes(opt) ? '#334ED8' : 'transparent',
                      color: (student!.availability || []).includes(opt) ? '#fff' : 'rgba(17,17,16,.5)',
                      border: `1px solid ${(student!.availability || []).includes(opt) ? '#334ED8' : 'rgba(0,0,0,.14)'}`,
                    }}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
            <Field label="City" value={student!.city} onChange={v => setStudent({ ...student!, city: v })} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <Field label="Starting Price (R)" value={student!.starting_price} onChange={v => setStudent({ ...student!, starting_price: v })} />
              <Field label="Price Unit" value={student!.price_unit} onChange={v => setStudent({ ...student!, price_unit: v })} />
            </div>
            </div> {/* end editable card */}
            {packages.length > 0 && (
              <div style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,.07)', borderRadius: 16, padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,.04)' }}>
                <label style={labelStyle}>Pricing Packages</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 12 }}>
                  {packages.map((pkg, i) => (
                    <div key={pkg.id ?? i} style={{ background: pkg.featured ? 'rgba(51,78,216,.06)' : '#F2F0EA', border: `1px solid ${pkg.featured ? 'rgba(51,78,216,.2)' : 'rgba(0,0,0,.08)'}`, borderRadius: 10, padding: 14 }}>
                      {pkg.featured && <p style={{ fontSize: 10, color: '#334ED8', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Popular</p>}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <input value={pkg.name} onChange={e => setPackages(prev => prev.map((p, j) => j === i ? { ...p, name: e.target.value } : p))} placeholder="Package name" style={inputStyle} />
                        <input value={pkg.description ?? ''} onChange={e => setPackages(prev => prev.map((p, j) => j === i ? { ...p, description: e.target.value } : p))} placeholder="Description" style={inputStyle} />
                        <input value={pkg.price} onChange={e => setPackages(prev => prev.map((p, j) => j === i ? { ...p, price: e.target.value } : p))} placeholder="Price e.g. R550" style={inputStyle} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,.07)', borderRadius: 16, padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,.04)' }}>
              <label style={labelStyle}>Portfolio Links</label>
              <textarea value={student!.portfolio_links || ''} onChange={e => setStudent({ ...student!, portfolio_links: e.target.value })} rows={3} style={{ ...inputStyle, marginTop: 8, resize: 'vertical' }} />
            </div>

            {/* Portfolio Images */}
            <div style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,.07)', borderRadius: 16, padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,.04)' }}>
              <label style={labelStyle}>Portfolio Images</label>
              <p style={{ color: 'var(--muted)', fontSize: 11, marginBottom: 12, lineHeight: 1.5 }}>
                Upload up to 6 images to showcase your work. These appear on your public profile.
              </p>

              {portfolioImages.length > 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 12 }}>
                  {portfolioImages.map(img => (
                    <div key={img.id} style={{ position: 'relative', aspectRatio: '1', borderRadius: 10, overflow: 'hidden', border: '1px solid var(--border)', background: '#1a1a1a' }}>
                      <img
                        src={img.image_url}
                        alt={img.label}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                      <button
                        onClick={() => handlePortfolioDelete(img)}
                        disabled={deletingPortfolioId === img.id}
                        style={{
                          position: 'absolute', top: 6, right: 6,
                          width: 28, height: 28, borderRadius: '50%',
                          background: 'rgba(0,0,0,.75)', border: '1px solid rgba(255,255,255,.15)',
                          color: '#fff', fontSize: 14, cursor: deletingPortfolioId === img.id ? 'not-allowed' : 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          lineHeight: 1, padding: 0,
                        }}
                        aria-label="Delete image"
                      >
                        {deletingPortfolioId === img.id ? '…' : '×'}
                      </button>
                      {img.label && (
                        <div style={{
                          position: 'absolute', bottom: 0, left: 0, right: 0,
                          padding: '16px 6px 5px',
                          background: 'linear-gradient(to top, rgba(0,0,0,.7) 0, transparent 100%)',
                          fontSize: 9, fontWeight: 600, color: 'rgba(255,255,255,.8)',
                          letterSpacing: .3, textTransform: 'uppercase',
                          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                        }}>
                          {img.label}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {portfolioImages.length < 6 && (
                <label style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: 'transparent', border: '1px solid rgba(0,0,0,.15)',
                  color: uploadingPortfolio ? 'rgba(17,17,16,.4)' : '#334ED8',
                  borderRadius: 8, padding: '10px 18px', fontSize: 13, fontWeight: 600,
                  cursor: uploadingPortfolio ? 'not-allowed' : 'pointer',
                }}>
                  <span style={{ fontSize: 16 }}>+</span>
                  {uploadingPortfolio ? 'Uploading...' : `Add Images (${portfolioImages.length}/6)`}
                  <input
                    ref={portfolioInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    style={{ display: 'none' }}
                    disabled={uploadingPortfolio}
                    onChange={e => { if (e.target.files && e.target.files.length > 0) handlePortfolioUpload(e.target.files) }}
                  />
                </label>
              )}

              {portfolioError && (
                <p style={{ color: '#E05A2E', fontSize: 12, marginTop: 8, background: 'rgba(255,113,68,.08)', border: '1px solid rgba(255,113,68,.25)', borderRadius: 8, padding: '8px 12px' }}>
                  {portfolioError}
                </p>
              )}
            </div>

            <div style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,.07)', borderRadius: 16, padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,.04)' }}>
              <label style={labelStyle}>Extra Info</label>
              <textarea value={student!.extra_info || ''} onChange={e => setStudent({ ...student!, extra_info: e.target.value })} rows={2} style={{ ...inputStyle, marginTop: 8, resize: 'vertical' }} />
            </div>

            <button onClick={handleSaveProfile} style={{ background: '#334ED8', color: '#fff', border: 'none', borderRadius: 12, padding: '15px', fontSize: 15, fontWeight: 700, fontFamily: 'Bebas Neue, sans-serif', letterSpacing: 1.5, cursor: 'pointer', boxShadow: '0 4px 18px rgba(51,78,216,.3)', transition: 'transform .15s, box-shadow .15s' }}>
              {saving ? 'Saving...' : saved ? '✓ Saved!' : 'Save Changes'}
            </button>
          </div>
        )}

        {/* BOOKINGS TAB */}
        {tab === 'bookings' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {bookings.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '48px 24px', border: '1px solid rgba(0,0,0,.08)', borderRadius: 16, background: '#FFFFFF', boxShadow: '0 2px 8px rgba(0,0,0,.04)' }}>
                <p style={{ color: 'rgba(17,17,16,.5)', fontSize: 14 }}>No booking requests yet. Once clients book you, they&apos;ll appear here.</p>
              </div>
            ) : bookings.map(b => {
              const cfg = STATUS_CONFIG[b.status] ?? STATUS_CONFIG.pending
              const actions = STATUS_ACTIONS[b.status] ?? []
              const isUpdating = updatingBooking === b.id
              return (
                <div key={b.id} style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,.07)', borderRadius: 16, padding: '20px', opacity: isUpdating ? 0.6 : 1, transition: 'opacity .2s', boxShadow: '0 2px 8px rgba(0,0,0,.04)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                    <div>
                      <p style={{ color: '#111110', fontWeight: 600, fontSize: 15, marginBottom: 2 }}>{b.client_name}</p>
                      <p style={{ color: 'rgba(17,17,16,.45)', fontSize: 11 }}>{b.reference}</p>
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 20, background: cfg.bg, color: cfg.color, whiteSpace: 'nowrap' }}>{cfg.label}</span>
                  </div>
                  {b.description && <p style={{ color: 'rgba(17,17,16,.6)', fontSize: 13, marginBottom: 10, lineHeight: 1.5 }}>{b.description}</p>}
                  <div style={{ display: 'flex', gap: 16, marginBottom: 14, flexWrap: 'wrap' }}>
                    <a href={`https://wa.me/${b.client_whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" style={{ fontSize: 12, color: '#3CB97D', fontWeight: 600, textDecoration: 'none' }}>WhatsApp {b.client_whatsapp}</a>
                    <a href={`mailto:${b.client_email}`} style={{ fontSize: 12, color: 'rgba(17,17,16,.5)', textDecoration: 'none' }}>{b.client_email}</a>
                  </div>
                  {actions.length > 0 && (
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {actions.map(action => (
                        <button key={action.next} onClick={() => handleUpdateBookingStatus(b.id, action.next)} disabled={isUpdating}
                          style={{ background: 'transparent', border: `1px solid ${action.color}`, color: action.color, borderRadius: 8, padding: '7px 14px', fontSize: 12, fontWeight: 600, cursor: isUpdating ? 'not-allowed' : 'pointer' }}>
                          {isUpdating ? '...' : action.label}
                        </button>
                      ))}
                    </div>
                  )}
                  <p style={{ color: 'rgba(17,17,16,.4)', fontSize: 11, marginTop: 12 }}>{new Date(b.created_at).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                </div>
              )
            })}
          </div>
        )}

        {/* VERIFICATION TAB */}
        {tab === 'verification' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ background: student!.verified ? '#E8F8E0' : '#FFF3ED', border: '1px solid ' + (student!.verified ? 'rgba(59,185,125,.25)' : 'rgba(255,113,68,.25)'), borderRadius: 16, padding: '20px 22px', boxShadow: '0 2px 8px rgba(0,0,0,.04)' }}>
              <p style={{ color: student!.verified ? '#1A6040' : '#C04A20', fontWeight: 700, fontSize: 15, marginBottom: 5 }}>{student!.verified ? 'Verified ✓' : 'Not yet verified'}</p>
              <p style={{ color: student!.verified ? 'rgba(26,96,64,.65)' : 'rgba(192,74,32,.7)', fontSize: 13, lineHeight: 1.6 }}>{student!.verified ? 'Your student card has been verified. Your profile is live.' : 'Upload your student card below to get verified. We review within 24 hours.'}</p>
            </div>
            {!student!.verified && (
              <div style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,.07)', borderRadius: 16, padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,.04)' }}>
                <p style={{ color: '#111110', fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Upload Student Card</p>
                <input type="file" accept="image/*,.pdf" onChange={e => setCardFile(e.target.files?.[0] || null)} style={{ color: 'rgba(17,17,16,.6)', fontSize: 13, marginBottom: 16, display: 'block' }} />
                {cardFile && (
                  <button onClick={handleCardUpload} style={{ background: '#334ED8', color: '#fff', border: 'none', borderRadius: 10, padding: '12px 24px', fontSize: 14, fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 16px rgba(51,78,216,.3)' }}>
                    {uploading ? 'Uploading...' : uploadDone ? 'Submitted ✓' : 'Submit for Verification'}
                  </button>
                )}
                {uploadError && <p style={{ color: '#E05A2E', fontSize: 12, marginTop: 8 }}>{uploadError}</p>}
              </div>
            )}
          </div>
        )}

      </div>
      <style>{dblobStyles}</style>
    </main>
  )
}

const dblobStyles = `
  @keyframes dblob1 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(8px,-16px); } }
  @keyframes dblob2 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(6px,-11px); } }
  @keyframes dblob3 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-5px,-10px); } }
  @keyframes dblob4 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(0,-13px); } }
  @keyframes dblob5 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-4px,-8px); } }
  @media (prefers-reduced-motion: reduce) {
    [style*="dblob"] { animation: none !important; }
  }
`

const labelStyle: React.CSSProperties = {
  display: 'block', color: 'rgba(17,17,16,.5)', fontSize: 11, fontWeight: 700,
  letterSpacing: '1px', marginBottom: 6, textTransform: 'uppercase',
}
const inputStyle: React.CSSProperties = {
  width: '100%', background: '#F2F0EA', border: '1px solid rgba(0,0,0,.1)',
  borderRadius: 8, padding: '11px 14px', fontSize: 14, color: '#111110',
  outline: 'none', boxSizing: 'border-box', transition: 'border-color .2s, box-shadow .2s',
}

function Field({ label, value, onChange, disabled }: { label: string; value: string; onChange?: (v: string) => void; disabled?: boolean }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <input value={value || ''} onChange={e => onChange?.(e.target.value)} disabled={disabled}
        style={{ ...inputStyle, opacity: disabled ? .5 : 1, cursor: disabled ? 'not-allowed' : 'text' }} />
    </div>
  )
}

function FormField({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      {hint && <p style={{ color: 'rgba(17,17,16,.45)', fontSize: 11, marginBottom: 8, lineHeight: 1.5 }}>{hint}</p>}
      {children}
    </div>
  )
}