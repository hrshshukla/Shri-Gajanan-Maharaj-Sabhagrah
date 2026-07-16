export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <div className="navbar-logo" style={{ marginBottom: 0 }}>
            <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.05rem, 3.5vw, 1.4rem)', fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.01em', lineHeight: 1.15, display: 'block', maxWidth: '280px' }}>
              Shri Gajanan Maharaj Sabhagrah
            </span>
            <span style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>
              Premium Banquet &amp; Event Venue
            </span>
          </div>
          <p>
            Creating unforgettable celebrations since 2009. Your dream event, brought to life with luxury, elegance, and heartfelt hospitality.
          </p>
          <div className="footer-social">
            <a href="#" aria-label="Facebook">f</a>
            <a href="#" aria-label="Instagram">in</a>
            <a href="#" aria-label="YouTube">▶</a>
            <a href="#" aria-label="WhatsApp">w</a>
          </div>
        </div>



        <div className="footer-col">
          <h4>Contact Info</h4>
          <ul>
            <li><a href="tel:+919325375179">📞 Rajesh Shukla — +91 93253 75179</a></li>
            <li><a href="mailto:events@shrigajananmaharaj.in">✉ events@shrigajananmaharaj.in</a></li>
            <li><a href="#booking">📍 Near Tulsi Apartment, Katol Naka Chowk, Dabha Road, Nagpur</a></li>
            <li><a href="#booking">🕐 Open: 9AM – 9PM Daily</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom" style={{ width: '100%' }}>
        <p>© {year} Shri Gajanan Maharaj Sabhagrah. All rights reserved.</p>
        <div className="footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Sitemap</a>
        </div>
      </div>
    </footer>
  )
}
