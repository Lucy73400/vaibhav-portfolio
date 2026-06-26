/**
 * CinematicIntro.jsx  —  Film title sequence intro
 *
 * PHASE 0  (0 – 1000ms)
 *   VAIBHAV centered on pure black.
 *   Breathing ambient glow. Film grain. Nothing else.
 *
 * PHASE 1  (1000 – 2800ms)
 *   Name scales 1 → 1.75 and simultaneously blurs 0 → 30px
 *   and fades to opacity 0.18.
 *   The viewer feels like they pass THROUGH the typography.
 *   Motion is slow, intentional, cinematic.
 *
 * PHASE 2  (2800 – 3600ms)
 *   Overlay fades out — the website emerges from behind
 *   the blurred name. Hero content beneath is already mounted.
 *
 * PHASE 3  (3600ms)
 *   onComplete fires → parent unmounts intro.
 *   Hero's layoutId "vaibhav-name" animates from the intro
 *   position into its final resting position via Framer Motion
 *   shared layout.
 */

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EASE_CINEMATIC = [0.16, 1, 0.3, 1];

export default function CinematicIntro({ onComplete }) {
  const [phase, setPhase] = useState(0); // 0 | 1 | 2 | 3

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 1000);   // begin immersion
    const t2 = setTimeout(() => setPhase(2), 2800);   // begin reveal
    const t3 = setTimeout(() => onComplete?.(), 3600); // done
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase < 3 && (
        <motion.div
          key="intro-overlay"
          aria-hidden="true"
          style={styles.overlay}
          animate={{ opacity: phase === 2 ? 0 : 1 }}
          transition={{ duration: 0.85, ease: EASE_CINEMATIC }}
        >
          {/* ── Film grain ─────────────────────────────────────────────── */}
          <div style={styles.grain} />

          {/* ── Ambient breathing glow ─────────────────────────────────── */}
          <motion.div
            style={styles.glow}
            animate={{
              opacity: [0.05, 0.16, 0.05],
              scale:   [1, 1.12, 1],
            }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* ── The name — shared layout element ───────────────────────── */}
          <motion.h1
            layoutId="vaibhav-name"
            style={styles.name}
            animate={{
              scale:   phase >= 1 ? 1.75 : 1,
              filter:  phase >= 1 ? 'blur(30px)' : 'blur(0px)',
              opacity: phase >= 1 ? 0.18 : 1,
            }}
            transition={{
              duration: phase >= 1 ? 1.75 : 0.001,
              ease: EASE_CINEMATIC,
            }}
          >
            VAIBHAV
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    background: '#000',
    zIndex: 999999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
    overflow: 'hidden',
  },
  grain: {
    position: 'absolute',
    inset: 0,
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
    opacity: 0.055,
    pointerEvents: 'none',
    zIndex: 0,
  },
  glow: {
    position: 'absolute',
    inset: 0,
    background:
      'radial-gradient(ellipse 55% 45% at 50% 50%, rgba(200,187,168,0.22) 0%, transparent 70%)',
    pointerEvents: 'none',
    zIndex: 0,
  },
  name: {
    position: 'relative',
    zIndex: 2,
    fontFamily: "'Playfair Display', serif",
    fontSize:   'clamp(3rem, 11vw, 8rem)',
    fontWeight: 900,
    letterSpacing: '-0.015em',
    lineHeight: 0.95,
    color: '#fff',
    margin: 0,
    willChange: 'transform, filter, opacity',
    transformOrigin: 'center center',
  },
};
