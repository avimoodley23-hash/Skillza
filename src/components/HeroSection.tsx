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

// ── Mobile ticker pills ─────────────────────────────────────────────────────
const TICKER_PILLS = [
  { label: 'Graphic Design', Icon: Palette,  bg: '#1445FF', fg: '#fff'    },
  { label: 'Photography',    Icon: Camera,   bg: '#AAFF00', fg: '#0B0B0A' },
  { label: 'Videography',    Icon: Video,    bg: '#FF4520', fg: '#fff'    },
  { label: 'AI Design',      Icon: Layers,   bg: '#7C3AED', fg: '#fff'    },
  { label: 'Web Design',     Icon: Globe,    bg: '#5BC4F5', fg: '#0B0B0A' },
  { label: 'Motion',         Icon: Music,    bg: '#F59E0B', fg: '#0B0B0A' },
  { label: 'Branding',       Icon: Pen,      bg: '#E8472F', fg: '#fff'    },
  { label: 'Copywriting',    Icon: PenLine,  bg: '#3CB97D', fg: '#fff'    },
]

// ── Floating role blobs ──────────────────────────────────────────────────────
const ROLE_BLOBS = [
  { label: 'Graphic Design', Icon: Palette, bg: '#1445FF', fg: '#fff',    left: '59%', top: '9%',  amp: 11, dur: 3.2, delay: 0   },
  { label: 'Photography',    Icon: Camera,  bg: '#AAFF00', fg: '#0B0B0A', left: '77%', top: '17%', amp: 14, dur: 2.9, delay: 0.7 },
  { label: 'Videographer',   Icon: Video,   bg: '#FF4520', fg: '#fff',    left: '63%', top: '54%', amp: 10, dur: 3.6, delay: 1.4 },
  { label: 'AI Design',      Icon: Layers,  bg: '#7C3AED', fg: '#fff',    left: '80%', top: '43%', amp: 13, dur: 2.7, delay: 2.1 },
  { label: 'Motion',         Icon: Music,   bg: '#F59E0B', fg: '#0B0B0A', left: '88%', top: '66%', amp: 9,  dur: 4.0, delay: 1.0 },
]

