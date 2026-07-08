import { motion } from 'framer-motion';

const EASE_CINEMATIC = [0.16, 1, 0.3, 1];

// External background artwork — new image
const BG_IMAGE = 'https://i.ibb.co/DDYCNnNb/Chat-GPT-Image-Jul-9-2026-02-59-17-AM.png';

export default function Hero({ introState }) {
  const visible = introState !== 'logo-reveal';

  return (
    <section id="hero" aria-label="Hero introduction">

      {/* ── Dark background texture ── */}
      <motion.div
        className="hero-bg"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 1.8, ease: EASE_CINEMATIC }}
      />

      {/* ── Background artwork — fades in first, sits behind all content ── */}
      <motion.div
        className="hero-artwork"
        aria-hidden="true"
        initial={{ opacity: 0, scale: 1.05, filter: 'blur(0px)' }}
        animate={{
          opacity: visible ? 1 : 0,
          scale:   visible ? 1 : 1.05,
          filter:  visible ? 'blur(0px)' : 'blur(10px)',
        }}
        transition={{ duration: 1.5, delay: 0.3, ease: EASE_CINEMATIC }}
        style={{ willChange: 'transform, opacity, filter' }}
      >
        <img
          src={BG_IMAGE}
          alt=""
          className="hero-artwork-img"
          loading="eager"
          draggable="false"
        />
        {/* All-edge vignette fade */}
        <div className="hero-artwork-vignette" aria-hidden="true" />
      </motion.div>

      {/* ── Centered text content — unchanged from original ── */}
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
