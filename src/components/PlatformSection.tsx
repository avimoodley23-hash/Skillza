'use client'
import { useRef, useState, useEffect } from 'react'
import { Camera, Palette, ShieldCheck, Banknote, Star, GraduationCap, MessageCircle, BadgeCheck, TrendingUp, Clock } from 'lucide-react'

// ─── Slide definitions ───────────────────────────────────────────
const SLIDES = [
  {
    id: 'browse',
    eyebrow: 'For Clients',
    headline: 'Every creative,\nverified.',
    sub: "Browse real portfolios, transparent pricing, and genuine reviews for every creative. You know exactly who you're booking before you send a message.",
    accent: '#334ED8',       // Electric Blue
    accentDim: 'rgba(51,78,216,.12)',
    accentGlow: 'rgba(51,78,216,.18)',
    tagClass: 'tag-blue',
    card: 'browse',
  },
  {
    id: 'book',
    eyebrow: 'Zero Friction',
    headline: 'Book in minutes.\nNo account.',
    sub: 'Fill a short form. The student WhatsApps you within 24 hours. 30% deposit before work starts. Balance on delivery. No surprises.',
    accent: '#E0E446',       // Citrus Green
    accentDim: 'rgba(224,228,70,.1)',
    accentGlow: 'rgba(224,228,70,.06)',  // reduced — citrus is high-luminosity, keep subtle
    tagClass: 'tag-citrus',
    card: 'book',
  },
  {
    id: 'verify',
    eyebrow: 'Trust Infrastructure',
    headline: 'Skillza\nVerified.',
    sub: 'Every creative goes through identity confirmation, credential checks, and portfolio review before going live. No anonymous profiles. Ever.',
    accent: '#C7B0FF',       // French Lavender
    accentDim: 'rgba(199,176,255,.12)',
    accentGlow: 'rgba(199,176,255,.18)',
    tagClass: 'tag-violet',
    card: 'verify',
  },
]

// ─── Individual UI mockup cards ──────────────────────────────────

function BrowseCard({ accent }: { accent: string }) {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 340 }}>
      {/* Main profile card */}
      <div style={{
        background: '#161514', border: `1px solid ${accent}30`,
        borderRadius: 20, padding: 22, boxShadow: `0 24px 64px rgba(0,0,0,.6), 0 0 0 1px ${accent}20`,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${accent}, ${accent}88)` }} />
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, background: `${accent}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: `1px solid ${accent}30` }}>
            <Camera size={22} strokeWidth={1.5} style={{ color: accent }} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, color: '#FAFAF8' }}>Amahle K.</div>
            <div style={{ fontSize: 11, color: 'rgba(250,250,248,.45)', marginTop: 2 }}>UCT · Visual Communication</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
              {[0,1,2,3,4].map(s => <Star key={s} size={10} strokeWidth={0} fill={accent} />)}
              <span style={{ fontSize: 10, color: 'rgba(250,250,248,.55)', marginLeft: 2 }}>4.9 (12 reviews)</span>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
          {['Events', 'Portraits', 'Products'].map(tag => (
            <span key={tag} style={{ fontSize: 10, fontWeight: 600, padding: '3px 9px', borderRadius: 100, background: `${accent}14`, color: accent, border: `1px solid ${accent}28`, letterSpacing: .5 }}>{tag}</span>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, borderTop: `1px solid rgba(255,255,255,.07)` }}>
          <div>
            <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 22, letterSpacing: 1, color: '#FAFAF8', lineHeight: 1 }}>FROM R550</div>
            <div style={{ fontSize: 10, color: 'rgba(250,250,248,.38)', marginTop: 2 }}>per session</div>
          </div>
          <span style={{ fontSize: 9, fontWeight: 800, padding: '4px 10px', borderRadius: 100, background: 'var(--citrus)', color: '#111', letterSpacing: .8 }}>✓ VERIFIED</span>
        </div>
      </div>
      {/* Floating rating badge */}
      <div style={{
        position: 'absolute', top: -14, right: -14,
        background: '#1C1C1C', border: '1px solid rgba(255,255,255,.1)',
        borderRadius: 12, padding: '8px 14px',
        boxShadow: '0 8px 24px rgba(0,0,0,.5)',
        display: 'flex', alignItems: 'center', gap: 6,
      }}>
        <ShieldCheck size={14} strokeWidth={1.5} style={{ color: accent }} />
        <span style={{ fontSize: 11, fontWeight: 700, color: '#FAFAF8' }}>100% Verified</span>
      </div>
    </div>
  )
}

