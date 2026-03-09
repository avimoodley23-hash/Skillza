'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Nav from '@/components/Nav'
import Link from 'next/link'

type BookingData = {
  id: string
  student_id: string
  student_name: string
}

type PageState =
  | { kind: 'loading' }
  | { kind: 'not_found' }
  | { kind: 'not_completed' }
  | { kind: 'already_reviewed' }
  | { kind: 'form'; booking: BookingData }
  | { kind: 'success'; studentName: string }

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid var(--border)',
  borderRadius: 10,
  color: 'var(--cream)',
  padding: '12px 16px',
  fontSize: 14,
  outline: 'none',
  fontFamily: 'Instrument Sans, sans-serif',
  transition: 'border-color .2s',
}

function StarRating({
  value,
  onChange,
}: {
  value: number
  onChange: (v: number) => void
}) {
  const [hovered, setHovered] = useState(0)
  const active = hovered > 0 ? hovered : value

  return (
    <div style={{ display: 'flex', gap: 6 }}>
      {[1, 2, 3, 4, 5].map(n => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          onMouseEnter={() => setHovered(n)}
          onMouseLeave={() => setHovered(0)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '2px 4px',
            fontSize: 32,
            lineHeight: 1,
            color: n <= active ? 'var(--orange)' : 'rgba(245,239,227,0.15)',
            transition: 'color .15s, transform .1s',
            transform: n <= active ? 'scale(1.12)' : 'scale(1)',
          }}
          aria-label={`${n} star${n !== 1 ? 's' : ''}`}
        >
          ★
        </button>
      ))}
    </div>
  )
}

