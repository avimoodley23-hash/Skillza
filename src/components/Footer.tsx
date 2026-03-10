'use client'
import Link from 'next/link'

export function Footer() {
  return (
    <footer style={{
      padding: '64px 24px 40px',
      background: 'var(--glacier)',
      borderTop: '1px solid rgba(17,17,17,.08)',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Subtle decorative orb — Electric Blue, very faint */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: -120, right: -60,
        width: 400, height: 400,
        background: 'radial-gradient(ellipse at center, rgba(51,78,216,.1) 0%, transparent 65%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />

      {/* Brand mark */}
      <div style={{ textAlign: 'center', marginBottom: 8, position: 'relative', zIndex: 1 }}>
        <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 40, letterSpacing: 5, display: 'inline-block' }}>
          <span style={{ color: 'var(--orange)' }}>S</span>
          <span style={{ color: '#111111' }}>KI</span>
          <span style={{ color: 'var(--lavender-2)' }}>L</span>
          <span style={{ color: 'var(--sunset)' }}>L</span>
          <span style={{ color: '#111111' }}>Z</span>
          <span style={{ color: 'var(--orange)' }}>A</span>
        </div>
        <p style={{ fontSize: 13, color: 'rgba(17,17,17,.55)', marginTop: 8, fontWeight: 500 }}>
          Where SA students get paid to do what they love.
        </p>
      </div>

      {/* Color accent bar */}
      <div style={{ display: 'flex', height: 3, borderRadius: 3, overflow: 'hidden', maxWidth: 220, margin: '20px auto 32px' }}>
        <div style={{ flex: 1, background: 'var(--orange)' }} />
        <div style={{ flex: 1, background: 'var(--lavender)' }} />
        <div style={{ flex: 1, background: 'var(--sunset)' }} />
        <div style={{ flex: 1, background: 'var(--citrus)' }} />
        <div style={{ flex: 1, background: 'var(--mint)' }} />
      </div>

      {/* Links */}
      <div style={{ display: 'flex', gap: 18, justifyContent: 'center', alignItems: 'center', marginBottom: 28, flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
        {[
          { href: '/privacy', label: 'Privacy Policy' },
          { href: '/terms',   label: 'Terms of Service' },
        ].map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            style={{ fontSize: 13, fontWeight: 600, color: 'rgba(17,17,17,.55)', transition: 'color .2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--orange)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(17,17,17,.55)')}
          >{label}</Link>
        ))}
        <span style={{ color: 'rgba(17,17,17,.2)' }}>·</span>
        <a
          href="mailto:hello@skillza.co.za"
          style={{ fontSize: 13, fontWeight: 600, color: 'var(--orange)', transition: 'opacity .2s' }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '.7')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >hello@skillza.co.za</a>
      </div>

      {/* Legal */}
      <p style={{ fontSize: 11.5, color: 'rgba(17,17,17,.42)', maxWidth: 560, margin: '0 auto 10px', lineHeight: 1.7, textAlign: 'center', position: 'relative', zIndex: 1 }}>
        Skillza is a marketplace platform. We verify student enrolment but do not supervise bookings or guarantee outcomes. Use good judgment when meeting in person.
      </p>
      <p style={{ fontSize: 11, color: 'rgba(17,17,17,.35)', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        © 2026 Skillza. Built for SA students. POPIA compliant.
      </p>
    </footer>
  )
}

export default Footer