function BookCard({ accent }: { accent: string }) {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 340 }}>
      {/* Booking form card */}
      <div style={{
        background: '#161514', border: `1px solid ${accent}30`,
        borderRadius: 20, padding: 22, boxShadow: `0 24px 64px rgba(0,0,0,.6), 0 0 0 1px ${accent}20`,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${accent}, ${accent}88)` }} />
        <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 11, letterSpacing: 2.5, color: 'rgba(250,250,248,.38)', marginBottom: 14 }}>BOOKING REQUEST</div>
        {[{ label: 'What do you need?', value: 'Event photography · 3 hrs' }, { label: 'When?', value: 'Sat 15 March · 14:00' }].map(row => (
          <div key={row.label} style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: 'rgba(250,250,248,.38)', letterSpacing: .8, marginBottom: 5, textTransform: 'uppercase' }}>{row.label}</div>
            <div style={{ background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 10, padding: '10px 14px', fontSize: 13, color: '#FAFAF8', fontWeight: 500 }}>{row.value}</div>
          </div>
        ))}
        <div style={{ marginTop: 14, padding: '12px 16px', background: `${accent}12`, border: `1px solid ${accent}28`, borderRadius: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'rgba(250,250,248,.6)', marginBottom: 6 }}>
            <span>Deposit (30%)</span><span style={{ color: '#FAFAF8', fontWeight: 700 }}>R165</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'rgba(250,250,248,.6)' }}>
            <span>Balance on delivery</span><span style={{ color: '#FAFAF8', fontWeight: 700 }}>R385</span>
          </div>
        </div>
        <button style={{ marginTop: 14, width: '100%', background: accent, color: accent === '#E0E446' ? '#111' : '#fff', border: 'none', borderRadius: 100, padding: '12px 20px', fontWeight: 800, fontSize: 13, cursor: 'pointer', letterSpacing: .3 }}>
          Send Request →
        </button>
      </div>
      {/* WhatsApp badge */}
      <div style={{
        position: 'absolute', bottom: -16, left: -14,
        background: '#1C1C1C', border: '1px solid rgba(37,211,102,.25)',
        borderRadius: 12, padding: '8px 14px',
        boxShadow: '0 8px 24px rgba(0,0,0,.5)',
        display: 'flex', alignItems: 'center', gap: 6,
      }}>
        <MessageCircle size={13} strokeWidth={1.5} style={{ color: '#25d366' }} />
        <span style={{ fontSize: 11, fontWeight: 700, color: '#25d366' }}>Replies within 24h</span>
      </div>
    </div>
  )
}

function VerifyCard({ accent }: { accent: string }) {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 320 }}>
      {/* Student ID card */}
      <div style={{
        background: 'linear-gradient(160deg, #1C1525 0%, #130F1A 100%)',
        border: `1px solid ${accent}35`,
        borderRadius: 20, padding: 22, paddingBottom: 28,
        boxShadow: `0 32px 64px rgba(0,0,0,.65), 0 0 0 1px ${accent}22`,
        position: 'relative', overflow: 'hidden',
        transform: 'rotate(-2deg)',
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${accent}, #E0E446)`, borderRadius: '20px 20px 0 0' }} />
        <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 10, letterSpacing: 3, color: 'rgba(250,250,248,.38)', marginBottom: 16 }}>UNIVERSITY OF CAPE TOWN</div>
        <div style={{ display: 'flex', gap: 13, alignItems: 'center', marginBottom: 16 }}>
          <div style={{ width: 48, height: 48, borderRadius: 10, background: `${accent}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${accent}30`, flexShrink: 0 }}>
            <Camera size={22} strokeWidth={1.5} style={{ color: accent }} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, color: '#FAFAF8' }}>Amahle Khumalo</div>
            <div style={{ fontSize: 11, color: 'rgba(250,250,248,.48)', marginTop: 1 }}>BA Visual Communication</div>
            <div style={{ fontSize: 10, color: 'var(--citrus)', marginTop: 2, fontWeight: 700 }}>3rd Year · 2024</div>
          </div>
        </div>
        <div style={{ height: 1, background: `${accent}22`, margin: '0 0 14px' }} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9 }}>
          {[['Student No.', 'UCT2021-4872'], ['Faculty', 'Humanities'], ['Campus', 'Upper Campus'], ['Valid Until', 'Nov 2026']].map(([label, value]) => (
            <div key={label}>
              <div style={{ fontSize: 9, letterSpacing: 1, textTransform: 'uppercase', color: 'rgba(250,250,248,.35)', marginBottom: 2 }}>{label}</div>
              <div style={{ fontSize: 11, color: '#FAFAF8', fontWeight: 600 }}>{value}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Verified stamp */}
      <div style={{
        position: 'absolute', top: 0, right: -18,
        width: 64, height: 64, borderRadius: '50%',
        background: `${accent}18`, border: `2px solid ${accent}50`,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        transform: 'rotate(12deg)',
        boxShadow: `0 4px 20px ${accent}30`,
      }}>
        <BadgeCheck size={20} strokeWidth={1.5} style={{ color: accent }} />
        <div style={{ fontSize: 7, fontWeight: 800, color: accent, letterSpacing: .8, marginTop: 1 }}>VERIFIED</div>
      </div>
    </div>
  )
}

