import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const EASE_CINEMATIC = [0.16, 1, 0.3, 1];
const MotionLink = motion(Link);

export default function Navbar({ introState }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const location = useLocation();
  const isHome = location.pathname === '/';

  // If we are on sub-pages (e.g. Journal), don't delay navbar elements
  const visible = !isHome || introState !== 'logo-reveal';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      if (!isHome) return;

      const sections = ['hero', 'identity', 'creations', 'portfolio', 'collaborate'];
      const scrollPos = window.scrollY;

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop - 240;
          const bottom = top + el.offsetHeight;
          if (scrollPos >= top && scrollPos < bottom) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  const isJournal = location.pathname === '/journal';

  return (
    <nav id="mainnav" className={scrolled ? 'scrolled' : ''} role="navigation" aria-label="Main navigation">
      <Link to="/" className="nav-logo" aria-label="Vaibhav — Home">
        {/* Navigation Logo resolves after nav link stagger starts */}
        <motion.img
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: visible ? 0.9 : 0, scale: visible ? 1 : 0.92 }}
          transition={{ duration: 1.2, delay: isHome ? 0.6 : 0, ease: EASE_CINEMATIC }}
          src="https://i.ibb.co/hJwV1pph/MY-personal-logo.png"
          alt="Vaibhav Logo"
          className="nav-logo-img"
          style={{ willChange: 'opacity, transform' }}
        />
      </Link>
      
      <div className="nav-links">
        {/* Staggered Navigation Links */}
        <motion.a
          href={isHome ? '#hero' : '/'}
          className={isHome && activeSection === 'hero' ? 'active' : ''}
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -12 }}
          transition={{ duration: 1.0, delay: isHome ? 0.3 : 0, ease: EASE_CINEMATIC }}
          style={{ display: 'inline-block', willChange: 'opacity, transform' }}
        >
          Home
        </motion.a>

        <motion.a
          href={isHome ? '#identity' : '/#identity'}
          className={isHome && activeSection === 'identity' ? 'active' : ''}
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -12 }}
          transition={{ duration: 1.0, delay: isHome ? 0.4 : 0, ease: EASE_CINEMATIC }}
          style={{ display: 'inline-block', willChange: 'opacity, transform' }}
        >
          About
        </motion.a>

        <motion.a
          href={isHome ? '#portfolio' : '/#portfolio'}
          className={isHome && activeSection === 'portfolio' ? 'active' : ''}
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -12 }}
          transition={{ duration: 1.0, delay: isHome ? 0.5 : 0, ease: EASE_CINEMATIC }}
          style={{ display: 'inline-block', willChange: 'opacity, transform' }}
        >
          Work
        </motion.a>

        <MotionLink
  to="/journal"
  className={isJournal ? 'active' : ''}
  initial={{ opacity: 0 }}
  animate={{ opacity: visible ? 1 : 0 }}
  transition={{ duration: 1.0, delay: isHome ? 0.6 : 0, ease: EASE_CINEMATIC }}
  style={{ 
    display: 'inline-block', 
    willChange: 'opacity',
    // Ensures the browser reserves space even if opacity is 0
    minWidth: '50px', 
    textAlign: 'center'
  }}
>
  Journal
</MotionLink>

        <motion.a
          href={isHome ? '#collaborate' : '/#collaborate'}
          className={isHome && activeSection === 'collaborate' ? 'active' : ''}
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -12 }}
          transition={{ duration: 1.0, delay: isHome ? 0.7 : 0, ease: EASE_CINEMATIC }}
          style={{ display: 'inline-block', willChange: 'opacity, transform' }}
        >
          Contact
        </motion.a>
      </div>
    </nav>
  );
}
