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

    const visualSec = document.getElementById('visual');
    if (visualSec) observer.observe(visualSec);

    return () => observer.disconnect();
  }, []);

  return (
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
  );
}
