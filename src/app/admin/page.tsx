'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

const ADMIN_EMAILS = (process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? 'avi.moodley23@gmail.com,gareth.rasmussen@icloud.com')
  .split(',').map(e => e.trim()).filter(Boolean)

interface AdminData {
  students: any[]
  bookings: any[]
  waitlist: any[]
  pendingVerifications: any[]
}

export default function AdminPage() {
  const router = useRouter()
  const [data, setData] = useState<AdminData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) { router.push('/login'); return }
      if (!ADMIN_EMAILS.includes(session.user.email || '')) {
  router.push('/')
  return
}

      const res = await fetch('/api/admin/data', {
  headers: {
    Authorization: `Bearer ${session.access_token}`,
  },
})
      if (!res.ok) { setError('Failed to load admin data'); setLoading(false); return }
      const json = await res.json()
      setData(json)
      setLoading(false)
    }
    init()
  }, [])

  const handleApprove = async (w: any) => {
    setActionLoading(w.id)
    const res = await fetch('/api/waitlist/approve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: w.id, name: w.name, email: w.email, university: w.university, year: w.year, skill: w.skill }),
    })
    if (res.ok) {
      setData(prev => prev ? {
        ...prev,
        waitlist: prev.waitlist.map(item => item.id === w.id ? { ...item, status: 'approved' } : item)
      } : prev)
    }
    setActionLoading(null)
  }

  const handleReject = async (w: any) => {
    setActionLoading(w.id + '_reject')
    const res = await fetch('/api/waitlist/reject', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: w.id }),
    })
    if (res.ok) {
      setData(prev => prev ? {
        ...prev,
        waitlist: prev.waitlist.map(item => item.id === w.id ? { ...item, status: 'rejected' } : item)
      } : prev)
    }
    setActionLoading(null)
  }

  const handleVerifyApprove = async (v: any) => {
    setActionLoading(v.id + '_vapprove')
    const res = await fetch('/api/admin/verify', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: v.id, action: 'approve' }),
    })
    if (res.ok) {
      setData(prev => prev ? {
        ...prev,
        pendingVerifications: prev.pendingVerifications.filter(item => item.id !== v.id)
      } : prev)
    }
    setActionLoading(null)
  }

  const handleVerifyReject = async (v: any) => {
    setActionLoading(v.id + '_vreject')
    const res = await fetch('/api/admin/verify', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: v.id, action: 'reject' }),
    })
    if (res.ok) {
      setData(prev => prev ? {
        ...prev,
        pendingVerifications: prev.pendingVerifications.filter(item => item.id !== v.id)
      } : prev)
    }
    setActionLoading(null)
  }

  if (loading) return (
    <main style={{ minHeight: '100svh', background: 'var(--black)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: 'var(--muted)', fontFamily: 'Bebas Neue, sans-serif', fontSize: 20, letterSpacing: 2 }}>Loading...</p>
    </main>
  )

  if (error) return (
    <main style={{ minHeight: '100svh', background: 'var(--black)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: '#ff6b6b', fontSize: 14 }}>{error}</p>
    </main>
  )

  if (!data) return null

  const { students, bookings, waitlist, pendingVerifications } = data
  const verified = students.filter((s: any) => s.verified)
  const pendingBookings = bookings.filter((b: any) => b.status === 'pending')
  const pendingWaitlist = waitlist.filter((w: any) => !w.status || w.status === 'pending')

  return (
    <main style={{ minHeight: '100svh', background: 'var(--black)', padding: '40px 24px', fontFamily: 'Instrument Sans, sans-serif', color: 'var(--cream)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 32, letterSpacing: 2, marginBottom: 8 }}>
          SKILL<span style={{ color: 'var(--orange)' }}>ZA</span> ADMIN
        </div>
        <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 40 }}>Internal dashboard</p>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12, marginBottom: 40 }}>
          {[
            { label: 'Active Students',      value: verified.length,              color: 'var(--green)'  },
            { label: 'Pending Verification', value: pendingVerifications.length,  color: 'var(--orange)' },
            { label: 'New Bookings',         value: pendingBookings.length,       color: '#60a5fa'       },
            { label: 'Waitlist',             value: pendingWaitlist.length,       color: 'var(--gold)'   },
            { label: 'Total Bookings',       value: bookings.length,              color: 'var(--cream)'  },
          ].map(stat => (
            <div key={stat.label} style={{ background: 'var(--black-2)', border: '1px solid var(--border)', borderRadius: 12, padding: '18px 20px' }}>
              <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 36, color: stat.color, lineHeight: 1 }}>{stat.value}</div>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Pending Verifications */}
        {pendingVerifications.length > 0 && (
          <AdminSection title="Pending Verifications" count={pendingVerifications.length} accent="var(--orange)">
            {pendingVerifications.map((v: any) => {
              const isLoadingApprove = actionLoading === v.id + '_vapprove'
              const isLoadingReject = actionLoading === v.id + '_vreject'
              return (
                <Row key={v.id}>
                  <Cell><strong>{v.students?.name}</strong></Cell>
                  <Cell style={{ color: 'var(--muted)', fontSize: 12 }}>{v.students?.university}</Cell>
                  <Cell><a href={v.card_image_url} target="_blank" rel="noreferrer" style={{ color: 'var(--orange)', fontSize: 12, textDecoration: 'underline' }}>View Card</a></Cell>
                  <Cell style={{ fontSize: 11, color: 'var(--muted)' }}>{new Date(v.submitted_at).toLocaleDateString('en-ZA')}</Cell>
                  <Cell>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button
                        onClick={() => handleVerifyApprove(v)}
                        disabled={!!actionLoading}
                        style={{ fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 6, border: 'none', background: '#16a34a', color: '#fff', cursor: 'pointer', opacity: isLoadingApprove ? 0.6 : 1 }}>
                        {isLoadingApprove ? '...' : '✓ Approve'}
                      </button>
                      <button
                        onClick={() => handleVerifyReject(v)}
                        disabled={!!actionLoading}
                        style={{ fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 6, border: 'none', background: '#7f1d1d44', color: '#f87171', cursor: 'pointer', opacity: isLoadingReject ? 0.6 : 1 }}>
                        {isLoadingReject ? '...' : '✗ Reject'}
                      </button>
                    </div>
                  </Cell>
                </Row>
              )
            })}
          </AdminSection>
        )}

        {/* Bookings */}
        <AdminSection title="Recent Bookings" count={bookings.length} accent="#60a5fa">
          {bookings.length === 0 && <EmptyRow text="No bookings yet" />}
          {bookings.map((b: any) => (
            <Row key={b.id}>
              <Cell><strong>{b.client_name}</strong></Cell>
              <Cell style={{ color: 'var(--muted)', fontSize: 12 }}>{b.students?.name ?? '—'}</Cell>
              <Cell style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--orange)', fontSize: 13 }}>{b.reference}</Cell>
              <Cell style={{ color: 'var(--muted)', fontSize: 12 }}>{b.client_whatsapp}</Cell>
              <Cell>
                <span style={{
                  fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 20,
                  background: b.status === 'completed' ? '#16a34a22' : b.status === 'in_progress' ? '#2563eb22' : b.status === 'confirmed' ? '#16a34a22' : b.status === 'pending' ? '#f9731622' : '#94a3b822',
                  color: b.status === 'completed' || b.status === 'confirmed' ? '#4ade80' : b.status === 'in_progress' ? '#60a5fa' : b.status === 'pending' ? 'var(--orange)' : 'var(--muted)'
                }}>
                  {b.status?.toUpperCase().replace('_', ' ')}
                </span>
              </Cell>
              <Cell style={{ fontSize: 11, color: 'var(--muted)' }}>{new Date(b.created_at).toLocaleDateString('en-ZA')}</Cell>
            </Row>
          ))}
        </AdminSection>

        {/* Students */}
        <AdminSection title="All Students" count={students.length} accent="var(--green)">
          {students.length === 0 && <EmptyRow text="No students yet" />}
          {students.map((s: any) => (
            <Row key={s.id}>
              <Cell><strong>{s.name}</strong></Cell>
              <Cell style={{ color: 'var(--muted)', fontSize: 12 }}>{s.university}</Cell>
              <Cell style={{ color: 'var(--muted)', fontSize: 12 }}>{s.skill}</Cell>
              <Cell style={{ color: 'var(--muted)', fontSize: 12 }}>{s.email}</Cell>
              <Cell>
                <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 20, background: s.verified ? '#16a34a22' : '#f9731622', color: s.verified ? '#4ade80' : 'var(--orange)' }}>
                  {s.verified ? 'VERIFIED' : 'PENDING'}
                </span>
              </Cell>
            </Row>
          ))}
        </AdminSection>

        {/* Waitlist */}
        <AdminSection title="Waitlist" count={waitlist.length} accent="var(--gold)">
          {waitlist.length === 0 && <EmptyRow text="No waitlist signups yet" />}
          {waitlist.map((w: any) => {
            const isPending = !w.status || w.status === 'pending'
            const isApproved = w.status === 'approved'
            const isRejected = w.status === 'rejected'
            const isLoadingApprove = actionLoading === w.id
            const isLoadingReject = actionLoading === w.id + '_reject'

            return (
              <Row key={w.id}>
                <Cell><strong>{w.name}</strong></Cell>
                <Cell style={{ color: 'var(--muted)', fontSize: 12 }}>{w.email}</Cell>
                <Cell>{w.university}{w.year ? ` · ${w.year}` : ''}</Cell>
                <Cell style={{ color: 'var(--orange)', fontSize: 12 }}>{w.skill}</Cell>
                <Cell style={{ fontSize: 11, color: 'var(--muted)' }}>{new Date(w.created_at).toLocaleDateString('en-ZA')}</Cell>
                <Cell>
                  {isPending && (
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button
                        onClick={() => handleApprove(w)}
                        disabled={!!actionLoading}
                        style={{ fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 6, border: 'none', background: '#16a34a', color: '#fff', cursor: 'pointer', opacity: isLoadingApprove ? 0.6 : 1 }}>
                        {isLoadingApprove ? '...' : 'Approve'}
                      </button>
                      <button
                        onClick={() => handleReject(w)}
                        disabled={!!actionLoading}
                        style={{ fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 6, border: 'none', background: '#7f1d1d44', color: '#f87171', cursor: 'pointer', opacity: isLoadingReject ? 0.6 : 1 }}>
                        {isLoadingReject ? '...' : 'Reject'}
                      </button>
                    </div>
                  )}
                  {isApproved && (
                    <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 20, background: '#16a34a22', color: '#4ade80' }}>APPROVED</span>
                  )}
                  {isRejected && (
                    <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 20, background: '#7f1d1d44', color: '#f87171' }}>REJECTED</span>
                  )}
                </Cell>
              </Row>
            )
          })}
        </AdminSection>
      </div>
    </main>
  )
}

function AdminSection({ title, count, accent, children }: { title: string; count: number; accent: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 22, letterSpacing: 1 }}>{title}</h2>
        <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 18, color: accent }}>{count}</span>
      </div>
      <div style={{ background: 'var(--black-2)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>{children}</div>
    </div>
  )
}
function Row({ children }: { children: React.ReactNode }) {
  return <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 12, padding: '12px 16px', borderBottom: '1px solid var(--border)', alignItems: 'center' }}>{children}</div>
}
function Cell({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={{ fontSize: 13, ...style }}>{children}</div>
}
function EmptyRow({ text }: { text: string }) {
  return <div style={{ padding: '20px 16px', fontSize: 13, color: 'var(--muted)' }}>{text}</div>
}
