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
      'There is a quiet power in mastering a single craft—',
      'in writing code, illustrating lines, or holding a camera.',
      'But I have always found my home in the space between them.',
    ],
  },
  {
    id: 'p2',
    type: 'body',
    lines: [
      'I move between disciplines not to collect titles, but to expand how I see.',
      'To paint is to study light. To write code is to understand structure.',
      'To animate is to give both a heartbeat. Every medium I touch teaches',
      'me a new language, exposing a different dimension of the same story.',
    ],
  },
  {
    id: 'p3',
    type: 'body',
    lines: [
      'This is not a search for a final destination, but an ongoing exploration.',
      'By refusing the limits of a single tool, I remain a perpetual student,',
      'constantly learning, adapting, and finding new ways to connect.',
    ],
  },
  {
    id: 'p4',
    type: 'closing',
    lines: [
      'In the end, craftsmanship is not about the medium we choose—',
      'it is about the care we bring to it, and the stories we leave behind.',
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
          03 / ABOUT
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
