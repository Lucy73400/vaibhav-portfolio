import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1];

// ── Staggered line reveal with blur ──────────────────────────────────────────
function RevealLine({ children, delay = 0, className = '' }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });

  return (
    <motion.span
      ref={ref}
      className={className}
      style={{ display: 'block' }}
      initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
      animate={
        inView
          ? { opacity: 1, y: 0, filter: 'blur(0px)' }
          : { opacity: 0, y: 18, filter: 'blur(8px)' }
      }
      transition={{ duration: 1.6, delay, ease: EASE }}
    >
      {children}
    </motion.span>
  );
}

export default function Philosophy() {
  const labelRef = useRef(null);
  const labelInView = useInView(labelRef, { once: true, margin: '-5% 0px' });

  const lines = [
    "I believe animation is more than movement.",
    "It's the art of giving life to ideas.",
    "Every project I create is a step toward building worlds,",
    "telling stories, and inspiring the next generation of creators."
  ];

  return (
    <section id="philosophy" className="philosophy-section" aria-label="Creative Philosophy">
      <div className="philosophy-inner">
        {/* ── Section label ── */}
        <motion.span
          ref={labelRef}
          className="sec-label philosophy-label"
          initial={{ opacity: 0 }}
          animate={{ opacity: labelInView ? 1 : 0 }}
          transition={{ duration: 1.2, ease: EASE }}
        >
          02 / BELIEFS
        </motion.span>

        {/* ── Manifesto ── */}
        <div className="philosophy-content">
          <p className="philosophy-manifesto">
            {lines.map((line, idx) => (
              <RevealLine key={idx} delay={idx * 0.15}>
                {line}
              </RevealLine>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
