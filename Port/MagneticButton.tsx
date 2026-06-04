'use client'

import { useRef, ReactNode } from 'react'
import { gsap } from '../lib/gsap'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary'
}

export default function MagneticButton({
  children,
  className = '',
  onClick,
  variant = 'primary',
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const innerRef = useRef<HTMLSpanElement>(null)

  const onMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = buttonRef.current
    if (!btn) return
    const rect = btn.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const deltaX = e.clientX - centerX
    const deltaY = e.clientY - centerY

    gsap.to(btn, {
      x: deltaX * 0.25,
      y: deltaY * 0.25,
      duration: 0.4,
      ease: 'power2.out',
    })
    gsap.to(innerRef.current, {
      x: deltaX * 0.1,
      y: deltaY * 0.1,
      duration: 0.4,
      ease: 'power2.out',
    })
  }

  const onMouseLeave = () => {
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.4)',
    })
    gsap.to(innerRef.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.4)',
    })
  }

  const baseStyle: React.CSSProperties =
    variant === 'primary'
      ? {
          background: 'linear-gradient(135deg, #F59E0B, #D97706)',
          color: '#050505',
          border: 'none',
          padding: '14px 32px',
          borderRadius: '4px',
          fontFamily: 'Inter, sans-serif',
          fontWeight: 600,
          fontSize: '0.9rem',
          letterSpacing: '0.02em',
          cursor: 'none',
          position: 'relative',
          overflow: 'hidden',
        }
      : {
          background: 'transparent',
          color: '#FAFAFA',
          border: '1px solid rgba(245,158,11,0.3)',
          padding: '13px 32px',
          borderRadius: '4px',
          fontFamily: 'Inter, sans-serif',
          fontWeight: 500,
          fontSize: '0.9rem',
          letterSpacing: '0.02em',
          cursor: 'none',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }

  return (
    <button
      ref={buttonRef}
      className={`magnetic-btn ${className}`}
      style={baseStyle}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <span ref={innerRef} style={{ display: 'block' }}>
        {children}
      </span>
    </button>
  )
}
