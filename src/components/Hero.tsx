import { useEffect, useRef } from 'react'
import { ChevronDown } from 'lucide-react'

export default function Hero() {
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      bgRef.current?.classList.add('loaded')
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="hero" id="home">
      <div className="hero-bg" ref={bgRef} />
      <div className="hero-overlay" />

      <div className="hero-content">
        <div className="hero-badge">Welcome to Shri Gajanan Maharaj Sabhagrah</div>
        <h1 className="hero-title">
          Creating <em>Unforgettable</em><br />Celebrations
        </h1>
        <p className="hero-subtitle">
          Premium Banquet Hall &amp; Event Venue for Weddings, Birthdays,
          Receptions &amp; Special Occasions. Where every moment becomes a cherished memory.
        </p>
        <div className="hero-btns">
          <a href="#booking" className="btn-primary">Book Now</a>
          <a href="#venue" className="btn-outline">View Gallery</a>
        </div>
      </div>

      <a href="#highlights" className="hero-scroll">
        <span>Scroll</span>
        <ChevronDown size={20} />
      </a>
    </section>
  )
}
