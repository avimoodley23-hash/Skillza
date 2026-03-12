import { supabase } from '@/lib/supabase'
import type { StudentFull } from '@/types/database'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export const revalidate = 60

async function getStudent(id: string): Promise<StudentFull | null> {
  const { data, error } = await supabase
    .from('students')
    .select(`*, student_pricing(*), student_portfolio(*), student_reviews(*)`)
    .eq('id', id)
    .eq('verified', true)
    .single()

  if (error || !data) return null
  return data as unknown as StudentFull
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const student = await getStudent(params.id)
  if (!student) return { title: 'Student Not Found — Skillza' }
  return {
    title: `${student.name} — ${student.skill} · Skillza`,
    description: student.bio || `Book ${student.name}, a verified ${student.skill} student at ${student.university}.`,
  }
}

const ACCENT = '#334ED8'
const ACCENT2 = '#1E3AC0'

export default async function StudentPage({ params }: { params: { id: string } }) {
  const student = await getStudent(params.id)
  if (!student) notFound()

  const pricing = (student.student_pricing ?? []).sort((a, b) => a.sort_order - b.sort_order)
  const reviews = (student.student_reviews ?? []).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  const minPrice = pricing[0]?.price ?? student.starting_price

  return (
    <>
      <style>{`
        @keyframes ppBlob1 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-10px,8px) scale(1.08)} }
        @keyframes ppBlob2 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(8px,-6px) scale(1.06)} }
        @keyframes ppBlob3 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(6px,10px) scale(0.94)} }
        .sp-back:hover { color: ${ACCENT} !important; }
        .sp-portfolio-img:hover { opacity: .88; }
        .sp-book-btn:hover { opacity: .86; }
      `}</style>

      <div style={{ minHeight: '100svh', background: '#FAFAF6', fontFamily: 'Instrument Sans, sans-serif' }}>

        {/* Sticky top bar */}
        <div style={{
          position: 'sticky', top: 0, zIndex: 200,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '14px 20px',
          background: 'rgba(250,250,246,.96)',
          borderBottom: '1px solid rgba(17,17,16,.08)',
          backdropFilter: 'blur(14px)',
        }}>
          <Link href="/" className="sp-back" style={{
            fontSize: 13, fontWeight: 600, color: '#888', textDecoration: 'none',
            display: 'flex', alignItems: 'center', gap: 6, transition: 'color .2s',
          }}>
            ← Skillza
          </Link>
          <span style={{ fontSize: 12, color: '#888', fontWeight: 600, letterSpacing: .5, textTransform: 'uppercase' }}>Profile</span>
          <div style={{ width: 60 }} />
        </div>

        {/* Coloured hero strip */}
        <div style={{
          position: 'relative', overflow: 'hidden',
          background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})`,
          height: 120,
        }}>
          <div style={{ position: 'absolute', width: 130, height: 130, borderRadius: '50%', background: 'rgba(255,255,255,.1)', top: -40, right: -20, animation: 'ppBlob1 5s ease-in-out infinite' }} />
          <div style={{ position: 'absolute', width: 90, height: 90, borderRadius: '50%', background: 'rgba(255,255,255,.08)', bottom: -30, left: '30%', animation: 'ppBlob2 6.5s ease-in-out infinite' }} />
          <div style={{ position: 'absolute', width: 60, height: 60, borderRadius: '50%', background: 'rgba(255,255,255,.12)', top: 10, left: 20, animation: 'ppBlob3 4.2s ease-in-out infinite' }} />
        </div>

        {/* Avatar overlapping strip */}
        <div style={{ maxWidth: 640, margin: '0 auto', padding: '0 22px', marginTop: -46, position: 'relative', zIndex: 2, marginBottom: 16 }}>
          <div style={{
            width: 82, height: 82, borderRadius: 18,
            background: ACCENT, display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: 40, flexShrink: 0,
            border: '3px solid #FAFAF6', overflow: 'hidden',
            boxShadow: `0 4px 20px rgba(51,78,216,.35)`,
          }}>
            {student.photo_url
              ? <img src={student.photo_url} alt={student.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
              : <span style={{ fontSize: 40 }}>{student.emoji}</span>
            }
          </div>
        </div>

        {/* Content */}
        <div style={{ maxWidth: 640, margin: '0 auto', paddingBottom: 120 }}>

          {/* Name + badges */}
          <div style={{ padding: '0 22px 20px', borderBottom: '1px solid rgba(17,17,16,.08)' }}>
            <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 34, letterSpacing: 1, lineHeight: 1, color: '#111110', margin: '0 0 3px' }}>{student.name}</h1>
            <p style={{ fontSize: 13, color: '#666', margin: '0 0 10px' }}>{student.skill}{student.degree ? ` · ${student.degree}` : ''}</p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 100, background: '#E0E446', color: '#1A1A1A', letterSpacing: .3 }}>✓ Skillza Verified</span>
              <span style={{ fontSize: 10, fontWeight: 600, padding: '3px 9px', borderRadius: 100, background: 'rgba(17,17,16,.07)', color: '#333', border: '1px solid rgba(17,17,16,.1)' }}>{student.university}</span>
              <span style={{ fontSize: 10, fontWeight: 600, padding: '3px 9px', borderRadius: 100, background: `${ACCENT}18`, color: ACCENT, border: `1px solid ${ACCENT}30` }}>{student.year}</span>
            </div>
          </div>

          {/* About */}
          <div style={{ padding: '20px 22px', borderBottom: '1px solid rgba(17,17,16,.08)' }}>
            <SectionLabel>About</SectionLabel>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: 'rgba(17,17,16,.72)', margin: 0 }}>{student.bio}</p>
            {student.availability && student.availability.length > 0 && (
              <div style={{ marginTop: 14 }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#888', marginBottom: 8 }}>Availability</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {student.availability.map(a => (
                    <span key={a} style={{ fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 100, background: 'rgba(51,139,78,.1)', color: '#246B34', border: '1px solid rgba(51,139,78,.22)' }}>{a}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Portfolio images */}
          {(() => {
            const images = (student.student_portfolio ?? []).filter(p => p.image_url)
            if (!images.length) return null
            return (
              <div style={{ padding: '20px 22px', borderBottom: '1px solid rgba(17,17,16,.08)' }}>
                <SectionLabel>Portfolio Work</SectionLabel>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 7 }}>
                  {images.map((p, i) => (
                    <a key={p.id} href={p.image_url!} target="_blank" rel="noreferrer noopener" className="sp-portfolio-img"
                      style={{
                        aspectRatio: '1', borderRadius: 9, display: 'block',
                        overflow: 'hidden', border: '1px solid rgba(17,17,16,.1)',
                        background: '#EEE', position: 'relative', transition: 'opacity .18s',
                      }}>
                      <img src={p.image_url!} alt={p.label || `Portfolio item ${i + 1}`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                      {p.label && (
                        <div style={{
                          position: 'absolute', bottom: 0, left: 0, right: 0,
                          padding: '22px 6px 5px',
                          background: 'linear-gradient(to top, rgba(0,0,0,.65) 0, transparent 100%)',
                          fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,.9)',
                          letterSpacing: .3, textTransform: 'uppercase',
                          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                        }}>{p.label}</div>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            )
          })()}

          {/* Pricing */}
          {pricing.length > 0 && (
            <div style={{ padding: '20px 22px', borderBottom: '1px solid rgba(17,17,16,.08)' }}>
              <SectionLabel>Pricing</SectionLabel>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                {pricing.map(tier => (
                  <div key={tier.id} style={{
                    background: tier.featured ? `${ACCENT}12` : '#F5F3EE',
                    border: `1px solid ${tier.featured ? `${ACCENT}40` : 'rgba(17,17,16,.09)'}`,
                    borderRadius: 11, padding: '15px 17px',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10,
                  }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 2, color: '#111110' }}>{tier.name}</div>
                      <div style={{ fontSize: 12, color: '#666' }}>{tier.description}</div>
                      {tier.featured && <span style={{ fontSize: 9, fontWeight: 700, background: '#FFFFFF', color: ACCENT, padding: '2px 8px', borderRadius: 100, marginTop: 5, display: 'inline-block', letterSpacing: .4 }}>Most Popular</span>}
                    </div>
                    <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 22, letterSpacing: 1, color: '#111110', textAlign: 'right', flexShrink: 0 }}>
                      {tier.price}<small style={{ fontFamily: 'Instrument Sans, sans-serif', fontSize: 10, fontWeight: 400, color: '#888', display: 'block' }}>/ {tier.unit}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reviews */}
          {reviews.length > 0 && (
            <div style={{ padding: '20px 22px' }}>
              <SectionLabel>Reviews</SectionLabel>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                {reviews.map(rev => (
                  <div key={rev.id} style={{ background: '#F5F3EE', border: '1px solid rgba(17,17,16,.08)', borderRadius: 10, padding: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }}>
                      <span style={{ fontWeight: 600, fontSize: 13, color: '#111110' }}>{rev.reviewer_name}</span>
                      <span style={{ color: '#D4A800', fontSize: 13 }}>{'★'.repeat(rev.stars)}{'☆'.repeat(5 - rev.stars)}</span>
                    </div>
                    <p style={{ fontSize: 13, color: 'rgba(17,17,16,.65)', lineHeight: 1.72, margin: 0 }}>{rev.text}</p>
                    <p style={{ fontSize: 10, color: '#888', marginTop: 5, marginBottom: 0 }}>{new Date(rev.created_at).toLocaleDateString('en-ZA', { month: 'long', year: 'numeric' })}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sticky bottom CTA */}
        <div style={{
          position: 'fixed', bottom: 0, left: 0, right: 0,
          padding: '14px 22px', paddingBottom: 'calc(14px + env(safe-area-inset-bottom, 0px))',
          background: 'rgba(250,250,246,.97)',
          borderTop: '1px solid rgba(17,17,16,.1)',
          display: 'flex', gap: 11, alignItems: 'center',
          backdropFilter: 'blur(14px)',
          zIndex: 100,
        }}>
          <div>
            <div style={{ fontSize: 10, color: '#888' }}>Starting from</div>
            <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 22, letterSpacing: 1, color: '#111110', lineHeight: 1 }}>{minPrice}</div>
          </div>
          <Link href={`/book/${student.id}`} className="sp-book-btn" style={{
            flex: 1, background: ACCENT, color: '#FFFFFF',
            border: 'none', borderRadius: 10, padding: '14px 18px',
            fontSize: 14, fontWeight: 700, textDecoration: 'none', minHeight: 48,
            boxShadow: `0 4px 18px rgba(51,78,216,.35)`,
            transition: 'opacity .18s',
            justifyContent: 'center', display: 'flex', alignItems: 'center',
          }}>
            Book {student.name.split(' ')[0]} →
          </Link>
        </div>
      </div>
    </>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#888', marginBottom: 12 }}>
      {children}
    </div>
  )
}
