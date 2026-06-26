import { useCallback, useEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
      <CustomCursor />
      <div className="grain-overlay" aria-hidden="true"></div>

      {!introComplete && <CinematicIntro onComplete={handleIntroComplete} />}

      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/journal" element={<JournalPage />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
