import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1];

// ── 9 lines — exact wording, no modification ─────────────────────────────────
const LINES = [
  'SOME PEOPLE WRITE CODE.',
  'SOME PEOPLE PAINT.',
  'SOME PEOPLE SING.',
  'I MOVE BETWEEN ALL OF THEM.',
  'I ANIMATE.',
  'I SHOOT.',
  'I EDIT.',
  'I VISUALIZE.',
  'I TELL STORIES.',
];

// ── Single reusable line component ───────────────────────────────────────────
function PhiLine({ text, index, inView }) {
  return (
    <motion.p
      className="phi-line"
      // Reveal: opacity 0→1, blur 10px→0, y 30px→0
      initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
      animate={
        inView
          ? { opacity: 1, y: 0, filter: 'blur(0px)' }
          : { opacity: 0, y: 30, filter: 'blur(10px)' }
      }
      transition={{
        duration: 0.45, // Snappier duration (approx 0.3 - 0.5 seconds)
        delay: index * 0.07, // Snappier stagger delay
        ease: EASE,
      }}
      // Hover: slight brightness + scale 1.015
      whileHover={{
        scale: 1.015,
        color: '#FFFFFF',
      }}
      style={{
        willChange: 'opacity, transform, filter',
        originX: 0,
        originY: 0.5,
        margin: 0,
        padding: 0,
        fontWeight: 500, // Medium
      }}
    >
      {text}
    </motion.p>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function Philosophy() {
  const sectionRef = useRef(null);
  // Trigger when 15% of the section is visible
  const inView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="philosophy-section"
      aria-label="Creative identity"
    >
      <div className="philosophy-inner">
        <div className="philosophy-manifesto" role="list">
          {LINES.map((text, i) => (
            <PhiLine
              key={text}
              text={text}
              index={i}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}