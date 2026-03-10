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

function useCountUp(target: number, duration: number, active: boolean) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!active) return
    let start: number | null = null
    const step = (ts: number) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / duration, 1)
      const e = 1 - Math.pow(1 - p, 3)
      setValue(Math.floor(e * target))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [active, target, duration])
  return value
}

const FALLBACK_CARDS = [
  { name: 'Amahle K.', uni: 'UCT · Visual Comm', skill: 'Photography · Events', icon: Camera, price: 'from R550', badge: '✓ Skillza Verified', badgeType: 'v', rotate: '-4deg', top: 0, left: 0, zIndex: 1, photo_url: 'https://i.pravatar.cc/80?img=47' },
  { name: 'Luca M.', uni: 'Red & Yellow · Brand', skill: 'Graphic Design · Brand', icon: Palette, price: 'from R650', badge: '★ 5.0', badgeType: 'r', rotate: '0deg', top: 28, left: 90, zIndex: 2, photo_url: 'https://i.pravatar.cc/80?img=12' },
  { name: 'Sipho D.', uni: 'AFDA · Film & TV', skill: 'Videography · Events', icon: Video, price: 'from R1,200', badge: '✓ Skillza Verified', badgeType: 'v', rotate: '3deg', top: 12, left: 185, zIndex: 1, photo_url: 'https://i.pravatar.cc/80?img=33' },
]

const ROTATIONS = ['-4deg', '0deg', '3deg']
const OFFSETS = [{ top: 0, left: 0 }, { top: 28, left: 90 }, { top: 12, left: 185 }]
const ZINDEXES = [1, 2, 1]

// Multi-color per card: cobalt, violet, coral
const CARD_ACCENTS = [
  { border: 'rgba(20,69,255,.22)', top: '#1445FF', iconBg: 'rgba(20,69,255,.1)', iconColor: '#1445FF' },
  { border: 'rgba(124,58,237,.22)', top: '#7C3AED', iconBg: 'rgba(124,58,237,.1)', iconColor: '#7C3AED' },
  { border: 'rgba(255,69,32,.22)', top: '#FF4520', iconBg: 'rgba(255,69,32,.1)', iconColor: '#FF4520' },
]

