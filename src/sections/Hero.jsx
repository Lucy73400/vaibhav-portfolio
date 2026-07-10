import { motion } from 'framer-motion';

const EASE_CINEMATIC  = [0.16, 1, 0.3, 1];
const SHOWREEL_VIDEO  = 'https://dfg6l33mt2won.cloudfront.net/assasians-creed.mp4';

export default function Hero({ introState, onShowreel }) {
  const visible = introState !== 'logo-reveal';

  return (
    <section id="hero" aria-label="Hero introduction">

      {/* ── Dark base layer ── */}
      <motion.div
        className="hero-bg"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 1.8, ease: EASE_CINEMATIC }}
      />

      {/* ── Background video — fades + scales in before text reveals ── */}
      <motion.div
        className="hero-artwork"
        aria-hidden="true"
        initial={{ opacity: 0, scale: 1.03, filter: 'blur(8px)' }}
        animate={{
          opacity: visible ? 1 : 0,
          scale:   visible ? 1 : 1.03,
          filter:  visible ? 'blur(0px)' : 'blur(8px)',
        }}
        transition={{ duration: 1.3, delay: 0.2, ease: EASE_CINEMATIC }}
        style={{ willChange: 'transform, opacity, filter' }}
      >
        {/*
          Native HTML5 video background.
          autoPlay    — starts immediately, no user gesture needed on desktop
          muted       — required for autoplay in all browsers
          loop        — infinite cinematic loop
          playsInline — prevents iOS from going fullscreen automatically
          preload     — "auto" so CloudFront starts buffering on load
          No controls, no anchor, no window.open — stays inside the page.
        */}
        <video
          className="hero-artwork-video"
          src={SHOWREEL_VIDEO}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          disablePictureInPicture
          disableRemotePlayback
        />

        {/* Dark overlay + all-edge vignette — keeps text readable */}
        <div className="hero-artwork-overlay" aria-hidden="true" />
      </motion.div>

      {/* ── Centered text content — entirely unchanged ── */}
      <div className="hero-content">

        {/* VAIBHAV */}
        <motion.h1
          className="hero-name-label"
          initial={{ opacity: 0, filter: 'blur(15px)', y: 15 }}
          animate={{
            opacity: visible ? 1 : 0,
            filter:  visible ? 'blur(0px)' : 'blur(15px)',
            y:       visible ? 0 : 15,
          }}
          transition={{ duration: 1.6, delay: 0.8, ease: EASE_CINEMATIC }}
          style={{ willChange: 'transform, opacity, filter' }}
        >
          VAIBHAV
        </motion.h1>

        {/* Disciplines */}
        <motion.div
          className="hero-disciplines"
          aria-label="Creative disciplines"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 15 }}
          transition={{ duration: 1.4, delay: 1.1, ease: EASE_CINEMATIC }}
          style={{ willChange: 'transform, opacity' }}
        >
          <span className="discipline-tag">Animator</span>
          <span className="discipline-separator" aria-hidden="true">•</span>
          <span className="discipline-tag">Illustrator</span>
          <span className="discipline-separator" aria-hidden="true">•</span>
          <span className="discipline-tag">Storyteller</span>
          <span className="discipline-separator" aria-hidden="true">•</span>
          <span className="discipline-tag">Visual Creator</span>
        </motion.div>

        {/* Quote */}
        <motion.blockquote
          className="hero-quote-block"
          initial={{ opacity: 0, y: 15, filter: 'blur(5px)' }}
          animate={{
            opacity: visible ? 1 : 0,
            y:       visible ? 0 : 15,
            filter:  visible ? 'blur(0px)' : 'blur(5px)',
          }}
          transition={{ duration: 1.6, delay: 1.4, ease: EASE_CINEMATIC }}
          style={{ willChange: 'transform, opacity, filter' }}
        >
          <p className="hero-quote-text">
            "We're not copying life, we're making a comment on it."
          </p>
          <cite className="hero-quote-author">— Richard Williams</cite>
        </motion.blockquote>

      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="hero-scroll"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: visible ? 0.6 : 0 }}
        transition={{ duration: 1.2, delay: 1.8, ease: EASE_CINEMATIC }}
      >
        <div className="scroll-line" />
      </motion.div>

    </section>
  );
}
