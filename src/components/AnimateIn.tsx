'use client'
import { useEffect, useRef, useState } from 'react'

interface AnimateInProps {
  children: React.ReactNode
  delay?: 0 | 1 | 2 | 3 | 4
  className?: string
  style?: React.CSSProperties
}

export function AnimateIn({ children, delay = 0, className = '', style }: AnimateInProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const delayClass = delay > 0 ? ` delay-${delay}` : ''

  return (
    <div
      ref={ref}
      className={`${visible ? `animate-visible${delayClass}` : 'animate-hidden'} ${className}`.trim()}
      style={style}
    >
      {children}
    </div>
  )
}

export default AnimateIn
