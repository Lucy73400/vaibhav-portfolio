import { motion } from 'framer-motion';

const EASE_CINEMATIC = [0.16, 1, 0.3, 1];

export default function Hero({ introState }) {
  const visible = introState !== 'logo-reveal';

  return (
    <section id="hero" aria-label="Hero introduction">
      {/* ── Background texture ── */}
      <motion.div
        className="hero-bg"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 1.8, ease: EASE_CINEMATIC }}
      />

      <div className="hero-content">
        {/* ── Hero typography (VAIBHAV) ── */}
        <motion.h1
          className="hero-name-label"
          initial={{ opacity: 0, filter: 'blur(15px)', y: 15 }}
          animate={{
            opacity: visible ? 1 : 0,
            filter: visible ? 'blur(0px)' : 'blur(15px)',
            y: visible ? 0 : 15,
          }}
          transition={{ duration: 1.6, delay: 0.8, ease: EASE_CINEMATIC }}
          style={{ willChange: 'transform, opacity, filter' }}
        >
          VAIBHAV
        </motion.h1>

        {/* ── Disciplines ── */}
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

        {/* ── Quote (Supporting the identity) ── */}
        <motion.blockquote
          className="hero-quote-block"
          initial={{ opacity: 0, y: 15, filter: 'blur(5px)' }}
          animate={{
            opacity: visible ? 1 : 0,
            y: visible ? 0 : 15,
            filter: visible ? 'blur(0px)' : 'blur(5px)',
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
