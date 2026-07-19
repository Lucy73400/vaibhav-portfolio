/**
 * CinematicIntro.jsx — Premium intro sequence
 *
 * TIMELINE (total ≈ 4.6s, driven by App.jsx introState)
 *
 * logo-reveal  (0 – 2600ms)
 *   Phase A  0–2600ms : Logo appears, sharp, centered
 *
 * transitioning (2600–4600ms)
 *   Logo scales 1→1.8, blurs 0→28px, fades 1→0
 *   Overlay fades out, hero emerges behind
 *
 * complete (4600ms+)
 *   Component unmounts
 */

import { motion, AnimatePresence } from 'framer-motion';

const EASE_CINEMATIC = [0.16, 1, 0.3, 1];

export default function CinematicIntro({ introState }) {
  const isTransitioning = introState === 'transitioning';
  const isActive = introState === 'logo-reveal';

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
            {/* Logo image */}
            <motion.img
              src="https://i.ibb.co/hJwV1pph/MY-personal-logo.png"
              alt="THE ANIMATOR"
              style={styles.logo}
              initial={{ opacity: 0, filter: 'blur(16px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.2, ease: EASE_CINEMATIC }}
            />

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
          <style>{mediaQueries}</style>
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
    position:       'absolute',
    inset:          0,
    background:     'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(200,187,168,0.18) 0%, transparent 70%)',
    pointerEvents:  'none',
    zIndex:         0,
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
  logo: {
    width:          '100%',
    maxWidth:       '280px',
    height:         'auto',
    userSelect:     'none',
    willChange:     'filter, opacity',
  },
  subtitle: {
    fontFamily:     "'Neue Montreal', 'Inter Tight', system-ui, sans-serif",
    fontSize:       '0.58rem',
    fontWeight:     400,
    letterSpacing:  '0.45em',
    color:          'rgba(255,255,255,0.38)',
    textTransform:  'uppercase',
    marginTop:      '2rem',
    userSelect:     'none',
    willChange:     'opacity, transform',
  },
};

// Responsive adjustments for logo
const mediaQueries = `
  @media (min-width: 768px) {
    .logo { max-width: 420px; }
  }
  @media (min-width: 1024px) {
    .logo { max-width: 520px; }
  }
`;