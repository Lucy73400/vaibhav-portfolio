import { useEffect, useState } from 'react';

export default function Hero() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="hero" aria-label="Hero introduction">
      <div className="hero-bg" aria-hidden="true"></div>
      <div className={`hero-content ${animate ? 'animate-in' : ''}`}>
        <h1 className="hero-name-label">VAIBHAV</h1>
        <div className="hero-disciplines" aria-label="Creative disciplines">
          <span className="discipline-tag">Animator</span>
          <span className="discipline-separator" aria-hidden="true">•</span>
          <span className="discipline-tag">Illustrator</span>
          <span className="discipline-separator" aria-hidden="true">•</span>
          <span className="discipline-tag">Storyteller</span>
          <span className="discipline-separator" aria-hidden="true">•</span>
          <span className="discipline-tag">Visual Creator</span>
        </div>
        <div className="hero-manifesto-wrap">
          <p className="hero-manifesto-text">"hello guys"</p>
        </div>
      </div>
      <div className="hero-scroll" aria-hidden="true">
        <div className="scroll-line"></div>
      </div>
    </section>
  );
}
