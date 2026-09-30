import React from 'react';
import heroImg from '../assets/hero.png';

export default function Hero() {
  return (
    <section className="hero section" id="home">
      <div className="container hero-grid">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            <span className="badge-text">Modern Dental Excellence</span>
          </div>
          <h1 className="hero-title" id="heroTitle">
            Your Smile, Our Passion. <br />
            <span>Saranya Dental Clinic</span>
          </h1>
          <p className="hero-desc">
            Experience premium, painless dental treatments at Somanur's leading dental care facility. We bring advanced dental technology and gentle care together for your family.
          </p>
          <div className="hero-buttons">
            <a href="#contact" className="btn btn-primary">
              Schedule Appointment
              <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a href="#services" className="btn btn-secondary">Our Services</a>
          </div>
        </div>

        <div className="hero-image-wrapper">
          <div className="hero-img-container">
            <img
              src={heroImg}
              alt="Saranya Dental Clinic Operatory & Modern Equipment"
              className="hero-img"
            />
          </div>

          {/* Floating Stat Cards */}
          <div className="hero-floating-card h-card-1 glass-card">
            <div className="floating-card-icon">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <div className="floating-card-info">
              <h4>100% Safe</h4>
              <p>ISO Certified Sterile</p>
            </div>
          </div>

          <div className="hero-floating-card h-card-2 glass-card">
            <div className="floating-card-icon">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div className="floating-card-info">
              <h4>5000+</h4>
              <p>Happy Patients</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mouse Scroll Down indicator */}
      <a href="#services" className="scroll-indicator">
        <span>Scroll Down</span>
        <div className="scroll-mouse">
          <div className="scroll-wheel"></div>
        </div>
      </a>
    </section>
  );
}
