import { useEffect, useRef } from 'react'
import { Users, ArrowRight } from 'lucide-react'

const floors = [
  {
    floor: 'Ground Floor',
    name: 'The Royal Hall',
    capacity: '500–800 Guests',
    eventType: 'Grand Weddings & Receptions',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=900&auto=format&fit=crop',
    features: ['Grand Stage', 'Bridal Entry', 'Full Catering', 'Valet Parking'],
    desc: 'Our flagship hall with towering ceilings and premium stage design — the ultimate setting for grand weddings and gala receptions.',
  },
  {
    floor: 'First Floor',
    name: 'The Crystal Ballroom',
    capacity: '200–400 Guests',
    eventType: 'Receptions, Engagements & Anniversaries',
    image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=900&auto=format&fit=crop',
    features: ['Crystal Chandeliers', 'Private Bar', 'Dance Floor', 'AV System'],
    desc: 'Adorned with cascading crystal chandeliers and bespoke décor, the Crystal Ballroom exudes timeless elegance for every occasion.',
  },
  
]

export default function VenueSpaces() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    sectionRef.current?.querySelectorAll('.fade-up').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="venue" id="venue" ref={sectionRef}>
      <div className="venue-header fade-up">
        <div className="section-tag">Our Spaces</div>
        <h2 className="section-title">Floors of Extraordinary Elegance</h2>
        <p className="section-desc" style={{ margin: '0 auto' }}>
          Each floor of Shri Gajanan Maharaj Sabhagrah is a world unto itself — distinct in character, unified by luxury.
        </p>
      </div>

      <div className="venue-grid">
        {floors.map((floor, i) => (
          <div key={i} className="venue-card fade-up" style={{ transitionDelay: `${i * 0.12}s` }}>
            <div className="venue-img-wrap">
              <img src={floor.image} alt={floor.name} loading="lazy" />
              <div className="venue-img-overlay" />
              <span className="venue-floor-tag">{floor.floor}</span>
              <span className="venue-capacity">
                <Users size={12} /> {floor.capacity}
              </span>
            </div>
            <div className="venue-body">
              <h3>{floor.name}</h3>
              <p className="venue-event-type">{floor.eventType}</p>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-medium)', lineHeight: 1.65, marginBottom: 16 }}>
                {floor.desc}
              </p>
              <div className="venue-features">
                {floor.features.map(f => <span key={f}>{f}</span>)}
              </div>
              <a href="#booking" className="venue-btn">
                Book Now <ArrowRight size={14} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
