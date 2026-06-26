import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const location = useLocation();
  const isHome = location.pathname === '/';

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
        <img src="https://i.ibb.co/hJwV1pph/MY-personal-logo.png" alt="Vaibhav Logo" className="nav-logo-img" />
      </Link>
      <div className="nav-links">
        <a href={isHome ? '#hero' : '/'} className={isHome && activeSection === 'hero' ? 'active' : ''}>Home</a>
        <a href={isHome ? '#identity' : '/#identity'} className={isHome && activeSection === 'identity' ? 'active' : ''}>About</a>
        <a href={isHome ? '#portfolio' : '/#portfolio'} className={isHome && activeSection === 'portfolio' ? 'active' : ''}>Work</a>
        <Link to="/journal" className={isJournal ? 'active' : ''}>Journal</Link>
        <a href={isHome ? '#collaborate' : '/#collaborate'} className={isHome && activeSection === 'collaborate' ? 'active' : ''}>Contact</a>
      </div>
    </nav>
  );
}