export default function ReviewPage() {
  const params = useParams()
  const ref = params.ref as string

  const [pageState, setPageState] = useState<PageState>({ kind: 'loading' })
  const [stars, setStars] = useState(0)
  const [reviewerName, setReviewerName] = useState('')
  const [reviewText, setReviewText] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState('')

  useEffect(() => {
    if (!ref) return

    async function fetchBooking() {
      const res = await fetch(`/api/reviews/lookup?ref=${encodeURIComponent(ref)}`)
      const data = await res.json()

      if (!res.ok || data.error === 'not_found') {
        setPageState({ kind: 'not_found' })
        return
      }
      if (data.error === 'not_completed') {
        setPageState({ kind: 'not_completed' })
        return
      }
      if (data.error === 'already_reviewed') {
        setPageState({ kind: 'already_reviewed' })
        return
      }

      setPageState({
        kind: 'form',
        booking: {
          id: data.booking_id,
          student_id: data.student_id,
          student_name: data.student_name,
        },
      })
    }

    fetchBooking()
  }, [ref])

  async function handleSubmit() {
    if (pageState.kind !== 'form') return

    if (stars === 0) {
      setFormError('Please select a star rating.')
      return
    }
    if (!reviewerName.trim()) {
      setFormError('Please enter your name.')
      return
    }

    setSubmitting(true)
    setFormError('')

    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        booking_id: pageState.booking.id,
        student_id: pageState.booking.student_id,
        reviewer_name: reviewerName.trim(),
        stars,
        text: reviewText.trim() || null,
      }),
    })

    const data = await res.json()

    if (!res.ok || data.error) {
      setFormError(data.error || 'Something went wrong. Please try again.')
      setSubmitting(false)
      return
    }

    setPageState({ kind: 'success', studentName: pageState.booking.student_name })
    setSubmitting(false)
  }

  const containerStyle: React.CSSProperties = {
    minHeight: '100svh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '100px 24px 60px',
  }

  const cardStyle: React.CSSProperties = {
    maxWidth: 480,
    width: '100%',
    textAlign: 'center',
  }

  if (pageState.kind === 'loading') {
    return (
      <>
        <Nav />
        <main style={containerStyle}>
          <div style={cardStyle}>
            <p style={{ fontSize: 14, color: 'var(--muted)', letterSpacing: 1 }}>Loading...</p>
          </div>
        </main>
      </>
    )
  }

  if (pageState.kind === 'not_found') {
    return (
      <>
        <Nav />
        <main style={containerStyle}>
          <div style={cardStyle}>
            <div style={{ fontSize: 48, marginBottom: 20 }}>🔍</div>
            <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 36, letterSpacing: 1, marginBottom: 12 }}>
              Booking not found
            </h1>
            <p style={{ fontSize: 14, color: 'var(--cream-dim)', lineHeight: 1.7, marginBottom: 28 }}>
              We couldn't find a booking with that reference. Double-check the link in your email.
            </p>
            <Link href="/" className="btn-outline" style={{ display: 'inline-flex' }}>
              Back to Skillza
            </Link>
          </div>
        </main>
      </>
    )
  }

  if (pageState.kind === 'not_completed') {
    return (
      <>
        <Nav />
        <main style={containerStyle}>
          <div style={cardStyle}>
            <div style={{ fontSize: 48, marginBottom: 20 }}>⏳</div>
            <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 36, letterSpacing: 1, marginBottom: 12 }}>
              Not quite yet
            </h1>
            <p style={{ fontSize: 14, color: 'var(--cream-dim)', lineHeight: 1.7, marginBottom: 28 }}>
              This booking hasn't been completed yet. Check back once the work is done.
            </p>
            <Link href="/" className="btn-outline" style={{ display: 'inline-flex' }}>
              Back to Skillza
            </Link>
          </div>
        </main>
      </>
    )
  }

  if (pageState.kind === 'already_reviewed') {
    return (
      <>
        <Nav />
        <main style={containerStyle}>
          <div style={cardStyle}>
            <div style={{ fontSize: 48, marginBottom: 20 }}>✅</div>
            <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 36, letterSpacing: 1, marginBottom: 12 }}>
              Already submitted
            </h1>
            <p style={{ fontSize: 14, color: 'var(--cream-dim)', lineHeight: 1.7, marginBottom: 28 }}>
              Thank you! Your review has already been submitted for this booking.
            </p>
            <Link href="/" className="btn-outline" style={{ display: 'inline-flex' }}>
              Back to Skillza
            </Link>
          </div>
        </main>
      </>
    )
  }

  if (pageState.kind === 'success') {
    return (
      <>
        <Nav />
        <main style={containerStyle}>
          <div style={cardStyle}>
            <div style={{ fontSize: 56, marginBottom: 20 }}>🌟</div>
            <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 40, letterSpacing: 1, marginBottom: 12 }}>
              Thanks for your review!
            </h1>
            <p style={{ fontSize: 15, color: 'var(--cream-dim)', lineHeight: 1.7, marginBottom: 32 }}>
              It will appear on{' '}
              <span style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', color: 'var(--orange)' }}>
                {pageState.studentName}
              </span>
              's profile and help other clients find great talent.
            </p>
            <Link href="/" className="btn-outline" style={{ display: 'inline-flex' }}>
              Back to Skillza
            </Link>
          </div>
        </main>
      </>
    )
  }

  // Form state
  const { booking } = pageState

  return (
    <>
      <Nav />
      <main style={{ minHeight: '100svh', padding: '100px 24px 80px' }}>
        <div style={{ maxWidth: 480, margin: '0 auto' }}>
          <div className="eyebrow">Client Review</div>
          <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(36px, 8vw, 52px)', lineHeight: 0.9, letterSpacing: 1, marginBottom: 12 }}>
            How did it go<br />
            <span style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', color: 'var(--orange)' }}>
              with {booking.student_name.split(' ')[0]}?
            </span>
          </h1>
          <p style={{ fontSize: 14, color: 'var(--cream-dim)', lineHeight: 1.7, marginBottom: 36 }}>
            Your honest review helps other clients find great student talent on Skillza.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Student label */}
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--o-dim)', border: '1px solid rgba(255,75,31,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 15, color: 'var(--orange)', letterSpacing: 0.5 }}>
                  {booking.student_name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 2 }}>Reviewing</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--cream)' }}>{booking.student_name}</div>
              </div>
            </div>

            {/* Star rating */}
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--muted-2)', marginBottom: 10, letterSpacing: 0.3 }}>
                Overall Rating *
              </label>
              <StarRating value={stars} onChange={setStars} />
              {stars > 0 && (
                <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 8 }}>
                  {['', 'Poor', 'Below average', 'Good', 'Very good', 'Excellent'][stars]}
                </p>
              )}
            </div>

            {/* Reviewer name */}
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--muted-2)', marginBottom: 8, letterSpacing: 0.3 }}>
                Your Name *
              </label>
              <input
                type="text"
                placeholder="e.g. Thabo Nkosi"
                autoComplete="name"
                value={reviewerName}
                onChange={e => setReviewerName(e.target.value)}
                style={inputStyle}
                onFocus={e => (e.currentTarget.style.borderColor = 'var(--orange)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
              />
            </div>

            {/* Review text */}
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--muted-2)', marginBottom: 8, letterSpacing: 0.3 }}>
                Your Review <span style={{ color: 'var(--muted)', fontWeight: 400 }}>(optional)</span>
              </label>
              <textarea
                placeholder="Tell others about your experience..."
                value={reviewText}
                onChange={e => setReviewText(e.target.value)}
                rows={4}
                style={{ ...inputStyle, resize: 'vertical' }}
                onFocus={e => (e.currentTarget.style.borderColor = 'var(--orange)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
              />
            </div>

            {formError && (
              <p style={{ fontSize: 13, color: '#ff6b6b', background: 'rgba(255,107,107,.1)', border: '1px solid rgba(255,107,107,.2)', borderRadius: 8, padding: '10px 14px' }}>
                {formError}
              </p>
            )}

            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', fontSize: 15, padding: '16px 28px', opacity: submitting ? 0.7 : 1, cursor: submitting ? 'not-allowed' : 'pointer' }}
            >
              {submitting ? 'Submitting...' : 'Submit Review →'}
            </button>

            <p style={{ fontSize: 12, color: 'var(--muted)', textAlign: 'center', lineHeight: 1.6 }}>
              Reviews are verified — only clients with a completed booking can leave one.
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
