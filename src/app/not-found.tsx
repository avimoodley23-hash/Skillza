import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100svh',
      background: '#FAFAF6',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 24px',
      textAlign: 'center',
      fontFamily: 'Instrument Sans, sans-serif',
    }}>
      {/* Logo */}
      <Link href="/" style={{
        fontFamily: 'Bebas Neue, sans-serif',
        fontSize: 28, letterSpacing: 2,
        color: '#111110', marginBottom: 48,
        display: 'block',
      }}>
        SKILL<span style={{ color: '#334ED8' }}>ZA</span>
      </Link>

      {/* Big 404 */}
      <div style={{
        fontFamily: 'Bebas Neue, sans-serif',
        fontSize: 'clamp(100px, 22vw, 180px)',
        lineHeight: 1,
        letterSpacing: 2,
        color: 'rgba(17,17,16,.07)',
        marginBottom: 0,
        userSelect: 'none',
      }}>
        404
      </div>

      <h1 style={{
        fontFamily: 'Bebas Neue, sans-serif',
        fontSize: 'clamp(28px, 6vw, 48px)',
        letterSpacing: 1,
        color: '#111110',
        marginBottom: 12,
        lineHeight: 1.1,
      }}>
        This page doesn't exist
      </h1>

      <p style={{
        fontSize: 15,
        color: 'rgba(17,17,16,.55)',
        maxWidth: 360,
        lineHeight: 1.7,
        marginBottom: 36,
      }}>
        The link might be broken or the page may have moved. Head back to browse SA&apos;s creative talent.
      </p>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link href="/#talent-grid" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: '#334ED8', color: '#fff',
          padding: '14px 28px', borderRadius: 100,
          fontSize: 14, fontWeight: 700,
          boxShadow: '0 4px 24px rgba(51,78,216,.35)',
          letterSpacing: .3,
        }}>
          Browse Talent →
        </Link>
        <Link href="/" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'transparent', color: 'rgba(17,17,16,.75)',
          border: '1.5px solid rgba(17,17,16,.2)',
          padding: '13px 28px', borderRadius: 100,
          fontSize: 14, fontWeight: 600,
          letterSpacing: .3,
        }}>
          Go home
        </Link>
      </div>
    </div>
  )
}
