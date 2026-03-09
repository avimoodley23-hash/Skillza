import React from 'react'

interface BorderBeamProps {
  size?: number
  duration?: number
  colorFrom?: string
  colorTo?: string
}

export function BorderBeam({
  size = 120,
  duration = 2.4,
  colorFrom = 'rgba(255,74,28,0)',
  colorTo = '#FF4A1C',
}: BorderBeamProps) {
  return (
    <span
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        borderRadius: 'inherit',
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <span
        style={{
          position: 'absolute',
          inset: -1,
          borderRadius: 'inherit',
          background: `conic-gradient(from calc(var(--beam-angle, 0deg) - ${size / 2}deg), ${colorFrom}, ${colorTo}, ${colorFrom})`,
          animation: `border-beam-spin ${duration}s linear infinite`,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          padding: '1.5px',
        }}
      />
    </span>
  )
}
