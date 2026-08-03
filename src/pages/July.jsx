import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// ─── Article data ─────────────────────────────────────────────────────────────
const ARTICLE = {
  title: 'July Was a Room Without Windows',
  meta: 'Personal · July 2026',
  tags: ['Personal', 'Life', 'Reflection', 'Survival'],
};

// ─── Scroll reveal helper ────────────────────────────────────────────────     
function useRevealObserver(containerRef) {
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('revealed');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    const els = containerRef.current.querySelectorAll('.reveal-up');
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [containerRef]);
}

// ─── Article Page ─────────────────────────────────────────────────────────────
export default function JulyWasARoomWithoutWindows() {
  const heroRef = useRef(null);
  const articleRef = useRef(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Animate hero in
  useEffect(() => {
    if (!heroRef.current) return;
    const t = setTimeout(() => {
      heroRef.current.classList.add('animate-in');
    }, 120);
    return () => clearTimeout(t);
  }, []);

  useRevealObserver(articleRef);

  return (
    <>
      {/* ── Article Hero ─────────────────────────────────────────────── */}
      <section className="article-hero" aria-label="Article header">
        <div className="hero-bg" aria-hidden="true" />
        <div className="article-hero-inner" ref={heroRef}>
          <Link to="/journal" className="article-back-link" aria-label="Back to Journal">
            <span aria-hidden="true">←</span> Journal
          </Link>
          <div className="article-hero-meta">{ARTICLE.meta}</div>
          <h1 className="article-hero-title">{ARTICLE.title}</h1>
          <div className="article-hero-divider" aria-hidden="true" />
        </div>
      </section>

      {/* ── Article Body ──────────────────────────────────────────────── */}
      <article
        className="article-body"
        ref={articleRef}
        aria-label="Article: July Was a Room Without Windows"
      >
        <div className="article-column">

          <p className="article-para reveal-up">
            I used to think difficult months came with storms.
          </p>

          <p className="article-para reveal-up">
            Now I think they arrive quietly, and by the time you notice, everything inside you has already changed.
          </p>

          <p className="article-para reveal-up">
            July started with a message that came late at night. Nothing dramatic happened around me, but something inside me just... stopped. The next morning I had an important exam, and I remember sitting there, answering questions while trying to convince myself that I was okay.
          </p>

          <p className="article-standalone reveal-up">
            That was the first thing July taught me: life doesn’t pause when your heart is heavy. The world keeps moving, and somehow you’re expected to move with it.
          </p>

          <p className="article-para reveal-up">
            I also thought that when things got really bad, I would know where to go. I believed there would always be a person, or a place, where I could put down everything I was carrying.
          </p>

          <p className="article-para reveal-up">
            I was wrong.
          </p>

          <p className="article-para reveal-up">
            Sometimes you go back to a place that once felt safe, and it no longer exists in the way you remember it.
          </p>

          <p className="article-para reveal-up">
            These days, I spend most of my time in bed. I tell myself I’m just resting, but the hours keep slipping away. My thoughts don’t stay still for long. Panic attacks have started visiting without warning, and when they do, it feels like my own mind is turning against me. The more I try to get up, the deeper I seem to sink into the mattress.
          </p>

          <p className="article-para reveal-up">
            From the outside, my days probably look normal. I still reply to messages. I still try to study. I still laugh sometimes. But inside, I feel tired in a way that sleep doesn’t fix.
          </p>

          <p className="article-para reveal-up">
            And somewhere in the middle of all of this, I realised something I had never admitted before.
          </p>

          <p className="article-standalone reveal-up">
            I have spent a long time looking for a place where I don’t have to be strong.
          </p>

          <p className="article-para reveal-up">
            I haven’t found that place yet.
          </p>

          <p className="article-para reveal-up">
            Maybe I will. Maybe I’ll have to build it myself.
          </p>

          <p className="article-para reveal-up">
            For now, I’m just trying to make it through one day at a time.
          </p>

          <p className="article-closing reveal-up">
            If July left me with anything, it was this: sometimes surviving doesn’t look brave. Sometimes it looks like lying in bed, trying to quiet your thoughts, and hoping that tomorrow feels a little lighter than today.
          </p>

          {/* ── Tags ──────────────────────────────────────────────────── */}
          <div className="article-tags reveal-up" aria-label="Article tags">
            {ARTICLE.tags.map((tag) => (
              <span key={tag} className="article-tag">{tag}</span>
            ))}
          </div>

          {/* ── Back link ─────────────────────────────────────────────── */}
          <div className="article-footer-nav reveal-up">
            <Link to="/journal" className="article-back-bottom" aria-label="Back to Journal">
              <span aria-hidden="true">←</span> Back to Journal
            </Link>
          </div>

        </div>
      </article>
    </>
  );
}