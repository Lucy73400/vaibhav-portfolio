import { useCallback, useEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LayoutGroup, motion } from 'framer-motion';
import CustomCursor from './components/CustomCursor';
import CinematicIntro from './components/CinematicIntro';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Atmospheric from './sections/Atmospheric';
import Identity from './sections/Identity';
import Creations from './sections/Creations';
import Portfolio from './sections/Portfolio';
import Thoughts from './sections/Thoughts';
import Collaborate from './sections/Collaborate';
import Footer from './components/Footer';
import JournalPage from './pages/Journal';

const EASE = [0.16, 1, 0.3, 1];

// ─── Home Page ────────────────────────────────────────────────────────────────
function HomePage({ introState }) {
  return (
    <main>
      <Hero introState={introState} />
      <Identity />
      <Atmospheric />
      <Creations />
      <Portfolio />
      <Thoughts />
      <Collaborate />
    </main>
  );
}

// ─── Root App ─────────────────────────────────────────────────────────────────
function App() {
  const [introState, setIntroState] = useState('logo-reveal'); // 'logo-reveal' | 'transitioning' | 'complete'
  const revealObserverRef = useRef(null);

  // Drive the intro sequence timeline
  useEffect(() => {
    // 2.6 seconds of logo reveal, then transition to hero
    const tTransition = setTimeout(() => {
      setIntroState('transitioning');
    }, 2600);

    // 4.6 seconds total (2.0s transition duration), mark complete
    const tComplete = setTimeout(() => {
      setIntroState('complete');
      document.body.classList.add('loaded');
    }, 4600);

    return () => {
      clearTimeout(tTransition);
      clearTimeout(tComplete);
    };
  }, []);

  // Control body scrolling based on intro state
  useEffect(() => {
    if (introState !== 'complete') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [introState]);

  // Set up scroll reveal + parallax once intro begins transitioning or is complete
  useEffect(() => {
    if (introState === 'logo-reveal') return;

    const handleScroll = () => {
      document.documentElement.style.setProperty('--scroll-y', `${window.pageYOffset}px`);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.1,
    };

    revealObserverRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('revealed');
      });
    }, observerOptions);

    const elementsToReveal = document.querySelectorAll('.reveal-up, .selected-image-container');
    elementsToReveal.forEach((el) => revealObserverRef.current.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      revealObserverRef.current?.disconnect();
    };
  }, [introState]);

  return (
    <BrowserRouter>
      {/*
        LayoutGroup lets the shared layout elements animate smoothly
      */}
      <LayoutGroup>
        <CustomCursor />
        <div className="grain-overlay" aria-hidden="true" />

        {/* Intro stays mounted during logo-reveal and transitioning states */}
        {introState !== 'complete' && (
          <CinematicIntro introState={introState} />
        )}

        {/* Navbar handles its own emergence internally based on introState */}
        <Navbar introState={introState} />

        <Routes>
          <Route path="/" element={<HomePage introState={introState} />} />
          <Route path="/journal" element={<JournalPage />} />
        </Routes>

        <Footer />
      </LayoutGroup>
    </BrowserRouter>
  );
}

export default App;
