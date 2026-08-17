import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      {/* Scrolling Marquee Banner */}
      <div className="footer-marquee">
        <div className="marquee-content">
          <span>Saranya Dental Clinic &nbsp;&bull;&nbsp;</span>
          <span>Saranya Dental Clinic &nbsp;&bull;&nbsp;</span>
          <span>Saranya Dental Clinic &nbsp;&bull;&nbsp;</span>
          <span>Saranya Dental Clinic &nbsp;&bull;&nbsp;</span>
          <span>Saranya Dental Clinic &nbsp;&bull;&nbsp;</span>
          <span>Saranya Dental Clinic &nbsp;&bull;&nbsp;</span>
        </div>
        <div className="marquee-content">
          <span>Saranya Dental Clinic &nbsp;&bull;&nbsp;</span>
          <span>Saranya Dental Clinic &nbsp;&bull;&nbsp;</span>
          <span>Saranya Dental Clinic &nbsp;&bull;&nbsp;</span>
          <span>Saranya Dental Clinic &nbsp;&bull;&nbsp;</span>
          <span>Saranya Dental Clinic &nbsp;&bull;&nbsp;</span>
          <span>Saranya Dental Clinic &nbsp;&bull;&nbsp;</span>
        </div>
      </div>

      <div className="container footer-grid">
        <div className="footer-brand">
          <a href="#home" className="logo" style={{ color: 'var(--white)' }}>
            <div className="logo-icon">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M12,2C11.5,2 9.5,3.5 8,4.5C6.5,5.5 5,7.5 5,10C5,13.5 6,15.5 7.5,17C9,18.5 10.5,19 11,21C11.1,21.5 11.5,22 12,22C12.5,22 12.9,21.5 13,21C13.5,19 15,18.5 16.5,17C18,15.5 19,13.5 19,10C19,7.5 17.5,5.5 16,4.5C14.5,3.5 12.5,2 12,2ZM12,4C12.2,4 13.7,5.1 14.9,6C16.1,6.9 17,8.2 17,10C17,12.7 16.2,14.3 15,15.5C13.8,16.7 12.8,17.2 12.2,18.9C12.1,19.2 12,19.5 12,19.7C12,19.5 11.9,19.2 11.8,18.9C11.2,17.2 10.2,16.7 9,15.5C7.8,14.3 7,12.7 7,10C7,8.2 7.9,6.9 9.1,6C10.3,5.1 11.8,4 12,4Z" />
              </svg>
            </div>
            <span>SDC</span>
          </a>
          <p>
            Saranya Dental Clinic is dedicated to offering state-of-the-art dental services under the strict supervision of Dr. Saranya. Experience clinical perfection in a warm, welcoming environment in Somanur.
          </p>
          <div className="social-links">
            <a href="#" className="social-btn" aria-label="Facebook">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7C18.34 21.21 22 17.06 22 12.06c0-5.53-4.5-10.02-10-10.02z" />
              </svg>
            </a>
            <a href="https://www.instagram.com/saranya_dental_clinic_" target="_blank" rel="noreferrer" className="social-btn" aria-label="Instagram">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
              </svg>
            </a>
            <a href="#" className="social-btn" aria-label="Twitter">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="footer-links-col">
          <h4>Quick Links</h4>
          <ul className="footer-menu">
            <li><a href="#home" className="footer-menu-link">Home</a></li>
            <li><a href="#services" className="footer-menu-link">Our Services</a></li>
            <li><a href="#about" className="footer-menu-link">About Clinic</a></li>
            <li><a href="#testimonials" className="footer-menu-link">Testimonials</a></li>
            <li><a href="#contact" className="footer-menu-link">Book Appointment</a></li>
            <li><a href="#faq" className="footer-menu-link">FAQs</a></li>
          </ul>
        </div>

        <div className="footer-contact-col">
          <h4>Find SDC Clinic</h4>
          <div className="footer-contact-info">
            <div className="footer-contact-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>Main Road, Near Railway Station,<br />Somanur, Coimbatore - 641668</span>
            </div>
            <div className="footer-contact-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <a href="tel:+918122790927" className="btn btn-white" style={{ padding: '0.4rem 1rem', fontSize: '0.75rem' }}>
                  Call 8122790927
                </a>
                <a href="tel:+918122790928" className="btn btn-white" style={{ padding: '0.4rem 1rem', fontSize: '0.75rem' }}>
                  Call 8122790928
                </a>
              </div>
            </div>
            <div className="footer-contact-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <a href="mailto:dr.saranyarvs@gmail.com" className="btn btn-white" style={{ padding: '0.4rem 1rem', fontSize: '0.75rem' }}>
                Send Email
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>&copy; 2026 Saranya Dental Clinic Somanur. All rights reserved.</p>
        <div className="footer-bottom-links">
          <a href="#" className="footer-bottom-link">Privacy Policy</a>
          <a href="#" className="footer-bottom-link">Terms & Conditions</a>
        </div>
      </div>
    </footer>
  );
}
