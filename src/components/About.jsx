import React from 'react';
import aboutImg from '../assets/about.png';

export default function About() {
  return (
    <section className="section" id="about">
      <div className="container about-grid">
        <div className="about-image-wrapper">
          <div className="about-img-container">
            <img
              src={aboutImg}
              alt="Dr. Saranya Dentist SDC"
              className="about-img"
            />
          </div>
          <div className="about-experience-badge">
            <span className="exp-years">10+</span>
            <span className="exp-text">Years of Quality Care</span>
          </div>
        </div>

        <div className="about-info-content">
          <span className="section-tag">About Saranya Dental Clinic</span>
          <h2 className="section-title">
            Bringing Smile <span>Excellence to Somanur</span>
          </h2>
          <p className="section-desc">
            Founded and led by <strong>Dr. Saranya</strong>, Saranya Dental Clinic (SDC) has established itself as the go-to family dental practice in Somanur. Our core values center around high-end sterile care, clinical precision, and absolute patient comfort.
          </p>

          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', marginTop: '-2.5rem' }}>
            We treat dentistry not just as a medical procedure, but as an art. From the moment you walk through our doors, our warm staff and tranquil ambiance are designed to make your anxiety disappear. We utilize digital dental diagnostics to ensure highly accurate treatment planning.
          </p>

          <div className="about-features">
            <div className="about-feature-item">
              <span className="feature-check">&#10003;</span>
              <span>Sterilization Protocol</span>
            </div>
            <div className="about-feature-item">
              <span className="feature-check">&#10003;</span>
              <span>Dr. Saranya's Direct Expert Care</span>
            </div>
            <div className="about-feature-item">
              <span className="feature-check">&#10003;</span>
              <span>Modern Diagnostic tools</span>
            </div>
            <div className="about-feature-item">
              <span className="feature-check">&#10003;</span>
              <span>Affordable & Fair Pricing</span>
            </div>
          </div>

          <a href="#contact" className="btn btn-primary">Book a Consultation</a>
        </div>
      </div>
    </section>
  );
}
