'use client'
import Link from 'next/link'
import { useRef, useState, useEffect } from 'react'
import type { StudentFull } from '@/types/database'
import { GooeyText } from '@/components/GooeyText'

// ── Effect 1 helper: count-up hook ────────────────────────────────────────────
function useCountUp(target: number, duration: number, active: boolean) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!active) return
    let start: number | null = null
    const step = (timestamp: number) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // easeOutCubic
      setValue(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [active, target, duration])
  return value
}

const FALLBACK_CARDS = [
  { name: 'Amahle K.', uni: 'UCT · Visual Comm', skill: 'Photography · Events', emoji: '📸', price: 'from R550', badge: '✓ Verified', badgeType: 'v', rotate: '-4deg', top: 0, left: 0, zIndex: 1 },
  { name: 'Luca M.', uni: 'Red & Yellow · Brand', skill: 'Graphic Design · Brand', emoji: '🎨', price: 'from R650', badge: '★ 5.0', badgeType: 'r', rotate: '0deg', top: 28, left: 90, zIndex: 2 },
  { name: 'Sipho D.', uni: 'AFDA · Film & TV', skill: 'Videography · Events', emoji: '🎬', price: 'from R1,200', badge: '✓ Verified', badgeType: 'v', rotate: '3deg', top: 12, left: 185, zIndex: 1 },
]

const ROTATIONS = ['-4deg', '0deg', '3deg']
const OFFSETS = [{ top: 0, left: 0 }, { top: 28, left: 90 }, { top: 12, left: 185 }]
const ZINDEXES = [1, 2, 1]
const BORDERS = ['rgba(255,75,31,.15)', 'rgba(91,156,246,.2)', 'rgba(52,213,142,.15)']
const TOPS = ['var(--orange)', 'var(--blue)', 'var(--green)']

