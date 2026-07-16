import { useEffect, useRef } from 'react'
import { Maximize2, Sparkles, LayoutGrid, Users, Phone } from 'lucide-react'

const features = [
  { icon: <Maximize2 size={16} />, text: 'Spacious, high-ceiling halls' },
  { icon: <Sparkles size={16} />, text: 'Modern, elegant interiors' },
  { icon: <LayoutGrid size={16} />, text: 'Flexible event arrangements' },
  { icon: <Users size={16} />, text: 'Comfortable guest experience' },
]

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.12 }
    )
    sectionRef.current?.querySelectorAll('.fade-up, .fade-in').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="about" id="about" ref={sectionRef}>
      <div className="about-inner">
        <div className="about-images fade-in">
          <img
            src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=900&auto=format&fit=crop"
            alt="Shri Gajanan Maharaj Sabhagrah interior"
            className="about-img-main"
          />
          <div className="about-img-badge">
            <strong>15+</strong>
            <span>Years of Excellence</span>
          </div>
        </div>

        <div className="about-content">
          <div className="fade-up">
            <div className="section-tag">Our Story</div>
            <h2 className="section-title">A Venue That Speaks<br />Luxury &amp; Elegance</h2>
            <p className="section-desc" style={{ marginBottom: 28 }}>
              Shri Gajanan Maharaj Sabhagrah is a premium banquet hall and event venue crafted to bring your most cherished occasions to life. Nestled in a prime location, our venue blends architectural grandeur with warm hospitality to create a setting that is both breathtaking and deeply personal.
            </p>
            <p className="section-desc">
              With two distinct floors of versatile event space, we accommodate everything from intimate family gatherings of 50 guests to magnificent wedding receptions of 1,000. Our dedicated team of event professionals ensures every detail is orchestrated to perfection.
            </p>
          </div>

          <div className="about-features fade-up" style={{ transitionDelay: '0.15s' }}>
            {features.map((f, i) => (
              <div key={i} className="about-feature">
                <div className="about-feature-icon">{f.icon}</div>
                <p>{f.text}</p>
              </div>
            ))}
          </div>

          
        </div>
      </div>
    </section>
  )
}
