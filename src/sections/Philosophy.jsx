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
      style={{ display: 'block', willChange: 'opacity, transform, filter' }}
      initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
      animate={
        inView
          ? { opacity: 1, y: 0, filter: 'blur(0px)' }
          : { opacity: 0, y: 20, filter: 'blur(8px)' }
      }
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.span>
  );
}

export default function Philosophy() {
  return (
    <section id="philosophy" className="philosophy-section" aria-label="Creative Philosophy">
      <div className="philosophy-inner">
        {/* Understated Section Header */}
        <h2 className="philosophy-title">Philosophy</h2>

        {/* Narrative Manifesto */}
        <div className="philosophy-content">
          <div className="philosophy-manifesto">
            
            {/* First Group: Observations */}
            <div className="phi-group phi-group--obs">
              <RevealLine delay={0.10} className="phi-line">Some people write code.</RevealLine>
              <RevealLine delay={0.25} className="phi-line">Some people paint.</RevealLine>
              <RevealLine delay={0.40} className="phi-line">Some people sing.</RevealLine>
            </div>

            {/* Emotional Turning Point */}
            <div className="phi-group phi-group--focus">
              <RevealLine delay={1.05} className="phi-line phi-line--focus">I move between all of them.</RevealLine>
            </div>

            {/* Third Group: Declarations */}
            <div className="phi-group phi-group--dec">
              <RevealLine delay={2.00} className="phi-line">I animate.</RevealLine>
              <RevealLine delay={2.15} className="phi-line">I shoot.</RevealLine>
              <RevealLine delay={2.30} className="phi-line">I edit.</RevealLine>
              <RevealLine delay={2.45} className="phi-line">I visualize.</RevealLine>
              <RevealLine delay={2.60} className="phi-line">I tell stories.</RevealLine>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
