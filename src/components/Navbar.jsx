import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const EASE_CINEMATIC = [0.16, 1, 0.3, 1];
const MotionLink = motion.create(Link);

// ── Smooth scroll to a section id ─────────────────────────────────────────────
function scrollToSection(id) {
  if (id === 'top') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Navbar({ introState }) {
  const [scrolled, setScrolled]       = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const location  = useLocation();
  const navigate  = useNavigate();
  const isHome    = location.pathname === '/';
  const isJournal = location.pathname === '/journal';

  // Navbar fades in after intro — immediately visible on sub-pages
  const visible = !isHome || introState !== 'logo-reveal';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      if (!isHome) return;

      const sections = ['hero', 'philosophy', 'identity', 'creations', 'portfolio', 'collaborate'];
      const scrollPos = window.scrollY;

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top    = el.offsetTop - 240;
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

  // Logo click: smooth scroll to top if on home, navigate home if elsewhere
  const handleLogoClick = useCallback(
    (e) => {
      e.preventDefault();
      if (isHome) {
        scrollToSection('top');
      } else {
        navigate('/');
        // After navigation the new page mounts at the top naturally
      }
    },
    [isHome, navigate]
  );

  // Section link click: navigate home first if on sub-page, then scroll
  const handleSectionClick = useCallback(
    (e, sectionId) => {
      e.preventDefault();
      if (isHome) {
        scrollToSection(sectionId);
      } else {
        navigate('/');
        // Scroll after the route has changed and DOM has painted
        setTimeout(() => scrollToSection(sectionId), 120);
      }
    },
    [isHome, navigate]
  );

  // Shared motion props — opacity only, NO y-transform (prevents layout shift)
  const linkMotion = (delayHome) => ({
    initial:    { opacity: 0 },
    animate:    { opacity: visible ? 1 : 0 },
    transition: { duration: 1.0, delay: isHome ? delayHome : 0, ease: EASE_CINEMATIC },
    style:      { willChange: 'opacity' },
  });

  return (
    <nav
      id="mainnav"
      className={scrolled ? 'scrolled' : ''}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* ── Logo — smooth scroll to top ── */}
      <a
        href="/"
        className="nav-logo"
        aria-label="Vaibhav — Home"
        onClick={handleLogoClick}
      >
        <motion.img
          src="https://i.ibb.co/hJwV1pph/MY-personal-logo.png"
          alt="Vaibhav Logo"
          className="nav-logo-img"
          initial={{ opacity: 0 }}
          animate={{ opacity: visible ? 0.9 : 0 }}
          transition={{ duration: 1.2, delay: isHome ? 0.6 : 0, ease: EASE_CINEMATIC }}
          style={{ willChange: 'opacity' }}
        />
      </a>

      {/* ── Nav links — all stable, opacity-only animation ── */}
      <div className="nav-links">
        <motion.a
          href="/#hero"
          onClick={(e) => handleSectionClick(e, 'hero')}
          className={isHome && activeSection === 'hero' ? 'active' : ''}
          {...linkMotion(0.3)}
        >
          Home
        </motion.a>

        <motion.a
          href="/#identity"
          onClick={(e) => handleSectionClick(e, 'identity')}
          className={isHome && (activeSection === 'identity' || activeSection === 'philosophy') ? 'active' : ''}
          {...linkMotion(0.4)}
        >
          About
        </motion.a>

        <motion.a
          href="/#portfolio"
          onClick={(e) => handleSectionClick(e, 'portfolio')}
          className={isHome && activeSection === 'portfolio' ? 'active' : ''}
          {...linkMotion(0.5)}
        >
          Work
        </motion.a>

        <MotionLink
          to="/journal"
          className={isJournal ? 'active' : ''}
          {...linkMotion(0.6)}
        >
          Journal
        </MotionLink>

        <motion.a
          href="/#collaborate"
          onClick={(e) => handleSectionClick(e, 'collaborate')}
          className={isHome && activeSection === 'collaborate' ? 'active' : ''}
          {...linkMotion(0.7)}
        >
          Contact
        </motion.a>
      </div>
    </nav>
  );
}
