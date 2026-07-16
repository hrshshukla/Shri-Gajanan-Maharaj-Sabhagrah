import { useState, useEffect } from 'react'
import { Phone } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const links = [
    { label: 'About',    href: '#about' },
    { label: 'Venue',    href: '#venue' },
    { label: 'Events',   href: '#events' },
    { label: 'Services', href: '#services' },
    { label: 'Reviews',  href: '#reviews' },
    { label: 'Gallery',  href: '#gallery' },
    { label: 'Location', href: '#location' },
    { label: 'Contact',  href: '#booking' },
  ]

  const close = () => setMenuOpen(false)

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <a href="#" className="navbar-logo">
          <span>Shri Gajanan Maharaj Sabhagrah</span>
          <span>Premium Banquet &amp; Event Venue</span>
        </a>

        <div className="nav-links">
          {links.slice(0, -1).map(l => (
            <a key={l.label} href={l.href}>{l.label}</a>
          ))}
          <a href="#booking" className="nav-cta">Book Now</a>
        </div>

        <button
          className={`nav-hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Backdrop */}
      <div
        className={`nav-backdrop${menuOpen ? ' open' : ''}`}
        onClick={close}
        aria-hidden="true"
      />

      {/* Mobile panel */}
      <div className={`nav-mobile${menuOpen ? ' open' : ''}`} role="dialog" aria-modal="true">

        {/* Header row */}
        <div className="nav-mobile-header">
          <a href="#" className="navbar-logo" onClick={close}>
            <span>Shri Gajanan Maharaj Sabhagrah</span>
            <span>Premium Banquet &amp; Event Venue</span>
          </a>
          <button className="nav-mobile-close" onClick={close} aria-label="Close menu">
            <span /><span />
          </button>
        </div>

        {/* Gold divider */}
        <div className="nav-mobile-divider" />

        {/* Nav links */}
        <nav className="nav-mobile-links">
          {links.map((l, i) => (
            <a
              key={l.label}
              href={l.href}
              className="nav-mobile-link"
              style={{ '--i': i } as React.CSSProperties}
              onClick={close}
            >
              <span className="nav-mobile-num">0{i + 1}</span>
              <span className="nav-mobile-label">{l.label}</span>
              <span className="nav-mobile-arrow">→</span>
            </a>
          ))}
        </nav>

        {/* Footer CTAs */}
        <div className="nav-mobile-footer">
          <a href="#booking" className="nav-mobile-cta" onClick={close}>Book Now</a>
          <a href="tel:+919325375179" className="nav-mobile-call" onClick={close}>
            <span className="nav-mobile-call-icon"><Phone size={15} /></span>
            <span className="nav-mobile-call-text">
              <span>Rajesh Shukla</span>
              <span>+91 93253 75179</span>
            </span>
          </a>
        </div>

      </div>
    </>
  )
}