function EarnCard({ accent }: { accent: string }) {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 340 }}>
      {/* Earnings dashboard */}
      <div style={{
        background: '#161514', border: `1px solid ${accent}28`,
        borderRadius: 20, padding: 22,
        boxShadow: `0 24px 64px rgba(0,0,0,.6), 0 0 0 1px ${accent}18`,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${accent}, ${accent}88)` }} />
        <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 11, letterSpacing: 2.5, color: 'rgba(250,250,248,.38)', marginBottom: 8 }}>THIS MONTH</div>
        <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 44, letterSpacing: 1, color: '#FAFAF8', lineHeight: 1, marginBottom: 4 }}>
          R<span style={{ color: accent }}>3,850</span>
        </div>
        <div style={{ fontSize: 11, color: 'rgba(250,250,248,.45)', marginBottom: 18 }}>4 completed jobs · 2 upcoming</div>
        {/* Mini bar chart */}
        <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end', height: 52, marginBottom: 14 }}>
          {[35, 55, 42, 70, 60, 85, 100].map((h, i) => (
            <div key={i} style={{ flex: 1, background: i === 6 ? accent : `${accent}30`, borderRadius: 4, height: `${h}%`, transition: 'height .3s' }} />
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ flex: 1, background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)', borderRadius: 10, padding: '10px 12px' }}>
            <div style={{ fontSize: 10, color: 'rgba(250,250,248,.38)', display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={9} />Avg response</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#FAFAF8', marginTop: 3 }}>3h</div>
          </div>
          <div style={{ flex: 1, background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)', borderRadius: 10, padding: '10px 12px' }}>
            <div style={{ fontSize: 10, color: 'rgba(250,250,248,.38)', display: 'flex', alignItems: 'center', gap: 4 }}><TrendingUp size={9} />Rating</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: accent, marginTop: 3 }}>4.9 ★</div>
          </div>
        </div>
      </div>
      {/* "Join free" badge */}
      <div style={{
        position: 'absolute', top: -16, left: -16,
        background: 'var(--citrus)', borderRadius: 100,
        padding: '6px 14px',
        boxShadow: '0 8px 24px rgba(224,228,70,.3)',
        display: 'flex', alignItems: 'center', gap: 6,
      }}>
        <GraduationCap size={12} strokeWidth={2} style={{ color: '#111' }} />
        <span style={{ fontSize: 11, fontWeight: 800, color: '#111', letterSpacing: .5 }}>FREE TO JOIN</span>
      </div>
    </div>
  )
}

type CardKey = 'browse' | 'book' | 'verify'
const CARD_MAP: Record<CardKey, (accent: string) => React.ReactNode> = {
  browse: (a) => <BrowseCard accent={a} />,
  book:   (a) => <BookCard   accent={a} />,
  verify: (a) => <VerifyCard accent={a} />,
}

// ─── Main component ───────────────────────────────────────────────

export function PlatformSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const [displayIdx, setDisplayIdx] = useState(0)
  const [isFading, setIsFading] = useState(false)
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [progress, setProgress] = useState(0)
  const touchStartXRef = useRef<number | null>(null)

  const goTo = (idx: number) => {
    setActiveIdx(Math.max(0, Math.min(SLIDES.length - 1, idx)))
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartXRef.current
    touchStartXRef.current = null
    if (Math.abs(dx) < 50) return
    if (dx < 0) goTo(activeIdx + 1)
    else goTo(activeIdx - 1)
  }

  useEffect(() => {
    const onScroll = () => {
      if (window.innerWidth <= 859) return
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const scrollable = sectionRef.current.scrollHeight - window.innerHeight
      const scrolled = -rect.top
      const p = Math.max(0, Math.min(1, scrolled / scrollable))
      setProgress(p)
      setActiveIdx(Math.min(SLIDES.length - 1, Math.floor(p * SLIDES.length)))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Crossfade content when active slide changes — prevents re-mount flicker on mobile
  useEffect(() => {
    if (activeIdx === displayIdx) return
    if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current)
    setIsFading(true)
    fadeTimerRef.current = setTimeout(() => {
      setDisplayIdx(activeIdx)
      setIsFading(false)
      fadeTimerRef.current = null
    }, 100)
    return () => { if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current) }
  }, [activeIdx, displayIdx])

  const slide = SLIDES[displayIdx]      // displayed content — updates after fade-out
  const colorSlide = SLIDES[activeIdx]  // accent colours — update instantly

  return (
    <section
      ref={sectionRef}
      id="platform"
      className="platform-section"
      style={{
        position: 'relative',
        background: '#0A0A0A',
      }}
    >
      {/* Sticky viewport */}
      <div
        className="platform-sticky"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >

        {/* Background accent glow — transitions with slide */}
        <div className="platform-bg-glow" aria-hidden="true" style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
          transition: 'background .7s cubic-bezier(.4,0,.2,1)',
          background: `radial-gradient(ellipse 60% 55% at 70% 50%, ${colorSlide.accentGlow} 0%, transparent 70%)`,  // instant colour change
        }} />

        {/* Content */}
        <div style={{
          position: 'relative', zIndex: 1,
          maxWidth: 1200, margin: '0 auto', width: '100%',
          padding: '0 clamp(20px, 5vw, 64px)',
          display: 'grid',
          gap: 'clamp(32px, 6vw, 80px)',
        }} className="platform-grid">

          {/* ── Left: text ── */}
          <div className="platform-text-area" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

            {/* Slide counter — uses activeIdx directly for instant visual feedback */}
            <div className="platform-counter" style={{ display: 'flex', gap: 6, marginBottom: 32 }}>
              {SLIDES.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => goTo(i)}
                  aria-label={`View ${s.eyebrow}`}
                  style={{
                    flex: i === activeIdx ? 3 : 1,
                    padding: '8px 0',
                    background: 'none', border: 'none', cursor: 'pointer',
                    transition: 'flex .5s cubic-bezier(.4,0,.2,1)',
                    display: 'flex', alignItems: 'center',
                  }}
                >
                  <div style={{
                    height: 3, borderRadius: 2, width: '100%',
                    background: i === activeIdx ? colorSlide.accent : 'rgba(255,255,255,.38)',
                    transition: 'background .5s',
                  }} />
                </button>
              ))}
            </div>

            {/* Fading content — eyebrow, headline, body, index all crossfade together */}
            <div style={{
              opacity: isFading ? 0 : 1,
              transform: isFading ? 'translateY(10px)' : 'translateY(0)',
              transition: 'opacity 0.2s ease, transform 0.2s ease',
            }}>

            {/* Eyebrow */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontSize: 11, fontWeight: 700, letterSpacing: 2.5,
              textTransform: 'uppercase', color: slide.accent,
              marginBottom: 18,
            }}>
              <span style={{ width: 18, height: 1.5, background: slide.accent, display: 'inline-block' }} />
              {slide.eyebrow}
            </div>

            {/* Headline */}
            <h2
              style={{
                fontFamily: 'Bebas Neue, sans-serif',
                fontSize: 'clamp(42px, 10vw, 96px)',
                lineHeight: .9,
                letterSpacing: 1,
                color: '#FAFAF8',
                marginBottom: 20,
                whiteSpace: 'pre-line',
              }}
            >
              {slide.headline}
            </h2>

            {/* Body */}
            <p
              style={{
                fontSize: 'clamp(14px, 1.6vw, 16px)',
                lineHeight: 1.8,
                color: 'rgba(250,250,248,.55)',
                maxWidth: 420,
                marginBottom: 32,
              }}
            >
              {slide.sub}
            </p>

            {/* Slide index label */}
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,.2)', fontWeight: 600, letterSpacing: 1 }}>
              {String(displayIdx + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
            </div>
            </div>{/* end fading content */}

          </div>

          {/* ── Right: UI card mockup ── */}
          <div
            className="platform-card-area"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: 'clamp(16px, 4vw, 48px)',
              opacity: isFading ? 0 : 1,
              transform: isFading ? 'scale(0.96) translateY(8px)' : 'scale(1) translateY(0)',
              transition: 'opacity 0.2s ease, transform 0.2s ease',
            }}
          >
            {CARD_MAP[slide.card as CardKey](slide.accent)}
          </div>
        </div>

        {/* Bottom: section label */}
        <div style={{
          position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', alignItems: 'center', gap: 8,
          fontSize: 11, fontWeight: 600, letterSpacing: 1.5,
          textTransform: 'uppercase', color: 'rgba(255,255,255,.2)',
          pointerEvents: 'none',
        }}>
          <span>ONE PLATFORM FOR EVERYTHING</span>
        </div>
      </div>

      <style>{`
        .platform-section {
          height: calc(3 * 100vh);
        }
        .platform-grid {
          grid-template-columns: 1fr;
        }
        @media (max-width: 859px) {
          /* Use 100dvh — dynamic viewport height that excludes browser chrome on iOS Safari */
          .platform-section {
            height: 100dvh;
          }
          .platform-sticky {
            height: 100dvh !important;
          }
          .platform-bg-glow {
            opacity: 0.45;
          }
          /* On mobile: counter flows naturally in document */
          .platform-counter {
            position: static !important;
            top: auto !important;
            left: auto !important;
            right: auto !important;
            margin-bottom: 12px !important;
            z-index: auto !important;
          }
          /* Stable two-row layout so all 3 slides are the same height */
          .platform-grid {
            gap: 0 !important;
            padding-top: calc(60px + env(safe-area-inset-top, 0px) + 12px) !important;
            padding-bottom: 12px !important;
            grid-template-rows: auto 1fr;
            align-items: stretch !important;
          }
          /* Fixed min-height prevents text area from collapsing/expanding between slides */
          .platform-text-area {
            min-height: 240px;
          }
          /* Card area fills remaining vertical space — all cards centre within it */
          .platform-card-area {
            flex: 1;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            padding: 8px 0 !important;
            min-height: 220px;
            overflow: visible;
          }
          /* Scale oversized cards to fit without cropping */
          .platform-card-area > * {
            transform-origin: top center;
            max-width: 100% !important;
          }
        }
        @media (min-width: 860px) {
          .platform-grid {
            grid-template-columns: 1fr 1fr;
            align-items: center;
          }
        }
        /* slideTextIn / cardSwapIn replaced by JS-driven crossfade — no keyframes needed */
        @media (prefers-reduced-motion: reduce) {
          .platform-grid * { animation: none !important; transition: none !important; }
        }
      `}</style>
    </section>
  )
}

export default PlatformSection
