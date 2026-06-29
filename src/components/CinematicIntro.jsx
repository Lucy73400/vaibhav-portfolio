/**
 * CinematicIntro.jsx — Premium glitch sequence intro
 *
 * TIMELINE (total ≈ 4.6s, driven by App.jsx introState)
 *
 * logo-reveal  (0 – 2600ms)
 *   Phase A  0–800ms    : "MOTION" appears, sharp, centered, pure black
 *   Phase B  800–1400ms : glitch burst #1 — chromatic aberration + jitter
 *   Phase C  1400–1900ms: settle — back to perfect clarity
 *   Phase D  1900–2400ms: glitch burst #2 — stronger distortion
 *   Phase E  2400–2600ms: recovery — returns to stability
 *
 * transitioning (2600–4600ms)
 *   "MOTION" scales 1→1.8, blurs 0→28px, fades 1→0
 *   Overlay fades out, hero emerges behind
 *
 * complete (4600ms+)
 *   Component unmounts
 */

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EASE_CINEMATIC = [0.16, 1, 0.3, 1];
const EASE_SNAP      = [0.76, 0, 0.24, 1];

// ── Glitch state machine ─────────────────────────────────────────────────────
// Each entry: { start, end, intensity }  (ms from mount)
const GLITCH_BURSTS = [
  { start: 800,  end: 1400, intensity: 1   },  // burst 1 — moderate
  { start: 1900, end: 2400, intensity: 1.8 },  // burst 2 — stronger
];

function useGlitchState(active) {
  const [glitch, setGlitch] = useState(0); // 0 = off, >0 = intensity

  useEffect(() => {
    if (!active) { setGlitch(0); return; }

    const timers = [];
    GLITCH_BURSTS.forEach(({ start, end, intensity }) => {
      timers.push(setTimeout(() => setGlitch(intensity), start));
      timers.push(setTimeout(() => setGlitch(0), end));
    });
    return () => timers.forEach(clearTimeout);
  }, [active]);

  return glitch;
}

