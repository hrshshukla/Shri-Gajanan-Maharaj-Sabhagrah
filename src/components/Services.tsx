import { useEffect, useRef } from 'react'
import {
  UtensilsCrossed, Palette, Flower2, Calendar,
  BedDouble, Music2, Lightbulb, Camera,
  Sparkles, Car, Shield, Zap, SmilePlus, Monitor,
  ArrowRight, Phone
} from 'lucide-react'

const services = [
  {
    icon: <UtensilsCrossed size={22} />,
    title: 'Catering Services',
    items: ['Pure Vegetarian Menu', 'Buffet Arrangements', 'Live Food Counters', 'Custom Menu Planning'],
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=700&auto=format&fit=crop',
  },
  {
    icon: <Palette size={22} />,
    title: 'Event Decoration',
    items: ['Theme-Based Decorations', 'Premium Stage Design', 'Customized Event Styling', 'Entrance Decorations'],
    image: 'https://images.unsplash.com/photo-1478146059778-26028b07395a?q=80&w=700&auto=format&fit=crop',
  },
  {
    icon: <Flower2 size={22} />,
    title: 'Floral Decoration',
    items: ['Fresh Flower Arrangements', 'Wedding Mandap Decoration', 'Stage Floral Designs', 'Venue Flower Styling'],
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=700&auto=format&fit=crop',
  },
  {
    icon: <Calendar size={22} />,
    title: 'Wedding Planning',
    items: ['Event Coordination', 'Vendor Management', 'Timeline Planning', 'Guest Management Support'],
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=700&auto=format&fit=crop',
  },
  {
    icon: <BedDouble size={22} />,
    title: 'Accommodation Rooms',
    items: ['Bride & Groom Rooms', 'Family Guest Rooms', 'Air-Conditioned Rooms', 'Comfortable Stay Facilities'],
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=700&auto=format&fit=crop',
  },
  {
    icon: <Music2 size={22} />,
    title: 'Sound & DJ Services',
    items: ['Professional Sound Systems', 'DJ Setup', 'Wireless Microphones', 'Background Music Arrangements'],
    image: 'https://images.unsplash.com/photo-1571266028243-d220c9c3b31d?q=80&w=700&auto=format&fit=crop',
  },
  {
    icon: <Lightbulb size={22} />,
    title: 'Lighting Services',
    items: ['Decorative Lighting', 'Stage Lighting', 'Ambient Venue Lighting', 'Special Event Effects'],
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=700&auto=format&fit=crop',
  },
  {
    icon: <Camera size={22} />,
    title: 'Photography & Videography',
    items: ['Professional Photography', 'Cinematic Wedding Films', 'Drone Coverage', 'Event Highlights Videos'],
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=700&auto=format&fit=crop',
  },
  {
    icon: <Sparkles size={22} />,
    title: 'Bridal Preparation Rooms',
    items: ['Makeup Room', 'Dressing Area', 'Private Preparation Space', 'Groom Preparation Suite'],
    image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=700&auto=format&fit=crop',
  },
  {
    icon: <Car size={22} />,
    title: 'Parking Management',
    items: ['Spacious Parking Area', 'Vehicle Assistance', 'Guest Convenience', 'Valet Services'],
    image: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?q=80&w=700&auto=format&fit=crop',
  },
  {
    icon: <Shield size={22} />,
    title: 'Security Services',
    items: ['Event Security Personnel', 'Entry Management', 'Guest Safety Arrangements', 'CCTV Surveillance'],
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=700&auto=format&fit=crop',
  },
  {
    icon: <Zap size={22} />,
    title: 'Power Backup',
    items: ['Generator Support', 'Uninterrupted Operations', 'Backup Lighting Systems', '24/7 Technical Support'],
    image: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?q=80&w=700&auto=format&fit=crop',
  },
  {
    icon: <SmilePlus size={22} />,
    title: 'Guest Hospitality',
    items: ['Welcome Arrangements', 'Reception Desk', 'Guest Assistance', 'Refreshment Services'],
    image: 'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?q=80&w=700&auto=format&fit=crop',
  },
  {
    icon: <Monitor size={22} />,
    title: 'Corporate Event Setup',
    items: ['Conference Seating', 'Projector & Display Setup', 'Meeting Arrangements', 'High-Speed Internet'],
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=700&auto=format&fit=crop',
  },
]

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.05 }
    )
    sectionRef.current?.querySelectorAll('.fade-up').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="services" id="services" ref={sectionRef}>
      <div className="services-header fade-up">
        <div className="section-tag">Our Services</div>
        <h2 className="section-title">Everything You Need, All in One Place</h2>
        <p className="section-desc" style={{ margin: '0 auto' }}>
          From breathtaking décor to flawless catering — our comprehensive suite of services ensures every detail of your event is handled with perfection.
        </p>
      </div>

      <div className="services-grid">
        {services.map((svc, i) => (
          <div
            key={i}
            className="service-card fade-up"
            style={{ transitionDelay: `${(i % 4) * 0.08}s` }}
          >
            <div className="service-card-media" style={{ backgroundImage: `url(${svc.image})` }} />
            <div className="service-card-content">
              <div className="service-card-icon">{svc.icon}</div>
              <h3>{svc.title}</h3>
              <ul className="service-list">
                {svc.items.map(item => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </div>
        ))}
      </div>

 
    </section>
  )
}
