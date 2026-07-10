/**
 * VideoModal.jsx — Cinematic fullscreen video overlay
 *
 * Props:
 *   isOpen     boolean   — controls visibility
 *   onClose    fn        — called when the overlay is dismissed
 *   startTime  number    — optional timestamp (seconds) to seek to on open
 *
 * Design rules:
 *   • Framer Motion AnimatePresence for enter/exit
 *   • Native HTML5 <video> — no third-party player libs
 *   • <source> injected only on first open — no pre-fetch before needed
 *   • Starts playing from startTime when provided (timestamp sync)
 *   • Audio enabled in fullscreen modal (muted = false by default)
 *   • Gold accent system (--gold, --gold-hairline)
 *   • Keyboard: Escape closes, Space toggles, ←/→ seek, M mute, F fullscreen
 *   • Restores body scroll on unmount
 */

import { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EASE_CINEMATIC = [0.16, 1, 0.3, 1];
const SHOWREEL_URL   = 'https://dfg6l33mt2won.cloudfront.net/assasians-creed.mp4';
const POSTER_URL     = 'https://i.ibb.co/0yPxpNDd/IMG-6261.png';

export default function VideoModal({ isOpen, onClose, startTime = 0 }) {
  const videoRef  = useRef(null);
  const srcLoaded = useRef(false);

  /* ── Lock / restore body scroll ── */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  /* ── Source injection, timestamp seek, autoplay ─────────────────────────
     <source> appended once — prevents browser download-dialog behaviour.
     When startTime > 0 (coming from the inline player) we seek there so
     the viewer continues from exactly where the inline reel left off.
  ──────────────────────────────────────────────────────────────────────── */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isOpen) {
      if (!srcLoaded.current) {
        const source = document.createElement('source');
        source.src   = SHOWREEL_URL;
        source.type  = 'video/mp4';
        video.appendChild(source);
        video.load();
        srcLoaded.current = true;
      }

      // Seek to timestamp, then play
      const attemptPlay = () => {
        if (startTime > 0) {
          video.currentTime = startTime;
        }
        // Audio on in fullscreen modal — unmute
        video.muted = false;
        video.play().catch(() => {
          // Autoplay policy — fallback to muted play
          video.muted = true;
          video.play().catch(() => {});
        });
      };

      // If metadata already loaded, seek immediately; otherwise wait
      if (video.readyState >= 1) {
        attemptPlay();
      } else {
        video.addEventListener('loadedmetadata', attemptPlay, { once: true });
      }
    } else {
      video.pause();
      video.muted = true;
    }
  }, [isOpen, startTime]);

  /* ── Keyboard shortcuts ── */
  const handleKeyDown = useCallback((e) => {
    if (!isOpen) return;
    const video = videoRef.current;

    switch (e.key) {
      case 'Escape':
        onClose();
        break;
      case ' ':
      case 'Spacebar':
        e.preventDefault();
        if (video) video.paused ? video.play() : video.pause();
        break;
      case 'ArrowRight':
        if (video) video.currentTime = Math.min(video.duration || 0, video.currentTime + 5);
        break;
      case 'ArrowLeft':
        if (video) video.currentTime = Math.max(0, video.currentTime - 5);
        break;
      case 'm':
      case 'M':
        if (video) video.muted = !video.muted;
        break;
      case 'f':
      case 'F':
        if (!video) break;
        if (document.fullscreenElement) {
          document.exitFullscreen?.();
        } else {
          video.requestFullscreen?.();
        }
        break;
      default:
        break;
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="vmodal-backdrop"
          aria-modal="true"
          role="dialog"
          aria-label="Showreel fullscreen player"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{    opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE_CINEMATIC }}
        >
          <motion.div
            className="vmodal-container"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.96, filter: 'blur(8px)' }}
            animate={{ opacity: 1, scale: 1,    filter: 'blur(0px)' }}
            exit={{    opacity: 0, scale: 0.96, filter: 'blur(8px)' }}
            transition={{ duration: 0.55, ease: EASE_CINEMATIC }}
            style={{ willChange: 'transform, opacity, filter' }}
          >
            <button
              className="vmodal-close"
              onClick={onClose}
              aria-label="Close showreel"
            >
              <span aria-hidden="true">✕</span>
            </button>

            <video
              ref={videoRef}
              className="vmodal-video"
              poster={POSTER_URL}
              controls
              playsInline
              preload="metadata"
              crossOrigin="anonymous"
              aria-label="Showreel video"
            >
              Your browser does not support HTML5 video.
            </video>

            <div className="vmodal-meta" aria-hidden="true">
              <span className="vmodal-meta-label">SHOWREEL</span>
              <span className="vmodal-meta-hint">ESC · SPACE · ←/→ · M · F</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
