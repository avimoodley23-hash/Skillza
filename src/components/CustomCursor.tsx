'use client'
import { useEffect, useRef } from 'react'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!matchMedia('(hover:hover)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mx = 0, my = 0, rx = 0, ry = 0

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      dot.style.left = mx + 'px'
      dot.style.top = my + 'px'
    }

    const loop = () => {
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      ring.style.left = rx + 'px'
      ring.style.top = ry + 'px'
      requestAnimationFrame(loop)
    }

    const addHover = () => {
      document.querySelectorAll('button,a,[role=button],.tc,.fbtn').forEach(el => {
        el.addEventListener('mouseenter', () => ring.classList.add('big'))
        el.addEventListener('mouseleave', () => ring.classList.remove('big'))
      })
    }

    document.addEventListener('mousemove', onMouseMove)
    loop()
    addHover()

    // Re-run on DOM changes (for dynamically added elements)
    const observer = new MutationObserver(addHover)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cur-dot" id="cd" />
      <div ref={ringRef} className="cur-ring" id="cr" />
      <style>{`
        @media(hover:hover){
          body { cursor: none; }
          button, a, [role=button] { cursor: none; }
          .cur-dot {
            position: fixed; top: 0; left: 0;
            width: 8px; height: 8px;
            background: var(--orange);
            border-radius: 50%;
            transform: translate(-50%,-50%);
            pointer-events: none;
            z-index: 99999;
          }
          .cur-ring {
            position: fixed; top: 0; left: 0;
            width: 34px; height: 34px;
            border: 1.5px solid rgba(255,74,28,.4);
            border-radius: 50%;
            transform: translate(-50%,-50%);
            pointer-events: none;
            z-index: 99998;
            transition: width .2s, height .2s, border-color .2s;
          }
          .cur-ring.big {
            width: 52px; height: 52px;
            border-color: var(--orange);
          }
        }
      `}</style>
    </>
  )
}

export default CustomCursor
