import { useEffect, useRef } from 'react';

export default function Atmospheric() {
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('revealed');
        });
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) observer.observe(containerRef.current);

    const visualSec = document.getElementById('visual');
    if (visualSec) observer.observe(visualSec);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ── Personal Manifesto ─────────────────────────────────────────────── */}
      <section id="atmospheric" className="reveal-up" ref={containerRef} aria-label="Creative manifesto">
        <div className="atm-manifesto">
          <p className="atm-manifesto-text">
            I believe animation is more than movement.<br />
            It's the art of giving life to ideas.<br />
            Every project I create is a step toward building worlds,<br />
            telling stories, and inspiring the next generation of creators.
          </p>
          <div className="atm-divider" aria-hidden="true" />
          <div className="atm-quote-block">
            <blockquote className="atm-quote">
              "We're not copying life, we're making a comment on it."
            </blockquote>
            <cite className="atm-quote-attr">— Richard Williams</cite>
          </div>
        </div>
      </section>

      {/* ── Visual reel strip ──────────────────────────────────────────────── */}
      <section id="visual" className="reveal-up" aria-label="Visual reel">
        <div className="vis-inner" aria-hidden="true">
          <div className="vis-col" />
          <div className="vis-col" />
          <div className="vis-col" />
          <div className="vis-col" />
          <div className="vis-col" />
          <div className="vis-col" />
          <div className="vis-col" />
          <div className="vis-col" />
        </div>
        <div className="vis-overlay" aria-hidden="true" />
        <button className="vis-play" aria-label="Play reel">
          <span aria-hidden="true">▶</span>
        </button>
        <div className="vis-ml" aria-hidden="true">01:45:22</div>
        <div className="vis-mr" aria-hidden="true">RED 6K / 4K / 24fps / 10bit</div>
      </section>
    </>
  );
}
