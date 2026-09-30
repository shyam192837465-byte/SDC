import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import StatsBar from './components/StatsBar';
import Services from './components/Services';
import About from './components/About';
import Testimonials from './components/Testimonials';
import BookingSection from './components/BookingSection';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import BackgroundBlobs from './components/BackgroundBlobs';
import MouseGlow from './components/MouseGlow';
import ClickSpark from './components/ClickSpark';

export default function App() {
  const [isLight, setIsLight] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved !== 'dark';
  });

  useEffect(() => {
    if (isLight) {
      document.body.classList.add('light-theme');
      localStorage.setItem('theme', 'light');
    } else {
      document.body.classList.remove('light-theme');
      localStorage.setItem('theme', 'dark');
    }
  }, [isLight]);

  const handleToggleTheme = () => {
    setIsLight((prev) => !prev);
  };

  return (
    <>
      <ClickSpark />
      <BackgroundBlobs />
      <MouseGlow />
      <Header isLight={isLight} onToggleTheme={handleToggleTheme} />
      <main>
        <Hero />
        <StatsBar />
        <Services />
        <About />
        <Testimonials />
        <BookingSection />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
