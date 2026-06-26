/**
 * CinematicIntro.jsx
 *
 * 5-phase film-title-sequence intro:
 *  Phase 0 → "visible"   : VAIBHAV centered, breathing glow, film grain
 *  Phase 1 → "expand"    : horizontal line grows, subtitle fades, name scales up
 *  Phase 2 → "blur"      : name continues scaling + blur 0→30px, opacity 100→20%
 *  Phase 3 → "reveal"    : overlay fades away, hero content underneath appears
 *  Phase 4 → "done"      : component unmounted by parent
 *
 * Timing (total ≈ 3.2 s):
 *  0 ms     phase 0 (visible)
 *  900 ms   phase 1 (expand)
 *  1700 ms  phase 2 (blur + scale)
 *  2500 ms  phase 3 (reveal / fade out overlay)
 *  3400 ms  phase 4 (done – parent unmounts)
 */

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1];

export default function CinematicIntro({ onComplete }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 900);
    const t2 = setTimeout(() => setPhase(2), 1700);
    const t3 = setTimeout(() => setPhase(3), 2500);
    const t4 = setTimeout(() => {
      onComplete?.();
    }, 3400);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, [onComplete]);

  // ── derived state ──────────────────────────────────────────────────────────
  const nameScale   = phase >= 2 ? 3.2  : phase >= 1 ? 1.18 : 1;
  const nameBlur    = phase >= 2 ? 32   : 0;
  const nameOpacity = phase >= 2 ? 0.18 : 1;
  const lineWidth   = phase >= 1 ? '180px' : '0px';
  const subOpacity  = phase >= 1 ? 0       : 1;
  const overlayOpacity = phase >= 3 ? 0 : 1;

  return (
    <AnimatePresence>
      {phase < 4 && (
        <motion.div
          key="cinematic-intro"
          style={styles.overlay}
          animate={{ opacity: overlayOpacity }}
          transition={{ duration: 0.9, ease: EASE }}
          aria-hidden="true"
        >
          {/* Film grain layer */}
          <div style={styles.grain} />

          {/* Ambient radial glow — breathing */}
          <motion.div
            style={styles.glow}
            animate={{
              opacity: [0.06, 0.14, 0.06],
              scale:   [1, 1.08, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          <div style={styles.center}>
            {/* ── Main name ── */}
            <motion.h1
              style={styles.name}
              animate={{
                scale:  nameScale,
                filter: `blur(${nameBlur}px)`,
                opacity: nameOpacity,
              }}
              transition={{ duration: 0.85, ease: EASE }}
            >
              VAIBHAV
            </motion.h1>

            {/* ── Expanding line ── */}
            <motion.div
              style={styles.line}
              animate={{ width: lineWidth, opacity: phase >= 2 ? 0 : 1 }}
              transition={{ duration: 0.8, ease: EASE }}
            />

            {/* ── Subtitle ── */}
            <motion.p
              style={styles.sub}
              animate={{ opacity: subOpacity, y: phase >= 1 ? -10 : 0 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              CREATOR ARCHIVE
            </motion.p>
          </div>
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
    zIndex: 1000000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
  },
  grain: {
    position: 'absolute',
    inset: 0,
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
    opacity: 0.055,
    pointerEvents: 'none',
  },
  glow: {
    position: 'absolute',
    inset: 0,
    background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(200,187,168,0.18) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  center: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 0,
    position: 'relative',
    zIndex: 2,
  },
  name: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(2.8rem, 9vw, 7rem)',
    fontWeight: 900,
    letterSpacing: '-0.01em',
    color: '#fff',
    margin: 0,
    lineHeight: 1,
    willChange: 'transform, filter, opacity',
    transformOrigin: 'center center',
  },
  line: {
    height: '1.5px',
    background: 'linear-gradient(90deg, transparent, #c8bba8, transparent)',
    marginTop: '1.6rem',
    marginBottom: '1.4rem',
    width: 0,
  },
  sub: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.58rem',
    letterSpacing: '0.42em',
    color: 'rgba(255,255,255,0.42)',
    textTransform: 'uppercase',
    margin: 0,
  },
};
