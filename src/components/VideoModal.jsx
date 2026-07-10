/**
 * VideoModal.jsx — Cinematic fullscreen video overlay
 *
 * Props:
 *   isOpen   boolean  — controls visibility
 *   onClose  fn       — called when the overlay is dismissed
 *
 * Design rules:
 *   • Framer Motion AnimatePresence for enter/exit
 *   • Native HTML5 <video> — no third-party player libs
 *   • Gold accent system (--gold, --gold-hairline)
 *   • Keyboard: Escape closes, Space toggles play/pause
 *   • Restores body scroll on unmount
 */

import { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EASE_CINEMATIC = [0.16, 1, 0.3, 1];
const SHOWREEL_URL   = 'https://dfg6l33mt2won.cloudfront.net/assasians-creed.mp4';

export default function VideoModal({ isOpen, onClose }) {
  const videoRef = useRef(null);

  /* ── Lock / restore body scroll ── */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  /* ── Auto-play when modal opens; pause + reset when it closes ── */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isOpen) {
      /* Small timeout lets the enter animation start before playback begins */
      const t = setTimeout(() => {
        video.play().catch(() => {/* autoplay blocked — user will click play */});
      }, 300);
      return () => clearTimeout(t);
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [isOpen]);

  /* ── Keyboard shortcuts ── */
  const handleKeyDown = useCallback((e) => {
    if (!isOpen) return;
    const video = videoRef.current;
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault();
      if (!video) return;
      video.paused ? video.play() : video.pause();
    } else if (e.key === 'ArrowRight') {
      if (video) video.currentTime = Math.min(video.duration, video.currentTime + 5);
    } else if (e.key === 'ArrowLeft') {
      if (video) video.currentTime = Math.max(0, video.currentTime - 5);
    } else if (e.key === 'm' || e.key === 'M') {
      if (video) video.muted = !video.muted;
    } else if (e.key === 'f' || e.key === 'F') {
      if (video) {
        if (document.fullscreenElement) {
          document.exitFullscreen?.();
        } else {
          video.requestFullscreen?.();
        }
      }
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        /* ── Backdrop ── */
        <motion.div
          className="vmodal-backdrop"
          aria-modal="true"
          role="dialog"
          aria-label="Showreel video player"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE_CINEMATIC }}
        >
          {/* ── Video container — stops backdrop click from bubbling ── */}
          <motion.div
            className="vmodal-container"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.96, filter: 'blur(8px)' }}
            animate={{ opacity: 1, scale: 1,    filter: 'blur(0px)' }}
            exit={{    opacity: 0, scale: 0.96, filter: 'blur(8px)' }}
            transition={{ duration: 0.55, ease: EASE_CINEMATIC }}
            style={{ willChange: 'transform, opacity, filter' }}
          >
            {/* Close button */}
            <button
              className="vmodal-close"
              onClick={onClose}
              aria-label="Close showreel"
            >
              <span aria-hidden="true">✕</span>
            </button>

            {/* Native HTML5 video — streams directly from CloudFront */}
            <video
              ref={videoRef}
              className="vmodal-video"
              src={SHOWREEL_URL}
              controls
              playsInline
              preload="metadata"
              aria-label="Showreel video"
            />

            {/* Bottom meta */}
            <div className="vmodal-meta" aria-hidden="true">
              <span className="vmodal-meta-label">SHOWREEL</span>
              <span className="vmodal-meta-hint">ESC to close · SPACE to pause · F for fullscreen</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
