/**
 * VideoModal.jsx — Cinematic fullscreen overlay
 *
 * APPROACH — single video element, DOM transplant
 * ──────────────────────────────────────────────
 * Physically moves the existing <video> node (owned by Atmospheric) into this
 * overlay when opening, and moves it back when closing.
 *
 * All ref accesses are null-guarded — the component cannot crash even if the
 * video element is not yet mounted or has already been unmounted.
 */

import { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

const EASE_CINEMATIC = [0.16, 1, 0.3, 1];

export default function VideoModal({ isOpen, onClose, videoRef }) {
  const slotRef = useRef(null);

  /* ── Transplant logic ─────────────────────────────────────────────────────
     ALL DOM queries are null-checked before use.
     If any element is missing the effect exits early — no crash.
  ──────────────────────────────────────────────────────────────────────── */
  useEffect(() => {
    // Null-guard every reference before touching the DOM
    const video  = videoRef?.current ?? null;
    const slot   = slotRef.current   ?? null;
    const origin = document.getElementById('vis-video-slot') ?? null;

    if (!video || !origin) return;   // video not ready — bail silently

    if (isOpen) {
      if (!slot) return;             // modal slot not rendered yet — bail

      // Move into modal
      slot.appendChild(video);

      video.muted    = false;
      video.loop     = false;
      video.controls = true;
      video.classList.remove('vis-video');
      video.classList.add('vmodal-video-transplanted');

      video.play().catch(() => {
        // Browser blocked unmuted autoplay — fall back to muted
        video.muted = true;
        video.play().catch(() => {});
      });

      document.body.style.overflow = 'hidden';

    } else {
      // Only move back if the video is currently inside the modal slot
      if (slot && slot.contains(video)) {
        origin.insertBefore(video, origin.firstChild);
      } else if (!origin.contains(video)) {
        // Defensive: if video ended up orphaned, re-attach it
        origin.insertBefore(video, origin.firstChild);
      }

      video.muted    = true;
      video.loop     = true;
      video.controls = false;
      video.classList.remove('vmodal-video-transplanted');
      video.classList.add('vis-video');

      video.play().catch(() => {});
      document.body.style.overflow = '';
    }
  }, [isOpen, videoRef]);

  /* ── Keyboard shortcuts — all null-checked ── */
  const handleKeyDown = useCallback((e) => {
    if (!isOpen) return;
    const video = videoRef?.current ?? null;
    if (!video) return;

    switch (e.key) {
      case 'Escape':
        onClose();
        break;
      case ' ':
      case 'Spacebar':
        e.preventDefault();
        video.paused ? video.play().catch(() => {}) : video.pause();
        break;
      case 'ArrowRight':
        video.currentTime = Math.min(video.duration || 0, video.currentTime + 5);
        break;
      case 'ArrowLeft':
        video.currentTime = Math.max(0, video.currentTime - 5);
        break;
      case 'm':
      case 'M':
        video.muted = !video.muted;
        break;
      default:
        break;
    }
  }, [isOpen, onClose, videoRef]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    return () => { document.body.style.overflow = ''; };
  }, []);

  return createPortal(
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
          transition={{ duration: 0.4, ease: EASE_CINEMATIC }}
        >
          <motion.div
            className="vmodal-container"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1    }}
            exit={{    opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: EASE_CINEMATIC }}
            style={{ willChange: 'transform, opacity' }}
          >
            <button
              className="vmodal-close"
              onClick={onClose}
              aria-label="Close showreel"
            >
              <span aria-hidden="true">✕</span>
            </button>

            {/* Video is injected here via DOM transplant in useEffect */}
            <div
              ref={slotRef}
              className="vmodal-video-slot"
              aria-label="Showreel video"
            />

            <div className="vmodal-meta" aria-hidden="true">
              <span className="vmodal-meta-label">SHOWREEL</span>
              <span className="vmodal-meta-hint">ESC · SPACE · ←/→ · M</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
