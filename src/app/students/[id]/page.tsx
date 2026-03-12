import { supabase } from '@/lib/supabase'
import type { StudentFull } from '@/types/database'
import Nav from '@/components/Nav'
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
    .eq('active', true)
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

export default async function StudentPage({ params }: { params: { id: string } }) {
  const student = await getStudent(params.id)
  if (!student) notFound()

  const pricing = (student.student_pricing ?? []).sort((a, b) => a.sort_order - b.sort_order)
  const reviews = (student.student_reviews ?? []).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

  return (
    <>
      <Nav />
      <main style={{ paddingTop: 'calc(60px + env(safe-area-inset-top, 0px))', minHeight: '100svh', background: 'var(--black)' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', padding: '32px 20px 120px' }}>

          {/* Back */}
          <Link href="/#find-talent" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--muted)', marginBottom: 24, transition: 'color .2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--cream)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}>
            ← Back to browse
          </Link>

          {/* Header */}
          <div style={{ display: 'flex', gap: 15, alignItems: 'center', marginBottom: 20 }}>
            <div style={{ width: 68, height: 68, borderRadius: 14, background: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 34, flexShrink: 0, border: '1px solid var(--border)' }}>
              {student.emoji}
            </div>
            <div>
              <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 28, letterSpacing: 1, lineHeight: 1 }}>{student.name}</h1>
              <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 3 }}>{student.skill} · {student.university}</p>
              <div style={{ display: 'flex', gap: 6, marginTop: 7, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 10, fontWeight: 600, padding: '3px 9px', borderRadius: 100, background: 'var(--g-dim)', color: 'var(--green)', border: '1px solid rgba(46,204,113,.3)' }}>✓ Verified</span>
                <span style={{ fontSize: 10, fontWeight: 600, padding: '3px 9px', borderRadius: 100, background: 'rgba(255,255,255,.05)', color: 'var(--cream)', border: '1px solid var(--border)' }}>{student.university}</span>
                <span style={{ fontSize: 10, fontWeight: 600, padding: '3px 9px', borderRadius: 100, background: 'var(--o-dim)', color: 'var(--orange)', border: '1px solid rgba(255,74,28,.2)' }}>{student.year}</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 9, marginBottom: 22 }}>
            {[
              { n: student.rating.toString(), sup: '★', label: 'Rating' },
              { n: student.review_count.toString(), sup: '+', label: 'Reviews' },
              { n: student.starting_price, sup: '', label: `per ${student.price_unit}` },
            ].map(stat => (
              <div key={stat.label} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 10, padding: 14, textAlign: 'center' }}>
                <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 26, letterSpacing: 1, color: 'var(--cream)', lineHeight: 1 }}>
                  {stat.n}<span style={{ color: 'var(--orange)' }}>{stat.sup}</span>
                </div>
                <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 3 }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Bio */}
          <Section title="About">
            <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(245,239,227,.65)' }}>{student.bio}</p>
          </Section>

          {/* Portfolio Images */}
          {(() => {
            const images = (student.student_portfolio ?? []).filter(p => p.image_url)
            if (images.length === 0) return null
            return (
              <Section title="Portfolio Work">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                  {images.map((p, i) => (
                    <a
                      key={p.id}
                      href={p.image_url!}
                      target="_blank"
                      rel="noreferrer noopener"
                      style={{
                        aspectRatio: '1', borderRadius: 10, display: 'block',
                        overflow: 'hidden', border: '1px solid var(--border)',
                        background: '#1a1a1a', position: 'relative',
                        transition: 'border-color .2s',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,74,28,.4)')}
                      onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                    >
                      <img
                        src={p.image_url!}
                        alt={p.label || `Portfolio item ${i + 1}`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                      {p.label && (
                        <div style={{
                          position: 'absolute', bottom: 0, left: 0, right: 0,
                          padding: '18px 7px 6px',
                          background: 'linear-gradient(to top, rgba(0,0,0,.75) 0, transparent 100%)',
                          fontSize: 9, fontWeight: 600, color: 'rgba(255,255,255,.85)',
                          letterSpacing: .3, textTransform: 'uppercase',
                          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                        }}>
                          {p.label}
                        </div>
                      )}
                    </a>
                  ))}
                </div>
              </Section>
            )
          })()}

          {/* Pricing */}
          {pricing.length > 0 && (
            <Section title="Pricing">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                {pricing.map(tier => (
                  <div key={tier.id} style={{ background: tier.featured ? 'var(--o-dim)' : 'var(--card)', border: `1px solid ${tier.featured ? 'var(--orange)' : 'var(--border)'}`, borderRadius: 11, padding: '15px 17px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{tier.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--muted)' }}>{tier.description}</div>
                      {tier.featured && <span style={{ fontSize: 9, fontWeight: 700, background: 'var(--orange)', color: '#fff', padding: '2px 7px', borderRadius: 100, letterSpacing: .5, textTransform: 'uppercase', marginTop: 3, display: 'inline-block' }}>Popular</span>}
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 22, letterSpacing: 1 }}>{tier.price}</div>
                      <div style={{ fontSize: 10, color: 'var(--muted)' }}>/ {tier.unit}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Reviews */}
          {reviews.length > 0 && (
            <Section title="Reviews">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                {reviews.map(rev => (
                  <div key={rev.id} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 10, padding: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }}>
                      <span style={{ fontWeight: 600, fontSize: 13 }}>{rev.reviewer_name}</span>
                      <span style={{ color: 'var(--gold)', fontSize: 12 }}>{'★'.repeat(rev.stars)}{'☆'.repeat(5 - rev.stars)}</span>
                    </div>
                    <p style={{ fontSize: 13, color: 'rgba(245,239,227,.6)', lineHeight: 1.65 }}>{rev.text}</p>
                    <p style={{ fontSize: 10, color: 'var(--muted)', marginTop: 5 }}>{new Date(rev.created_at).toLocaleDateString('en-ZA', { month: 'long', year: 'numeric' })}</p>
                  </div>
                ))}
              </div>
            </Section>
          )}
        </div>

        {/* Sticky CTA */}
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, padding: '14px 20px', paddingBottom: 'calc(14px + env(safe-area-inset-bottom, 0px))', background: 'rgba(17,17,17,.97)', borderTop: '1px solid var(--border)', display: 'flex', gap: 11, alignItems: 'center', backdropFilter: 'blur(10px)', zIndex: 300 }}>
          <div>
            <div style={{ fontSize: 10, color: 'var(--muted)' }}>Starting from</div>
            <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 22, letterSpacing: 1, lineHeight: 1 }}>{student.starting_price}</div>
          </div>
          <Link href={`/book/${student.id}`} className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
            Book {student.name.split(' ')[0]} →
          </Link>
        </div>
      </main>
    </>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: '0 0 22px', borderBottom: '1px solid var(--border)', marginBottom: 22 }}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 13, display: 'flex', alignItems: 'center', gap: 9 }}>
        {title}
        <span style={{ flex: 1, height: 1, background: 'var(--border)', display: 'block' }} />
      </div>
      {children}
    </div>
  )
}
