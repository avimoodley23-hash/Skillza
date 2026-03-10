'use client'
import Link from 'next/link'

const NAV_LINKS = [
  { href: '/#find-talent',  label: 'Browse Talent' },
  { href: '/#how-it-works', label: 'How It Works' },
  { href: '/#for-students', label: 'For Students' },
  { href: '/#verify',       label: 'Verification' },
]

const LEGAL_LINKS = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms',   label: 'Terms of Service' },
]

// Social icon SVGs (inline to avoid extra deps)
function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r=".5" fill="currentColor" stroke="none"/>
    </svg>
  )
}

function TikTokIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.78a4.85 4.85 0 0 1-1.01-.09z"/>
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  )
}

export function Footer() {
  return (
    <footer style={{
      padding: '64px 24px 40px',
      background: '#0C0C0C',
      borderTop: '1px solid rgba(255,255,255,.06)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Subtle ambient glow */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: -100, right: -60,
        width: 400, height: 400,
        background: 'radial-gradient(ellipse at center, rgba(51,78,216,.07) 0%, transparent 65%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Top row: brand + nav */}
        <div style={{ display: 'grid', gap: 48, marginBottom: 56 }} className="footer-top-grid">

          {/* Brand */}
          <div>
            <Link href="/" style={{ display: 'inline-block', fontFamily: 'Bebas Neue, sans-serif', fontSize: 32, letterSpacing: 3, marginBottom: 12, textDecoration: 'none' }}>
              <span style={{ color: '#FAFAF8' }}>SKILL</span><span style={{ color: 'var(--orange)' }}>ZA</span>
            </Link>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,.42)', lineHeight: 1.7, maxWidth: 280 }}>
              Where SA students get paid to do what they love.
            </p>

            {/* Social links */}
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              {[
                { href: 'https://instagram.com/skillza.co.za', icon: <InstagramIcon />, label: 'Instagram' },
                { href: 'https://tiktok.com/@skillza',          icon: <TikTokIcon />,    label: 'TikTok' },
                { href: 'https://linkedin.com/company/skillza', icon: <LinkedInIcon />,  label: 'LinkedIn' },
              ].map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: 'rgba(255,255,255,.05)',
                    border: '1px solid rgba(255,255,255,.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(255,255,255,.5)',
                    transition: 'all .2s',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.background = 'rgba(51,78,216,.15)'
                    el.style.borderColor = 'rgba(51,78,216,.4)'
                    el.style.color = 'var(--orange)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.background = 'rgba(255,255,255,.05)'
                    el.style.borderColor = 'rgba(255,255,255,.08)'
                    el.style.color = 'rgba(255,255,255,.5)'
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,.28)', marginBottom: 16 }}>Platform</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {NAV_LINKS.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,.48)', transition: 'color .2s', textDecoration: 'none' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#FAFAF8')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,.48)')}
                  >{label}</Link>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,.28)', marginBottom: 16 }}>Legal</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {LEGAL_LINKS.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,.48)', transition: 'color .2s', textDecoration: 'none' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#FAFAF8')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,.48)')}
                  >{label}</Link>
                ))}
                <a
                  href="mailto:hello@skillza.co.za"
                  style={{ fontSize: 13, fontWeight: 500, color: 'var(--orange)', transition: 'opacity .2s', textDecoration: 'none' }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '.7')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >hello@skillza.co.za</a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(255,255,255,.06)', marginBottom: 28 }} />

        {/* Bottom: legal */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={{ fontSize: 11.5, color: 'rgba(255,255,255,.3)', lineHeight: 1.7 }}>
            Skillza is a marketplace platform. We verify student enrolment but do not supervise bookings or guarantee outcomes. Use good judgment when meeting in person.
          </p>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,.2)' }}>
            © 2026 Skillza. Built for SA students. POPIA compliant.
          </p>
        </div>
      </div>

      <style>{`
        .footer-top-grid {
          grid-template-columns: 1fr;
        }
        @media (min-width: 680px) {
          .footer-top-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>
    </footer>
  )
}

export default Footer
