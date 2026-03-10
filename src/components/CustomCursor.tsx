'use client'
import { useEffect, useRef } from 'react'

export function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    if (!matchMedia('(hover:hover)').matches) return

    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // Trail elements
    const trails = Array.from({ length: 5 }, (_, i) => {
      const el = document.createElement('div')
      el.className = 'cur-trail'
      el.style.opacity = String((5 - i) * 0.06)
      el.style.width = el.style.height = `${22 - i * 2}px`
      document.body.appendChild(el)
      trailRef.current[i] = el
      return el
    })

    let mx = 0, my = 0, rx = 0, ry = 0
    const trailX = new Array(5).fill(0)
    const trailY = new Array(5).fill(0)

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      dot.style.left = mx + 'px'
      dot.style.top  = my + 'px'
    }

    const loop = () => {
      // Ring lags behind
      rx += (mx - rx) * 0.1
      ry += (my - ry) * 0.1
      ring.style.left = rx + 'px'
      ring.style.top  = ry + 'px'

      // Trail cascade
      let prevX = mx, prevY = my
      for (let i = 0; i < trails.length; i++) {
        trailX[i] += (prevX - trailX[i]) * (0.25 - i * 0.03)
        trailY[i] += (prevY - trailY[i]) * (0.25 - i * 0.03)
        trails[i].style.left = trailX[i] + 'px'
        trails[i].style.top  = trailY[i] + 'px'
        prevX = trailX[i]
        prevY = trailY[i]
      }

      requestAnimationFrame(loop)
    }
    requestAnimationFrame(loop)

    // Hover expand
    const onEnter = (e: Event) => {
      ring.classList.add('big')
      const el = e.currentTarget as HTMLElement
      const accent = el.closest('[data-accent]')?.getAttribute('data-accent')
      if (accent === 'violet') ring.classList.add('violet')
      else if (accent === 'coral') ring.classList.add('coral')
      else if (accent === 'lime') ring.classList.add('lime')
      else ring.classList.remove('violet', 'coral', 'lime')
    }
    const onLeave = () => {
      ring.classList.remove('big', 'violet', 'coral', 'lime')
    }

    const wire = () => {
      document.querySelectorAll('button, a, [role=button], .tc, .fbtn').forEach(el => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }

    document.addEventListener('mousemove', onMove)
    wire()
    const obs = new MutationObserver(wire)
    obs.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', onMove)
      obs.disconnect()
      trails.forEach(el => el.remove())
    }
  }, [])

  return (
    <>
      <div ref={dotRef}  className="cur-dot" />
      <div ref={ringRef} className="cur-ring" />
      <style>{`
        @media(hover:hover){
          body, a, button, [role=button], .tc, .fbtn { cursor: none !important; }

          .cur-dot {
            position: fixed; top: 0; left: 0;
            width: 7px; height: 7px;
            background: var(--orange);
            border-radius: 50%;
            transform: translate(-50%,-50%);
            pointer-events: none; z-index: 100000;
            transition: background .25s;
            will-change: left, top;
          }

          .cur-ring {
            position: fixed; top: 0; left: 0;
            width: 40px; height: 40px;
            border: 1.5px solid rgba(20,69,255,.55);
            border-radius: 50%;
            transform: translate(-50%,-50%);
            pointer-events: none; z-index: 99999;
            transition: width .22s, height .22s, border-color .25s, background .25s, opacity .22s, border-radius .22s;
            will-change: left, top;
          }
          .cur-ring.big {
            width: 60px; height: 60px;
            border-color: var(--orange);
            background: rgba(20,69,255,.06);
          }
          .cur-ring.violet { border-color: var(--violet); background: rgba(124,58,237,.06); }
          .cur-ring.coral  { border-color: var(--coral);  background: rgba(255,69,32,.06); }
          .cur-ring.lime   { border-color: var(--lime);   background: rgba(170,255,0,.08); }

          .cur-trail {
            position: fixed; top: 0; left: 0;
            border-radius: 50%;
            background: var(--orange);
            transform: translate(-50%,-50%);
            pointer-events: none; z-index: 99998;
            will-change: left, top;
          }
        }
      `}</style>
    </>
  )
}

export default CustomCursor
