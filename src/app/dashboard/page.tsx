'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

interface Student {
  id: number
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
}

interface Booking {
  id: number
  client_name: string
  client_email: string
  client_whatsapp: string
  description: string
  status: string
  reference: string
  created_at: string
}

interface PricingPackage {
  name: string
  description: string
  price: string
  featured: boolean
}

const UNIVERSITIES = ['UCT', 'Wits', 'AFDA', 'Red & Yellow', 'ICA', 'Stellenbosch', 'UJ', 'CPUT', 'Other']
const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Postgrad']
const SKILLS = ['Photography', 'Graphic Design', 'Videography', 'Makeup Artistry', 'Catering & Baking', 'DJ & Music Production', 'Tutoring', 'Web Development', 'Fashion & Styling', 'Performing Arts', 'Other']
const PRICE_UNITS = ['session', 'hour', 'project', 'event', 'day', 'order', 'package', 'piece', 'block']
const CITIES = ['Cape Town', 'Johannesburg', 'Pretoria', 'Durban', 'Other']
const AVAILABILITY_OPTIONS = ['Weekdays', 'Weekday evenings', 'Saturdays', 'Sundays', 'Flexible']
const SKILL_EMOJIS: Record<string, string> = {
  'Photography': '📸', 'Graphic Design': '🎨', 'Videography': '🎬',
  'Makeup Artistry': '💄', 'Catering & Baking': '🍰', 'DJ & Music Production': '🎵',
  'Tutoring': '📚', 'Web Development': '💻', 'Fashion & Styling': '👗',
  'Performing Arts': '🎭', 'Other': '⭐'
}

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  pending:     { label: 'PENDING',     color: 'var(--orange)', bg: '#f9731622' },
  confirmed:   { label: 'CONFIRMED',   color: '#4ade80',       bg: '#16a34a22' },
  in_progress: { label: 'IN PROGRESS', color: '#60a5fa',       bg: '#2563eb22' },
  completed:   { label: 'COMPLETED',   color: '#4ade80',       bg: '#16a34a22' },
  rejected:    { label: 'REJECTED',    color: 'var(--muted)',  bg: '#94a3b822' },
  unavailable: { label: 'UNAVAILABLE', color: 'var(--muted)',  bg: '#94a3b822' },
}

const STATUS_ACTIONS: Record<string, { label: string; next: string; color: string }[]> = {
  pending: [
    { label: 'Accept',      next: 'confirmed',   color: '#4ade80' },
    { label: 'Unavailable', next: 'unavailable', color: 'var(--muted)' },
    { label: 'Reject',      next: 'rejected',    color: '#ff6b6b' },
  ],
  confirmed:   [{ label: 'Mark In Progress', next: 'in_progress', color: '#60a5fa' }, { label: 'Reject', next: 'rejected', color: '#ff6b6b' }],
  in_progress: [{ label: 'Mark Completed', next: 'completed', color: '#4ade80' }],
  completed: [], rejected: [], unavailable: [],
}

