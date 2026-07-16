import { useEffect, useRef } from 'react'
import { MapPin, Phone, Clock } from 'lucide-react'

export default function Location() {
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
    <section className="location" id="location" ref={sectionRef}>
      <div className="location-header fade-up">
        <div className="section-tag" style={{ justifyContent: 'center' }}>Find Us</div>
        <h2 className="section-title">Visit Shri Gajanan Maharaj Sabhagrah</h2>
        <p className="section-desc" style={{ margin: '0 auto' }}>
          Come see the venue in person, or drop a pin — we're easy to find and always ready to welcome you.
        </p>
      </div>

      <div className="location-inner">
        <div className="location-map fade-in">
          <iframe
            src="https://www.google.com/maps/embed?pb=!4v1783784170213!6m8!1m7!1sA_x1Doz-CRWJ3XKjojTNPw!2m2!1d21.17744009463026!2d79.02996343256038!3f325.13647799211!4f14.30262662828602!5f1.896788255350018"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            title="Shri Gajanan Maharaj Sabhagrah location on Google Maps"
          />
        </div>

        <div className="location-details fade-up" style={{ transitionDelay: '0.15s' }}>
          <div className="location-detail">
            <div className="location-detail-icon"><MapPin size={18} /></div>
            <div>
              <h4>Address</h4>
              <p>Near Tulsi Apartment, Katol Naka Chowk, Dabha Road, Nagpur</p>
            </div>
          </div>
          <div className="location-detail">
            <div className="location-detail-icon"><Clock size={18} /></div>
            <div>
              <h4>Visiting Hours</h4>
              <p>Open 9AM – 9PM Daily</p>
            </div>
          </div>
          <div className="location-detail">
            <div className="location-detail-icon"><Phone size={18} /></div>
            <div>
              <h4>Call Us</h4>
              <p><a href="tel:+919325375179">+91 93253 75179</a></p>
            </div>
          </div>
          <a
            href="https://www.google.com/maps/place/Shri+Gajanan+Maharaj+sabhagrah/@21.1773401,79.0297205,383m/data=!3m1!1e3!4m6!3m5!1s0x3bd4c11473db504d:0xec806b30eb9757e9!8m2!3d21.1775636!4d79.0297659!16s%2Fg%2F11llhqg958?entry=ttu&g_ep=EgoyMDI2MDcwOC4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ marginTop: 8, display: 'inline-flex', alignItems: 'center', gap: 8 }}
          >
            <img src="/icons/google-icon.png" alt="" width={18} height={18} />
            Google map location
          </a>
        </div>
      </div>
    </section>
  )
}
