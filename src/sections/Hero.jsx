import { useEffect, useState } from 'react';

export default function Hero() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger after the cinematic intro adds body.loaded
    const check = () => {
      if (document.body.classList.contains('loaded')) {
        // Small extra delay so the hero reveals *after* the intro fades
        setTimeout(() => setAnimate(true), 120);
      }
    };

    // Check immediately in case intro already finished
    check();

    // Also observe via MutationObserver for the class addition
    const mo = new MutationObserver(check);
    mo.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => mo.disconnect();
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

        {/* Description */}
        <div className="hero-manifesto-wrap">
          <p className="hero-manifesto-text">
            I believe animation is more than movement.<br />
            It's the art of giving life to ideas.<br />
            Every project I create is a step toward building worlds,<br />
            telling stories, and inspiring the next generation of creators.
          </p>
        </div>

        {/* Quote */}
        <div className="hero-quote-wrap">
          <blockquote className="hero-quote">
            "We're not copying life, we're making a comment on it."
          </blockquote>
          <cite className="hero-quote-attr">— Richard Williams</cite>
        </div>
      </div>

      <div className="hero-scroll" aria-hidden="true">
        <div className="scroll-line"></div>
      </div>
    </section>
  );
}
