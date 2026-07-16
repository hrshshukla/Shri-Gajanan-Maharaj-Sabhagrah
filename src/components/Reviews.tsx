import { useEffect, useRef } from 'react'
import { Star } from 'lucide-react'

const reviews = [
  {
    name: 'Priya & Rohan Deshmukh',
    event: 'Wedding',
    comment: 'Shri Gajanan Maharaj Sabhagrah turned our wedding into an absolute fairytale. Every detail, from the decor to the service, was flawless.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=700&auto=format&fit=crop',
  },
  {
    name: 'Ananya Kulkarni',
    event: 'Birthday Party',
    comment: "My daughter's 10th birthday felt like a royal celebration. The staff went above and beyond to make every kid feel special.",
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=700&auto=format&fit=crop',
  },
  {
    name: 'Vikram & Sneha Rao',
    event: 'Engagement',
    comment: "We couldn't have asked for a more elegant venue. The lighting and ambience made our engagement night unforgettable.",
    image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=700&auto=format&fit=crop',
  },
  {
    name: 'Meera Joshi',
    event: 'Anniversary',
    comment: 'Celebrated our 25th anniversary here and it exceeded every expectation. Warm hospitality and a stunning setup.',
    image: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=700&auto=format&fit=crop',
  },
  {
    name: 'Arjun Mehta',
    event: 'Corporate Event',
    comment: 'Hosted our annual company gala here — professional staff, seamless AV support, and a venue that impressed every client.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=700&auto=format&fit=crop',
  },
  {
    name: 'Kavita & Suresh Patil',
    event: 'Reception',
    comment: 'The reception hall was breathtaking. Guests are still talking about how beautifully everything was arranged.',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=700&auto=format&fit=crop',
  },
]

export default function Reviews() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    sectionRef.current?.querySelectorAll('.fade-up').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const track = [...reviews, ...reviews]

  return (
    <section className="reviews" id="reviews" ref={sectionRef}>
      <div className="reviews-header fade-up">
        <div className="section-tag" style={{ justifyContent: 'center' }}>Guest Stories</div>
        <h2 className="section-title">Loved by Our Guests</h2>
        <p className="section-desc" style={{ margin: '0 auto' }}>
          Real celebrations, real memories — hear what our guests have to say about their experience at Shri Gajanan Maharaj Sabhagrah.
        </p>
      </div>

      <div className="reviews-slider fade-up">
        <div className="reviews-track">
          {track.map((review, i) => (
            <div className="review-card" key={i}>
              <img src={review.image} alt={review.event} loading="lazy" />
              <div className="review-card-overlay">
                <div className="review-stars">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} size={16} className="review-star" style={{ animationDelay: `${s * 0.15}s` }} />
                  ))}
                </div>
                <div className="review-event-tag">{review.event}</div>
                <p className="review-comment">&ldquo;{review.comment}&rdquo;</p>
                <p className="review-name">{review.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
