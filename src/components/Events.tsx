import { useEffect, useRef, useState } from 'react'
import { Heart, Wine, Gem, Cake, Star, Briefcase, Users, Music, ChevronLeft, ChevronRight } from 'lucide-react'

const SLIDE_INTERVAL = 4000

const events = [
  {
    icon: <Heart size={20} />,
    title: 'Weddings',
    desc: 'Timeless celebrations crafted to perfection for your big day.',
    images: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=600&auto=format&fit=crop',
    ],
  },
  {
    icon: <Wine size={20} />,
    title: 'Receptions',
    desc: 'Elegant receptions designed to impress every guest.',
    images: [
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1470019693664-1d202d2c0907?q=80&w=600&auto=format&fit=crop',
    ],
  },
  {
    icon: <Gem size={20} />,
    title: 'Engagements',
    desc: 'Celebrate your love story with an unforgettable engagement party.',
    images: [
      'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?q=80&w=600&auto=format&fit=crop',
    ],
  },
  {
    icon: <Cake size={20} />,
    title: 'Birthday Parties',
    desc: 'Vibrant birthday celebrations for all ages — from first birthdays to grand milestones.',
    images: [
      'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1533294455009-a77b7557d2d1?q=80&w=600&auto=format&fit=crop',
    ],
  },
  {
    icon: <Star size={20} />,
    title: 'Anniversary Celebrations',
    desc: 'Honour years of love with a beautifully curated anniversary event.',
    images: [
      'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1478146059778-26028b07395a?q=80&w=600&auto=format&fit=crop',
    ],
  },
  {
    icon: <Briefcase size={20} />,
    title: 'Corporate Meetings',
    desc: 'Professional event spaces with full AV support for your business events.',
    images: [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600&auto=format&fit=crop',
    ],
  },
  {
    icon: <Users size={20} />,
    title: 'Family Gatherings',
    desc: 'Warm, welcoming spaces for reunions and family milestones.',
    images: [
      'https://images.unsplash.com/photo-1529543544282-ea669407fca3?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=600&auto=format&fit=crop',
    ],
  },
  {
    icon: <Music size={20} />,
    title: 'Cultural Events',
    desc: 'Grand settings that honour tradition and cultural celebrations in style.',
    images: [
      'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583939411023-30fdc36c22d5?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?q=80&w=600&auto=format&fit=crop',
    ],
  },
]

interface EventCardSliderProps {
  images: string[]
  title: string
}

function EventCardSlider({ images, title }: EventCardSliderProps) {
  const hasMultiple = images.length > 1
  // Append a clone of the first slide so autoplay can keep translating the
  // track in a single direction; once it reaches the clone we snap back to
  // the real first slide instantly (no visible transition) for a seamless loop.
  const slides = hasMultiple ? [...images, images[0]] : images

  const [pos, setPos] = useState(0)
  const [animate, setAnimate] = useState(true)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!hasMultiple) return
    timerRef.current = setTimeout(() => {
      setAnimate(true)
      setPos(prev => prev + 1)
    }, SLIDE_INTERVAL)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [pos, hasMultiple])

  // After the forward transition lands on the cloned slide, jump back to the
  // real first slide with transitions disabled so the loop stays one-directional.
  const handleTransitionEnd = () => {
    if (pos === images.length) {
      setAnimate(false)
      setPos(0)
    }
  }

  useEffect(() => {
    if (!animate) {
      const id = requestAnimationFrame(() => setAnimate(true))
      return () => cancelAnimationFrame(id)
    }
  }, [animate])

  const goTo = (e: React.MouseEvent, dir: 1 | -1) => {
    e.stopPropagation()
    e.preventDefault()
    if (timerRef.current) clearTimeout(timerRef.current)
    setAnimate(true)
    setPos(prev => {
      if (dir === 1) return prev + 1
      const real = prev % images.length
      return real === 0 ? images.length - 1 : real - 1
    })
  }

  return (
    <div className="event-card-slider">
      <div
        className="event-card-track"
        style={{
          transform: `translateX(-${pos * 100}%)`,
          transition: animate ? undefined : 'none',
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {slides.map((src, i) => (
          <img key={i} src={src} alt={`${title} ${(i % images.length) + 1}`} loading="lazy" />
        ))}
      </div>

      {hasMultiple && (
        <>
          <button
            type="button"
            className="event-card-arrow event-card-arrow-left"
            aria-label="Previous image"
            onClick={e => goTo(e, -1)}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            className="event-card-arrow event-card-arrow-right"
            aria-label="Next image"
            onClick={e => goTo(e, 1)}
          >
            <ChevronRight size={18} />
          </button>
        </>
      )}
    </div>
  )
}

export default function Events() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.08 }
    )
    sectionRef.current?.querySelectorAll('.fade-up').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="events" id="events" ref={sectionRef}>
      <div className="events-header fade-up">
        <div className="section-tag" style={{ justifyContent: 'center' }}>Events We Host</div>
        <h2 className="section-title light">Every Occasion, Celebrated in Grand Style</h2>
        <p className="section-desc light" style={{ margin: '0 auto' }}>
          From intimate milestones to large-scale celebrations, Shri Gajanan Maharaj Sabhagrah is the perfect stage for every chapter of your life.
        </p>
      </div>

      <div className="events-grid">
        {events.map((event, i) => (
          <div key={i} className="event-card fade-up" style={{ transitionDelay: `${i * 0.07}s`, zIndex: i + 1 }}>
            <EventCardSlider images={event.images} title={event.title} />
            <div className="event-card-overlay">
              <div className="event-icon">{event.icon}</div>
              <h3>{event.title}</h3>
              <p>{event.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
