import { motion } from 'framer-motion';

const EASE_CINEMATIC = [0.16, 1, 0.3, 1];

const fadeUpBlur = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.6, ease: EASE_CINEMATIC },
  },
};

export default function Identity() {
  return (
    <section id="identity" className="philosophy-section">
      <div className="philosophy-container">

        <motion.span
          className="sec-label centered"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10% 0px' }}
          variants={fadeUpBlur}
        >
          01 / PHILOSOPHY
        </motion.span>

        <div className="philosophy-content">
          <motion.p
            className="philosophy-text"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10% 0px' }}
            variants={fadeUpBlur}
          >
            I believe animation is more than movement.
            It's the art of giving life to ideas.
            Every project I create is a step toward building worlds, telling stories,
            and inspiring the next generation of creators.
          </motion.p>
        </div>

      </div>
    </section>
  );
}
