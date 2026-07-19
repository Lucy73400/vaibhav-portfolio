/**
 * VideoModal.jsx — Cinematic fullscreen overlay
 *
 * APPROACH — single video element, DOM transplant
 * ──────────────────────────────────────────────
 * Instead of creating a second <video> that must reload the CloudFront file,
 * we physically move the existing <video> node (owned by Atmospheric) into this
 * overlay when opening, and move it back when closing.
 *
 * Benefits:
 *   • Zero reload — same buffered data, same network connection
 *   • Zero timestamp jump — currentTime is untouched by the move
 *   • Instant audio — we just set .muted = false on the existing element
 *   • Zero memory leak — only one MediaSource instance ever exists
 *
 * Props:
 *   isOpen    boolean      — show/hide the overlay
 *   onClose   fn           — dismiss handler
 *   videoRef  React ref    — ref to the <video> owned by Atmospheric
 */

import { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

const EASE_CINEMATIC = [0.16, 1, 0.3, 1];

export default function VideoModal({ isOpen, onClose, videoRef }) {
  const slotRef      = useRef(null);   // the <div> inside the modal that receives the <video>
  const wasPlayingRef = useRef(false); // track play state for restore

  /* ── Transplant logic ─────────────────────────────────────────────────────
     open  → move <video> from #vis-video-slot into .vmodal-video-slot
             set muted=false, loop=false, controls=true, play()
     close → move <video> back into #vis-video-slot
             set muted=true, loop=true, controls=false, play() (resume inline)
  ──────────────────────────────────────────────────────────────────────── */
  useEffect(() => {
    const videoRefEl = videoRef?.current;
    const slot       = slotRef.current;
    const origin     = document.getElementById('vis-video-slot');

    if (!videoRefEl || !origin) return;

    const video = document.querySelector('video');
    if (!video) return;

    if (isOpen && slot) {
      // Remember whether it was playing (it always should be, but be safe)
      wasPlayingRef.current = !video.paused;

      // Move into modal slot
      slot.appendChild(video);

      // Fullscreen mode: unmute, show controls, stop looping
      video.muted    = false;
      video.loop     = false;
      video.controls = true;
      video.classList.remove('vis-video');
      video.classList.add('vmodal-video-transplanted');

      // Try unmuted play; if browser blocks, fall back to muted
      video.play().catch(() => {
        video.muted = true;
        video.play().catch(() => {});
      });

      // Lock body scroll
      document.body.style.overflow = 'hidden';

    } else if (!isOpen) {
      // Only restore if the video is currently in the modal slot
      if (slot && slot.contains(video)) {
        // Move back into inline container
        origin.insertBefore(video, origin.firstChild);
      }

      // Restore inline mode: mute, hide controls, loop
      video.muted    = true;
      video.loop     = true;
      video.controls = false;
      video.classList.remove('vmodal-video-transplanted');
      video.classList.add('vis-video');

      // Resume inline playback
      video.play().catch(() => {});

      // Restore body scroll
      document.body.style.overflow = '';
    }
  }, [isOpen, videoRef]);

  /* ── Keyboard shortcuts ── */
  const handleKeyDown = useCallback((e) => {
    if (!isOpen) return;
    const video = document.querySelector('video');
    if (!video) return;

    switch (e.key) {
      case 'Escape':
        onClose();
        break;
      case ' ':
      case 'Spacebar':
        e.preventDefault();
        if (video.paused) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
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
  }, [isOpen, onClose]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  /* ── Cleanup on unmount ── */
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        /* Backdrop */
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
          {/* Inner container — stops click-through to backdrop */}
          <motion.div
            className="vmodal-container"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1    }}
            exit={{    opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: EASE_CINEMATIC }}
            style={{ willChange: 'transform, opacity' }}
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
              This div receives the <video> node via DOM transplant in useEffect.
              It must be rendered before useEffect runs (which it is, because
              AnimatePresence renders it synchronously on isOpen → true).
            */}
            <div
              ref={slotRef}
              className="vmodal-video-slot"
              aria-label="Showreel video"
            />

            {/* Bottom meta */}
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