function FloatingBlob({ label, Icon, bg, fg, left, top, amp, dur, delay }: {
  label: string; Icon: React.ElementType; bg: string; fg: string;
  left: string; top: string; amp: number; dur: number; delay: number;
}) {
  const blobRef = useRef<HTMLDivElement>(null)
  const t0 = useRef(0)
  const drag = useRef({ on: false, sx: 0, sy: 0, sl: 0, st: 0 })

  useEffect(() => {
    t0.current = performance.now() - delay * 1000
    let raf: number
    const tick = (now: number) => {
      if (blobRef.current && !drag.current.on) {
        const y = Math.sin(((now - t0.current) / 1000) * (2 * Math.PI / dur)) * amp
        blobRef.current.style.transform = `translateY(${y.toFixed(2)}px)`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [amp, dur, delay])

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault()
    const el = blobRef.current!
    const pr = el.parentElement!.getBoundingClientRect()
    const er = el.getBoundingClientRect()
    const pl = er.left - pr.left
    const pt = er.top - pr.top
    el.style.left = `${pl}px`
    el.style.top  = `${pt}px`
    el.style.transform = 'scale(1.07)'
    el.style.zIndex = '40'
    el.style.cursor = 'grabbing'
    el.setPointerCapture(e.pointerId)
    drag.current = { on: true, sx: e.clientX, sy: e.clientY, sl: pl, st: pt }
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.on) return
    const { sx, sy, sl, st } = drag.current
    const el = blobRef.current!
    el.style.left = `${sl + e.clientX - sx}px`
    el.style.top  = `${st + e.clientY - sy}px`
  }

  const onPointerUp = () => {
    if (!drag.current.on) return
    drag.current.on = false
    t0.current = performance.now()
    const el = blobRef.current!
    el.style.cursor = 'grab'
    el.style.zIndex = ''
    el.style.transform = 'scale(1)'
  }

  return (
    <div
      ref={blobRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      style={{
        position: 'absolute', left, top,
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '10px 20px', borderRadius: 9999,
        background: bg, color: fg,
        fontWeight: 700, fontSize: 13, letterSpacing: 0.1,
        whiteSpace: 'nowrap',
        boxShadow: `0 8px 30px ${bg}55, 0 2px 8px ${bg}33`,
        cursor: 'grab', userSelect: 'none', touchAction: 'none',
        willChange: 'transform', transition: 'box-shadow 0.2s',
      }}
      onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 14px 44px ${bg}70, 0 2px 8px ${bg}44`)}
      onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 8px 30px ${bg}55, 0 2px 8px ${bg}33`)}
    >
      {(() => { const I = Icon as React.FC<{size:number;strokeWidth:number}>; return <I size={13} strokeWidth={2} /> })()}
      {label}
    </div>
  )
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
  const [counted] = useState(true)
  const c1 = useCountUp(9, 1200, counted)
  const c3 = useCountUp(100, 1500, counted)

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

      {/* ── Animated background blobs ── */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        {/* Cobalt — top right */}
        <div style={{ position: 'absolute', top: '-10%', right: '-4%', width: 440, height: 400, background: '#1445FF', borderRadius: '61% 39% 52% 48% / 44% 56% 44% 56%', opacity: .11, filter: 'blur(80px)', animation: 'blob-drift-1 18s ease-in-out infinite' }} />
        {/* Violet — bottom left */}
        <div style={{ position: 'absolute', bottom: '-6%', left: '-5%', width: 400, height: 360, background: '#7C3AED', borderRadius: '40% 60% 65% 35% / 55% 45% 55% 45%', opacity: .13, filter: 'blur(75px)', animation: 'blob-drift-2 22s ease-in-out infinite' }} />
        {/* Coral — centre right */}
        <div style={{ position: 'absolute', top: '30%', right: '16%', width: 300, height: 280, background: '#FF4520', borderRadius: '50% 50% 40% 60% / 40% 60% 50% 50%', opacity: .09, filter: 'blur(65px)', animation: 'blob-drift-3 15s ease-in-out infinite' }} />
        {/* Lime — top left */}
        <div style={{ position: 'absolute', top: '3%', left: '10%', width: 240, height: 220, background: '#AAFF00', borderRadius: '55% 45% 60% 40% / 40% 60% 40% 60%', opacity: .09, filter: 'blur(55px)', animation: 'blob-drift-4 25s ease-in-out infinite' }} />
        {/* Amber — bottom right */}
        <div style={{ position: 'absolute', bottom: '6%', right: '3%', width: 240, height: 220, background: '#F59E0B', borderRadius: '30% 70% 50% 50% / 60% 40% 60% 40%', opacity: .10, filter: 'blur(60px)', animation: 'blob-drift-1 20s ease-in-out infinite 4s' }} />
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

      {/* ── Floating role blobs (desktop only) ── */}
      <div className="hero-blobs-layer">
        {ROLE_BLOBS.map((b, i) => <FloatingBlob key={i} {...b} />)}
      </div>

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
          <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(58px, 10vw, 112px)', lineHeight: .88, letterSpacing: 1, marginBottom: 14 }}>
            <span style={{ color: 'var(--cream)' }}>Your next</span>{' '}
            <span style={{ color: 'var(--cream)' }}>favourite</span><br />
            <span style={{ color: 'var(--cream)' }}>creative is</span><br />
            <span style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', color: 'var(--orange)' }}>probably a student.</span>
          </h1>

          {/* Mobile scrolling skill pills */}
          <div className="hero-pills-ticker" aria-hidden="true">
            <div className="hero-pills-track">
              {[...TICKER_PILLS, ...TICKER_PILLS].map((p, i) => (
                <span key={i} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '8px 16px', borderRadius: 9999,
                  background: p.bg, color: p.fg,
                  fontWeight: 700, fontSize: 12, letterSpacing: 0.2,
                  whiteSpace: 'nowrap', flexShrink: 0,
                  boxShadow: `0 4px 18px ${p.bg}55`,
                }}>
                  {(() => { const I = p.Icon as React.FC<{size:number;strokeWidth:number}>; return <I size={12} strokeWidth={2} /> })()}
                  {p.label}
                </span>
              ))}
            </div>
          </div>

          {/* Sub-copy */}
          <p style={{ fontSize: 'clamp(14px, 1.8vw, 16px)', lineHeight: 1.75, color: 'rgba(250,250,248,.55)', maxWidth: 460, marginBottom: 28 }}>
            Book photographers, designers, videographers and more — Skillza verified, fairly priced, and ready for your next project.
          </p>

          {/* Mobile talent strip */}
          <div className="hero-talent-strip" aria-label="Browse student talent">
            {cards.map((card, i) => (
              <div key={i} style={{
                flexShrink: 0, width: 160, borderRadius: 14,
                background: '#FFFFFF',
                border: `1px solid ${CARD_ACCENTS[i].border}`,
                boxShadow: '0 2px 16px rgba(0,0,0,.1)',
                padding: 14, position: 'relative', overflow: 'hidden',
                animation: `hcm${i + 1} ${[4.2, 5.1, 3.8][i]}s ease-in-out infinite ${[0, 0.9, 1.7][i]}s`,
              }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, borderRadius: '14px 14px 0 0', background: CARD_ACCENTS[i].top }} />
                {/* Live available dot */}
                <div style={{ position: 'absolute', top: 10, right: 10, width: 7, height: 7, borderRadius: '50%', background: '#3CB97D', boxShadow: '0 0 0 2px rgba(59,185,125,.25)', animation: 'pdot 2s ease-in-out infinite' }} />
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
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 12 }}>
            <Link href="/#talent-grid" className="btn-primary">Browse Talent →</Link>
            <Link href="/join" className="btn-outline">Are you a creative? Join →</Link>
          </div>
          {/* Trust micro-copy */}
          <p style={{ fontSize: 11, color: 'rgba(17,17,16,.45)', marginBottom: 24, letterSpacing: .2 }}>
            Protected payments · Verified SA students · Free to browse
          </p>

          {/* Stats */}
          <div ref={statsRef} style={{ display: 'flex', gap: 'clamp(20px, 5vw, 48px)', paddingTop: 22, borderTop: '1px solid rgba(0,0,0,.08)' }}>
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
                background: '#FFFFFF',
                border: `1px solid ${CARD_ACCENTS[i].border}`,
                borderRadius: 18,
                padding: '18px 20px',
                width: 226,
                boxShadow: `0 16px 48px rgba(0,0,0,.14), 0 0 0 1px ${CARD_ACCENTS[i].border}`,
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
                      <div style={{ position: 'absolute', bottom: -2, right: -2, width: 16, height: 16, borderRadius: '50%', background: CARD_ACCENTS[i].iconBg, border: `1.5px solid #FFFFFF`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: CARD_ACCENTS[i].iconColor }}>
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, borderTop: '1px solid rgba(0,0,0,.08)' }}>
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
          background-image: repeating-linear-gradient(to bottom, rgba(20,69,255,0.09) 0px, rgba(20,69,255,0.09) 1px, transparent 1px, transparent 40px);
        }
        .retro-grid-v {
          background-image: repeating-linear-gradient(to right, rgba(20,69,255,0.09) 0px, rgba(20,69,255,0.09) 1px, transparent 1px, transparent 40px);
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

        /* ── Mobile skill pill ticker ── */
        .hero-pills-ticker {
          overflow: hidden;
          margin: 8px -24px 24px;
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
          mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
        }
        .hero-pills-track {
          display: flex;
          gap: 10px;
          padding: 6px 24px;
          width: max-content;
          animation: hero-pills-scroll 24s linear infinite;
        }
        .hero-pills-track:hover { animation-play-state: paused; }
        @keyframes hero-pills-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (min-width: 900px) {
          .hero-pills-ticker { display: none; }
        }

        .hero-blobs-layer {
          display: none;
          position: absolute; inset: 0;
          pointer-events: none;
          z-index: 10;
        }
        .hero-blobs-layer > * { pointer-events: all; }
        @media (min-width: 900px) {
          .hero-blobs-layer { display: block; }
        }

        @media (min-width: 900px) {
          .hero-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
          .hero-right { display: block; }
          .hero-cards { display: block; position: relative; height: 280px; margin-bottom: 20px; }
          .hero-talent-strip { display: none; }
        }

        .hc-1 { animation: hcf1 6s ease-in-out infinite; }
        .hc-2 { animation: hcf2 6s ease-in-out infinite 1.2s; }
        .hc-3 { animation: hcf3 6s ease-in-out infinite 2.4s; }

        @keyframes hcm1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
        @keyframes hcm2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-9px)} }
        @keyframes hcm3 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }

        @media (prefers-reduced-motion: reduce) {
          .hc-1, .hc-2, .hc-3 { animation: none; }
        }
      `}</style>
    </section>
  )
}
