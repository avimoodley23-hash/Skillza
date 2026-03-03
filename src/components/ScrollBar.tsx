'use client'
import { useEffect, useRef } from 'react'

export function ScrollBar() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      bar.style.width = (h > 0 ? (window.scrollY / h * 100) : 0) + '%'
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      ref={barRef}
      style={{
        position: 'fixed', top: 0, left: 0,
        height: 2,
        background: 'var(--orange)',
        zIndex: 500,
        width: '0%',
        transition: 'width .1s linear',
        pointerEvents: 'none',
      }}
    />
  )
}

export default ScrollBar
