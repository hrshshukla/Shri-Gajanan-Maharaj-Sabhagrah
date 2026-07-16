import { useState, useEffect, useRef } from 'react'
import { Phone, Mail, MapPin, CheckCircle, AlertCircle } from 'lucide-react'
import DateSelect from './DateSelect'

interface Props {
  prefilledEvent: string
  onClearPrefill: () => void
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

function todayParts() {
  const d = new Date()
  return {
    day: String(d.getDate()),
    month: String(d.getMonth() + 1),
    year: String(d.getFullYear()),
  }
}

type Status = 'idle' | 'sending' | 'success' | 'error'

export default function BookingForm({ prefilledEvent, onClearPrefill }: Props) {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const today = todayParts()
  const [form, setForm] = useState({
    name: '', phone: '',
    eventType: '',
    day: today.day,
    month: today.month,
    year: today.year,
    guestCount: ''
  })
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    sectionRef.current?.querySelectorAll('.fade-up').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (prefilledEvent) {
      setForm(prev => ({ ...prev, eventType: prefilledEvent }))
      onClearPrefill()
    }
  }, [prefilledEvent, onClearPrefill])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 10)
    const formatted = digits.length > 5 ? `${digits.slice(0, 5)} ${digits.slice(5)}` : digits
    setForm(prev => ({ ...prev, phone: formatted }))
  }

  const handleDateChange = (name: string, value: string) => {
    setForm(prev => {
      const next = { ...prev, [name]: value }
      const now = new Date()
      const nowY = now.getFullYear()
      const nowM = now.getMonth() + 1
      const nowD = now.getDate()

      // If the year became the current year, don't leave a past month selected.
      if (Number(next.year) === nowY && Number(next.month) < nowM) {
        next.month = String(nowM)
      }

      // Don't leave a past day selected once year/month resolve to the current month.
      if (Number(next.year) === nowY && Number(next.month) === nowM && Number(next.day) < nowD) {
        next.day = String(nowD)
      }

      // Clamp day to the last valid day of the resolved month (e.g. 31 -> 28/29/30).
      const maxDay = new Date(Number(next.year), Number(next.month), 0).getDate()
      if (Number(next.day) > maxDay) {
        next.day = String(maxDay)
      }

      return next
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === 'sending') return // prevent duplicate submissions

    setStatus('sending')
    setErrorMessage('')

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, phone: `+91 ${form.phone}` }),
      })

      const data = await response.json().catch(() => null)

      if (!response.ok || !data?.ok) {
        throw new Error(data?.message || 'Something went wrong. Please try again.')
      }

      setStatus('success')
    } catch (err) {
      setStatus('error')
      setErrorMessage(
        err instanceof Error && err.message
          ? err.message
          : 'Something went wrong while sending your inquiry. Please try again or call us directly.'
      )
    }
  }

  const handleRetry = () => {
    setStatus('idle')
    setErrorMessage('')
  }

  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth() + 1
  const currentDay = now.getDate()

  const years = Array.from({ length: 4 }, (_, i) => currentYear + i)

  const availableMonths = MONTHS
    .map((label, i) => ({ value: String(i + 1), label }))
    .filter(m => Number(form.year) !== currentYear || Number(m.value) >= currentMonth)

  const daysInMonth = new Date(Number(form.year), Number(form.month), 0).getDate()
  const dayStart = (Number(form.year) === currentYear && Number(form.month) === currentMonth) ? currentDay : 1
  const days = Array.from({ length: Math.max(daysInMonth - dayStart + 1, 0) }, (_, i) => dayStart + i)

  return (
    <section className="booking" id="booking" ref={sectionRef}>
      <div className="booking-inner">
        <div className="booking-info fade-up">
          <div className="section-tag" style={{ color: 'var(--gold-light)' }}>Book Now</div>
          <h2>Let's Plan Your<br />Dream Celebration</h2>
          <p>
            We'll guide you through every step — from choosing the perfect floor to creating a personalised experience your guests will never forget.
          </p>

          
        </div>

        <div className="booking-form-col fade-up" style={{ transitionDelay: '0.15s' }}>
          <div className="booking-form">
            {status === 'success' ? (
              <div className="form-success">
                <CheckCircle size={56} color="var(--gold)" />
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', marginBottom: 10 }}>
                  Thank You!
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.65)' }}>
                  Your inquiry has been received. Our team will contact you within 24 hours to discuss your event details.
                </p>
                <button type="button" className="form-success-retry" onClick={handleRetry}>
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Your Name</label>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Your full name" required />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <div className="phone-input-wrap">
                      <span className="phone-input-prefix">+91</span>
                      <input
                        type="tel"
                        inputMode="numeric"
                        name="phone"
                        value={form.phone}
                        onChange={handlePhoneChange}
                        placeholder="12345 67890"
                        maxLength={11}
                        pattern="\d{5} ?\d{5}"
                        title="Enter a 10-digit phone number"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Event Type</label>
                    <select name="eventType" value={form.eventType} onChange={handleChange} required>
                      <option value="">Select event type</option>
                      <option>Wedding</option>
                      <option>Reception</option>
                      <option>Engagement</option>
                      <option>Birthday Party</option>
                      <option>Anniversary Celebration</option>
                      <option>Corporate Meeting</option>
                      <option>Family Gathering</option>
                      <option>Cultural Event</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Event Date</label>
                    <div className="date-row">
                      <DateSelect
                        name="day"
                        value={form.day}
                        options={days.map(d => ({ value: String(d), label: String(d) }))}
                        onChange={handleDateChange}
                        ariaLabel="Day"
                      />
                      <DateSelect
                        name="month"
                        value={form.month}
                        options={availableMonths}
                        onChange={handleDateChange}
                        ariaLabel="Month"
                      />
                      <DateSelect
                        name="year"
                        value={form.year}
                        options={years.map(y => ({ value: String(y), label: String(y) }))}
                        onChange={handleDateChange}
                        ariaLabel="Year"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>Expected Number of Guests</label>
                  <select name="guestCount" value={form.guestCount} onChange={handleChange} required>
                    <option value="">Select guest count</option>
                    <option>50 – 100 Guests</option>
                    <option>100 – 200 Guests</option>
                    <option>200 – 400 Guests</option>
                    <option>400 – 600 Guests</option>
                    <option>600 – 800 Guests</option>
                    <option>800+ Guests</option>
                  </select>
                </div>

                {status === 'error' && (
                  <div className="form-error">
                    <AlertCircle size={18} />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button type="submit" className="form-submit" disabled={status === 'sending'}>
                  {status === 'sending' ? (
                    <>
                      <span className="form-spinner" />
                      Sending...
                    </>
                  ) : (
                    <>Send Inquiry →</>
                  )}
                </button>
              </form>
            )}
          </div>

          <a href="tel:+919325375179" className="form-call-cta">
            <span className="form-call-cta-icon"><Phone size={16} /></span>
            <span className="form-call-cta-text">
              <span className="form-call-cta-label">Prefer to call? Reach us directly</span>
              <span className="form-call-cta-num">
                <span className="form-call-cta-name">Rajesh Shukla</span>
                <span className="form-call-cta-sep">·</span>
                <span className="form-call-cta-phone">+91&nbsp;93253&nbsp;75179</span>
              </span>
            </span>
          </a>
        </div>

      </div>
    </section>
  )
}
