'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current
    if (!cursor || !follower) return

    let mouseX = 0
    let mouseY = 0
    let followerX = 0
    let followerY = 0

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      gsap.to(cursor, {
        x: mouseX,
        y: mouseY,
        duration: 0.1,
        ease: 'power2.out',
      })
    }

    // Smooth follower
    const animateFollower = () => {
      followerX += (mouseX - followerX) * 0.08
      followerY += (mouseY - followerY) * 0.08

      gsap.set(follower, { x: followerX, y: followerY })
      requestAnimationFrame(animateFollower)
    }
    animateFollower()

    // Hover effects
    const onMouseEnter = () => follower.classList.add('hovering')
    const onMouseLeave = () => follower.classList.remove('hovering')

    const interactables = document.querySelectorAll('a, button, [data-cursor]')
    interactables.forEach(el => {
      el.addEventListener('mouseenter', onMouseEnter)
      el.addEventListener('mouseleave', onMouseLeave)
    })

    document.addEventListener('mousemove', onMouseMove)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      interactables.forEach(el => {
        el.removeEventListener('mouseenter', onMouseEnter)
        el.removeEventListener('mouseleave', onMouseLeave)
      })
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={followerRef} className="cursor-follower" />
    </>
  )
}
