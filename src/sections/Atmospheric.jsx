/**
 * Atmospheric.jsx — Showreel section
 *
 * Embeds the showreel video directly inside the section.
 * The video autoplays (muted, looped) as soon as it enters the viewport.
 * A "FULL SCREEN" button beneath the player syncs the current timestamp
 * into the VideoModal so playback continues without restarting.
 */

import { useEffect, useRef, useCallback } from 'react';

const SHOWREEL_URL = 'https://dfg6l33mt2won.cloudfront.net/assasians-creed.mp4';

export default function Atmospheric({ onOpenFullscreen }) {
  const videoRef     = useRef(null);
  const sectionRef   = useRef(null);
  const hasStarted   = useRef(false);

  /* ── Intersection Observer — play when visible, pause when not ── */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            if (!hasStarted.current) {
              hasStarted.current = true;
            }
            video.play().catch(() => {
              // Autoplay blocked (e.g. data-saver mode) — silently ignore;
              // the video poster/thumbnail remains visible
            });
          } else {
            // Pause while off-screen to save bandwidth + CPU
            video.pause();
          }
        });
      },
      { threshold: 0.2 }
    );

    const section = sectionRef.current;
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  /* ── Full-screen button handler — pass current timestamp up ── */
  const handleFullscreen = useCallback(() => {
    const video = videoRef.current;
    const ts    = video ? video.currentTime : 0;
    onOpenFullscreen?.(ts);
  }, [onOpenFullscreen]);

  return (
    <div
      ref={sectionRef}
      id="visual"
      className="vis-section reveal-up"
      aria-label="Showreel"
    >
      {/* ── Embedded showreel video ── */}
      <div className="vis-video-wrap">
        <video
          ref={videoRef}
          className="vis-video"
          src={SHOWREEL_URL}
          muted
          loop
          playsInline
          preload="metadata"
          disablePictureInPicture
          disableRemotePlayback
          aria-label="Showreel — animation reel"
        />
        {/* Thin cinematic overlay — barely dims, preserves colour */}
        <div className="vis-video-overlay" aria-hidden="true" />
      </div>

      {/* ── Full-screen control ── */}
      <div className="vis-controls" aria-label="Showreel controls">
        <button
          className="vis-fullscreen-btn"
          onClick={handleFullscreen}
          aria-label="Open showreel fullscreen"
        >
          <span className="vis-fullscreen-icon" aria-hidden="true">
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 4V1H4M7 1H10V4M10 7V10H7M4 10H1V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <span>Full Screen</span>
        </button>

        {/* Decorative meta — preserved from original design */}
        <span className="vis-meta-label" aria-hidden="true">
          RED 6K · 4K · 24fps · 10bit
        </span>
      </div>
    </div>
  );
}
