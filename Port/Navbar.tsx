'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/gsap'
import { Github, Linkedin, Twitter } from 'lucide-react'

const navLinks = [
  { label: 'About Me', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Services', href: '#services' },
  { label: 'Resume/CV', href: '#resume' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 2.8 }
    )

    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (href: string) => {
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav
      ref={navRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '1.25rem 3rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'background 0.4s ease, backdrop-filter 0.4s ease',
        background: scrolled
          ? 'rgba(5,5,5,0.85)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(245,158,11,0.08)' : 'none',
      }}
    >
      {/* Logo */}
      <div
        style={{
          fontFamily: 'Geist, sans-serif',
          fontSize: '1.75rem',
          fontWeight: 800,
          letterSpacing: '-0.05em',
          background: 'linear-gradient(135deg, #F59E0B, #FDE68A)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          cursor: 'none',
        }}
      >
        A.
      </div>

      {/* Nav Links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
        {navLinks.map((link) => (
          <button
            key={link.href}
            onClick={() => scrollTo(link.href)}
            style={{
              background: 'none',
              border: 'none',
              color: '#A3A3A3',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.8rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              cursor: 'none',
              transition: 'color 0.3s ease',
              padding: '4px 0',
              position: 'relative',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget
              el.style.color = '#F59E0B'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget
              el.style.color = '#A3A3A3'
            }}
          >
            {link.label}
          </button>
        ))}
      </div>

      {/* Social Icons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {[
          { Icon: Github, href: '#' },
          { Icon: Linkedin, href: '#' },
          { Icon: Twitter, href: '#' },
        ].map(({ Icon, href }, i) => (
          <a
            key={i}
            href={href}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#A3A3A3',
              transition: 'all 0.3s ease',
              cursor: 'none',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.borderColor = 'rgba(245,158,11,0.5)'
              el.style.color = '#F59E0B'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.borderColor = 'rgba(255,255,255,0.1)'
              el.style.color = '#A3A3A3'
            }}
          >
            <Icon size={14} />
          </a>
        ))}
      </div>
    </nav>
  )
}
