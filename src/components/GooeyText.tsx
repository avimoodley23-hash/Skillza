'use client'
import { useEffect, useState } from 'react'

const WORDS = ['Photography.', 'Videography.', 'Graphic Design.', 'Branding.', 'Copywriting.', 'Web Design.']

export function GooeyText() {
  const [index, setIndex] = useState(0)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(true)
      setTimeout(() => {
        setIndex(i => (i + 1) % WORDS.length)
        setAnimating(false)
      }, 400)
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9" result="gooey" />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>
      <span
        style={{
          display: 'inline-block',
          background: 'linear-gradient(135deg, #F5EFE3 0%, #c8b99a 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          transition: 'opacity 0.3s ease, filter 0.3s ease',
          opacity: animating ? 0 : 1,
          filter: animating ? 'url(#gooey) blur(12px)' : 'url(#gooey) blur(0px)',
        }}
      >
        {WORDS[index]}
      </span>
    </>
  )
}
