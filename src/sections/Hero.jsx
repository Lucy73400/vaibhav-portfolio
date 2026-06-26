import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1];

// Staggered child variants — everything below the name
const childVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.4, delay, ease: EASE },
  }),
};

export default function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Fire once body.loaded is set by CinematicIntro's onComplete
    const check = () => {
      if (document.body.classList.contains('loaded')) {
        // 200ms grace — lets the overlay opacity-out settle first
        setTimeout(() => setVisible(true), 200);
      }
    };
    check(); // in case already set
    const mo = new MutationObserver(check);
    mo.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => mo.disconnect();
  }, []);

  return (
    <section id="hero" aria-label="Hero introduction">
      <div className="hero-bg" aria-hidden="true" />

      <div className="hero-content">
        {/* ── Shared element: name morphs from intro position ─────────── */}
        <motion.h1
          layoutId="vaibhav-name"
          className="hero-name-label"
          /* The layoutId handles positioning; we only animate opacity in */
          animate={{ opacity: visible ? 1 : 0 }}
          transition={{ duration: 1.0, ease: EASE }}
          style={{ willChange: 'transform, opacity' }}
        >
          VAIBHAV
        </motion.h1>

        {/* ── Disciplines ─────────────────────────────────────────────── */}
        <motion.div
          className="hero-disciplines"
          aria-label="Creative disciplines"
          variants={childVariants}
          initial="hidden"
          animate={visible ? 'visible' : 'hidden'}
          custom={0.2}
        >
          <span className="discipline-tag">Animator</span>
          <span className="discipline-separator" aria-hidden="true">•</span>
          <span className="discipline-tag">Illustrator</span>
          <span className="discipline-separator" aria-hidden="true">•</span>
          <span className="discipline-tag">Storyteller</span>
          <span className="discipline-separator" aria-hidden="true">•</span>
          <span className="discipline-tag">Visual Creator</span>
        </motion.div>

        {/* ── Manifesto ───────────────────────────────────────────────── */}
        <motion.div
          className="hero-manifesto-wrap"
          variants={childVariants}
          initial="hidden"
          animate={visible ? 'visible' : 'hidden'}
          custom={0.42}
        >
          <p className="hero-manifesto-text">
            I believe animation is more than movement.<br />
            It's the art of giving life to ideas.<br />
            Every project I create is a step toward building worlds,<br />
            telling stories, and inspiring the next generation of creators.
          </p>
        </motion.div>

        {/* ── Quote ───────────────────────────────────────────────────── */}
        <motion.div
          className="hero-quote-wrap"
          variants={childVariants}
          initial="hidden"
          animate={visible ? 'visible' : 'hidden'}
          custom={0.68}
        >
          <blockquote className="hero-quote">
            "We're not copying life, we're making a comment on it."
          </blockquote>
          <cite className="hero-quote-attr">— Richard Williams</cite>
        </motion.div>
      </div>

      <motion.div
        className="hero-scroll"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 1.2, delay: 1.1, ease: EASE }}
      >
        <div className="scroll-line" />
      </motion.div>
    </section>
  );
}
