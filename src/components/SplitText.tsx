'use client'
import { useEffect, useRef, useState } from 'react'

interface SplitTextProps {
  text: string
  className?: string
  style?: React.CSSProperties
  delay?: number // base delay in ms before animation starts
}

export function SplitText({ text, className = '', style, delay = 0 }: SplitTextProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.2, rootMargin: '0px 0px -20px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const words = text.split(' ')

  return (
    <span ref={ref} className={className} style={{ ...style, display: 'inline' }}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            overflow: 'hidden',
            verticalAlign: 'bottom',
            marginRight: '0.22em',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              transform: visible ? 'translateY(0)' : 'translateY(110%)',
              opacity: visible ? 1 : 0,
              transition: `transform 0.65s cubic-bezier(0.16,1,0.3,1) ${delay + i * 55}ms, opacity 0.45s ease ${delay + i * 55}ms`,
              willChange: 'transform',
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </span>
  )
}

export default SplitText
