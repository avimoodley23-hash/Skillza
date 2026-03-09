'use client'
import Link from 'next/link'
import { useRef, useState, useEffect } from 'react'
import type { StudentFull } from '@/types/database'
import { Camera, Video, Palette, Layers, PenLine, Globe, Share2, Music, Pen, GraduationCap, ShieldCheck, Star } from 'lucide-react'

const SKILL_ICON_MAP: Record<string, React.ElementType> = {
  'Photography': Camera,
  'Videography': Video,
  'Graphic Design': Palette,
  'Branding': Layers,
  'Copywriting': PenLine,
  'Web Design': Globe,
  'Social Media': Share2,
  'Music': Music,
  'Illustration': Pen,
}

function getSkillIcon(skill: string): React.ElementType {
  for (const [key, Icon] of Object.entries(SKILL_ICON_MAP)) {
    if (skill.toLowerCase().includes(key.toLowerCase())) return Icon
  }
  return GraduationCap
}

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
  { name: 'Amahle K.', uni: 'UCT · Visual Comm', skill: 'Photography · Events', icon: Camera, price: 'from R550', badge: '✓ Skillza Verified', badgeType: 'v', rotate: '-4deg', top: 0, left: 0, zIndex: 1 },
  { name: 'Luca M.', uni: 'Red & Yellow · Brand', skill: 'Graphic Design · Brand', icon: Palette, price: 'from R650', badge: '★ 5.0', badgeType: 'r', rotate: '0deg', top: 28, left: 90, zIndex: 2 },
  { name: 'Sipho D.', uni: 'AFDA · Film & TV', skill: 'Videography · Events', icon: Video, price: 'from R1,200', badge: '✓ Skillza Verified', badgeType: 'v', rotate: '3deg', top: 12, left: 185, zIndex: 1 },
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
        icon: getSkillIcon(s.skill),
        price: `from ${s.starting_price}`,
        badge: s.review_count > 0 ? `★ ${s.rating}` : '✓ Skillza Verified',
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
      {/* Retro Perspective Grid */}
      <div className="retro-grid" aria-hidden="true" ref={gridRef}>
        <div className="retro-grid-h" />
        <div className="retro-grid-v" />
      </div>

      {/* Decorative line */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: 3, height: '100%', background: 'linear-gradient(to bottom, transparent 0%, var(--orange) 30%, var(--orange) 70%, transparent 100%)', opacity: .22, zIndex: 0 }} />

      {/* Background text */}
      <div aria-hidden="true" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -54%)', fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(100px, 28vw, 380px)', color: 'rgba(245,239,227,.011)', whiteSpace: 'nowrap', pointerEvents: 'none', letterSpacing: 6, userSelect: 'none', zIndex: 0 }}>SKILLZA</div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', width: '100%' }} className="hero-inner">

        {/* ── Left column: eyebrow → h1 → sub-copy → talent strip (mobile) → CTAs → stats ── */}
        <div className="hero-left">

          {/* Eyebrow */}
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 20, height: 1.5, background: 'var(--orange)', display: 'inline-block', flexShrink: 0 }} />
            SA's Creative Talent Platform
          </div>

          {/* H1 */}
          <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(60px, 10vw, 108px)', lineHeight: .9, letterSpacing: 1, marginBottom: 20 }}>
            <span style={{ background: 'linear-gradient(135deg, #F5EFE3 0%, #c8b99a 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Your next favourite</span><br />
            <span style={{ background: 'linear-gradient(135deg, #F5EFE3 20%, #a89880 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>creative is probably</span><br />
            <span style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', color: 'var(--orange)' }}>a student.</span>
          </h1>

          {/* Sub-copy */}
          <p style={{ fontSize: 'clamp(14px, 1.8vw, 16px)', lineHeight: 1.8, color: 'rgba(245,239,227,0.6)', maxWidth: 460, marginBottom: 28 }}>
            Book photographers, designers, videographers and more — Skillza verified, fairly priced, and ready for your next project.
          </p>

          {/* ── Mobile talent strip (hidden on desktop) ── */}
          <div className="hero-talent-strip" aria-label="Browse student talent">
            {cards.map((card, i) => (
              <div key={i} style={{
                flexShrink: 0,
                width: 160,
                borderRadius: 14,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid var(--border)',
                padding: 14,
                position: 'relative',
                overflow: 'hidden',
              }}>
                {/* Top accent bar */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, borderRadius: '14px 14px 0 0', background: TOPS[i] }} />
                {/* Avatar + name */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(245,239,227,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--orange)' }}>
                    {(() => { const Icon = card.icon; return <Icon size={16} strokeWidth={1.5} /> })()}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: 12, color: 'var(--cream)', lineHeight: 1.2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{card.name}</div>
                    <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{card.skill}</div>
                  </div>
                </div>
                {/* Price */}
                <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 15, letterSpacing: .5, color: 'var(--cream)', marginBottom: 6 }}>{card.price}</div>
                {/* Badge */}
                <span style={{
                  fontSize: 9, fontWeight: 700, padding: '3px 7px', borderRadius: 100, letterSpacing: .3, display: 'inline-block',
                  background: card.badgeType === 'v' ? 'rgba(52,213,142,.12)' : 'rgba(212,168,83,.1)',
                  color: card.badgeType === 'v' ? 'var(--green)' : 'var(--gold)',
                  border: `1px solid ${card.badgeType === 'v' ? 'rgba(52,213,142,.25)' : 'rgba(212,168,83,.2)'}`,
                }}>{card.badge}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 32 }}>
            <Link href="/#find-talent" className="btn-primary">Browse Talent →</Link>
            <Link href="/join" className="btn-outline">Are you a creative? Join →</Link>
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

            {/* Stat 2: No fees — static "R0" */}
            <div>
              <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(28px, 4.5vw, 38px)', letterSpacing: 1, lineHeight: 1, color: 'var(--cream)' }}>
                R<span style={{ color: 'var(--orange)' }}>0</span>
              </div>
              <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 3, letterSpacing: .3 }}>No fees to book</div>
            </div>

            {/* Stat 3: Skillza Verified — counts 0 → 100 */}
            <div>
              <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(28px, 4.5vw, 38px)', letterSpacing: 1, lineHeight: 1, color: 'var(--cream)' }}>
                {c3}<span style={{ color: 'var(--orange)' }}>%</span>
              </div>
              <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 3, letterSpacing: .3 }}>Skillza Verified</div>
            </div>
          </div>
        </div>

        {/* ── Right column: floating cards (desktop only) ── */}
        <div className="hero-right">
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
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(245,239,227,.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--orange)' }}>
                    {(() => { const Icon = card.icon; return <Icon size={18} strokeWidth={1.5} /> })()}
                  </div>
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
        </div>
      </div>

      <style>{`
        /* Retro Perspective Grid */
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

        /* Layout */
        .hero-inner {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }
        .hero-left {
          display: flex;
          flex-direction: column;
        }
        .hero-right {
          display: none;
        }
        .hero-cards {
          display: none;
        }

        /* Mobile talent strip */
        .hero-talent-strip {
          display: flex;
          overflow-x: auto;
          gap: 12px;
          padding-bottom: 8px;
          margin: 0 0 20px;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .hero-talent-strip::-webkit-scrollbar {
          display: none;
        }

        /* Desktop: 2-col grid, show right column and floating cards, hide talent strip */
        @media (min-width: 900px) {
          .hero-inner {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 60px;
            align-items: center;
          }
          .hero-right {
            display: block;
          }
          .hero-cards {
            display: block;
            position: relative;
            height: 260px;
            margin-bottom: 32px;
          }
          .hero-talent-strip {
            display: none;
          }
        }

        /* Floating card animations */
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
