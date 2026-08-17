import React, { useState, useEffect } from 'react';

export default function Header({ isLight, onToggleTheme }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    let lastScrolledState = false;

    const handleScroll = () => {
      const isNowScrolled = window.scrollY > 40;
      if (isNowScrolled !== lastScrolledState) {
        lastScrolledState = isNowScrolled;
        setIsScrolled(isNowScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // High performance IntersectionObserver for section tracking
    const sectionIds = ['home', 'services', 'about', 'testimonials', 'contact'];
    const sectionElements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    sectionElements.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`} id="header">
      <div className="container nav-container">
        <a href="#home" className="logo" onClick={closeMenu}>
          <div className="logo-icon">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M12,2C11.5,2 9.5,3.5 8,4.5C6.5,5.5 5,7.5 5,10C5,13.5 6,15.5 7.5,17C9,18.5 10.5,19 11,21C11.1,21.5 11.5,22 12,22C12.5,22 12.9,21.5 13,21C13.5,19 15,18.5 16.5,17C18,15.5 19,13.5 19,10C19,7.5 17.5,5.5 16,4.5C14.5,3.5 12.5,2 12,2ZM12,4C12.2,4 13.7,5.1 14.9,6C16.1,6.9 17,8.2 17,10C17,12.7 16.2,14.3 15,15.5C13.8,16.7 12.8,17.2 12.2,18.9C12.1,19.2 12,19.5 12,19.7C12,19.5 11.9,19.2 11.8,18.9C11.2,17.2 10.2,16.7 9,15.5C7.8,14.3 7,12.7 7,10C7,8.2 7.9,6.9 9.1,6C10.3,5.1 11.8,4 12,4Z" />
            </svg>
          </div>
          <span>SDC</span>
        </a>

        <nav className={`nav-links ${mobileMenuOpen ? 'active' : ''}`} id="navLinks">
          <a href="#home" className={`nav-link ${activeSection === 'home' ? 'active' : ''}`} onClick={closeMenu}>Home</a>
          <a href="#services" className={`nav-link ${activeSection === 'services' ? 'active' : ''}`} onClick={closeMenu}>Services</a>
          <a href="#about" className={`nav-link ${activeSection === 'about' ? 'active' : ''}`} onClick={closeMenu}>About Clinic</a>
          <a href="#testimonials" className={`nav-link ${activeSection === 'testimonials' ? 'active' : ''}`} onClick={closeMenu}>Testimonials</a>
          <a href="#contact" className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`} onClick={closeMenu}>Contact Us</a>
        </nav>

        <button
          id="themeToggleBtn"
          className="theme-btn"
          aria-label="Toggle Theme"
          onClick={onToggleTheme}
        >
          {/* Sun Icon */}
          <svg className="sun-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
          {/* Moon Icon */}
          <svg className="moon-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </button>

        <div className="nav-cta">
          <a href="#contact" className="btn btn-primary" onClick={closeMenu}>Book Now</a>
        </div>

        <button
          className={`menu-toggle ${mobileMenuOpen ? 'active' : ''}`}
          id="menuToggle"
          aria-label="Toggle Menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
