/**
 * AssassinsCreed.jsx
 * Project case study page — /work/assassins-creed
 *
 * Design rules:
 *  • Uses the site's existing CSS token system (--gold, --font-serif, etc.)
 *  • .reveal-up / IntersectionObserver scroll reveal — same as rest of site
 *  • Videos autoplay muted when they enter the viewport; pause when off-screen
 *  • No new dependencies
 */

import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const TEASER_URL  = 'https://dfg6l33mt2won.cloudfront.net/assassins-creed-teaser.mp4';
const TRAILER_URL = 'https://dfg6l33mt2won.cloudfront.net/assasians-creed.mp4';

// ─── Shared scroll-reveal hook ───────────────────────────────────────────────
function useRevealObserver(rootRef) {
  useEffect(() => {
    if (!rootRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('revealed');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -6% 0px' }
    );
    rootRef.current.querySelectorAll('.reveal-up').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [rootRef]);
}

// ─── Viewport-triggered autoplay for muted inline videos ────────────────────
function useVideoAutoplay(videoRef) {
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.25 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [videoRef]);
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function AssassinsCreed() {
  const pageRef   = useRef(null);
  const heroRef   = useRef(null);
  const teaserRef = useRef(null);
  const trailerRef= useRef(null);

  // Scroll to top + hero entrance
  useEffect(() => {
    window.scrollTo(0, 0);
    const t = setTimeout(() => {
      heroRef.current?.classList.add('ac-hero-visible');
    }, 80);
    return () => clearTimeout(t);
  }, []);

  useRevealObserver(pageRef);
  useVideoAutoplay(teaserRef);
  useVideoAutoplay(trailerRef);

  return (
    <div ref={pageRef} className="ac-page" aria-label="Assassin's Creed project case study">

      {/* ════════════════════════════════════════════════════════════════
          01 · HERO
      ════════════════════════════════════════════════════════════════ */}
      <section className="ac-hero" aria-label="Project hero">
        {/* Subtle radial glow behind the title */}
        <div className="ac-hero-glow" aria-hidden="true" />

        <div className="ac-hero-inner" ref={heroRef}>
          {/* Back navigation */}
          <Link to="/" className="ac-back-link" aria-label="Back to portfolio">
            <span aria-hidden="true">←</span> Selected Works
          </Link>

          {/* Eyebrow */}
          <span className="ac-eyebrow">Motion Design · Case Study</span>

          {/* Main title */}
          <h1 className="ac-hero-title">
            <span className="ac-hero-title-main">Assassin's</span>
            <span className="ac-hero-title-main">Creed</span>
          </h1>

          <p className="ac-hero-subtitle">Where the Journey Begins</p>

          {/* Divider */}
          <div className="ac-rule" aria-hidden="true" />

          {/* Intro */}
          <p className="ac-hero-intro">
            A motion design and storytelling exploration inspired by the Assassin's
            Creed universe. Built frame by frame from concept to final sequence
            this project pursues one question: what does it feel like to step into
            the Animus for the very first time?
          </p>

          {/* Project meta strip */}
          <div className="ac-meta-strip">
            <div className="ac-meta-item">
              <span className="ac-meta-label">Year</span>
              <span className="ac-meta-value">2026</span>
            </div>
            <div className="ac-meta-item">
              <span className="ac-meta-label">Medium</span>
              <span className="ac-meta-value">Motion Design</span>
            </div>
            <div className="ac-meta-item">
              <span className="ac-meta-label">Tools</span>
              <span className="ac-meta-value">After Effects · Premiere</span>
            </div>
            <div className="ac-meta-item">
              <span className="ac-meta-label">Duration</span>
              <span className="ac-meta-value">0:19 · Complete Lockup</span>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          02 · TEASER
      ════════════════════════════════════════════════════════════════ */}
      <section className="ac-section ac-teaser-section" aria-label="Teaser video">
        <div className="ac-video-label reveal-up">
          <span className="ac-eyebrow">Early Pass · Teaser Cut</span>
          <p className="ac-video-meta">0:08 · Logo Reveal</p>
        </div>

        <div className="ac-video-wrap reveal-up">
          <video
            ref={teaserRef}
            className="ac-video"
            src={TEASER_URL}
            muted
            loop
            playsInline
            preload="metadata"
            disablePictureInPicture
            disableRemotePlayback
            aria-label="Assassin's Creed teaser animation"
          />
          <div className="ac-video-caption">
            <span className="ac-video-cap-left">After Effects · 4K · 24FPS</span>
            <span className="ac-video-cap-right">Teaser Cut</span>
          </div>
        </div>

        <p className="ac-video-note reveal-up">
          An early cut of the reveal the mark emerging from fog and static,
          built to hint at what's coming without giving it all away.
        </p>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          03 · CONCEPT
      ════════════════════════════════════════════════════════════════ */}
      <section className="ac-section" aria-label="Concept">
        <div className="ac-section-header reveal-up">
          <span className="ac-eyebrow">01 · The Brief</span>
          <h2 className="ac-section-title">Rethinking the Mark</h2>
        </div>

        <div className="ac-two-col reveal-up">
          <div className="ac-col">
            <h3 className="ac-col-heading">Research</h3>
            <p className="ac-col-body">
              Before animating a single frame, I went back to the Assassin's Creed
              logo itself studying its different versions across the series, and
              the different ways it's been brought to life on screen.
            </p>
          </div>
          <div className="ac-col">
            <h3 className="ac-col-heading">The Problem</h3>
            <p className="ac-col-body">
              One thing kept standing out: the existing intro and logo reveal
              weren't connecting with viewers as much as they could. There was room
              for something with more weight, more tension, more reason to lean in.
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          04 · DIRECTION
      ════════════════════════════════════════════════════════════════ */}
      <section className="ac-section ac-section--dark" aria-label="Direction">
        <div className="ac-section-header reveal-up">
          <span className="ac-eyebrow">02 · Direction</span>
          <h2 className="ac-section-title">Building the Reveal</h2>
        </div>

        <p className="ac-body-wide reveal-up">
          It starts with a loading screen that pulls the viewer into the expansive
          world of Assassin's Creed an endless space, wrapped in dark fog, with
          cinematic score building underneath to set an epic tone.
        </p>

        <p className="ac-body-wide reveal-up">
          As the character steps deeper into that space, the anticipation keeps
          climbing toward a title card: <em>Coming Soon.</em> Then, out of the
          dust, the mark itself slashes onto the screen landing with one powerful
          sound effect.
        </p>

        {/* Narrative beats grid */}
        <div className="ac-beats reveal-up">
          {[
            { n: '001', label: 'Memory Sequence', body: 'The loading screen draws the viewer into a fog-wrapped simulation.' },
            { n: '002', label: 'Animus System', body: 'HUD elements and scan lines establish the world\'s technological language.' },
            { n: '003', label: 'The Character', body: 'A silhouette steps into the dark space, building anticipation beat by beat.' },
            { n: '004', label: 'The Mark', body: 'The Assassin\'s crest slashes into frame — dust, motion blur, one sound.' },
          ].map((beat) => (
            <div key={beat.n} className="ac-beat-item">
              <span className="ac-beat-num">{beat.n}</span>
              <h4 className="ac-beat-label">{beat.label}</h4>
              <p className="ac-beat-body">{beat.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          05 · PROCESS
      ════════════════════════════════════════════════════════════════ */}
      <section className="ac-section" aria-label="Process">
        <div className="ac-section-header reveal-up">
          <span className="ac-eyebrow">03 · Process</span>
          <h2 className="ac-section-title">Frame by Frame</h2>
        </div>

        <div className="ac-process-steps">
          {[
            {
              step: 'i',
              title: 'Concept Development',
              body: 'Mood boards, reference decks, and editorial research across the entire Assassin\'s Creed franchise to understand the visual grammar of the universe.',
            },
            {
              step: 'ii',
              title: 'Visual References',
              body: 'Pulling from cinematic title sequences, game cinematics, and editorial photography to establish a tone of controlled tension and historical gravity.',
            },
            {
              step: 'iii',
              title: 'Motion Exploration',
              body: 'Multiple animation passes — testing timing, easing curves, and the weight of each transition. The slash needed to feel earned, not just fast.',
            },
            {
              step: 'iv',
              title: 'Sound Design',
              body: 'The audio layer was treated as an equal creative partner — the orchestral build, the atmospheric silence before the mark, and the single impact.',
            },
            {
              step: 'v',
              title: 'Editing & Polish',
              body: 'Frame-by-frame colour grading, motion blur calibration, and final render passes to achieve the desaturated, high-contrast cinematic look.',
            },
          ].map((s) => (
            <div key={s.step} className="ac-process-item reveal-up">
              <span className="ac-process-num">{s.step}</span>
              <div className="ac-process-content">
                <h4 className="ac-process-title">{s.title}</h4>
                <p className="ac-process-body">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          06 · TRAILER — centrepiece
      ════════════════════════════════════════════════════════════════ */}
      <section className="ac-section ac-trailer-section" aria-label="Full trailer">
        <div className="ac-section-header ac-trailer-header reveal-up">
          <span className="ac-eyebrow">Final Sequence · The Full Animation</span>
          <h2 className="ac-section-title ac-trailer-title">The Complete Sequence</h2>
          <p className="ac-trailer-sub">0:19 · Complete Lockup</p>
        </div>

        <div className="ac-video-wrap ac-trailer-wrap reveal-up">
          <video
            ref={trailerRef}
            className="ac-video"
            src={TRAILER_URL}
            muted
            loop
            playsInline
            preload="metadata"
            controls
            disablePictureInPicture
            aria-label="Assassin's Creed full animation trailer"
          />
          <div className="ac-video-caption">
            <span className="ac-video-cap-left">After Effects · 4K · 24FPS</span>
            <span className="ac-video-cap-right">Final Sequence</span>
          </div>
        </div>

        <p className="ac-video-note reveal-up">
          The complete sequence from the drifting HUD fog of the loading screen
          through to the dust-streaked slash and the finished Assassin's Creed lockup.
        </p>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          07 · OUTCOME
      ════════════════════════════════════════════════════════════════ */}
      <section className="ac-section ac-section--dark" aria-label="Outcome">
        <div className="ac-section-header reveal-up">
          <span className="ac-eyebrow">04 · Outcome</span>
          <h2 className="ac-section-title">The Mark, Finished</h2>
        </div>

        <p className="ac-body-wide reveal-up">
          The goal was to create a trailer that doesn't just showcase the animation
          it sparks curiosity and excitement for the Assassin's Creed universe.
        </p>

        <p className="ac-body-wide reveal-up">
          I hope it delivers the adrenaline it's aiming for.
        </p>

        <blockquote className="ac-quote reveal-up">
          "The most powerful moments are often the ones where nothing moves —
          a held frame, a breath before the cut."
        </blockquote>

        {/* Craft stats */}
        <div className="ac-stats reveal-up">
          {[
            { value: '4K',      label: 'Render Resolution' },
            { value: '24fps',   label: 'Frame Rate' },
            { value: '0:19',    label: 'Final Runtime' },
            { value: '100%',    label: 'Original Artwork' },
          ].map((stat) => (
            <div key={stat.value} className="ac-stat-item">
              <span className="ac-stat-value">{stat.value}</span>
              <span className="ac-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          08 · CREDITS
      ════════════════════════════════════════════════════════════════ */}
      <section className="ac-credits reveal-up" aria-label="Credits">
        <div className="ac-credits-inner">
          <div className="ac-credits-rule" aria-hidden="true" />
          <p className="ac-credits-title">Assassin's Creed — Where the Journey Begins</p>
          <div className="ac-credits-rows">
            <div className="ac-credits-row">
              <span className="ac-credits-role">Concept, Design & Animation</span>
              <span className="ac-credits-name">Vaibhav Khule</span>
            </div>
            <div className="ac-credits-row">
              <span className="ac-credits-role">Software</span>
              <span className="ac-credits-name">Adobe After Effects · Premiere Pro</span>
            </div>
            <div className="ac-credits-row">
              <span className="ac-credits-role">Specification</span>
              <span className="ac-credits-name">4K · 24fps · 10-bit</span>
            </div>
            <div className="ac-credits-row">
              <span className="ac-credits-role">Year</span>
              <span className="ac-credits-name">2026</span>
            </div>
          </div>
          <div className="ac-credits-rule" aria-hidden="true" />
          <p className="ac-credits-copy">
            Work · Case Study · Showreel Piece · 2026
          </p>
          <Link to="/" className="ac-back-bottom" aria-label="Back to portfolio">
            <span aria-hidden="true">←</span> Back to Selected Works
          </Link>
        </div>
      </section>

    </div>
  );
}
