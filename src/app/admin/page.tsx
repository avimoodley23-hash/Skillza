import { supabase } from '@/lib/supabase'
import { redirect } from 'next/navigation'

// Simple admin — in production protect this with middleware + auth
// For now it reads all students including unverified

async function getAdminData() {
  const [studentsRes, bookingsRes, waitlistRes, verifyRes] = await Promise.all([
    supabase.from('students').select('*').order('created_at', { ascending: false }),
    supabase.from('bookings').select('*, students(name, skill)').order('created_at', { ascending: false }).limit(20),
    supabase.from('waitlist').select('*').order('created_at', { ascending: false }),
    supabase.from('verification_requests').select('*, students(name, university)').eq('status', 'pending').order('submitted_at', { ascending: true }),
  ])

  return {
    students: studentsRes.data || [],
    bookings: bookingsRes.data || [],
    waitlist: waitlistRes.data || [],
    pendingVerifications: verifyRes.data || [],
  }
}

export default async function AdminPage() {
  const { students, bookings, waitlist, pendingVerifications } = await getAdminData()

  const verified = students.filter((s: any) => s.verified)
  const unverified = students.filter((s: any) => !s.verified)
  const pendingBookings = bookings.filter((b: any) => b.status === 'pending')

  return (
    <main style={{ minHeight: '100svh', background: 'var(--black)', padding: '40px 24px', fontFamily: 'Instrument Sans, sans-serif', color: 'var(--cream)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 32, letterSpacing: 2, marginBottom: 8 }}>
          SKILL<span style={{ color: 'var(--orange)' }}>ZA</span> ADMIN
        </div>
        <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 40 }}>Internal dashboard — do not share this URL</p>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12, marginBottom: 40 }}>
          {[
            { label: 'Active Students', value: verified.length, color: 'var(--green)' },
            { label: 'Pending Verification', value: pendingVerifications.length, color: 'var(--orange)' },
            { label: 'New Bookings', value: pendingBookings.length, color: 'var(--blue)' },
            { label: 'Waitlist', value: waitlist.length, color: 'var(--gold)' },
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
            {pendingVerifications.map((v: any) => (
              <Row key={v.id}>
                <Cell><strong>{v.students?.name}</strong></Cell>
                <Cell>{v.students?.university}</Cell>
                <Cell>
                  <a href={v.card_image_url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--blue)', fontSize: 12 }}>View Card →</a>
                </Cell>
                <Cell style={{ fontSize: 11, color: 'var(--muted)' }}>{new Date(v.submitted_at).toLocaleDateString('en-ZA')}</Cell>
                <Cell>
                  <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 100, background: 'var(--o-dim)', color: 'var(--orange)', border: '1px solid rgba(255,74,28,.2)' }}>PENDING</span>
                </Cell>
              </Row>
            ))}
            <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 12, padding: '0 16px' }}>
              To approve: go to Supabase → verification_requests → set status to 'approved', then update students → set verified=true and active=true.
            </p>
          </AdminSection>
        )}

        {/* Recent Bookings */}
        <AdminSection title="Recent Bookings" count={bookings.length} accent="var(--blue)">
          {bookings.slice(0, 10).map((b: any) => (
            <Row key={b.id}>
              <Cell><strong>{b.client_name}</strong></Cell>
              <Cell style={{ color: 'var(--muted)', fontSize: 12 }}>{b.students?.name} · {b.students?.skill}</Cell>
              <Cell style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: 1, color: 'var(--orange)' }}>{b.reference}</Cell>
              <Cell>
                <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 100, background: b.status === 'pending' ? 'var(--o-dim)' : 'var(--g-dim)', color: b.status === 'pending' ? 'var(--orange)' : 'var(--green)', border: `1px solid ${b.status === 'pending' ? 'rgba(255,74,28,.2)' : 'rgba(52,213,142,.2)'}` }}>
                  {b.status.toUpperCase()}
                </span>
              </Cell>
              <Cell style={{ fontSize: 11, color: 'var(--muted)' }}>{new Date(b.created_at).toLocaleDateString('en-ZA')}</Cell>
            </Row>
          ))}
        </AdminSection>

        {/* Waitlist */}
        <AdminSection title="Waitlist" count={waitlist.length} accent="var(--gold)">
          {waitlist.slice(0, 20).map((w: any) => (
            <Row key={w.id}>
              <Cell><strong>{w.name}</strong></Cell>
              <Cell style={{ color: 'var(--muted)', fontSize: 12 }}>{w.email}</Cell>
              <Cell>{w.university} · {w.year}</Cell>
              <Cell style={{ color: 'var(--orange)', fontSize: 12 }}>{w.skill}</Cell>
              <Cell style={{ fontSize: 11, color: 'var(--muted)' }}>{new Date(w.created_at).toLocaleDateString('en-ZA')}</Cell>
            </Row>
          ))}
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
      <div style={{ background: 'var(--black-2)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
        {children}
      </div>
    </div>
  )
}

function Row({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 12, padding: '12px 16px', borderBottom: '1px solid var(--border)', alignItems: 'center' }}>
      {children}
    </div>
  )
}

function Cell({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={{ fontSize: 13, ...style }}>{children}</div>
}
