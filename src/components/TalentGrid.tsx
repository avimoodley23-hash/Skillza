'use client'
import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Search, Star, CircleCheck } from 'lucide-react'
import type { StudentFull as Student } from '@/types/database'
import { ProfilePanel } from '@/components/ProfilePanel'
import { BookingModal } from '@/components/BookingModal'
import { BROWSE_CATEGORIES as CATEGORIES } from '@/lib/skills'
import { getSkillIcon } from '@/lib/skills'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

function useScramble(original: string) {
  const [display, setDisplay] = useState(original)
  const frameRef = useRef<number | null>(null)
  const iterRef = useRef(0)

  const scramble = () => {
    iterRef.current = 0
    const totalFrames = original.length * 3

    const tick = () => {
      iterRef.current++
      const progress = iterRef.current / totalFrames
      const resolved = Math.floor(progress * original.length)

      setDisplay(
        original
          .split('')
          .map((char, idx) => {
            if (char === ' ') return ' '
            if (idx < resolved) return char
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join('')
      )

      if (iterRef.current < totalFrames) {
        frameRef.current = requestAnimationFrame(tick)
      } else {
        setDisplay(original)
      }
    }

    if (frameRef.current) cancelAnimationFrame(frameRef.current)
    frameRef.current = requestAnimationFrame(tick)
  }

  const reset = () => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current)
    setDisplay(original)
  }

  useEffect(() => () => { if (frameRef.current) cancelAnimationFrame(frameRef.current) }, [])

  return { display, scramble, reset }
}

const SORT_OPTIONS = [
  { id: 'default', label: 'Featured' },
  { id: 'price_asc', label: 'Price: Low to High' },
  { id: 'price_desc', label: 'Price: High to Low' },
  { id: 'rating', label: 'Top Rated' },
]

// Palette-driven card colour themes — cycles per card index
const CARD_COLORS = [
  { bg: '#334ED8', imgGrad: '#1E3AC0', border: '#2540B8', hoverShadow: 'rgba(51,78,216,0.35)',  text: '#FFFFFF', sub: 'rgba(255,255,255,0.65)', tagBg: 'rgba(255,255,255,0.15)', tagText: 'rgba(255,255,255,0.85)', uniBg: 'rgba(255,255,255,0.12)', uniText: 'rgba(255,255,255,0.8)',  uniBorder: 'rgba(255,255,255,0.2)',  verBg: '#E0E446', verText: '#1A1A1A', ratingCol: '#E0E446', priceBorder: 'rgba(255,255,255,0.2)',  bookBg: '#FFFFFF', bookText: '#334ED8' },
  { bg: '#C0F0AA', imgGrad: '#88CC70', border: '#9EDA89', hoverShadow: 'rgba(80,160,50,0.25)',  text: '#1A3A1A', sub: 'rgba(26,58,26,0.6)',    tagBg: 'rgba(26,58,26,0.1)',    tagText: '#33473B',              uniBg: 'rgba(26,58,26,0.08)',  uniText: '#33473B',            uniBorder: 'rgba(26,58,26,0.18)', verBg: '#334ED8', verText: '#FFFFFF', ratingCol: '#FF7144', priceBorder: 'rgba(26,58,26,0.15)',  bookBg: '#334ED8', bookText: '#FFFFFF' },
  { bg: '#FFE8D2', imgGrad: '#E8C090', border: '#E0C090', hoverShadow: 'rgba(200,100,40,0.2)',  text: '#1A1A1A', sub: 'rgba(17,17,16,0.5)',    tagBg: 'rgba(17,17,16,0.06)',   tagText: '#33473B',              uniBg: 'rgba(17,17,16,0.06)',  uniText: '#33473B',            uniBorder: 'rgba(17,17,16,0.12)', verBg: '#334ED8', verText: '#FFFFFF', ratingCol: '#FF7144', priceBorder: 'rgba(17,17,16,0.12)', bookBg: '#334ED8', bookText: '#FFFFFF' },
  { bg: '#D8E6FF', imgGrad: '#A0BEF0', border: '#AACAFF', hoverShadow: 'rgba(51,78,216,0.18)', text: '#1A1A1A', sub: 'rgba(51,78,216,0.7)',    tagBg: 'rgba(51,78,216,0.1)',   tagText: '#334ED8',              uniBg: 'rgba(51,78,216,0.08)', uniText: '#334ED8',            uniBorder: 'rgba(51,78,216,0.2)', verBg: '#33473B', verText: '#FFFFFF', ratingCol: '#FF7144', priceBorder: 'rgba(51,78,216,0.15)', bookBg: '#334ED8', bookText: '#FFFFFF' },
  { bg: '#FFA9FF', imgGrad: '#DC78DC', border: '#E090E0', hoverShadow: 'rgba(180,80,180,0.28)', text: '#1A1A1A', sub: 'rgba(90,26,90,0.6)',    tagBg: 'rgba(90,26,90,0.08)',   tagText: '#5A1A5A',              uniBg: 'rgba(90,26,90,0.07)',  uniText: '#5A1A5A',            uniBorder: 'rgba(90,26,90,0.18)', verBg: '#334ED8', verText: '#FFFFFF', ratingCol: '#FF7144', priceBorder: 'rgba(90,26,90,0.15)', bookBg: '#334ED8', bookText: '#FFFFFF' },
  { bg: '#E0E446', imgGrad: '#B8BC18', border: '#C8CC28', hoverShadow: 'rgba(160,168,0,0.3)',   text: '#1A1A1A', sub: 'rgba(17,17,16,0.55)',   tagBg: 'rgba(17,17,16,0.08)',   tagText: '#33473B',              uniBg: 'rgba(17,17,16,0.07)',  uniText: '#33473B',            uniBorder: 'rgba(17,17,16,0.15)', verBg: '#33473B', verText: '#FFFFFF', ratingCol: '#FF7144', priceBorder: 'rgba(17,17,16,0.12)', bookBg: '#33473B', bookText: '#FFFFFF' },
]

