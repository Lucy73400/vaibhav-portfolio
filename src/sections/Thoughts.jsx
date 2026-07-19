import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

// ─── Floating particle ───────────────────────────────────────────────────────
function Particle({ x, y, size, delay, duration }) {
  return (
    <motion.div
      style={{
        position: 'absolute',
        left: `${x}%`,
        top:  `${y}%`,
        width:  size,
        height: size,
        borderRadius: '50%',
        background: 'rgba(200, 187, 168, 0.35)',
        pointerEvents: 'none',
      }}
      animate={{
        y:       [0, -22, 0],
        opacity: [0, 0.55, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

const PARTICLES = [
  { x: 12,  y: 20, size: '2px',   delay: 0,    duration: 6.5 },
  { x: 85,  y: 35, size: '1.5px', delay: 1.2,  duration: 8   },
  { x: 30,  y: 75, size: '2.5px', delay: 2.5,  duration: 7   },
  { x: 70,  y: 65, size: '1.5px', delay: 0.8,  duration: 9   },
  { x: 55,  y: 15, size: '2px',   delay: 3.1,  duration: 6   },
  { x: 22,  y: 55, size: '1px',   delay: 1.8,  duration: 10  },
  { x: 90,  y: 80, size: '2px',   delay: 0.4,  duration: 7.5 },
];

const EASE = [0.16, 1, 0.3, 1];

// ─── Animated quote line ─────────────────────────────────────────────────────
function QuoteLine({ children, delay }) {
  const ref   = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px -15% 0px' });

  return (
    <motion.span
      ref={ref}
      style={{ display: 'block' }}
      initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
      animate={inView
        ? { opacity: 1, filter: 'blur(0px)', y: 0 }
        : { opacity: 0, filter: 'blur(10px)', y: 20 }
      }
      transition={{ duration: 1.4, delay, ease: EASE }}
    >
      {children}
    </motion.span>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────
export default function Thoughts() {
  const sectionRef = useRef(null);
  const inView     = useInView(sectionRef, { once: false, margin: '-10% 0px -10% 0px' });

  // Parallax on scroll
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['4%', '-4%']);

  return (
    <section id="creative-thoughts" ref={sectionRef} aria-label="Creative philosophy">
      {/* Film grain */}
      <div className="thoughts-grain" aria-hidden="true" />

      {/* Ambient particles */}
      {PARTICLES.map((p, i) => (
        <Particle key={i} {...p} />
      ))}

      <motion.div className="thoughts-content" style={{ y }}>
        {/* Ornament */}
        <motion.span
          className="thought-symbol"
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
          transition={{ duration: 1.2, ease: EASE }}
        >
          ✦
        </motion.span>

        <blockquote className="thought-quote" aria-label="Creative philosophy quote">
          <QuoteLine delay={0.1}>Every frame is a chance to</QuoteLine>
          <QuoteLine delay={0.35}>make someone stop, feel,</QuoteLine>
          <QuoteLine delay={0.6}>and remember.</QuoteLine>
        </blockquote>

        <motion.p
          className="thought-sub"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 1.2, delay: 1.0, ease: EASE }}
        >
          — VAIBHAV
        </motion.p>
      </motion.div>
    </section>
  );
}
