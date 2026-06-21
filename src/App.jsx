import { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CustomCursor from './components/CustomCursor';
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

// ─── Root App with loader ─────────────────────────────────────────────────────
function App() {
  const [loaderPhase, setLoaderPhase] = useState('visible'); // 'visible' | 'fading' | 'done'
  const revealObserverRef = useRef(null);

  useEffect(() => {
    // Phase 1: loader content animates in (CSS), then at 1600ms start fade-out
    const fadeTimer = setTimeout(() => {
      setLoaderPhase('fading');
    }, 1600);

    // Phase 2: after fade transition (800ms), remove loader from DOM
    const doneTimer = setTimeout(() => {
      setLoaderPhase('done');
      document.body.classList.add('loaded');
    }, 2400);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  // Set up scroll reveal and parallax after loader is done
  useEffect(() => {
    if (loaderPhase !== 'done') return;

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
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);

    const elementsToReveal = document.querySelectorAll('.reveal-up, .selected-image-container');
    elementsToReveal.forEach((el) => revealObserverRef.current.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      revealObserverRef.current?.disconnect();
    };
  }, [loaderPhase]);

  return (
    <BrowserRouter>
      <CustomCursor />
      <div className="grain-overlay" aria-hidden="true"></div>

      {/* Preloader — removed from DOM once fully faded */}
      {loaderPhase !== 'done' && (
        <div
          id="preloader"
          className={loaderPhase === 'fading' ? 'fading' : ''}
          aria-hidden="true"
        >
          <div className="preloader-content">
            <div className="preloader-title">VAIBHAV</div>
            <div className="preloader-line"></div>
            <div className="preloader-sub">CREATOR ARCHIVE</div>
          </div>
        </div>
      )}

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
