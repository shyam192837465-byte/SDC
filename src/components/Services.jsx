import React from 'react';

const servicesData = [
  {
    title: 'Preventive Dentistry',
    desc: 'Regular checkups, professional dental cleaning, sealants, and fluoride treatments to preserve dental health.',
    icon: (
      <svg className="service-icon-svg" viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM12 4.5l5.5 2.1v4.4c0 3.7-4.2 6.9-5.5 7.8-1.3-1-5.5-4.1-5.5-7.8V6.6L12 4.5zm-1 8.5l4-4-1.4-1.4-2.6 2.6-1.6-1.6L8 10l3 3z" />
      </svg>
    ),
  },
  {
    title: 'Dental Implants',
    desc: 'Modern dental implants designed to restore single, multiple, or full arches of missing teeth permanently.',
    icon: (
      <svg className="service-icon-svg" viewBox="0 0 24 24">
        <path d="M12,2A3,3 0 0,0 9,5C9,6.4 10,7.6 11.2,7.9L9,15H11V22H13V15H15L12.8,7.9C14,7.6 15,6.4 15,5A3,3 0 0,0 12,2M12,4A1,1 0 0,1 13,5A1,1 0 0,1 12,6A1,1 0 0,1 11,5A1,1 0 0,1 12,4M8.5,8A1.5,1.5 0 0,0 7,9.5C7,10.6 7.8,11.5 8.8,11.7L7.5,16H9.5V22H10.5V16H11.8L10.3,11.2C10.7,10.8 11,10.2 11,9.5A1.5,1.5 0 0,0 9.5,8A1.5,1.5 0 0,0 8.5,8M15.5,8A1.5,1.5 0 0,0 14,9.5C14,10.2 14.3,10.8 14.7,11.2L13.2,16H14.5V22H15.5V16H17.5L16.2,11.7C17.2,11.5 18,10.6 18,9.5A1.5,1.5 0 0,0 16.5,8H15.5Z" />
      </svg>
    ),
  },
  {
    title: 'Root Canal Therapy',
    desc: 'Save highly damaged or infected teeth with state-of-the-art, virtually painless root canal procedures.',
    icon: (
      <svg className="service-icon-svg" viewBox="0 0 24 24">
        <path d="M19.3,12.5C18,11 16.6,8.4 16.6,5.3C16.6,4.6 16,4 15.3,4H8.7C8,4 7.4,4.6 7.4,5.3C7.4,8.4 6,11 4.7,12.5C4.2,13 4,13.8 4,14.5C4,18.1 6.9,21 10.5,21C11.5,21 12.5,20.8 13.5,20.3L12.5,18.5H11.5C9.6,18.5 8,16.9 8,15C8,13.1 9.6,11.5 11.5,11.5C13.4,11.5 15,13.1 15,15C15,15.6 14.8,16.2 14.5,16.7L16,19.3C18.4,18.3 20,15.9 20,13.1C20,12.9 20,12.7 19.9,12.5C19.8,12.5 19.5,12.6 19.3,12.5Z" />
      </svg>
    ),
  },
  {
    title: 'Orthodontics / Braces',
    desc: 'Metal braces, ceramic braces, and modern transparent clear aligners to align teeth for teens and adults.',
    icon: (
      <svg className="service-icon-svg" viewBox="0 0 24 24">
        <path d="M5,3A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3H5M5,5H19V7H17V9H15V7H9V9H7V7H5V5M5,11H7V13H9V11H15V13H17V11H19V13H17V15H15V13H9V15H7V13H5V11M5,17H7V19H5V17M9,17H15V19H9V17M17,17H19V19H17V17Z" />
      </svg>
    ),
  },
  {
    title: 'Cosmetic Dentistry',
    desc: 'Teeth whitening, composite veneers, porcelain veneers, and complete smile design to boost your confidence.',
    icon: (
      <svg className="service-icon-svg" viewBox="0 0 24 24">
        <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M7,9.5A1.5,1.5 0 0,0 8.5,11A1.5,1.5 0 0,0 10,9.5A1.5,1.5 0 0,0 8.5,8A1.5,1.5 0 0,0 7,9.5M14,9.5A1.5,1.5 0 0,0 15.5,11A1.5,1.5 0 0,0 17,9.5A1.5,1.5 0 0,0 15.5,8A1.5,1.5 0 0,0 14,9.5M12,18C14.7,18 17,15.8 17.5,13H6.5C7,15.8 9.3,18 12,18Z" />
      </svg>
    ),
  },
  {
    title: 'Pediatric Care',
    desc: 'Kid-friendly dental clinic environment focusing on preventive treatments, habits counseling, and milk teeth care.',
    icon: (
      <svg className="service-icon-svg" viewBox="0 0 24 24">
        <path d="M12,2C11.5,2 10.5,2.75 9.7,3.5C8.9,4.25 8.2,5.25 8.2,6.5C8.2,7.5 8.5,8.25 9,9C9.5,9.75 10.2,10.25 10.7,11.5C11.2,12.75 10.5,14.5 10,16.5C9.5,18.5 8,21 11,21C11.5,21 11.8,20.5 12,20C12.2,20.5 12.5,21 13,21C16,21 14.5,18.5 14,16.5C13.5,14.5 12.8,12.75 13.3,11.5C13.8,10.25 14.5,9.75 15,9C15.5,8.25 15.8,7.5 15.8,6.5C15.8,5.25 15.1,4.25 14.3,3.5C13.5,2.75 12.5,2 12,2Z" />
      </svg>
    ),
  },
  {
    title: 'Crowns & Bridges',
    desc: 'Custom-crafted dental crowns and bridges to restore damaged teeth and replace missing ones with natural-looking results.',
    icon: (
      <svg className="service-icon-svg" viewBox="0 0 24 24">
        <path d="M2,21V17C2,15.89 2.9,15 4,15H8L10,13H14L16,15H20C21.11,15 22,15.89 22,17V21H2M4,17V19H20V17H16.5L14.5,15H9.5L7.5,17H4M12,2L15,5H9L12,2M9,6H15C15,6 16,7 16,8C16,9 15,10 15,10H9C9,10 8,9 8,8C8,7 9,6 9,6M9,11H15L14,13H10L9,11Z" />
      </svg>
    ),
  },
  {
    title: 'Teeth Whitening',
    desc: 'Professional in-clinic laser whitening and take-home kits to brighten your smile by several shades safely.',
    icon: (
      <svg className="service-icon-svg" viewBox="0 0 24 24">
        <path d="M12,2C11.5,2 9.5,3.5 8,4.5C6.5,5.5 5,7.5 5,10C5,13.5 6,15.5 7.5,17C9,18.5 10.5,19 11,21C11.1,21.5 11.5,22 12,22C12.5,22 12.9,21.5 13,21C13.5,19 15,18.5 16.5,17C18,15.5 19,13.5 19,10C19,7.5 17.5,5.5 16,4.5C14.5,3.5 12.5,2 12,2Z" />
        <circle cx="12" cy="10" r="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <line x1="12" y1="7" x2="12" y2="5" stroke="currentColor" strokeWidth="1.5" />
        <line x1="14.5" y1="8" x2="16" y2="6.5" stroke="currentColor" strokeWidth="1.5" />
        <line x1="9.5" y1="8" x2="8" y2="6.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: 'Oral Surgery',
    desc: 'Wisdom tooth extraction, surgical tooth removal, and minor oral surgical procedures with maximum comfort.',
    icon: (
      <svg className="service-icon-svg" viewBox="0 0 24 24">
        <path d="M14.7,6.5C14.7,5.67 14.03,5 13.2,5H10.8C9.97,5 9.3,5.67 9.3,6.5C9.3,7.33 9.97,8 10.8,8H13.2C14.03,8 14.7,7.33 14.7,6.5M12,2C6.5,2 2,6.5 2,12C2,17.5 6.5,22 12,22C17.5,22 22,17.5 22,12C22,6.5 17.5,2 12,2M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M15,10H13V12H15V14H13V18H11V14H9V12H11V10H9V8H11H13H15V10Z" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section className="section" id="services">
      <div className="container">
        <span className="section-tag">What We Do</span>
        <h2 className="section-title">
          Specialized <span>Dental Solutions</span>
        </h2>
        <p className="section-desc">
          We provide complete dental care from prevention to cosmetic makeovers under one roof at Somanur. Our dental treatments are customized to match your requirements.
        </p>

        <div className="services-grid">
          {servicesData.map((service, idx) => (
            <div className="service-card glass-card" key={idx}>
              <div className="service-icon-container">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
              <a href="#contact" className="service-link">
                Book Service <span>&rarr;</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
