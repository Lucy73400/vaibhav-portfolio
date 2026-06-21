import { useEffect, useRef } from 'react';

export default function Atmospheric() {
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const visualSec = document.getElementById('visual');
    if (visualSec) {
      observer.observe(visualSec);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section id="atmospheric" className="reveal-up" ref={containerRef}>
        <p className="atm-para">
          A cinematic exploration of the intersection between physical dynamics and digital kinetics. We believe motion is the ultimate vector for emotional storytelling, where every micro-second is a designed relationship between space and form.
        </p>
        <p className="atm-credit">CREATOR & ANIMATOR</p>
      </section>

      <section id="visual" className="reveal-up">
        <div className="vis-inner">
          <div className="vis-col"></div>
          <div className="vis-col"></div>
          <div className="vis-col"></div>
          <div className="vis-col"></div>
          <div className="vis-col"></div>
          <div className="vis-col"></div>
          <div className="vis-col"></div>
          <div className="vis-col"></div>
        </div>
        <div className="vis-overlay"></div>
        <div className="vis-play">
          <span>▶</span>
        </div>
        <div className="vis-ml">01:45:22</div>
        <div className="vis-mr">RED 6K / 4K / 24fps / 10bit / 4:3 / 16:9 / 21:9</div>
      </section>
    </>
  );
}
