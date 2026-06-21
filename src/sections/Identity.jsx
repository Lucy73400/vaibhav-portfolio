import { useEffect, useRef } from 'react';

export default function Identity() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const lines = containerRef.current.querySelectorAll('.identity-line');
    
    const observerOptions = {
      root: null,
      rootMargin: '-25% 0px -25% 0px',
      threshold: 0.5
    };

    const lineObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        } else {
          entry.target.classList.remove('active');
        }
      });
    }, observerOptions);

    lines.forEach(line => lineObserver.observe(line));

    return () => lineObserver.disconnect();
  }, []);

  return (
    <section id="identity" ref={containerRef}>
      <div className="identity-sticky">
        <span className="sec-label">01 / IDENTITY</span>
        <h2 className="sec-title">Creative Spectrum</h2>
      </div>
      <div className="identity-story">
        <p className="identity-line" data-index="0">Some people write code.</p>
        <p className="identity-line" data-index="1">Some people paint.</p>
        <p className="identity-line" data-index="2">Some people sing.</p>
        <p className="identity-line" data-index="3">I move between all of them.</p>
        <p className="identity-line accent" data-index="4">I animate. I shoot. I edit. I visualize. I tell stories.</p>
      </div>
    </section>
  );
}
