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
function HomePage() {
  return (
    <main>
      <Hero />
      <Atmospheric />
      <Identity />
      <Creations />
      <Portfolio />
      <Thoughts />
      <Collaborate />
    </main>
  );
}

// ─── Root App ─────────────────────────────────────────────────────────────────
function App() {
  const [introComplete, setIntroComplete] = useState(false);
  const revealObserverRef = useRef(null);

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
    document.body.classList.add('loaded');
  }, []);

  // Set up scroll reveal + parallax once intro is done
  useEffect(() => {
    if (!introComplete) return;

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
  }, [introComplete]);

  return (
    <BrowserRouter>
      {/*
        LayoutGroup lets the shared "vaibhav-name" layoutId animate
        continuously from CinematicIntro → Hero, even across mount/unmount.
      */}
      <LayoutGroup>
        <CustomCursor />
        <div className="grain-overlay" aria-hidden="true" />

        {/* Intro sits on top while running; unmounts when introComplete */}
        {!introComplete && <CinematicIntro onComplete={handleIntroComplete} />}

        {/* Nav fades in after intro */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: introComplete ? 1 : 0 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <Navbar />
        </motion.div>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/journal" element={<JournalPage />} />
        </Routes>

        <Footer />
      </LayoutGroup>
    </BrowserRouter>
  );
}

export default App;
