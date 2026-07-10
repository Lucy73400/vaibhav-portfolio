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
 *   • <source> injected only on open — prevents any pre-fetch / download
 *     behaviour that can cause browsers to open the native media viewer
 *   • poster shows until the user explicitly presses Play
 *   • NO autoplay — user initiates playback
 *   • Gold accent system (--gold, --gold-hairline)
 *   • Keyboard: Escape closes, Space toggles, ←/→ seek, M mute, F fullscreen
 *   • Restores body scroll on unmount
 */

import { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EASE_CINEMATIC = [0.16, 1, 0.3, 1];
const SHOWREEL_URL   = 'https://dfg6l33mt2won.cloudfront.net/assasians-creed.mp4';

// The new portrait doubles as the video poster — same cinematic mood
const POSTER_URL     = 'https://i.ibb.co/0yPxpNDd/IMG-6261.png';

export default function VideoModal({ isOpen, onClose }) {
  const videoRef  = useRef(null);
  const srcLoaded = useRef(false);   // track whether <source> has been injected

  /* ── Lock / restore body scroll ── */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  /* ── Source injection + pause-on-close ──────────────────────────────────
     We deliberately do NOT set src on the <video> element directly.
     Instead we append a <source> child the first time the modal opens.
     This guarantees:
       • Zero network requests until the user actually opens the modal
       • No browser "open in media player" behaviour (that only triggers
         when an <a href> or window.open points at a media URL — never
         for a <video> whose src is set programmatically inside the DOM)
       • The poster image is shown by default; the user presses Play
  ──────────────────────────────────────────────────────────────────────── */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isOpen) {
      // Inject <source> once — never re-inject on subsequent opens
      if (!srcLoaded.current) {
        const source = document.createElement('source');
        source.src  = SHOWREEL_URL;
        source.type = 'video/mp4';
        video.appendChild(source);
        video.load();          // prime metadata fetch, respect preload="metadata"
        srcLoaded.current = true;
      }
      // DO NOT auto-play. Poster is visible. User clicks Play.
    } else {
      // Modal closed — pause and rewind so poster shows again on re-open
      video.pause();
      video.currentTime = 0;
    }
  }, [isOpen]);

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
        /* ── Backdrop — click outside to dismiss ── */
        <motion.div
          className="vmodal-backdrop"
          aria-modal="true"
          role="dialog"
          aria-label="Showreel video player"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{    opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE_CINEMATIC }}
        >
          {/* ── Video container ── */}
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

            {/*
              Native HTML5 video.
              - No src attribute here — injected programmatically above
                to prevent any external-player hijack
              - poster shown until the user presses Play
              - controls / playsInline keep everything inside this element
              - crossOrigin="anonymous" tells the browser this is same-origin
                media intent, preventing download-dialog behaviour
            */}
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
              {/* <source> appended dynamically in useEffect above */}
              Your browser does not support HTML5 video.
            </video>

            {/* Bottom meta */}
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