function parsePrice(p: string): number {
  return parseInt(p.replace(/[^0-9]/g, '')) || 0
}

export default function TalentGrid({ students }: { students: Student[] }) {
  const [activeFilter, setActiveFilter] = useState('all')
  const [sortBy, setSortBy] = useState('default')
  const [search, setSearch] = useState('')
  const [activeStudent, setActiveStudent] = useState<Student | null>(null)
  const [bookingStudent, setBookingStudent] = useState<Student | null>(null)
  const hasAnimated = useRef<boolean>(false)

  useEffect(() => {
    hasAnimated.current = true
  }, [])

  const filtered = students
    .filter(s => {
      if (search) {
        const q = search.toLowerCase()
        return (
          s.name.toLowerCase().includes(q) ||
          s.skill.toLowerCase().includes(q) ||
          (s.university ?? '').toLowerCase().includes(q) ||
          (s.bio ?? '').toLowerCase().includes(q)
        )
      }
      return true
    })
    .filter(s => activeFilter === 'all' || s.category === activeFilter)
    .sort((a, b) => {
      if (sortBy === 'price_asc') return parsePrice(a.starting_price) - parsePrice(b.starting_price)
      if (sortBy === 'price_desc') return parsePrice(b.starting_price) - parsePrice(a.starting_price)
      if (sortBy === 'rating') return b.rating - a.rating
      return 0
    })

  const openProfile = (student: Student) => {
    setBookingStudent(null)
    setActiveStudent(student)
  }

  const openBooking = (student: Student) => {
    setActiveStudent(null)
    setBookingStudent(student)
  }

  return (
    <>
      <section id="talent-grid" style={{ padding: 'clamp(48px, 8vw, 80px) 24px 40px', background: '#F7F7F5' }}>
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#334ED8', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 18, height: 1.5, background: '#334ED8', display: 'inline-block', flexShrink: 0 }} />
            Browse Talent
          </div>
          <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(34px, 6vw, 60px)', lineHeight: .93, letterSpacing: 1, marginBottom: 14, color: '#1A1A1A' }}>
            Trained. Verified.<br />Right in your city.
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <p style={{ fontSize: 12, color: '#888888' }}>Showing {filtered.length} verified student{filtered.length !== 1 ? 's' : ''}</p>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              style={{
                background: '#FFFFFF', color: '#1A1A1A',
                border: '1px solid rgba(17,17,16,.15)', borderRadius: 8,
                padding: '8px 12px', fontSize: 12, fontWeight: 600,
                cursor: 'pointer', fontFamily: 'Instrument Sans, sans-serif',
              }}
            >
              {SORT_OPTIONS.map(o => <option key={o.id} value={o.id}>{o.label}</option>)}
            </select>
          </div>
        </div>

        {/* Search */}
        <div style={{ position: 'relative', marginBottom: 10 }}>
          <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', opacity: .4, display: 'flex', alignItems: 'center' }}>
            <Search size={15} strokeWidth={1.5} style={{ color: '#1A1A1A' }} />
          </span>
          <input
            type="search"
            value={search}
            onChange={e => { setSearch(e.target.value); setActiveFilter('all') }}
            placeholder="Search by name, skill or university…"
            style={{
              width: '100%', background: '#FFFFFF', border: '1px solid rgba(17,17,16,.15)',
              borderRadius: 10, padding: '11px 16px 11px 40px',
              color: '#1A1A1A', fontSize: 13,
              fontFamily: 'Instrument Sans, sans-serif', outline: 'none',
              transition: 'border-color .2s',
            }}
            onFocus={e => (e.currentTarget.style.borderColor = '#334ED8')}
            onBlur={e => (e.currentTarget.style.borderColor = 'rgba(17,17,16,.15)')}
          />
        </div>

        {/* Filter bar */}
        <div style={{
          position: 'sticky', top: 'calc(60px + env(safe-area-inset-top, 0px))', zIndex: 200,
          background: 'rgba(250,250,248,.97)', backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border)',
          margin: '0 -24px', padding: '10px 24px',
          overflowX: 'auto', display: 'flex', gap: 6,
          scrollbarWidth: 'none',
          WebkitMaskImage: 'linear-gradient(to right, black calc(100% - 56px), transparent 100%)',
          maskImage: 'linear-gradient(to right, black calc(100% - 56px), transparent 100%)',
        }}>
          {CATEGORIES.map(cat => {
            const CatIcon = cat.icon
            return (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                style={{
                  padding: '8px 16px', borderRadius: 100,
                  fontSize: 12, fontWeight: 600,
                  border: '1px solid',
                  borderColor: activeFilter === cat.id ? '#334ED8' : 'rgba(17,17,16,.14)',
                  background: activeFilter === cat.id ? '#334ED8' : '#FFFFFF',
                  color: activeFilter === cat.id ? '#fff' : '#555555',
                  cursor: 'pointer', whiteSpace: 'nowrap',
                  transition: 'all .18s', minHeight: 44, flexShrink: 0,
                  boxShadow: activeFilter === cat.id ? '0 2px 12px rgba(20,69,255,.25)' : 'none',
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                }}
              >
                {CatIcon && <CatIcon size={14} strokeWidth={1.5} />}
                {cat.label}
              </button>
            )
          })}
        </div>

        {/* Grid */}
        <div className="talent-grid" style={{ marginTop: 16 }}>
          {filtered.map((student, i) => (
            <StudentCard
              key={student.id}
              student={student}
              index={i}
              isInitialLoad={!hasAnimated.current}
              onOpen={() => openProfile(student)}
              onBook={() => openBooking(student)}
              colors={CARD_COLORS[i % CARD_COLORS.length]}
            />
          ))}
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 20px', gridColumn: '1 / -1' }}>
              <div style={{ marginBottom: 12, display: 'flex', justifyContent: 'center' }}>
                <Search size={32} strokeWidth={1.5} style={{ color: 'var(--muted)' }} />
              </div>
              <p style={{ color: '#888888', fontSize: 14, marginBottom: 8 }}>
                {search ? `No results for "${search}"` : 'No students in this category yet.'}
              </p>
              {search && (
                <button onClick={() => setSearch('')} style={{ background: 'none', border: 'none', color: 'var(--orange)', fontSize: 13, cursor: 'pointer', textDecoration: 'underline' }}>
                  Clear search
                </button>
              )}
            </div>
          )}
        </div>

        <style>{`
          @keyframes fup { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }

          /* Mobile: single column */
          .talent-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 12px;
          }

          /* Tablet: 2 columns */
          @media (min-width: 600px) {
            .talent-grid {
              grid-template-columns: repeat(2, 1fr);
              gap: 16px;
            }
          }

          /* Desktop: 3-4 columns */
          @media (min-width: 900px) {
            .talent-grid {
              grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
              gap: 20px;
            }
          }

          /* Mobile card: horizontal layout */
          .student-card-inner {
            display: flex;
            flex-direction: row;
            align-items: stretch;
          }
          .student-card-image {
            width: 110px;
            flex-shrink: 0;
            position: relative;
            background: linear-gradient(135deg, #E8EDFF, #d4deff);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 40px;
            overflow: hidden;
            border-radius: 12px 0 0 12px;
          }
          .student-card-body {
            flex: 1;
            padding: 14px 14px 14px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-width: 0;
          }
          .student-card-tags { display: flex; }
          .student-card-bio { display: block; }
          /* Hide portfolio strip on mobile (too cramped in 110px column) */
          .portfolio-strip { display: none !important; }

          /* Tablet+: vertical card layout */
          @media (min-width: 600px) {
            .student-card-inner {
              flex-direction: column;
            }
            .student-card-image {
              width: 100%;
              aspect-ratio: 4/3;
              border-radius: 12px 12px 0 0;
            }
            .student-card-body {
              padding: 14px 15px 15px;
            }
            /* Show portfolio strip on vertical card layout */
            .portfolio-strip { display: flex !important; }
          }

        `}</style>
      </section>

      {activeStudent && (
        <ProfilePanel
          student={activeStudent as any}
          onClose={() => setActiveStudent(null)}
          onBook={(s) => { setActiveStudent(null); setBookingStudent(s as any) }}
        />
      )}

      {bookingStudent && (
        <BookingModal
          student={bookingStudent as any}
          onClose={() => setBookingStudent(null)}
        />
      )}
    </>
  )
}

