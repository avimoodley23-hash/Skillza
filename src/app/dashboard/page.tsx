'use client'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type Student = {
  id: string
  name: string
  short_name: string
  university: string
  degree: string
  year: string
  skill: string
  bio: string
  city: string
  starting_price: string
  price_unit: string
  verified: boolean
  auth_user_id: string | null
}

type Booking = {
  id: string
  client_name: string
  client_email: string
  client_whatsapp: string
  description: string
  status: string
  created_at: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [tab, setTab] = useState<'profile' | 'bookings' | 'verification'>('profile')
  const [student, setStudent] = useState<Student | null>(null)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [cardFile, setCardFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadDone, setUploadDone] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) { router.push('/login'); return }
      const userId = session.user.id

      const { data: studentData } = await (supabase as any)
        .from('students')
        .select('*')
        .eq('auth_user_id', userId)
        .single()

      if (studentData) {
        setStudent(studentData as Student)
        const { data: bookingData } = await (supabase as any)
          .from('bookings')
          .select('*')
          .eq('student_id', studentData.id)
          .order('created_at', { ascending: false })
        setBookings((bookingData as Booking[]) || [])
      }
      setLoading(false)
    })
  }, [])

  const handleSaveProfile = async () => {
    if (!student) return
    setSaving(true)
    await (supabase as any).from('students').update({
      bio: student.bio,
      city: student.city,
      starting_price: student.starting_price,
      price_unit: student.price_unit,
    }).eq('id', student.id)
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const handleCardUpload = async () => {
    if (!cardFile || !student) return
    setUploading(true)
    const ext = cardFile.name.split('.').pop()
    const path = `student-cards/${student.id}.${ext}`
    const { data, error } = await supabase.storage.from('verification').upload(path, cardFile, { upsert: true })
    if (!error && data) {
      const { data: urlData } = supabase.storage.from('verification').getPublicUrl(path)
      await (supabase as any).from('verification_requests').upsert({
        student_id: student.id,
        card_image_url: urlData.publicUrl,
        status: 'pending',
        submitted_at: new Date().toISOString(),
      }, { onConflict: 'student_id' })
      setUploadDone(true)
    }
    setUploading(false)
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const tabStyle = (t: string): React.CSSProperties => ({
    padding: '10px 20px',
    borderRadius: 8,
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'Bebas Neue, sans-serif',
    letterSpacing: 1,
    fontSize: 15,
    background: tab === t ? 'var(--orange)' : 'transparent',
    color: tab === t ? '#fff' : 'var(--muted)',
    transition: 'all .2s',
  })

  if (loading) return (
    <main style={{ minHeight: '100vh', background: 'var(--black)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: 'var(--muted)', fontFamily: 'Bebas Neue, sans-serif', fontSize: 20, letterSpacing: 2 }}>Loading...</p>
    </main>
  )

  if (!student) return (
    <main style={{ minHeight: '100vh', background: 'var(--black)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ textAlign: 'center', maxWidth: 400 }}>
        <p style={{ color: 'var(--cream)', fontFamily: 'Bebas Neue, sans-serif', fontSize: 24, letterSpacing: 2, marginBottom: 12 }}>No profile found</p>
        <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>Your Google account is not linked to a student profile yet. Contact hello@skillza.co.za to get set up.</p>
        <button onClick={handleSignOut} style={{ background: 'var(--orange)', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 24px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Sign Out</button>
      </div>
    </main>
  )

  return (
    <main style={{ minHeight: '100vh', background: 'var(--black)', padding: '80px 24px 48px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
          <div>
            <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 28, letterSpacing: 2, color: 'var(--cream)' }}>
              Hey, {student.short_name} 👋
            </div>
            <p style={{ color: 'var(--muted)', fontSize: 13, marginTop: 2 }}>{student.university} · {student.skill}</p>
          </div>
          <button onClick={handleSignOut} style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--muted)', borderRadius: 8, padding: '8px 16px', fontSize: 12, cursor: 'pointer' }}>
            Sign out
          </button>
        </div>

        <div style={{ display: 'flex', gap: 4, marginBottom: 32, background: 'var(--surface)', padding: 4, borderRadius: 10, border: '1px solid var(--border)' }}>
          <button style={tabStyle('profile')} onClick={() => setTab('profile')}>Profile</button>
          <button style={tabStyle('bookings')} onClick={() => setTab('bookings')}>Bookings ({bookings.length})</button>
          <button style={tabStyle('verification')} onClick={() => setTab('verification')}>Verification</button>
        </div>

        {tab === 'profile' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <Field label="Name" value={student.name} disabled />
            <Field label="University" value={student.university} disabled />
            <Field label="Degree" value={student.degree} disabled />
            <Field label="Year" value={student.year} disabled />
            <Field label="Skill" value={student.skill} disabled />
            <div>
              <label style={labelStyle}>Bio</label>
              <textarea
                value={student.bio}
                onChange={e => setStudent({ ...student, bio: e.target.value })}
                rows={4}
                style={{ ...inputStyle, resize: 'vertical' }}
              />
            </div>
            <Field label="City" value={student.city} onChange={v => setStudent({ ...student, city: v })} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <Field label="Starting Price (R)" value={student.starting_price} onChange={v => setStudent({ ...student, starting_price: v })} />
              <Field label="Price Unit" value={student.price_unit} onChange={v => setStudent({ ...student, price_unit: v })} />
            </div>
            <button onClick={handleSaveProfile} style={{ background: 'var(--orange)', color: '#fff', border: 'none', borderRadius: 10, padding: '14px', fontSize: 15, fontWeight: 600, fontFamily: 'Bebas Neue, sans-serif', letterSpacing: 1.5, cursor: 'pointer', marginTop: 4 }}>
              {saving ? 'Saving...' : saved ? '✓ Saved' : 'Save Changes'}
            </button>
          </div>
        )}

        {tab === 'bookings' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {bookings.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '48px 24px', border: '1px solid var(--border)', borderRadius: 12 }}>
                <p style={{ color: 'var(--muted)', fontSize: 14 }}>No booking requests yet. Once clients book you, they will appear here.</p>
              </div>
            ) : bookings.map(b => (
              <div key={b.id} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <p style={{ color: 'var(--cream)', fontWeight: 600, fontSize: 15 }}>{b.client_name}</p>
                  <span style={{ fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 20, background: b.status === 'confirmed' ? '#16a34a22' : b.status === 'pending' ? '#f9731622' : '#94a3b822', color: b.status === 'confirmed' ? '#4ade80' : b.status === 'pending' ? 'var(--orange)' : 'var(--muted)' }}>
                    {b.status?.toUpperCase()}
                  </span>
                </div>
                <p style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 8, lineHeight: 1.5 }}>{b.description}</p>
                <p style={{ color: 'var(--muted)', fontSize: 12 }}>📱 {b.client_whatsapp} · {b.client_email}</p>
                <p style={{ color: 'var(--muted)', fontSize: 11, marginTop: 8 }}>{new Date(b.created_at).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
              </div>
            ))}
          </div>
        )}

        {tab === 'verification' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ background: student.verified ? '#16a34a22' : '#f9731622', border: `1px solid ${student.verified ? '#4ade8044' : '#f9731644'}`, borderRadius: 12, padding: '20px' }}>
              <p style={{ color: student.verified ? '#4ade80' : 'var(--orange)', fontWeight: 600, fontSize: 15, marginBottom: 4 }}>
                {student.verified ? '✓ Verified' : '⏳ Not yet verified'}
              </p>
              <p style={{ color: 'var(--muted)', fontSize: 13, lineHeight: 1.6 }}>
                {student.verified ? 'Your student card has been verified. Your profile is live.' : 'Upload your student card below to get verified. We review within 24 hours.'}
              </p>
            </div>
            {!student.verified && (
              <div style={{ border: '1px solid var(--border)', borderRadius: 12, padding: '24px' }}>
                <p style={{ color: 'var(--cream)', fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Upload Student Card</p>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={e => setCardFile(e.target.files?.[0] || null)}
                  style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 16, display: 'block' }}
                />
                {cardFile && (
                  <button onClick={handleCardUpload} style={{ background: 'var(--orange)', color: '#fff', border: 'none', borderRadius: 10, padding: '12px 24px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                    {uploading ? 'Uploading...' : uploadDone ? '✓ Submitted' : 'Submit for Verification'}
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
  letterSpacing: '.5px', marginBottom: 6, textTransform: 'uppercase'
}

const inputStyle: React.CSSProperties = {
  width: '100%', background: 'var(--surface)', border: '1px solid var(--border)',
  borderRadius: 8, padding: '11px 14px', fontSize: 14, color: 'var(--cream)',
  outline: 'none', boxSizing: 'border-box'
}

function Field({ label, value, onChange, disabled }: {
  label: string
  value: string
  onChange?: (v: string) => void
  disabled?: boolean
}) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <input
        value={value || ''}
        onChange={e => onChange?.(e.target.value)}
        disabled={disabled}
        style={{ ...inputStyle, opacity: disabled ? .5 : 1, cursor: disabled ? 'not-allowed' : 'text' }}
      />
    </div>
  )
}