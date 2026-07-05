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

// ── Content ───────────────────────────────────────────────────────────────────
// Written as a film opening narration — human, reflective, confident.
const PARAGRAPHS = [
  {
    id: 'p1',
    type: 'lead',
    lines: [
      'Animation is not what I do.',
      'It is how I think.',
    ],
  },
  {
    id: 'p2',
    type: 'body',
    lines: [
      'Every frame carries a question.',
      'What does this moment feel like?',
      'What would make a stranger pause, feel something,',
      'and carry it with them after the screen goes dark?',
    ],
  },
  {
    id: 'p3',
    type: 'body',
    lines: [
      'I move between disciplines — animation, film, illustration,',
      'music, storytelling — not because I cannot choose one,',
      'but because the work demands all of them.',
      'The best stories resist simple categories.',
    ],
  },
  {
    id: 'p4',
    type: 'body',
    lines: [
      'Every project teaches me something I did not know I needed to learn.',
      'Every experiment leaves a mark on my perspective.',
      'I am always in the middle of becoming something more.',
    ],
  },
  {
    id: 'p5',
    type: 'closing',
    lines: [
      'My ambition is not to imitate the work I admire.',
      'It is to build worlds, tell stories,',
      'and create frames that people still remember',
      'long after the project is finished.',
    ],
  },
];

export default function Identity() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-5% 0px' });

  return (
    <section id="identity" className="about-section" aria-label="About Vaibhav">
      <div className="about-inner">

        {/* ── Section label ── */}
        <motion.span
          ref={headerRef}
          className="sec-label about-label"
          initial={{ opacity: 0 }}
          animate={{ opacity: headerInView ? 1 : 0 }}
          transition={{ duration: 1.2, ease: EASE }}
        >
          02 / ABOUT
        </motion.span>

        {/* ── Paragraphs ── */}
        <div className="about-content">
          {PARAGRAPHS.map((para, pIdx) => (
            <p key={para.id} className={`about-para about-para--${para.type}`}>
              {para.lines.map((line, lIdx) => (
                <RevealLine
                  key={`${para.id}-${lIdx}`}
                  delay={pIdx * 0.12 + lIdx * 0.09}
                >
                  {line}
                </RevealLine>
              ))}
            </p>
          ))}
        </div>

        {/* ── Signature ── */}
        <motion.div
          className="about-signature"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-5% 0px' }}
          transition={{ duration: 1.4, delay: 0.4, ease: EASE }}
        >
          <span className="about-signature-name">Vaibhav Khule</span>
          <span className="about-signature-role">
            Animator · Illustrator · Storyteller · Visual Creator
          </span>
        </motion.div>

      </div>
    </section>
  );
}
