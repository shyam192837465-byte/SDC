import React, { useState, useEffect, useRef } from 'react';

const testimonialsData = [
  {
    quote: '"I was extremely scared of root canal treatments. But Dr. Saranya explained everything and completed the procedure with zero pain! Truly the best dental clinic in Somanur area."',
    name: 'Ramesh Kumar',
    treatment: 'Root Canal & Crown',
    avatar: 'R',
  },
  {
    quote: '"The clinic is spotlessly clean. Dr. Saranya is very professional and patient. My kids feel very comfortable getting their dental checkups here. Highly recommended!"',
    name: 'Priya Dharshini',
    treatment: 'Pediatric Care',
    avatar: 'P',
  },
  {
    quote: '"Got dental aligners at SDC. The pricing is very transparent and the alignment progress has been amazing. The appointment booking system online is extremely easy to use."',
    name: 'Anand Raj',
    treatment: 'Clear Aligners',
    avatar: 'A',
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoPlayRef = useRef(null);

  const startAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
    }, 7000);
  };

  useEffect(() => {
    startAutoPlay();
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
    startAutoPlay();
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
    startAutoPlay();
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
    startAutoPlay();
  };

  return (
    <section className="section testimonials" id="testimonials">
      <div className="container">
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span className="section-tag">Patient Stories</span>
          <h2 className="section-title">
            What Our <span>Patients Say</span>
          </h2>
          <p className="section-desc">We measure our success by the healthy, happy smiles of our patients.</p>
        </div>

        <div className="testimonials-container">
          <div className="slider-wrapper">
            <div
              className="slider-track"
              id="sliderTrack"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonialsData.map((item, idx) => (
                <div className="slide" key={idx}>
                  <div className="testimonial-card glass-card">
                    <div className="quote-icon">&ldquo;</div>
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} viewBox="0 0 24 24">
                          <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
                        </svg>
                      ))}
                    </div>
                    <p className="testimonial-text">{item.quote}</p>
                    <div className="patient-info">
                      <div className="patient-avatar">{item.avatar}</div>
                      <span className="patient-name">{item.name}</span>
                      <span className="patient-treatment">{item.treatment}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slider Controls */}
          <div className="slider-controls">
            <button className="slider-btn" id="prevBtn" aria-label="Previous Slide" onClick={handlePrev}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="slider-dots" id="sliderDots">
              {testimonialsData.map((_, idx) => (
                <div
                  key={idx}
                  className={`dot ${idx === currentIndex ? 'active' : ''}`}
                  onClick={() => handleDotClick(idx)}
                />
              ))}
            </div>
            <button className="slider-btn" id="nextBtn" aria-label="Next Slide" onClick={handleNext}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
