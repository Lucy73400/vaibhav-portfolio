import { useEffect, useRef } from 'react';

const STEPS_DATA = [
  {
    title: "Idea",
    desc: "Extracting abstract impulses and framing conceptual sketches."
  },
  {
    title: "Visualize",
    desc: "Constructing storyboards, frames, and geometric layouts."
  },
  {
    title: "Create",
    desc: "Animating keys, capturing elements, and mixing vocals."
  },
  {
    title: "Refine",
    desc: "Tuning frame pace, polishing textures, and editing levels."
  },
  {
    title: "Share",
    desc: "Exporting final frames, releasing stories into global spaces."
  }
];

export default function Process() {
  const containerRef = useRef(null);
  const progressLineRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const steps = containerRef.current.querySelectorAll('.process-step');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (progressLineRef.current) {
            if (window.innerWidth > 768) {
              progressLineRef.current.style.width = '90%';
            } else {
              progressLineRef.current.style.height = '100%';
            }
          }
          steps.forEach((step, idx) => {
            setTimeout(() => {
              step.classList.add('active');
            }, idx * 250);
          });
        }
      });
    }, { threshold: 0.25 });

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="process" ref={containerRef}>
      <div className="sec-header reveal-up">
        <span className="sec-label">04 / WORKFLOW</span>
        <h2 className="sec-title">Creative Journey</h2>
      </div>
      
      <div className="process-timeline">
        <div className="process-line"></div>
        <div className="process-progress-line" ref={progressLineRef}></div>
        
        {STEPS_DATA.map((step, idx) => (
          <div key={idx} className="process-step">
            <div className="process-dot"></div>
            <span className="process-step-title">{step.title}</span>
            <p className="process-step-desc">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
