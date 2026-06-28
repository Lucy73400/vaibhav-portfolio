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

import { motion, AnimatePresence } from 'framer-motion';

const EASE_CINEMATIC = [0.16, 1, 0.3, 1];

export default function CinematicIntro({ introState }) {
  const isTransitioning = introState === 'transitioning';

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
          {/* Film grain layer specific to intro */}
          <div style={styles.grain} />

          {/* Ambient breathing glow */}
          <motion.div
            style={styles.glow}
            animate={{
              opacity: isTransitioning ? 0 : [0.06, 0.18, 0.06],
              scale: isTransitioning ? 1.5 : [1, 1.15, 1],
            }}
            transition={{
              opacity: isTransitioning ? { duration: 1.2 } : { duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
              scale: isTransitioning ? { duration: 1.5, ease: EASE_CINEMATIC } : { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }
            }}
          />

          {/* Center-aligned logo reveal container */}
          <motion.div
            style={styles.logoContainer}
            animate={{
              scale: isTransitioning ? 1.8 : 1,
              filter: isTransitioning ? 'blur(30px)' : 'blur(0px)',
              opacity: isTransitioning ? 0 : 1,
            }}
            transition={{
              duration: 1.8,
              ease: EASE_CINEMATIC,
            }}
          >
            {/* Out-of-focus to sharp typography reveal */}
            <motion.h1
              style={styles.name}
              initial={{ filter: 'blur(20px)', opacity: 0.8, scale: 1.02 }}
              animate={{ filter: 'blur(0px)', opacity: 1, scale: 1 }}
              transition={{ duration: 1.6, ease: EASE_CINEMATIC }}
            >
              VAIBHAV
            </motion.h1>

            {/* Underline expanding from center */}
            <motion.div
              style={styles.underline}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isTransitioning ? 0 : 1 }}
              transition={{
                scaleX: isTransitioning 
                  ? { duration: 0.6, ease: 'easeIn' }
                  : { delay: 0.4, duration: 1.2, ease: EASE_CINEMATIC }
              }}
            />

            {/* Subtitle fading and sliding in */}
            <motion.div
              style={styles.subtitle}
              initial={{ opacity: 0, y: 12 }}
              animate={{
                opacity: isTransitioning ? 0 : 1,
                y: isTransitioning ? -12 : 0
              }}
              transition={{
                opacity: isTransitioning 
                  ? { duration: 0.6 }
                  : { delay: 0.8, duration: 1.2, ease: EASE_CINEMATIC },
                y: isTransitioning 
                  ? { duration: 0.6 }
                  : { delay: 0.8, duration: 1.2, ease: EASE_CINEMATIC }
              }}
            >
              CREATOR ARCHIVE
            </motion.div>
          </motion.div>
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
    zIndex: 1,
  },
  glow: {
    position: 'absolute',
    inset: 0,
    background:
      'radial-gradient(ellipse 55% 45% at 50% 50%, rgba(200,187,168,0.22) 0%, transparent 70%)',
    pointerEvents: 'none',
    zIndex: 1,
  },
  logoContainer: {
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    willChange: 'transform, filter, opacity',
  },
  name: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(3rem, 11vw, 8rem)',
    fontWeight: 900,
    letterSpacing: '-0.015em',
    lineHeight: 0.95,
    color: '#fff',
    margin: 0,
    willChange: 'filter, opacity, transform',
  },
  underline: {
    width: '100%',
    maxWidth: '240px',
    height: '1px',
    background: 'var(--accent-beige)',
    margin: '1.4rem 0',
    transformOrigin: 'center center',
    willChange: 'transform',
  },
  subtitle: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.62rem',
    fontWeight: 400,
    letterSpacing: '0.42em',
    color: 'var(--accent-muted)',
    textTransform: 'uppercase',
    willChange: 'opacity, transform',
  },
};
