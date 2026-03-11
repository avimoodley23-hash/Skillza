'use client'
import { useState } from 'react'
import Link from 'next/link'
import { LegalModal } from './LegalModal'

const NAV_LINKS = [
  { href: '/#find-talent',  label: 'Browse Talent' },
  { href: '/#how-it-works', label: 'How It Works' },
  { href: '/#for-students', label: 'For Students' },
  { href: '/#verify',       label: 'Verification' },
]

const LEGAL_LABELS = [
  { key: 'privacy' as const, label: 'Privacy Policy' },
  { key: 'terms'   as const, label: 'Terms of Service' },
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
  const [legalModal, setLegalModal] = useState<null | 'privacy' | 'terms'>(null)

  return (
    <footer style={{
      padding: '64px 24px 40px',
      background: '#F0EDE4',
      borderTop: '1px solid rgba(0,0,0,.08)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Colourful top accent stripe */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: 'linear-gradient(90deg, #1445FF 0%, #7C3AED 25%, #FF4520 50%, #AAFF00 75%, #F59E0B 100%)',
      }} />
      {/* Subtle ambient glow */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: -100, right: -60,
        width: 400, height: 400,
        background: 'radial-gradient(ellipse at center, rgba(20,69,255,.05) 0%, transparent 65%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Top row: brand + nav */}
        <div style={{ display: 'grid', gap: 48, marginBottom: 56 }} className="footer-top-grid">

          {/* Brand */}
          <div>
            <Link href="/" style={{ display: 'inline-block', fontFamily: 'Bebas Neue, sans-serif', fontSize: 32, letterSpacing: 3, marginBottom: 12, textDecoration: 'none' }}>
              <span style={{ color: 'var(--text)' }}>SKILL</span><span style={{ color: 'var(--orange)' }}>ZA</span>
            </Link>
            <p style={{ fontSize: 13, color: 'rgba(17,17,16,.52)', lineHeight: 1.7, maxWidth: 280 }}>
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
                    background: 'rgba(17,17,16,.06)',
                    border: '1px solid rgba(17,17,16,.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(17,17,16,.45)',
                    transition: 'all .2s',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.background = 'rgba(20,69,255,.1)'
                    el.style.borderColor = 'rgba(20,69,255,.25)'
                    el.style.color = 'var(--orange)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.background = 'rgba(17,17,16,.06)'
                    el.style.borderColor = 'rgba(17,17,16,.1)'
                    el.style.color = 'rgba(17,17,16,.45)'
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
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(17,17,16,.38)', marginBottom: 16 }}>Platform</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {NAV_LINKS.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    style={{ fontSize: 13, fontWeight: 500, color: 'rgba(17,17,16,.5)', transition: 'color .2s', textDecoration: 'none' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(17,17,16,.5)')}
                  >{label}</Link>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(17,17,16,.38)', marginBottom: 16 }}>Legal</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {LEGAL_LABELS.map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setLegalModal(key)}
                    style={{ fontSize: 13, fontWeight: 500, color: 'rgba(17,17,16,.5)', transition: 'color .2s', background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(17,17,16,.5)')}
                  >{label}</button>
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
        <div style={{ height: 1, background: 'rgba(0,0,0,.08)', marginBottom: 28 }} />

        {/* Bottom: legal */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={{ fontSize: 11.5, color: 'rgba(17,17,16,.42)', lineHeight: 1.7 }}>
            Skillza is a marketplace platform. We verify student enrolment but do not supervise bookings or guarantee outcomes. Use good judgment when meeting in person.
          </p>
          <p style={{ fontSize: 11, color: 'rgba(17,17,16,.3)' }}>
            © 2026 Skillza. Built for SA students. POPIA compliant.
          </p>
        </div>
      </div>

      {legalModal && <LegalModal type={legalModal} onClose={() => setLegalModal(null)} />}

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
