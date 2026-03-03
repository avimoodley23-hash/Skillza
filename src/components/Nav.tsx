'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 400,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 24px',
        paddingTop: 'env(safe-area-inset-top, 0px)',
        height: 'calc(60px + env(safe-area-inset-top, 0px))',
        background: 'rgba(16,15,13,.96)',
        borderBottom: `1px solid ${scrolled ? 'rgba(245,239,227,.1)' : 'transparent'}`,
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        transition: 'border-color .3s',
      }}>
        {/* Extend blur behind status bar */}
        <div style={{
          position: 'absolute',
          top: 'calc(-1 * env(safe-area-inset-top, 20px))',
          left: 0, right: 0,
          height: 'calc(env(safe-area-inset-top, 20px) + 4px)',
          background: 'rgba(16,15,13,.96)',
          pointerEvents: 'none',
        }} />

        <Link href="/" style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 24, letterSpacing: 2, color: 'var(--cream)' }}>
          SKILL<span style={{ color: 'var(--orange)' }}>ZA</span>
        </Link>

        {/* Desktop links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }} className="hide-mobile">
          <Link href="/#find-talent" style={{ fontSize: 13, fontWeight: 500, color: 'var(--muted)', transition: 'color .2s', letterSpacing: '.2px' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--cream)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}>
            Find Talent
          </Link>
          <Link href="/#how-it-works" style={{ fontSize: 13, fontWeight: 500, color: 'var(--muted)', transition: 'color .2s', letterSpacing: '.2px' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--cream)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}>
            How It Works
          </Link>
          <Link href="/join" style={{ fontSize: 13, fontWeight: 500, color: 'var(--muted)', transition: 'color .2s', letterSpacing: '.2px' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--cream)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}>
            For Students
          </Link>
          <Link href="/join" className="btn-primary" style={{ padding: '9px 20px', fontSize: 13 }}>
            Join Free
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className="show-mobile"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          style={{ display: 'none', flexDirection: 'column', gap: 5, background: 'none', border: 'none', padding: 8, cursor: 'pointer', WebkitTapHighlightColor: 'transparent' }}
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: 'block', width: 22, height: 1.5,
              background: 'var(--cream)', borderRadius: 2,
              transition: 'all .3s',
              transform: menuOpen
                ? i === 0 ? 'rotate(45deg) translate(5px, 5px)'
                : i === 2 ? 'rotate(-45deg) translate(5px, -5px)'
                : 'none'
                : 'none',
              opacity: menuOpen && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile overlay menu */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 398,
        background: 'rgba(16,15,13,.98)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        padding: '80px 28px 40px',
        transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform .38s cubic-bezier(.16,1,.3,1)',
        display: 'flex', flexDirection: 'column',
        overflowY: 'auto',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
{[
  { href: '/#find-talent', label: 'Find Talent' },
  { href: '/#how-it-works', label: 'How It Works' },
  { href: '/#verify', label: 'Verification' },
  { href: '/for-students', label: 'For Students' }
].map(({ href, label }) => (
  <a
    key={href}
    href={href}
    onClick={() => setMenuOpen(false)}
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 0',
      fontFamily: 'Bebas Neue, sans-serif',
      fontSize: 28,
      letterSpacing: 1.5,
      color: 'var(--muted-2)',
      borderBottom: '1px solid var(--border)'
    }}
  >
    {label}
  </a>
))}
        </div>
        <Link href="/join" onClick={() => setMenuOpen(false)} style={{
          background: 'var(--orange)', color: '#fff',
          textAlign: 'center', marginTop: 20,
          padding: 16, borderRadius: 10,
          fontFamily: 'Bebas Neue, sans-serif',
          fontSize: 22, letterSpacing: 2,
          display: 'block',
        }}>
          JOIN FREE →
        </Link>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .hide-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 701px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </>
  )
}
