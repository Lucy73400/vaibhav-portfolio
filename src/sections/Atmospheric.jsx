/**
 * Atmospheric.jsx — Showreel section
 *
 * The <video> element is owned here and its ref is forwarded to the parent
 * (App.jsx) so that VideoModal can physically transplant the same element
 * into fullscreen — guaranteeing zero reload and perfect timestamp continuity.
 *
 * Props:
 *   videoRef        React ref — forwarded ref for the <video> element
 *   onOpenFullscreen fn       — called with no args; App reads the ref directly
 */

import { useEffect, useRef, forwardRef } from 'react';

const SHOWREEL_URL = 'https://dfg6l33mt2won.cloudfront.net/assasians-creed.mp4';

const Atmospheric = forwardRef(function Atmospheric({ onOpenFullscreen }, videoRef) {
  const sectionRef = useRef(null);

  /* ── Intersection Observer — autoplay when visible, pause off-screen ── */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.2 }
    );

    const section = sectionRef.current;
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, [videoRef]);

  return (
    <div
      ref={sectionRef}
      id="visual"
      className="vis-section reveal-up"
      aria-label="Showreel"
    >
      {/* ── Inline video container ── */}
      <div className="vis-video-wrap" id="vis-video-slot">
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
        <div className="vis-video-overlay" aria-hidden="true" />
      </div>

      {/* ── Controls row ── */}
      <div className="vis-controls" aria-label="Showreel controls">
        <button
          className="vis-fullscreen-btn"
          onClick={onOpenFullscreen}
          aria-label="Open showreel fullscreen"
        >
          <span className="vis-fullscreen-icon" aria-hidden="true">
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <path d="M1 4V1H4M7 1H10V4M10 7V10H7M4 10H1V7"
                    stroke="currentColor" strokeWidth="1.2"
                    strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <span>Full Screen</span>
        </button>

        <span className="vis-meta-label" aria-hidden="true">
          RED 6K · 4K · 24fps · 10bit
        </span>
      </div>
    </div>
  );
});

export default Atmospheric;
