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
        background: scrolled ? 'rgba(16,15,13,.96)' : 'transparent',
        borderBottom: `1px solid ${scrolled ? 'rgba(255,255,255,.07)' : 'transparent'}`,
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
        transition: 'background .35s ease, border-color .35s ease, backdrop-filter .35s ease',
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

        {/* Desktop nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }} className="hide-mobile">
          {[
            { href: '/#how-it-works', label: 'How It Works' },
            { href: '/#for-students', label: 'For Students' },
          ].map(({ href, label }) => (
            <Link key={href} href={href} style={{ fontSize: 13, fontWeight: 500, color: 'var(--muted)', transition: 'color .2s', letterSpacing: '.2px' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--cream)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}>
              {label}
            </Link>
          ))}
          <Link href="/#talent-grid" className="btn-outline" style={{ padding: '9px 20px', fontSize: 13 }}>
            Browse Talent
          </Link>
          <Link href="/join" className="btn-primary" style={{ padding: '9px 20px', fontSize: 13 }}>
            Join as a Creative
          </Link>
        </div>

        {/* Mobile: Browse pill + hamburger */}
        <div className="show-mobile" style={{ display: 'none', alignItems: 'center', gap: 10 }}>
          <Link href="/#talent-grid" style={{
            fontSize: 11, fontWeight: 700, letterSpacing: .4,
            padding: '7px 14px', borderRadius: 100,
            border: '1px solid rgba(255,255,255,.18)',
            color: 'var(--cream)',
            whiteSpace: 'nowrap',
          }}>
            Browse
          </Link>
          <button
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            style={{ display: 'flex', flexDirection: 'column', gap: 5, background: 'none', border: 'none', padding: 8, cursor: 'pointer', WebkitTapHighlightColor: 'transparent' }}
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
        </div>
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
            { href: '/#talent-grid',  label: 'Browse Talent' },
            { href: '/#how-it-works', label: 'How It Works' },
            { href: '/#for-students', label: 'For Students' },
          ].map(({ href, label }) => (
            <Link
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
                borderBottom: '1px solid var(--border)',
              }}
            >
              {label}
            </Link>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 20 }}>
          <Link href="/#talent-grid" onClick={() => setMenuOpen(false)} style={{
            background: 'transparent',
            border: '1px solid rgba(255,255,255,.18)',
            color: 'var(--cream)',
            textAlign: 'center',
            padding: 16, borderRadius: 10,
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: 20, letterSpacing: 2,
            display: 'block',
          }}>
            BROWSE TALENT →
          </Link>
          <Link href="/join" onClick={() => setMenuOpen(false)} style={{
            background: 'var(--orange)', color: '#fff',
            textAlign: 'center',
            padding: 16, borderRadius: 10,
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: 22, letterSpacing: 2,
            display: 'block',
          }}>
            JOIN AS A CREATIVE →
          </Link>
        </div>
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
