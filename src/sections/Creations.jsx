import { useEffect, useRef } from 'react';

const CREATION_DATA = [
  {
    num: "01 / MOTION",
    title: "Animation",
    desc: "Fluid frame-by-frame kinetics, lighting, and mechanical composition bringing static vectors to emotional life.",
    class: "card-animation",
  },
  {
    num: "02 / ART",
    title: "Illustration",
    desc: "Visual geometry, composition structures, and spatial design tracing line and depth on empty backdrops.",
    class: "card-illustration",
  },
  {
    num: "03 / CAPTURE",
    title: "Cinematic Films",
    desc: "Shaping environments through light, focal perspectives, and composition, capturing moments that carry gravity.",
    class: "card-films",
  },
  {
    num: "04 / KINETICS",
    title: "Video Editing",
    desc: "Synthesizing audio thresholds and visual edits into cohesive narratives, structuring flow, pacing, and dynamic rhythm.",
    class: "card-editing",
  },
  {
    num: "05 / PERSPECTIVE",
    title: "Storytelling",
    desc: "Weaving creative narratives across editorial grids, conceptual storyboards, and short cinema formats.",
    class: "card-storytelling",
  },
  {
    num: "06 / SOUND",
    title: "Music",
    desc: "Vocal structures, acoustic exploration, and audio dynamics providing the invisible emotional architecture of motion.",
    class: "card-music",
  }
];

export default function Creations() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const cards = containerRef.current.querySelectorAll('.reveal-up');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, { threshold: 0.15 });

    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="creations" ref={containerRef}>
      <div className="sec-header reveal-up">
        <span className="sec-label">02 / MEDIUMS</span>
        <h2 className="sec-title">What I Create</h2>
      </div>
      <div className="creations-grid">
        {CREATION_DATA.map((item, index) => (
          <div 
            key={index}
            className={`interactive-card ${item.class} reveal-up stagger-${(index % 3) + 1}`}
          >
            <div className="card-bg-gradient"></div>
            <div className="card-header">
              <span className="card-num">{item.num}</span>
              <h3 className="card-title">{item.title}</h3>
            </div>
            <div className="card-body">
              <p className="card-desc">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
