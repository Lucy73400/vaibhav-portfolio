import { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LayoutGroup } from 'framer-motion';
import CustomCursor from './components/CustomCursor';
import CinematicIntro from './components/CinematicIntro';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Philosophy from './sections/Philosophy';
import Atmospheric from './sections/Atmospheric';
import Creations from './sections/Creations';
import Portfolio from './sections/Portfolio';
import Thoughts from './sections/Thoughts';
import Collaborate from './sections/Collaborate';
import Footer from './components/Footer';
import JournalPage from './pages/Journal';
import MyLastTenDays from './pages/MyLastTenDays';

// ─── Intro state is persisted to sessionStorage so navigating between
//     routes never replays the intro. It only runs once per browser tab.
function getInitialIntroState() {
  try {
    const saved = sessionStorage.getItem('introState');
    if (saved === 'complete') return 'complete';
  } catch (_) { /* sessionStorage blocked */ }
  return 'logo-reveal';
}

// ─── Home Page ────────────────────────────────────────────────────────────────
function HomePage({ introState }) {
  return (
    <main>
      <Hero introState={introState} />
      <Philosophy />
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
  const [introState, setIntroState] = useState(getInitialIntroState);
  const revealObserverRef = useRef(null);

  // Drive the intro sequence timeline — only runs when intro hasn't completed yet
  useEffect(() => {
    if (introState === 'complete') {
      // Intro already done (returning visitor in same session)
      document.body.classList.add('loaded');
      document.body.style.overflow = '';
      return;
    }

    const tTransition = setTimeout(() => {
      setIntroState('transitioning');
    }, 2600);

    const tComplete = setTimeout(() => {
      setIntroState('complete');
      document.body.classList.add('loaded');
      try { sessionStorage.setItem('introState', 'complete'); } catch (_) {}
    }, 4600);

    return () => {
      clearTimeout(tTransition);
      clearTimeout(tComplete);
    };
    // Intentionally empty dep array — runs once on mount only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Lock scroll during intro
  useEffect(() => {
    if (introState !== 'complete') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [introState]);

  // Scroll reveal + parallax — activate once intro is done
  useEffect(() => {
    if (introState === 'logo-reveal') return;

    const handleScroll = () => {
      document.documentElement.style.setProperty('--scroll-y', `${window.pageYOffset}px`);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    revealObserverRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('revealed');
        });
      },
      { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    const els = document.querySelectorAll('.reveal-up, .selected-image-container');
    els.forEach((el) => revealObserverRef.current.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      revealObserverRef.current?.disconnect();
    };
  }, [introState]);

  return (
    <BrowserRouter>
      <LayoutGroup>
        <CustomCursor />
        <div className="grain-overlay" aria-hidden="true" />

        {introState !== 'complete' && (
          <CinematicIntro introState={introState} />
        )}

        <Navbar introState={introState} />

        <Routes>
          <Route path="/" element={<HomePage introState={introState} />} />
          <Route path="/journal" element={<JournalPage />} />
          <Route path="/journal/my-last-ten-days" element={<MyLastTenDays />} />
        </Routes>

        <Footer />
      </LayoutGroup>
    </BrowserRouter>
  );
}

export default App;