export default function HeroSection({ students = [] }: { students?: StudentFull[] }) {
  // ── Effect 1: count-up state + IntersectionObserver ───────────────────────
  const statsRef = useRef<HTMLDivElement>(null)
  const [counted, setCounted] = useState(false)
  const c1 = useCountUp(9, 1200, counted)
  const c3 = useCountUp(100, 1500, counted)

  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCounted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // ── Effect 2: parallax grid ref ───────────────────────────────────────────
  const gridRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (gridRef.current) {
            gridRef.current.style.transform = `translateY(${window.scrollY * 0.18}px)`
          }
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const heroStudents = students.slice(0, 3)
  const useReal = heroStudents.length >= 2

  const cards = useReal
    ? heroStudents.map((s, i) => ({
        name: s.short_name ?? s.name,
        uni: `${s.university ?? ''} · ${s.skill}`,
        skill: `${s.skill} · ${s.city ?? 'SA'}`,
        emoji: s.emoji ?? '🎓',
        price: `from ${s.starting_price}`,
        badge: s.review_count > 0 ? `★ ${s.rating}` : '✓ Verified',
        badgeType: s.review_count > 0 ? 'r' : 'v',
        rotate: ROTATIONS[i],
        top: OFFSETS[i].top,
        left: OFFSETS[i].left,
        zIndex: ZINDEXES[i],
      }))
    : FALLBACK_CARDS

  return (
    <section style={{
      minHeight: '100svh',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      padding: 'calc(60px + env(safe-area-inset-top, 0px) + 48px) 24px 48px',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Effect 2: Dithering / Noise Hero Background */}
      <div className="hero-dither" aria-hidden="true" />

      {/* Effect 1: Retro Perspective Grid */}
      <div className="retro-grid" aria-hidden="true" ref={gridRef}>
        <div className="retro-grid-h" />
        <div className="retro-grid-v" />
      </div>

      {/* Decorative line */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: 3, height: '100%', background: 'linear-gradient(to bottom, transparent 0%, var(--orange) 30%, var(--orange) 70%, transparent 100%)', opacity: .22, zIndex: 0 }} />
      {/* Background text */}
      <div aria-hidden="true" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -54%)', fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(100px, 28vw, 380px)', color: 'rgba(245,239,227,.011)', whiteSpace: 'nowrap', pointerEvents: 'none', letterSpacing: 6, userSelect: 'none', zIndex: 0 }}>SKILLZA</div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', width: '100%' }} className="hero-inner">
        {/* Left — headline */}
        <div className="hero-left">
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 20, height: 1.5, background: 'var(--orange)', display: 'inline-block', flexShrink: 0 }} />
            South Africa's Student Talent Marketplace
          </div>
          <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(60px, 10vw, 108px)', lineHeight: .9, letterSpacing: 1 }}>
            <GooeyText /><br />
            <span style={{ background: 'linear-gradient(135deg, #F5EFE3 20%, #a89880 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Student prices.</span><br />
            <span style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', color: 'var(--orange)' }}>SA verified.</span>
          </h1>
        </div>

        {/* Right — cards + pills + CTAs */}
        <div className="hero-right">
          {/* Floating cards — desktop only */}
          <div className="hero-cards" aria-hidden="true">
            {cards.map((card, i) => (
              <div key={i} className={`hc hc-${i + 1}`} style={{
                position: 'absolute',
                top: card.top,
                left: card.left,
                transform: `rotate(${card.rotate})`,
                zIndex: card.zIndex,
                background: 'var(--black-3)',
                border: `1px solid ${BORDERS[i]}`,
                borderRadius: 16,
                padding: '16px 18px',
                width: 220,
                boxShadow: '0 24px 48px rgba(0,0,0,.5)',
              }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, borderRadius: '16px 16px 0 0', background: TOPS[i] }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(245,239,227,.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{card.emoji}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--cream)', lineHeight: 1.2 }}>{card.name}</div>
                    <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 1 }}>{card.uni}</div>
                  </div>
                </div>
                <div style={{ fontSize: 11, color: 'var(--muted-2)', marginBottom: 8 }}>{card.skill}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8, borderTop: '1px solid rgba(245,239,227,.06)' }}>
                  <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 17, letterSpacing: .5, color: 'var(--cream)' }}>{card.price}</div>
                  <span style={{
                    fontSize: 9, fontWeight: 700, padding: '3px 7px', borderRadius: 100, letterSpacing: .3,
                    background: card.badgeType === 'v' ? 'rgba(52,213,142,.12)' : 'rgba(212,168,83,.1)',
                    color: card.badgeType === 'v' ? 'var(--green)' : 'var(--gold)',
                    border: `1px solid ${card.badgeType === 'v' ? 'rgba(52,213,142,.25)' : 'rgba(212,168,83,.2)'}`,
                  }}>{card.badge}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Two side pills */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }} className="hero-pills">
            {[
              { icon: '🎯', label: 'Find Talent', labelColor: 'var(--blue)', body: "Photographers, designers, videographers and more. Trained at SA's top creative schools. Student Card verified so you know exactly who you're booking." },
              { icon: '🎓', label: "I'm a Student", labelColor: 'var(--orange)', body: "Turn your skills into income, starting now. Real clients, real portfolio pieces, and a track record that follows you past graduation." },
            ].map(({ icon, label, labelColor, body }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, background: 'rgba(245,239,227,.03)', border: '1px solid var(--border)', borderRadius: 12, padding: '14px 16px', transition: 'border-color .2s, background .2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,75,31,.25)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,75,31,.04)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.background = 'rgba(245,239,227,.03)' }}>
                <div style={{ fontSize: 20, flexShrink: 0, marginTop: 1 }}>{icon}</div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 3, color: labelColor }}>{label}</div>
                  <div style={{ fontSize: 12.5, lineHeight: 1.55, color: 'rgba(245,239,227,.5)' }}>{body}</div>
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 32 }}>
            <Link href="/#find-talent" className="btn-primary">Browse Talent →</Link>
            <Link href="/join" className="btn-outline">I'm a student ↗</Link>
          </div>

          {/* Proof stats — Effect 1: count-up on scroll into view */}
          <div ref={statsRef} style={{ display: 'flex', gap: 'clamp(20px, 5vw, 48px)', paddingTop: 24, borderTop: '1px solid rgba(255,255,255,.07)' }}>
            {/* Stat 1: Skills available — counts 0 → 9 */}
            <div>
              <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(28px, 4.5vw, 38px)', letterSpacing: 1, lineHeight: 1, color: 'var(--cream)' }}>
                {c1}<span style={{ color: 'var(--orange)' }}>+</span>
              </div>
              <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 3, letterSpacing: .3 }}>Skills available</div>
            </div>

            {/* Stat 2: No fees — static "R0" (zero stays zero, no animation needed) */}
            <div>
              <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(28px, 4.5vw, 38px)', letterSpacing: 1, lineHeight: 1, color: 'var(--cream)' }}>
                R<span style={{ color: 'var(--orange)' }}>0</span>
              </div>
              <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 3, letterSpacing: .3 }}>No fees to book</div>
            </div>

            {/* Stat 3: Student verified — counts 0 → 100 */}
            <div>
              <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(28px, 4.5vw, 38px)', letterSpacing: 1, lineHeight: 1, color: 'var(--cream)' }}>
                {c3}<span style={{ color: 'var(--orange)' }}>%</span>
              </div>
              <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 3, letterSpacing: .3 }}>Student verified</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* Effect 2: Dithering / Noise Hero Background */
        .hero-dither {
          position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          opacity: 0.04; mix-blend-mode: overlay; pointer-events: none; z-index: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
          background-repeat: repeat;
          background-size: 256px 256px;
        }

        /* Effect 1: Retro Perspective Grid */
        .retro-grid {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 60%;
          pointer-events: none;
          z-index: 0;
          -webkit-mask-image: linear-gradient(to top, rgba(0,0,0,0.15) 0%, transparent 90%);
          mask-image: linear-gradient(to top, rgba(0,0,0,0.15) 0%, transparent 90%);
          overflow: hidden;
        }
        .retro-grid-h,
        .retro-grid-v {
          position: absolute;
          inset: 0;
          transform: perspective(500px) rotateX(35deg);
          transform-origin: bottom center;
        }
        .retro-grid-h {
          background-image: repeating-linear-gradient(
            to bottom,
            rgba(255,74,28,0.07) 0px,
            rgba(255,74,28,0.07) 1px,
            transparent 1px,
            transparent 40px
          );
        }
        .retro-grid-v {
          background-image: repeating-linear-gradient(
            to right,
            rgba(255,74,28,0.07) 0px,
            rgba(255,74,28,0.07) 1px,
            transparent 1px,
            transparent 40px
          );
        }

        .hero-inner {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }
        .hero-cards { display: none; }
        .hero-pills { flex-direction: column; }

        @media (min-width: 900px) {
          .hero-inner {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 60px;
            align-items: center;
          }
          .hero-cards {
            display: block;
            position: relative;
            height: 260px;
            margin-bottom: 32px;
          }
          .hero-pills { flex-direction: row; flex-wrap: wrap; }
        }

        .hc-1 { animation: hcf1 6s ease-in-out infinite; }
        .hc-2 { animation: hcf2 6s ease-in-out infinite 1.2s; }
        .hc-3 { animation: hcf3 6s ease-in-out infinite 2.4s; }

        @keyframes hcf1 { 0%,100%{transform:rotate(-4deg) translateY(0)} 50%{transform:rotate(-4deg) translateY(-7px)} }
        @keyframes hcf2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-9px)} }
        @keyframes hcf3 { 0%,100%{transform:rotate(3deg) translateY(0)} 50%{transform:rotate(3deg) translateY(-6px)} }

        @media (prefers-reduced-motion: reduce) {
          .hc-1, .hc-2, .hc-3 { animation: none; }
        }
      `}</style>
    </section>
  )
}
