import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// ============================================
//  Component Render Tests
//  Verifies each component mounts and renders
//  its key content without crashing.
// ============================================

// Mock firebase module to prevent real SDK initialization
vi.mock('../firebase', () => ({
  db: {},
  collection: vi.fn(),
  addDoc: vi.fn(),
  serverTimestamp: vi.fn(),
}));

// Mock image imports
vi.mock('../assets/hero.png', () => ({ default: 'hero.png' }));
vi.mock('../assets/about.png', () => ({ default: 'about.png' }));


describe('Hero Component', () => {
  it('renders the main headline', async () => {
    const { default: Hero } = await import('../components/Hero');
    render(<Hero />);
    expect(screen.getByText(/Your Smile, Our Passion/i)).toBeInTheDocument();
    expect(screen.getByText(/Saranya Dental Clinic/i)).toBeInTheDocument();
  });

  it('renders the CTA buttons', async () => {
    const { default: Hero } = await import('../components/Hero');
    render(<Hero />);
    expect(screen.getByText(/Schedule Appointment/i)).toBeInTheDocument();
    expect(screen.getByText(/Our Services/i)).toBeInTheDocument();
  });

  it('renders floating stat cards', async () => {
    const { default: Hero } = await import('../components/Hero');
    render(<Hero />);
    expect(screen.getByText('100% Safe')).toBeInTheDocument();
    expect(screen.getByText('5000+')).toBeInTheDocument();
  });
});


describe('Services Component', () => {
  it('renders all 9 dental services', async () => {
    const { default: Services } = await import('../components/Services');
    render(<Services />);

    const expectedServices = [
      'Preventive Dentistry',
      'Dental Implants',
      'Root Canal Therapy',
      'Orthodontics / Braces',
      'Cosmetic Dentistry',
      'Pediatric Care',
      'Crowns & Bridges',
      'Teeth Whitening',
      'Oral Surgery',
    ];

    expectedServices.forEach((service) => {
      expect(screen.getByText(service)).toBeInTheDocument();
    });
  });

  it('renders the section heading', async () => {
    const { default: Services } = await import('../components/Services');
    render(<Services />);
    expect(screen.getByText(/Dental Solutions/i)).toBeInTheDocument();
  });
});


describe('StatsBar Component', () => {
  it('renders all 4 stat labels', async () => {
    const { default: StatsBar } = await import('../components/StatsBar');
    render(<StatsBar />);

    expect(screen.getByText(/Years of Smile Design/i)).toBeInTheDocument();
    expect(screen.getByText(/Happy Patients/i)).toBeInTheDocument();
    expect(screen.getByText(/Treatment Specialties/i)).toBeInTheDocument();
    expect(screen.getByText(/Satisfaction Rate/i)).toBeInTheDocument();
  });
});


describe('About Component', () => {
  it('renders Dr. Saranya mention', async () => {
    const { default: About } = await import('../components/About');
    render(<About />);
    const matches = screen.getAllByText(/Dr. Saranya/i);
    expect(matches.length).toBeGreaterThanOrEqual(1);
  });

  it('renders the about features checklist', async () => {
    const { default: About } = await import('../components/About');
    render(<About />);
    expect(screen.getByText(/Sterilization Protocol/i)).toBeInTheDocument();
    expect(screen.getByText(/Modern Diagnostic tools/i)).toBeInTheDocument();
    expect(screen.getByText(/Affordable & Fair Pricing/i)).toBeInTheDocument();
  });
});


describe('FAQ Component', () => {
  it('renders all 4 FAQ questions', async () => {
    const { default: FAQ } = await import('../components/FAQ');
    render(<FAQ />);

    expect(screen.getByText(/What are the clinic timings/i)).toBeInTheDocument();
    expect(screen.getByText(/How do I schedule an appointment/i)).toBeInTheDocument();
    expect(screen.getByText(/Is root canal treatment painful/i)).toBeInTheDocument();
    expect(screen.getByText(/Do you offer clear orthodontic aligners/i)).toBeInTheDocument();
  });

  it('renders the section heading', async () => {
    const { default: FAQ } = await import('../components/FAQ');
    render(<FAQ />);
    expect(screen.getByText(/Frequently Asked/i)).toBeInTheDocument();
  });
});


describe('Footer Component', () => {
  it('renders the clinic brand name', async () => {
    const { default: Footer } = await import('../components/Footer');
    render(<Footer />);
    // Multiple "SDC" instances in marquee and logo
    const sdcElements = screen.getAllByText('SDC');
    expect(sdcElements.length).toBeGreaterThanOrEqual(1);
  });

  it('renders contact phone numbers', async () => {
    const { default: Footer } = await import('../components/Footer');
    render(<Footer />);
    expect(screen.getByText(/Call 8122790927/i)).toBeInTheDocument();
    expect(screen.getByText(/Call 8122790928/i)).toBeInTheDocument();
  });

  it('renders footer navigation links', async () => {
    const { default: Footer } = await import('../components/Footer');
    render(<Footer />);
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
    expect(screen.getByText('Terms & Conditions')).toBeInTheDocument();
  });

  it('renders copyright with current year', async () => {
    const { default: Footer } = await import('../components/Footer');
    render(<Footer />);
    expect(screen.getByText(/© 2026 Saranya Dental Clinic/i)).toBeInTheDocument();
  });
});


describe('Header Component', () => {
  it('renders the logo and navigation links', async () => {
    const { default: Header } = await import('../components/Header');
    render(<Header isLight={true} onToggleTheme={() => {}} />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
    expect(screen.getByText('About Clinic')).toBeInTheDocument();
    expect(screen.getByText('Testimonials')).toBeInTheDocument();
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
  });

  it('renders the Book Now CTA button', async () => {
    const { default: Header } = await import('../components/Header');
    render(<Header isLight={false} onToggleTheme={() => {}} />);
    expect(screen.getByText('Book Now')).toBeInTheDocument();
  });
});