function StudentCard({ student, index, isInitialLoad, onOpen, onBook, colors }: {
  student: Student
  index: number
  isInitialLoad: boolean
  onOpen: () => void
  onBook: () => void
  colors: typeof CARD_COLORS[0]
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { display: nameDisplay, scramble, reset: resetScramble } = useScramble(student.short_name ?? student.name)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
    const rotateX = -dy * 6
    const rotateY = dx * 6
    el.style.transform = `perspective(800px) translateY(-4px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget as HTMLElement
    el.style.boxShadow = `0 12px 40px ${colors.hoverShadow}`
    el.style.transform = 'translateY(-3px)'
    scramble()
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget as HTMLElement
    el.style.boxShadow = '0 2px 16px rgba(17,17,16,0.06)'
    el.style.transform = 'translateY(0)'
    resetScramble()
  }

  const SkillIcon = getSkillIcon(student.skill)

  return (
    <div
      ref={cardRef}
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={e => { if (e.key === 'Enter') onOpen() }}
      aria-label={`View ${student.name}'s profile`}
      style={{
        background: colors.bg,
        border: `1px solid ${colors.border}`,
        borderRadius: 14,
        overflow: 'hidden',
        transition: 'all .3s',
        cursor: 'pointer',
        willChange: 'transform',
        boxShadow: '0 2px 16px rgba(17,17,16,0.06)',
        ...(isInitialLoad
          ? {
              animation: `fup .4s ease both`,
              animationDelay: `${index * 0.04}s`,
            }
          : {}),
      }}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="student-card-inner">

        {/* Image */}
        <div className="student-card-image" style={{ background: `linear-gradient(150deg, ${colors.bg}, ${colors.imgGrad})` }}>
          {student.photo_url
            ? <Image
                src={student.photo_url}
                alt={student.name}
                fill
                sizes="(max-width: 600px) 110px, (max-width: 900px) 50vw, 280px"
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
              />
            : <SkillIcon size={18} strokeWidth={1.5} style={{ color: colors.text, opacity: 0.6 }} />
          }
          {/* Gradient overlay */}
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, ${colors.imgGrad}CC 0, transparent 55%)` }} />
          {/* Portfolio thumbnail strip — visible on tablet+ layout */}
          {(() => {
            const thumbs = (student.student_portfolio ?? []).filter(p => p.image_url).slice(0, 3)
            if (thumbs.length === 0) return null
            return (
              <div className="portfolio-strip" style={{
                position: 'absolute', bottom: 7, left: 7, right: 7,
                display: 'flex', gap: 4, zIndex: 2,
              }}>
                {thumbs.map((p, i) => (
                  <div key={i} style={{
                    flex: 1, aspectRatio: '1', borderRadius: 5, overflow: 'hidden',
                    border: '1px solid rgba(255,255,255,.15)',
                    background: 'rgba(0,0,0,.4)',
                  }}>
                    <img
                      src={p.image_url!}
                      alt=""
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                ))}
              </div>
            )
          })()}
        </div>

        {/* Body */}
        <div className="student-card-body">
          {/* Top row: uni + verified (mobile only shows uni here) */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6, marginBottom: 6 }}>
              <span style={{
                fontSize: 10, fontWeight: 600, color: colors.uniText,
                background: colors.uniBg, padding: '3px 8px',
                borderRadius: 100, border: `1px solid ${colors.uniBorder}`,
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}>
                {student.university} · {student.year}
              </span>
              {/* Verified badge */}
              <span style={{
                fontSize: 9, fontWeight: 800, color: colors.verText,
                background: colors.verBg,
                padding: '3px 8px', borderRadius: 100, whiteSpace: 'nowrap',
                display: 'inline-flex', alignItems: 'center', gap: 3,
                letterSpacing: .4,
              }}>
                <CircleCheck size={9} strokeWidth={2.5} />
                Verified
              </span>
            </div>

            {/* Name + rating */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
              <div style={{ fontWeight: 700, fontSize: 15, color: colors.text, lineHeight: 1.2 }}>{nameDisplay}</div>
              {(student.review_count ?? 0) > 0 ? (
                <div style={{ fontSize: 12, color: colors.ratingCol, fontWeight: 600, whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                  <Star size={11} strokeWidth={1.5} style={{ fill: colors.ratingCol, color: colors.ratingCol }} />
                  {student.rating}
                  <span style={{ fontSize: 10, fontWeight: 500, opacity: 0.65 }}>({student.review_count})</span>
                </div>
              ) : (
                <span style={{ fontSize: 9, fontWeight: 800, padding: '2px 7px', borderRadius: 100, background: 'rgba(51,78,216,.12)', color: '#334ED8', letterSpacing: .6, border: '1px solid rgba(51,78,216,.2)' }}>NEW</span>
              )}
            </div>

            {/* Skill */}
            <div style={{ fontSize: 12, color: colors.sub, marginBottom: 8 }}>{student.skill}</div>

            {/* Bio */}
            {student.bio && (
              <div className="student-card-bio" style={{
                fontSize: 11, color: colors.sub, lineHeight: 1.5,
                marginBottom: 8,
                display: '-webkit-box', WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical', overflow: 'hidden',
              }}>
                {student.bio}
              </div>
            )}

            {/* Tags */}
            {student.tags && student.tags.length > 0 && (
              <div className="student-card-tags" style={{ gap: 4, flexWrap: 'wrap', marginBottom: 8 }}>
                {student.tags.slice(0, 3).map(tag => (
                  <span key={tag} style={{
                    fontSize: 10, padding: '3px 7px', borderRadius: 100,
                    background: colors.tagBg, color: colors.tagText,
                    border: `1px solid ${colors.uniBorder}`,
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Bottom: price + book */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            paddingTop: 10, borderTop: `1px solid ${colors.priceBorder}`, gap: 8, marginTop: 4,
          }}>
            <div>
              <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 20, letterSpacing: 1, color: colors.text, lineHeight: 1 }}>
                from {student.starting_price}
                <small style={{ fontFamily: 'Instrument Sans, sans-serif', fontSize: 10, fontWeight: 400, color: colors.sub, display: 'block' }}>/ {student.price_unit}</small>
              </div>
            </div>
            <button
              onClick={e => { e.stopPropagation(); onBook() }}
              style={{
                background: colors.bookBg, color: colors.bookText,
                border: 'none',
                padding: '10px 18px', borderRadius: 8,
                fontSize: 12, fontWeight: 700,
                cursor: 'pointer', minHeight: 44, whiteSpace: 'nowrap',
                transition: 'all .2s', flexShrink: 0,
                boxShadow: `0 2px 12px ${colors.hoverShadow}`,
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.85' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
              aria-label={`Book ${student.name}`}
            >
              Book
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