export default function HeroSection({ students = [] }: { students?: StudentFull[] }) {
  const statsRef = useRef<HTMLDivElement>(null)
  const [counted, setCounted] = useState(false)
  const c1 = useCountUp(9, 1200, counted)
  const c3 = useCountUp(100, 1500, counted)

  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setCounted(true); obs.disconnect() } },
      { threshold: 0.4 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const gridRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (gridRef.current) gridRef.current.style.transform = `translateY(${window.scrollY * 0.18}px)`
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
        zIndex: ZINDEXES[i],        photo_url: s.photo_url ?? null,      }))
    : FALLBACK_CARDS

  return (
    <section style={{
      minHeight: '100svh',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      padding: 'calc(60px + env(safe-area-inset-top, 0px) + 48px) 24px 48px',
      position: 'relative', overflow: 'hidden',
    }}>

      {/* ── Animated gradient blobs ── */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        {/* Cobalt blob — top right */}
        <div style={{
          position: 'absolute', top: '-8%', right: '-5%',
          width: '48vw', height: '48vw', maxWidth: 700, maxHeight: 700,
          background: 'radial-gradient(ellipse at center, rgba(20,69,255,.065) 0%, transparent 65%)',
          borderRadius: '50%',
          animation: 'blob-drift-1 18s ease-in-out infinite',
        }} />
        {/* Violet blob — bottom left */}
        <div style={{
          position: 'absolute', bottom: '8%', left: '-8%',
          width: '38vw', height: '38vw', maxWidth: 540, maxHeight: 540,
          background: 'radial-gradient(ellipse at center, rgba(124,58,237,.055) 0%, transparent 65%)',
          borderRadius: '50%',
          animation: 'blob-drift-2 22s ease-in-out infinite',
        }} />
        {/* Coral blob — middle right */}
        <div style={{
          position: 'absolute', top: '35%', right: '22%',
          width: '22vw', height: '22vw', maxWidth: 320, maxHeight: 320,
          background: 'radial-gradient(ellipse at center, rgba(255,69,32,.04) 0%, transparent 65%)',
          borderRadius: '50%',
          animation: 'blob-drift-3 15s ease-in-out infinite',
        }} />
        {/* Lime blob — top left */}
        <div style={{
          position: 'absolute', top: '6%', left: '12%',
          width: '18vw', height: '18vw', maxWidth: 240, maxHeight: 240,
          background: 'radial-gradient(ellipse at center, rgba(170,255,0,.045) 0%, transparent 65%)',
          borderRadius: '50%',
          animation: 'blob-drift-4 25s ease-in-out infinite',
        }} />
      </div>

      {/* Retro Perspective Grid */}
      <div className="retro-grid" aria-hidden="true" ref={gridRef}>
        <div className="retro-grid-h" />
        <div className="retro-grid-v" />
      </div>

      {/* Decorative left accent line */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: 3, height: '100%', background: 'linear-gradient(to bottom, transparent 0%, var(--orange) 30%, var(--violet) 60%, var(--coral) 85%, transparent 100%)', opacity: .22, zIndex: 0 }} />

      {/* Background watermark */}
      <div aria-hidden="true" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -54%)', fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(100px, 28vw, 380px)', color: 'rgba(17,17,16,0.025)', whiteSpace: 'nowrap', pointerEvents: 'none', letterSpacing: 6, userSelect: 'none', zIndex: 0 }}>SKILLZA</div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', width: '100%' }} className="hero-inner">

        {/* ── Left column ── */}
        <div className="hero-left">

          {/* Eyebrow badge */}
          <div style={{ marginBottom: 22, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span className="badge-lime">
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#0B0B0A', display: 'inline-block', animation: 'pdot 2s ease-in-out infinite' }} />
              SA Creative Talent
            </span>
          </div>

          {/* H1 */}
          <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(58px, 10vw, 112px)', lineHeight: .88, letterSpacing: 1, marginBottom: 22 }}>
            <span style={{ color: 'var(--cream)' }}>Your next</span>{' '}
            <span style={{ color: 'var(--cream)' }}>favourite</span><br />
            <span style={{ color: 'var(--cream)' }}>creative is</span><br />
            <span style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', color: 'var(--orange)' }}>probably a student.</span>
          </h1>

          {/* Sub-copy */}
          <p style={{ fontSize: 'clamp(14px, 1.8vw, 16px)', lineHeight: 1.75, color: 'rgba(250,250,248,.55)', maxWidth: 460, marginBottom: 28 }}>
            Book photographers, designers, videographers and more — Skillza verified, fairly priced, and ready for your next project.
          </p>

          {/* Mobile talent strip */}
          <div className="hero-talent-strip" aria-label="Browse student talent">
            {cards.map((card, i) => (
              <div key={i} style={{
                flexShrink: 0, width: 160, borderRadius: 14,
                background: '#1C1C1C',
                border: `1px solid ${CARD_ACCENTS[i].border}`,
                boxShadow: '0 2px 16px rgba(0,0,0,.4)',
                padding: 14, position: 'relative', overflow: 'hidden',
              }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, borderRadius: '14px 14px 0 0', background: CARD_ACCENTS[i].top }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    {card.photo_url ? (
                      <img src={card.photo_url} alt={card.name} style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', display: 'block', border: `1.5px solid ${CARD_ACCENTS[i].border}` }} />
                    ) : (
                      <div style={{ width: 40, height: 40, borderRadius: '50%', background: CARD_ACCENTS[i].iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: CARD_ACCENTS[i].iconColor }}>
                        {(() => { const Icon = card.icon; return <Icon size={16} strokeWidth={1.5} /> })()}
                      </div>
                    )}
                    {card.photo_url && (
                      <div style={{ position: 'absolute', bottom: -1, right: -1, width: 16, height: 16, borderRadius: '50%', background: CARD_ACCENTS[i].iconBg, border: `1.5px solid #fff`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: CARD_ACCENTS[i].iconColor }}>
                        {(() => { const Icon = card.icon; return <Icon size={8} strokeWidth={2} /> })()}
                      </div>
                    )}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: 12, color: 'var(--cream)', lineHeight: 1.2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{card.name}</div>
                    <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{card.skill}</div>
                  </div>
                </div>
                <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 15, letterSpacing: .5, color: 'var(--cream)', marginBottom: 6 }}>{card.price}</div>
                <span style={{
                  fontSize: 9, fontWeight: 800, padding: '3px 8px', borderRadius: 100, letterSpacing: .5, display: 'inline-block',
                  background: card.badgeType === 'v' ? 'var(--lime)' : 'rgba(245,158,11,.12)',
                  color: card.badgeType === 'v' ? '#0B0B0A' : 'var(--gold)',
                  border: card.badgeType === 'v' ? 'none' : '1px solid rgba(245,158,11,.25)',
                }}>{card.badge}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 32 }}>
            <Link href="/#find-talent" className="btn-primary">Browse Talent →</Link>
            <Link href="/join" className="btn-outline">Are you a creative? Join →</Link>
          </div>

          {/* Stats */}
          <div ref={statsRef} style={{ display: 'flex', gap: 'clamp(20px, 5vw, 48px)', paddingTop: 22, borderTop: '1px solid rgba(255,255,255,.08)' }}>
            <div>
              <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(30px, 4.5vw, 42px)', letterSpacing: 1, lineHeight: 1, color: 'var(--orange)' }}>
                {c1}<span style={{ color: 'var(--orange)' }}>+</span>
              </div>
              <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--muted)', marginTop: 3, letterSpacing: .4, textTransform: 'uppercase' }}>Disciplines</div>
            </div>
            <div>
              <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(30px, 4.5vw, 42px)', letterSpacing: 1, lineHeight: 1, color: 'var(--violet)' }}>
                0<span style={{ fontSize: '0.7em' }}>%</span>
              </div>
              <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--muted)', marginTop: 3, letterSpacing: .4, textTransform: 'uppercase' }}>Platform Fees</div>
            </div>
            <div>
              <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(30px, 4.5vw, 42px)', letterSpacing: 1, lineHeight: 1, color: 'var(--coral)' }}>
                24<span style={{ fontSize: '0.55em', letterSpacing: 0 }}>hr</span>
              </div>
              <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--muted)', marginTop: 3, letterSpacing: .4, textTransform: 'uppercase' }}>Verification</div>
            </div>
          </div>
        </div>

        {/* ── Right column: floating cards (desktop) ── */}
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
                border: `1px solid ${CARD_ACCENTS[i].border}`,
                borderRadius: 18,
                padding: '18px 20px',
                width: 226,
                boxShadow: `0 20px 56px rgba(17,17,16,0.1), 0 0 0 1px ${CARD_ACCENTS[i].border}`,
              }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, borderRadius: '18px 18px 0 0', background: CARD_ACCENTS[i].top }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    {card.photo_url ? (
                      <img src={card.photo_url} alt={card.name} style={{ width: 38, height: 38, borderRadius: '50%', objectFit: 'cover', display: 'block', border: `2px solid ${CARD_ACCENTS[i].border}` }} />
                    ) : (
                      <div style={{ width: 38, height: 38, borderRadius: 10, background: CARD_ACCENTS[i].iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: CARD_ACCENTS[i].iconColor }}>
                        {(() => { const Icon = card.icon; return <Icon size={18} strokeWidth={1.5} /> })()}
                      </div>
                    )}
                    {card.photo_url && (
                      <div style={{ position: 'absolute', bottom: -2, right: -2, width: 16, height: 16, borderRadius: '50%', background: CARD_ACCENTS[i].iconBg, border: `1.5px solid var(--black-3)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: CARD_ACCENTS[i].iconColor }}>
                        {(() => { const Icon = card.icon; return <Icon size={8} strokeWidth={2} /> })()}
                      </div>
                    )}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--cream)', lineHeight: 1.2 }}>{card.name}</div>
                    <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 1 }}>{card.uni}</div>
                  </div>
                </div>
                <div style={{ fontSize: 11, color: 'var(--muted-2)', marginBottom: 10 }}>{card.skill}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, borderTop: '1px solid rgba(255,255,255,.08)' }}>
                  <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 17, letterSpacing: .5, color: 'var(--cream)' }}>{card.price}</div>
                  <span style={{
                    fontSize: 9, fontWeight: 800, padding: '3px 8px', borderRadius: 100, letterSpacing: .5,
                    background: card.badgeType === 'v' ? 'var(--lime)' : 'rgba(245,158,11,.12)',
                    color: card.badgeType === 'v' ? '#0B0B0A' : 'var(--gold)',
                    border: card.badgeType === 'v' ? 'none' : '1px solid rgba(245,158,11,.25)',
                  }}>{card.badge}</span>
                </div>
              </div>
            ))}
          </div>
          {/* Decorative stat badge */}
          <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(20,69,255,.06)', border: '1px solid rgba(20,69,255,.14)', borderRadius: 10, padding: '10px 16px' }}>
              <ShieldCheck size={14} strokeWidth={1.5} style={{ color: 'var(--orange)' }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--cream)' }}>100% Skillza Verified</span>
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(124,58,237,.06)', border: '1px solid rgba(124,58,237,.14)', borderRadius: 10, padding: '10px 16px' }}>
              <Star size={13} strokeWidth={1.5} style={{ fill: 'var(--violet)', color: 'var(--violet)' }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--cream)' }}>Rated 4.9 avg from real clients</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .retro-grid {
          position: absolute; bottom: 0; left: 0; right: 0; height: 55%;
          pointer-events: none; z-index: 0;
          -webkit-mask-image: linear-gradient(to top, rgba(0,0,0,0.18) 0%, transparent 90%);
          mask-image: linear-gradient(to top, rgba(0,0,0,0.18) 0%, transparent 90%);
          overflow: hidden;
        }
        .retro-grid-h, .retro-grid-v {
          position: absolute; inset: 0;
          transform: perspective(500px) rotateX(35deg);
          transform-origin: bottom center;
        }
        .retro-grid-h {
          background-image: repeating-linear-gradient(to bottom, rgba(20,69,255,0.06) 0px, rgba(20,69,255,0.06) 1px, transparent 1px, transparent 40px);
        }
        .retro-grid-v {
          background-image: repeating-linear-gradient(to right, rgba(20,69,255,0.06) 0px, rgba(20,69,255,0.06) 1px, transparent 1px, transparent 40px);
        }

        .hero-inner { display: flex; flex-direction: column; gap: 32px; }
        .hero-left  { display: flex; flex-direction: column; }
        .hero-right { display: none; }
        .hero-cards { display: none; }

        .hero-talent-strip {
          display: flex; overflow-x: auto; gap: 12px; padding-bottom: 8px;
          margin: 0 0 20px; -webkit-overflow-scrolling: touch;
          scrollbar-width: none; -ms-overflow-style: none;
        }
        .hero-talent-strip::-webkit-scrollbar { display: none; }

        @media (min-width: 900px) {
          .hero-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
          .hero-right { display: block; }
          .hero-cards { display: block; position: relative; height: 280px; margin-bottom: 20px; }
          .hero-talent-strip { display: none; }
        }

        .hc-1 { animation: hcf1 6s ease-in-out infinite; }
        .hc-2 { animation: hcf2 6s ease-in-out infinite 1.2s; }
        .hc-3 { animation: hcf3 6s ease-in-out infinite 2.4s; }

        @media (prefers-reduced-motion: reduce) {
          .hc-1, .hc-2, .hc-3 { animation: none; }
        }
      `}</style>
    </section>
  )
}