const emptyPackage = (): PricingPackage => ({ name: '', description: '', price: '', featured: false })

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
  const [updatingBooking, setUpdatingBooking] = useState<number | null>(null)

  // Registration form — mirrors Google Form exactly
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
  const [regSaving, setRegSaving] = useState(false)
  const [regStep, setRegStep] = useState(1)

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) { router.push('/login'); return }

      setAuthUserId(session.user.id)
      const email = session.user.email ?? ''
      setAuthEmail(email)

      // Primary lookup: by auth_user_id
      let { data: studentData } = await (supabase as any)
        .from('students').select('*').eq('auth_user_id', session.user.id).single()

      // Fallback: by email (first login after admin approval)
      if (!studentData) {
        const { data: byEmail } = await (supabase as any)
          .from('students').select('*').eq('email', email.toLowerCase()).single()

        if (byEmail) {
          // Link the auth account to the student row
          await (supabase as any)
            .from('students')
            .update({ auth_user_id: session.user.id })
            .eq('id', byEmail.id)
          studentData = { ...byEmail, auth_user_id: session.user.id }
        }
      }

      if (studentData) {
        setStudent(studentData as Student)
        const { data: bookingData } = await (supabase as any)
          .from('bookings').select('*').eq('student_id', studentData.id).order('created_at', { ascending: false })
        setBookings((bookingData as Booking[]) || [])
        setScreen('dashboard')
        return
      }

      const { data: approvedData } = await (supabase as any)
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
    const emoji = SKILL_EMOJIS[skill] || '⭐'

    const { data, error } = await (supabase as any)
      .from('students')
      .insert({
        name: name.trim(), short_name, university, degree: degree.trim(), year, skill,
        secondary_skill: reg.secondary_skill || null,
        bio: bio.trim(), city, starting_price: starting_price.trim(), price_unit,
        whatsapp, student_number, portfolio_links: reg.portfolio_links,
        student_card_link: reg.student_card_link,
        availability: reg.availability, extra_info: reg.extra_info,
        emoji, verified: false, auth_user_id: authUserId, email: authEmail,
        rating: 0, review_count: 0,
      })
      .select().single()

    if (error) {
      setRegError('Something went wrong. Please try again or contact hello@skillza.co.za')
      setRegSaving(false); return
    }

    // Insert pricing packages
    const packages = [
      { ...pkg1, student_id: data.id, sort_order: 1, featured: false, unit: price_unit },
      { ...pkg2, student_id: data.id, sort_order: 2, featured: true, unit: price_unit },
      ...(reg.pkg3.name ? [{ ...reg.pkg3, student_id: data.id, sort_order: 3, featured: false, unit: price_unit }] : []),
    ]
    await (supabase as any).from('student_pricing').insert(packages)

    setStudent(data as Student)
    setScreen('dashboard')
    setRegSaving(false)
  }

  const handleSaveProfile = async () => {
    if (!student) return
    setSaving(true)
    await (supabase as any).from('students').update({
      bio: student.bio, city: student.city, starting_price: student.starting_price,
      price_unit: student.price_unit, whatsapp: student.whatsapp,
      portfolio_links: student.portfolio_links, extra_info: student.extra_info,
    }).eq('id', student.id)
    setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 2500)
  }

  const handleUpdateBookingStatus = async (bookingId: number, newStatus: string) => {
    if (!student) return
    setUpdatingBooking(bookingId)
    try {
      const res = await fetch('/api/booking/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId, status: newStatus, studentId: student.id }),
      })
      if (res.ok) setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: newStatus } : b))
    } catch (err) { console.error(err) }
    setUpdatingBooking(null)
  }

  const handleCardUpload = async () => {
    if (!cardFile || !student) return
    setUploading(true)
    const ext = cardFile.name.split('.').pop()
    const path = 'student-cards/' + student.id + '.' + ext
    const { data, error } = await supabase.storage.from('verification').upload(path, cardFile, { upsert: true })
    if (!error && data) {
      const { data: urlData } = supabase.storage.from('verification').getPublicUrl(path)
      await (supabase as any).from('verification_requests').upsert({ student_id: student.id, card_image_url: urlData.publicUrl, status: 'pending', submitted_at: new Date().toISOString() }, { onConflict: 'student_id' })
      setUploadDone(true)
    }
    setUploading(false)
  }

  const handleSignOut = async () => { await supabase.auth.signOut(); router.push('/') }
  const pendingCount = bookings.filter(b => b.status === 'pending').length

  const tabStyle = (t: string): React.CSSProperties => ({
    padding: '10px 20px', borderRadius: 8, border: 'none', cursor: 'pointer',
    fontFamily: 'Bebas Neue, sans-serif', letterSpacing: 1, fontSize: 15,
    background: tab === t ? 'var(--orange)' : 'transparent',
    color: tab === t ? '#fff' : 'var(--muted)', transition: 'all .2s',
  })

  // ── SCREENS ──────────────────────────────────────────

  if (screen === 'loading') return (
    <main style={{ minHeight: '100vh', background: 'var(--black)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: 'var(--muted)', fontFamily: 'Bebas Neue, sans-serif', fontSize: 20, letterSpacing: 2 }}>Loading...</p>
    </main>
  )

  if (screen === 'not-approved') return (
    <main style={{ minHeight: '100vh', background: 'var(--black)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ textAlign: 'center', maxWidth: 420 }}>
        <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 32, letterSpacing: 2, color: 'var(--cream)', marginBottom: 8 }}>Not on the list yet</div>
        <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.8, marginBottom: 32 }}>
          <span style={{ color: 'var(--cream)' }}>{authEmail}</span> has not been approved yet. Reach out and we will get you set up.
        </p>
        <a href="mailto:hello@skillza.co.za?subject=Student profile request" style={{ display: 'inline-block', background: 'var(--orange)', color: '#fff', borderRadius: 10, padding: '13px 28px', fontSize: 15, fontWeight: 700, fontFamily: 'Bebas Neue, sans-serif', letterSpacing: 1.5, textDecoration: 'none' }}>
          Contact hello@skillza.co.za
        </a>
        <br />
        <button onClick={handleSignOut} style={{ background: 'transparent', border: 'none', color: 'var(--muted)', fontSize: 12, cursor: 'pointer', textDecoration: 'underline', marginTop: 16 }}>Sign out</button>
      </div>
    </main>
  )

  // ── REGISTRATION FORM ─────────────────────────────────
  if (screen === 'register') {
    const stepTitles = ['About You', 'Your Skill', 'Packages & Portfolio', 'Final Details']
    return (
      <main style={{ minHeight: '100vh', background: 'var(--black)', padding: '60px 24px 80px' }}>
        <div style={{ maxWidth: 580, margin: '0 auto' }}>

          {/* Header */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 32, letterSpacing: 2, color: 'var(--cream)', marginBottom: 4 }}>Create your profile</div>
            <p style={{ color: 'var(--muted)', fontSize: 13, lineHeight: 1.6 }}>Signed in as <span style={{ color: 'var(--cream)' }}>{authEmail}</span></p>
          </div>

          {/* Step indicator */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 32 }}>
            {stepTitles.map((title, i) => (
              <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i + 1 <= regStep ? 'var(--orange)' : 'var(--border)', transition: 'background .3s' }} />
            ))}
          </div>
          <p style={{ color: 'var(--muted)', fontSize: 12, marginBottom: 24, textTransform: 'uppercase', letterSpacing: 1 }}>Step {regStep} of 4 — {stepTitles[regStep - 1]}</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

            {/* STEP 1 — About You */}
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

            {/* STEP 2 — Your Skill */}
            {regStep === 2 && <>
              <FormField label="Primary Skill *" hint="The main service you want to offer on Skillza">
                <select value={reg.skill} onChange={e => setReg(r => ({ ...r, skill: e.target.value }))} style={inputStyle}>
                  <option value="">Select...</option>
                  {SKILLS.map(s => <option key={s}>{s}</option>)}
                </select>
              </FormField>
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
                      background: reg.availability.includes(opt) ? 'var(--orange)' : 'transparent',
                      color: reg.availability.includes(opt) ? '#fff' : 'var(--muted)',
                      border: `1px solid ${reg.availability.includes(opt) ? 'var(--orange)' : 'var(--border)'}`,
                    }}>{opt}</button>
                  ))}
                </div>
              </FormField>
            </>}

            {/* STEP 3 — Packages & Portfolio */}
            {regStep === 3 && <>
              <div style={{ background: 'rgba(255,74,28,.06)', border: '1px solid rgba(255,74,28,.15)', borderRadius: 10, padding: '12px 16px', marginBottom: 4 }}>
                <p style={{ fontSize: 13, color: 'rgba(245,239,227,.7)', lineHeight: 1.6 }}>
                  Set your pricing packages. These appear on your public profile. Package 2 is marked as "Popular".
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
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, background: isFeatured ? 'rgba(255,74,28,.04)' : 'transparent', border: isFeatured ? '1px solid rgba(255,74,28,.15)' : '1px solid var(--border)', borderRadius: 10, padding: 14 }}>
                    <input
                      value={(reg[key] as PricingPackage).name}
                      onChange={e => setReg(r => ({ ...r, [key]: { ...(r[key] as PricingPackage), name: e.target.value } }))}
                      placeholder="Package name e.g. Basic / Standard / Premium"
                      style={inputStyle}
                    />
                    <input
                      value={(reg[key] as PricingPackage).description}
                      onChange={e => setReg(r => ({ ...r, [key]: { ...(r[key] as PricingPackage), description: e.target.value } }))}
                      placeholder="Description e.g. 2-hr shoot, 30 edited photos"
                      style={inputStyle}
                    />
                    <input
                      value={(reg[key] as PricingPackage).price}
                      onChange={e => setReg(r => ({ ...r, [key]: { ...(r[key] as PricingPackage), price: e.target.value } }))}
                      placeholder="Price e.g. R550"
                      style={inputStyle}
                    />
                  </div>
                </FormField>
              ))}
              <FormField label="Portfolio Links *" hint="Instagram, Behance, Google Drive, website — one per line">
                <textarea value={reg.portfolio_links} onChange={e => setReg(r => ({ ...r, portfolio_links: e.target.value }))} rows={4} placeholder={'https://instagram.com/yourhandle\nhttps://behance.net/yourprofile'} style={{ ...inputStyle, resize: 'vertical' }} />
              </FormField>
            </>}

            {/* STEP 4 — Final Details */}
            {regStep === 4 && <>
              <FormField label="Student Card — Google Drive Link" hint="Upload to Drive, make viewable by anyone with the link, paste here. Required before your profile goes live.">
                <input value={reg.student_card_link} onChange={e => setReg(r => ({ ...r, student_card_link: e.target.value }))} placeholder="https://drive.google.com/..." style={inputStyle} />
              </FormField>
              <FormField label="Anything else we should know?" hint="Equipment you own, languages you work in, areas you cover, special skills">
                <textarea value={reg.extra_info} onChange={e => setReg(r => ({ ...r, extra_info: e.target.value }))} rows={3} placeholder="e.g. I own a Sony A7III, I shoot in Cape Town and surrounds, I speak isiXhosa and English" style={{ ...inputStyle, resize: 'vertical' }} />
              </FormField>
              <div style={{ background: 'rgba(255,255,255,.03)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px' }}>
                <label style={{ display: 'flex', gap: 12, alignItems: 'flex-start', cursor: 'pointer' }}>
                  <input type="checkbox" checked={reg.agreed} onChange={e => setReg(r => ({ ...r, agreed: e.target.checked }))} style={{ marginTop: 2, accentColor: 'var(--orange)', width: 16, height: 16, flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: 'rgba(245,239,227,.7)', lineHeight: 1.6 }}>
                    I have read and agree to Skillza's{' '}
                    <a href="/privacy" target="_blank" style={{ color: 'var(--orange)' }}>Privacy Policy</a> and{' '}
                    <a href="/terms" target="_blank" style={{ color: 'var(--orange)' }}>Terms of Service</a>.
                    I consent to Skillza collecting and storing my personal information for the purpose of creating my student profile. *
                  </span>
                </label>
              </div>
            </>}

            {/* Error */}
            {regError && (
              <p style={{ color: '#ff6b6b', fontSize: 13, background: 'rgba(255,107,107,.08)', border: '1px solid rgba(255,107,107,.2)', borderRadius: 8, padding: '10px 14px' }}>{regError}</p>
            )}

            {/* Navigation */}
            <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
              {regStep > 1 && (
                <button onClick={() => { setRegStep(s => s - 1); setRegError('') }} style={{ flex: 1, background: 'transparent', border: '1px solid var(--border)', color: 'var(--muted)', borderRadius: 10, padding: '14px', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
                  ← Back
                </button>
              )}
              {regStep < 4 ? (
                <button onClick={() => { setRegError(''); setRegStep(s => s + 1) }} style={{ flex: 2, background: 'var(--orange)', color: '#fff', border: 'none', borderRadius: 10, padding: '14px', fontSize: 15, fontWeight: 700, fontFamily: 'Bebas Neue, sans-serif', letterSpacing: 1.5, cursor: 'pointer' }}>
                  Next →
                </button>
              ) : (
                <button onClick={handleRegister} disabled={regSaving} style={{ flex: 2, background: 'var(--orange)', color: '#fff', border: 'none', borderRadius: 10, padding: '14px', fontSize: 15, fontWeight: 700, fontFamily: 'Bebas Neue, sans-serif', letterSpacing: 1.5, cursor: regSaving ? 'not-allowed' : 'pointer', opacity: regSaving ? .7 : 1 }}>
                  {regSaving ? 'Creating profile...' : 'Submit Profile →'}
                </button>
              )}
            </div>

            <p style={{ color: 'var(--muted)', fontSize: 12, textAlign: 'center', lineHeight: 1.6 }}>
              Your profile won't go live until your Student Card is verified. We review within 24 hours.
            </p>
            <button onClick={handleSignOut} style={{ background: 'transparent', border: 'none', color: 'var(--muted)', fontSize: 12, cursor: 'pointer', textDecoration: 'underline', textAlign: 'center' }}>Sign out</button>
          </div>
        </div>
      </main>
    )
  }

  // ── DASHBOARD ─────────────────────────────────────────
  return (
    <main style={{ minHeight: '100vh', background: 'var(--black)', padding: '80px 24px 48px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
          <div>
            <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 28, letterSpacing: 2, color: 'var(--cream)' }}>Hey, {student!.short_name} 👋</div>
            <p style={{ color: 'var(--muted)', fontSize: 13, marginTop: 2 }}>{student!.university} · {student!.skill}</p>
          </div>
          <button onClick={handleSignOut} style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--muted)', borderRadius: 8, padding: '8px 16px', fontSize: 12, cursor: 'pointer' }}>Sign out</button>
        </div>

        <div style={{ display: 'flex', gap: 4, marginBottom: 32, background: 'var(--surface)', padding: 4, borderRadius: 10, border: '1px solid var(--border)' }}>
          <button style={tabStyle('profile')} onClick={() => setTab('profile')}>Profile</button>
          <button style={tabStyle('bookings')} onClick={() => setTab('bookings')}>
            Bookings ({bookings.length}){pendingCount > 0 && <span style={{ marginLeft: 6, background: 'var(--orange)', color: '#fff', borderRadius: 100, fontSize: 10, padding: '1px 6px', fontFamily: 'sans-serif' }}>{pendingCount}</span>}
          </button>
          <button style={tabStyle('verification')} onClick={() => setTab('verification')}>Verification</button>
        </div>

        {/* PROFILE TAB */}
        {tab === 'profile' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <Field label="Name" value={student!.name} disabled />
            <Field label="University" value={student!.university} disabled />
            <Field label="Degree" value={student!.degree} disabled />
            <Field label="Year" value={student!.year} disabled />
            <Field label="Skill" value={student!.skill} disabled />
            <Field label="WhatsApp" value={student!.whatsapp || ''} onChange={v => setStudent({ ...student!, whatsapp: v })} />
            <div>
              <label style={labelStyle}>Bio</label>
              <textarea value={student!.bio} onChange={e => setStudent({ ...student!, bio: e.target.value })} rows={4} style={{ ...inputStyle, resize: 'vertical' }} />
            </div>
            <Field label="City" value={student!.city} onChange={v => setStudent({ ...student!, city: v })} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <Field label="Starting Price (R)" value={student!.starting_price} onChange={v => setStudent({ ...student!, starting_price: v })} />
              <Field label="Price Unit" value={student!.price_unit} onChange={v => setStudent({ ...student!, price_unit: v })} />
            </div>
            <div>
              <label style={labelStyle}>Portfolio Links</label>
              <textarea value={student!.portfolio_links || ''} onChange={e => setStudent({ ...student!, portfolio_links: e.target.value })} rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
            </div>
            <div>
              <label style={labelStyle}>Extra Info</label>
              <textarea value={student!.extra_info || ''} onChange={e => setStudent({ ...student!, extra_info: e.target.value })} rows={2} style={{ ...inputStyle, resize: 'vertical' }} />
            </div>
            <button onClick={handleSaveProfile} style={{ background: 'var(--orange)', color: '#fff', border: 'none', borderRadius: 10, padding: '14px', fontSize: 15, fontWeight: 600, fontFamily: 'Bebas Neue, sans-serif', letterSpacing: 1.5, cursor: 'pointer', marginTop: 4 }}>
              {saving ? 'Saving...' : saved ? '✓ Saved' : 'Save Changes'}
            </button>
          </div>
        )}

        {/* BOOKINGS TAB */}
        {tab === 'bookings' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {bookings.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '48px 24px', border: '1px solid var(--border)', borderRadius: 12 }}>
                <p style={{ color: 'var(--muted)', fontSize: 14 }}>No booking requests yet. Once clients book you, they'll appear here.</p>
              </div>
            ) : bookings.map(b => {
              const cfg = STATUS_CONFIG[b.status] ?? STATUS_CONFIG.pending
              const actions = STATUS_ACTIONS[b.status] ?? []
              const isUpdating = updatingBooking === b.id
              return (
                <div key={b.id} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px', opacity: isUpdating ? 0.6 : 1, transition: 'opacity .2s' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                    <div>
                      <p style={{ color: 'var(--cream)', fontWeight: 600, fontSize: 15, marginBottom: 2 }}>{b.client_name}</p>
                      <p style={{ color: 'var(--muted)', fontSize: 11 }}>{b.reference}</p>
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 20, background: cfg.bg, color: cfg.color, whiteSpace: 'nowrap' }}>{cfg.label}</span>
                  </div>
                  {b.description && <p style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 10, lineHeight: 1.5 }}>{b.description}</p>}
                  <div style={{ display: 'flex', gap: 16, marginBottom: 14, flexWrap: 'wrap' }}>
                    <a href={`https://wa.me/${b.client_whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" style={{ fontSize: 12, color: '#4ade80', textDecoration: 'none' }}>💬 WhatsApp {b.client_whatsapp}</a>
                    <a href={`mailto:${b.client_email}`} style={{ fontSize: 12, color: 'var(--muted)', textDecoration: 'none' }}>✉ {b.client_email}</a>
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
                  <p style={{ color: 'var(--muted)', fontSize: 11, marginTop: 12 }}>{new Date(b.created_at).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                </div>
              )
            })}
          </div>
        )}

        {/* VERIFICATION TAB */}
        {tab === 'verification' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ background: student!.verified ? '#16a34a22' : '#f9731622', border: '1px solid ' + (student!.verified ? '#4ade8044' : '#f9731644'), borderRadius: 12, padding: '20px' }}>
              <p style={{ color: student!.verified ? '#4ade80' : 'var(--orange)', fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{student!.verified ? 'Verified ✓' : 'Not yet verified'}</p>
              <p style={{ color: 'var(--muted)', fontSize: 13, lineHeight: 1.6 }}>{student!.verified ? 'Your student card has been verified. Your profile is live.' : 'Upload your student card below to get verified. We review within 24 hours.'}</p>
            </div>
            {!student!.verified && (
              <div style={{ border: '1px solid var(--border)', borderRadius: 12, padding: '24px' }}>
                <p style={{ color: 'var(--cream)', fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Upload Student Card</p>
                <input type="file" accept="image/*,.pdf" onChange={e => setCardFile(e.target.files?.[0] || null)} style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 16, display: 'block' }} />
                {cardFile && (
                  <button onClick={handleCardUpload} style={{ background: 'var(--orange)', color: '#fff', border: 'none', borderRadius: 10, padding: '12px 24px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                    {uploading ? 'Uploading...' : uploadDone ? 'Submitted ✓' : 'Submit for Verification'}
                  </button>
                )}
              </div>
            )}
          </div>
        )}

      </div>
    </main>
  )
}

const labelStyle: React.CSSProperties = {
  display: 'block', color: 'var(--muted)', fontSize: 12, fontWeight: 600,
  letterSpacing: '.5px', marginBottom: 6, textTransform: 'uppercase',
}
const inputStyle: React.CSSProperties = {
  width: '100%', background: 'var(--surface)', border: '1px solid var(--border)',
  borderRadius: 8, padding: '11px 14px', fontSize: 14, color: 'var(--cream)',
  outline: 'none', boxSizing: 'border-box',
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
      {hint && <p style={{ color: 'var(--muted)', fontSize: 11, marginBottom: 8, lineHeight: 1.5 }}>{hint}</p>}
      {children}
    </div>
  )
}
