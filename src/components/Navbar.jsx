// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// --- Navbar Component ---
const EASE_CINEMATIC = [0.16, 1, 0.3, 1];
const MotionLink = motion(Link);

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isJournal = location.pathname === '/journal';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav id="mainnav" className={scrolled ? 'scrolled' : ''}>
      <Link to="/" className="nav-logo">
        <motion.img
          animate={{ opacity: 0.9, scale: 1 }}
          transition={{ duration: 1.2, ease: EASE_CINEMATIC }}
          src="https://i.ibb.co/hJwV1pph/MY-personal-logo.png"
          alt="Vaibhav Logo"
        />
      </Link>
      
      <div className="nav-links">
        <motion.a 
            href={isHome ? '#hero' : '/'}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: EASE_CINEMATIC }}
        >
          Home
        </motion.a>
        
        <MotionLink 
            to="/journal" 
            className={isJournal ? 'active' : ''}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, ease: EASE_CINEMATIC }}
        >
          Journal
        </MotionLink>
      </div>
    </nav>
  );
}

// --- Main App Entry ---
export default function App() {
  return (
    <Router>
      {/* Navbar is rendered outside Routes so it persists across navigation */}
      <Navbar /> 
      <Routes>
        <Route path="/" element={<div>Home Content</div>} />
        <Route path="/journal" element={<div>Journal Content</div>} />
      </Routes>
    </Router>
  );
}