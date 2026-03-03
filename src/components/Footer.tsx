'use client'
import Link from 'next/link'

export function Footer() {
  return (
    <footer style={{ padding: '48px 24px', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
      <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 28, letterSpacing: 3, marginBottom: 8 }}>
        SKILL<span style={{ color: 'var(--orange)' }}>ZA</span>
      </div>
      <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 20 }}>Where SA students get paid to do what they love.</p>
      <div style={{ display: 'flex', gap: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap' }}>
        <Link href="/privacy" style={{ fontSize: 12, color: 'var(--muted)', transition: 'color .2s' }} onMouseEnter={e => (e.currentTarget.style.color = 'var(--cream)')} onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}>Privacy Policy</Link>
        <span style={{ color: 'var(--border-2)' }}>·</span>
        <Link href="/terms" style={{ fontSize: 12, color: 'var(--muted)', transition: 'color .2s' }} onMouseEnter={e => (e.currentTarget.style.color = 'var(--cream)')} onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}>Terms of Service</Link>
        <span style={{ color: 'var(--border-2)' }}>·</span>
        <a href="mailto:hello@skillza.co.za" style={{ fontSize: 12, color: 'var(--muted)', transition: 'color .2s' }} onMouseEnter={e => (e.currentTarget.style.color = 'var(--cream)')} onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}>hello@skillza.co.za</a>
      </div>
      <p style={{ fontSize: 11, color: 'var(--muted)', maxWidth: 560, margin: '0 auto 8px', lineHeight: 1.6 }}>
        Skillza is a marketplace platform. We verify student enrolment but do not supervise bookings or guarantee outcomes. Use good judgment when meeting in person.
      </p>
      <p style={{ fontSize: 11, color: 'var(--muted)' }}>© 2026 Skillza. Built for SA students. POPIA compliant.</p>
    </footer>
  )
}

export default Footer
