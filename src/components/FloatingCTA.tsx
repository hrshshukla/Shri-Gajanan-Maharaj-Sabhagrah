import { useState, useEffect } from 'react'
import { Phone, CalendarCheck } from 'lucide-react'

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const hideSelectors = ['.hero', '.booking', '.footer', '.events', '.reviews']
    const sections = hideSelectors
      .map(s => document.querySelector(s))
      .filter(Boolean) as Element[]

    const isElementVisible = (el: Element) => {
      const rect = el.getBoundingClientRect()
      return rect.bottom > 0 && rect.top < window.innerHeight
    }

    const updateVisibility = () => {
      if (sections.length === 0) {
        setVisible(true)
        return
      }

      const anyHiddenSectionVisible = sections.some(isElementVisible)
      setVisible(!anyHiddenSectionVisible)
    }

    updateVisibility()
    window.addEventListener('scroll', updateVisibility)
    window.addEventListener('resize', updateVisibility)

    return () => {
      window.removeEventListener('scroll', updateVisibility)
      window.removeEventListener('resize', updateVisibility)
    }
  }, [])

  if (!visible) return null

  return (
    <div className="floating-cta-group">
      <a href="#booking" className="floating-book" aria-label="Book Now">
        <CalendarCheck size={18} />
        <span>Book Now</span>
      </a>
      <a href="tel:+919325375179" className="floating-call" aria-label="Call Rajesh Shukla">
        <span className="floating-call-icon">
          <Phone size={18} />
        </span>
        <span className="floating-call-text">
          <span className="floating-call-name">Rajesh Shukla</span>
          <span className="floating-call-number">+91 93253 75179</span>
        </span>
      </a>
    </div>
  )
}