// ── Chromatic channel layer ───────────────────────────────────────────────────
function ChromaLayer({ color, xOffset, yOffset, opacity, children }) {
  return (
    <motion.span
      aria-hidden="true"
      style={{
        position:  'absolute',
        inset:     0,
        display:   'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color,
        mixBlendMode: 'screen',
        pointerEvents: 'none',
        userSelect: 'none',
        fontFamily:    'inherit',
        fontSize:      'inherit',
        fontWeight:    'inherit',
        letterSpacing: 'inherit',
        lineHeight:    'inherit',
      }}
      animate={{ x: xOffset, y: yOffset, opacity }}
      transition={{ duration: 0.06, ease: 'linear' }}
    >
      {children}
    </motion.span>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function CinematicIntro({ introState }) {
  const isTransitioning = introState === 'transitioning';
  const isActive        = introState === 'logo-reveal';
  const glitch          = useGlitchState(isActive);
  const hasGlitch       = glitch > 0;

  // Jitter on main text during glitch
  const jitterX = hasGlitch ? (Math.random() > 0.5 ? glitch * 1.5 : -glitch * 1.5) : 0;
  const jitterY = hasGlitch ? (Math.random() > 0.5 ? glitch * 0.4 : -glitch * 0.4) : 0;

  // Chroma offsets scale with intensity
  const cyanX    =  hasGlitch ? glitch * 4  : 0;
  const magentaX = -hasGlitch ? glitch * 3.5: 0;
  const yellowX  =  hasGlitch ? glitch * 2  : 0;

  const TEXT = 'MOTION';

  return (
    <AnimatePresence>
      {introState !== 'complete' && (
        <motion.div
          key="intro-overlay"
          aria-hidden="true"
          style={styles.overlay}
          animate={{ opacity: isTransitioning ? 0 : 1 }}
          transition={{ duration: 1.6, ease: EASE_CINEMATIC }}
        >
          {/* Film grain */}
          <div style={styles.grain} />

          {/* Ambient glow */}
          <motion.div
            style={styles.glow}
            animate={{
              opacity: isTransitioning ? 0 : [0.05, 0.16, 0.05],
              scale:   isTransitioning ? 1.5 : [1, 1.12, 1],
            }}
            transition={
              isTransitioning
                ? { duration: 1.4, ease: EASE_CINEMATIC }
                : { duration: 4, repeat: Infinity, ease: 'easeInOut' }
            }
          />

          {/* ── Typography container ── */}
          <motion.div
            style={styles.textWrap}
            animate={{
              scale:  isTransitioning ? 1.8  : 1,
              filter: isTransitioning ? 'blur(28px)' : 'blur(0px)',
              opacity: isTransitioning ? 0 : 1,
            }}
            transition={{ duration: 1.9, ease: EASE_CINEMATIC }}
          >
            {/* Main word with optional jitter */}
            <motion.div
              style={styles.wordWrap}
              animate={{ x: hasGlitch ? jitterX : 0, y: hasGlitch ? jitterY : 0 }}
              transition={{ duration: 0.05, ease: 'linear' }}
            >
              {/* Cyan chroma channel */}
              <ChromaLayer
                color="rgba(0,255,240,0.55)"
                xOffset={cyanX}
                yOffset={hasGlitch ? -glitch * 0.5 : 0}
                opacity={hasGlitch ? 0.75 : 0}
              >
                {TEXT}
              </ChromaLayer>

              {/* Magenta chroma channel */}
              <ChromaLayer
                color="rgba(255,0,180,0.55)"
                xOffset={magentaX}
                yOffset={hasGlitch ? glitch * 0.3 : 0}
                opacity={hasGlitch ? 0.7 : 0}
              >
                {TEXT}
              </ChromaLayer>

              {/* Yellow chroma channel */}
              <ChromaLayer
                color="rgba(255,240,0,0.4)"
                xOffset={yellowX}
                yOffset={0}
                opacity={hasGlitch ? 0.55 : 0}
              >
                {TEXT}
              </ChromaLayer>

              {/* Base typography — sharp, white */}
              <motion.h1
                style={styles.word}
                initial={{ opacity: 0, filter: 'blur(16px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 1.2, ease: EASE_SNAP }}
              >
                {TEXT}
              </motion.h1>
            </motion.div>

            {/* Subtitle: ENTER THE WORLD OF MOTION */}
            <motion.p
              style={styles.subtitle}
              initial={{ opacity: 0, y: 14 }}
              animate={{
                opacity: isTransitioning ? 0 : (isActive ? 1 : 0),
                y:       isTransitioning ? -10 : (isActive ? 0 : 14),
              }}
              transition={{ delay: isTransitioning ? 0 : 0.9, duration: 1.0, ease: EASE_CINEMATIC }}
            >
              ENTER THE WORLD OF MOTION
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Inline styles ─────────────────────────────────────────────────────────────
const styles = {
  overlay: {
    position:       'fixed',
    inset:          0,
    background:     '#000',
    zIndex:         999999,
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'center',
    pointerEvents:  'none',
    overflow:       'hidden',
  },
  grain: {
    position:        'absolute',
    inset:           0,
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
    opacity:         0.06,
    pointerEvents:   'none',
    zIndex:          0,
  },
  glow: {
    position:   'absolute',
    inset:      0,
    background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(200,187,168,0.18) 0%, transparent 70%)',
    pointerEvents: 'none',
    zIndex:     0,
  },
  textWrap: {
    position:       'relative',
    zIndex:         2,
    display:        'flex',
    flexDirection:  'column',
    alignItems:     'center',
    justifyContent: 'center',
    willChange:     'transform, filter, opacity',
  },
  wordWrap: {
    position:   'relative',
    display:    'flex',
    alignItems: 'center',
    willChange: 'transform',
  },
  word: {
    position:      'relative',
    zIndex:        2,
    fontFamily:    "'Neue Montreal', 'Inter Tight', 'Inter', system-ui, sans-serif",
    fontSize:      'clamp(3.5rem, 12vw, 9.5rem)',
    fontWeight:    700,
    letterSpacing: '-0.04em',
    lineHeight:    0.9,
    color:         '#fff',
    margin:        0,
    willChange:    'filter, opacity',
    userSelect:    'none',
  },
  subtitle: {
    fontFamily:    "'Neue Montreal', 'Inter Tight', system-ui, sans-serif",
    fontSize:      '0.58rem',
    fontWeight:    400,
    letterSpacing: '0.45em',
    color:         'rgba(255,255,255,0.38)',
    textTransform: 'uppercase',
    marginTop:     '2rem',
    userSelect:    'none',
    willChange:    'opacity, transform',
  },
};
