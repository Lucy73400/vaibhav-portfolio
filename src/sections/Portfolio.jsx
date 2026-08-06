import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const PROJECT_DATA = [
  {
    num: "I",
    title: "Assassin's Creed",
    category: "Cinematic Animation & Storytelling",
    desc: "A cinematic title sequence reimagined — frame-by-frame animation with motion graphics, recreating the iconic hidden blade reveal in my own visual language.",
    class: "c7",
    href: "/work/assassins-creed"
  },
  {
    num: "II",
    title: "Modern Interiors",
    category: "3D Animation & Space Kinetics",
    desc: "An editorial look into internal environments, exploring structural geometry, shadows, and the behavior of light under artificial kinetics.",
    class: "c1"
  },
  {
    num: "III",
    title: "Seasonal Lookbook",
    category: "Cinematic Films & Photography",
    desc: "A deep textural exploration of natural lighting and color spaces, capturing editorial movement and outdoor atmospheric sequences.",
    class: "c2"
  },
  {
    num: "IV",
    title: "Branding Campaign",
    category: "Illustration & Graphic Design",
    desc: "Translating key design requirements into vector arrays and brand narratives. A case study in visual cohesion and minimalist editorial styling.",
    class: "c3"
  },
  {
    num: "V",
    title: "Editorial Portraits",
    category: "Video Editing & Textural Color",
    desc: "A frame-by-frame narrative matching speed, lighting variables, and acoustic loops to showcase character nuances.",
    class: "c4"
  },
  {
    num: "VI",
    title: "Design Objects",
    category: "Storytelling & Graphic Concepts",
    desc: "Isolating objects within pure dark frames. Exploring composition weight and tactile material rendering.",
    class: "c5"
  },
  {
    num: "VII",
    title: "Contemporary Homes",
    category: "Soundscapes & Acoustic Architecture",
    desc: "Mapping sound structures and voice patterns to cinematic structures, showing how audio shapes the perception of architectural scale.",
    class: "c6"
  }
];

export default function Portfolio() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const rows = containerRef.current.querySelectorAll('.selected-row');
    const images = containerRef.current.querySelectorAll('.selected-image-container');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, { threshold: 0.15 });

    rows.forEach(row => observer.observe(row));
    images.forEach(img => observer.observe(img));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="portfolio" ref={containerRef}>
      <div className="sec-header reveal-up">
        <span className="sec-label">03 / ARCHIVES</span>
        <h2 className="sec-title">Selected Works</h2>
      </div>

      <div className="portfolio-grid">
        {PROJECT_DATA.map((proj, idx) => (
          <div key={idx} className="selected-row reveal-up">
            <div className="selected-image-container reveal-up stagger-1">
              <div className="image-reveal-mask"></div>
              <div className={`selected-img ${proj.class}`}></div>
            </div>
            <div className="selected-info reveal-up stagger-2">
              <span className="selected-num">{proj.num}</span>
              <h3 className="selected-title">{proj.title}</h3>
              <span className="selected-category">{proj.category}</span>
              <p className="selected-desc">{proj.desc}</p>
              {proj.href ? (
                <Link to={proj.href} className="selected-link">Explore Chapter <span>→</span></Link>
              ) : (
                <a href="#" className="selected-link">Explore Chapter <span>→</span></a>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="portfolio-view-all reveal-up">
        <a href="#">► View all works</a>
      </div>
    </section>
  );
}
