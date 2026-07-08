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

// 150ms stagger between every line — uniform rhythm
const STAGGER = 0.15;

// ── Single reusable line component ───────────────────────────────────────────
function PhiLine({ text, index }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-5% 0px' });

  return (
    <motion.p
      ref={ref}
      className="phi-line"
      // Reveal: opacity 0→1, blur 10px→0, y 30px→0
      initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
      animate={
        inView
          ? { opacity: 1, y: 0, filter: 'blur(0px)' }
          : { opacity: 0, y: 30, filter: 'blur(10px)' }
      }
      transition={{ duration: 0.85, delay: index * STAGGER, ease: EASE }}
      // Hover: slight brightness + scale 1.015, no color change
      whileHover={{ scale: 1.015, color: '#FFFFFF' }}
      style={{
        willChange:   'opacity, transform, filter',
        originX:      0,           // scale from left edge
        originY:      0.5,
        margin:       0,
        padding:      0,
      }}
    >
      {text}
    </motion.p>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function Philosophy() {
  return (
    <section id="philosophy" className="philosophy-section" aria-label="Creative identity">
      <div className="philosophy-inner">
        <div className="philosophy-manifesto" role="list">
          {LINES.map((text, i) => (
            <PhiLine key={text} text={text} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
