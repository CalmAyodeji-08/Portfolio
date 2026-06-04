'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

interface PreloaderProps {
  onComplete: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const preloaderRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const progressLineRef = useRef<HTMLDivElement>(null)
  const percentRef = useRef<HTMLSpanElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete()
        }
      })

      // Start hidden
      gsap.set([logoRef.current, progressRef.current], { opacity: 0, y: 20 })
      gsap.set(progressLineRef.current, { scaleX: 0, transformOrigin: 'left center' })

      // Logo reveal
      tl.to(logoRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      })

      // Progress bar appears
      tl.to(progressRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      }, '-=0.3')

      // Progress line fills + counter
      tl.to(progressLineRef.current, {
        scaleX: 1,
        duration: 1.5,
        ease: 'power2.inOut',
      }, '-=0.2')

      // Counter
      const counter = { val: 0 }
      tl.to(counter, {
        val: 100,
        duration: 1.5,
        ease: 'power2.inOut',
        onUpdate: () => {
          if (percentRef.current) {
            percentRef.current.textContent = Math.round(counter.val) + '%'
          }
        }
      }, '<')

      // Exit
      tl.to(overlayRef.current, {
        yPercent: -100,
        duration: 1,
        ease: 'power4.inOut',
        delay: 0.2,
      })

    }, preloaderRef)

    return () => ctx.revert()
  }, [onComplete])

  return (
    <div ref={preloaderRef} className="preloader" style={{ zIndex: 99990 }}>
      <div
        ref={overlayRef}
        style={{
          position: 'absolute',
          inset: 0,
          background: '#050505',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2rem',
        }}
      >
        {/* Logo */}
        <div ref={logoRef} style={{ textAlign: 'center' }}>
          <div
            style={{
              fontFamily: 'Geist, sans-serif',
              fontSize: '4rem',
              fontWeight: 800,
              letterSpacing: '-0.05em',
              background: 'linear-gradient(135deg, #F59E0B, #FDE68A)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: 1,
            }}
          >
            A.
          </div>
          <div
            style={{
              color: '#525252',
              fontSize: '0.7rem',
              letterSpacing: '0.3em',
              marginTop: '0.5rem',
              textTransform: 'uppercase',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Portfolio
          </div>
        </div>

        {/* Progress */}
        <div ref={progressRef} style={{ width: '200px' }}>
          <div
            style={{
              height: '1px',
              background: 'rgba(245,158,11,0.2)',
              borderRadius: '1px',
              overflow: 'hidden',
              marginBottom: '0.75rem',
            }}
          >
            <div
              ref={progressLineRef}
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, #F59E0B, #FDE68A)',
                borderRadius: '1px',
              }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              color: '#525252',
              fontSize: '0.65rem',
              letterSpacing: '0.15em',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            <span>LOADING</span>
            <span ref={percentRef}>0%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
