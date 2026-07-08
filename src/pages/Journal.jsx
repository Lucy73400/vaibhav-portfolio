import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

// ─── Journal entry data ───────────────────────────────────────────────────────
const JOURNAL_ENTRIES = [
  {
    id: 0,
    title: 'My Last Ten Days',
    date: '8 Jul 2026',
    category: 'Personal',
    excerpt:
      "I wasn't ready. Not the way you're supposed to be ready — calm, rested, confident. I came to Pune knowing what was at stake, and the closer the date got, the louder everything became.",
    slug: 'my-last-ten-days',
    published: true,
  },
  {
    id: 1,
    title: 'On Stillness and Motion',
    date: 'June 14, 2026',
    category: 'Creative Notes',
    excerpt:
      'There is a paradox at the heart of animation — the most powerful moments are often the ones where nothing moves. A held frame. A breath before the cut.',
    slug: 'on-stillness-and-motion',
    published: false,
  },
  {
    id: 2,
    title: 'What Cinema Taught Me About Colour',
    date: 'May 30, 2026',
    category: 'Film Observations',
    excerpt:
      'Every palette is a mood before it is an aesthetic. Watching old films without sound teaches you how much the colour grader is the second director.',
    slug: 'cinema-and-colour',
    published: false,
  },
  {
    id: 3,
    title: 'The Sketchbook Ritual',
    date: 'May 10, 2026',
    category: 'Behind the Scenes',
    excerpt:
      'Before any frame is rendered, before any camera rolls, there is always a pen and a notebook. The sketchbook is where the real work happens.',
    slug: 'the-sketchbook-ritual',
    published: false,
  },
  {
    id: 4,
    title: 'Sound as a Visual Language',
    date: 'April 22, 2026',
    category: 'Stories',
    excerpt:
      'I started singing before I started animating. Looking back, they are the same discipline — both about shaping invisible things into something felt.',
    slug: 'sound-as-visual-language',
    published: false,
  },
  {
    id: 5,
    title: 'On Starting Over',
    date: 'March 18, 2026',
    category: 'Reflections',
    excerpt:
      'Sometimes the bravest creative decision is deleting everything. A blank timeline is not failure — it is the first honest frame.',
    slug: 'on-starting-over',
    published: false,
  },
  {
    id: 6,
    title: 'The Architecture of a Story',
    date: 'February 4, 2026',
    category: 'Thoughts',
    excerpt:
      'Every story is a building. Some have grand facades and empty rooms. The ones that last are built from the inside out — structure first, beauty second.',
    slug: 'architecture-of-a-story',
    published: false,
  },
];

// ─── Journal Card ─────────────────────────────────────────────────────────────
function JournalCard({ entry, index }) {
  const cardRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => {
              e.target.classList.add('revealed');
            }, index * 80);
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [index]);

  const href = `/journal/${entry.slug}`;

  return (
    <article
      ref={cardRef}
      className={`journal-card reveal-up${entry.published ? ' journal-card--published' : ''}`}
      aria-label={`Journal entry: ${entry.title}`}
    >
      <div className="journal-card-meta">
        <span className="journal-card-category">{entry.category}</span>
        <time className="journal-card-date" dateTime={entry.date}>{entry.date}</time>
      </div>
      <h2 className="journal-card-title">{entry.title}</h2>
      <p className="journal-card-excerpt">{entry.excerpt}</p>
      {entry.published ? (
        <Link
          to={href}
          className="journal-card-link"
          aria-label={`Read ${entry.title}`}
        >
          Read Entry <span aria-hidden="true">→</span>
        </Link>
      ) : (
        <span className="journal-card-link journal-card-link--soon" aria-label="Coming soon">
          Coming Soon
        </span>
      )}
    </article>
  );
}

// ─── Journal Page ─────────────────────────────────────────────────────────────
export default function JournalPage() {
  const [query, setQuery] = useState('');
  const heroRef = useRef(null);

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
    // Trigger hero animation
    if (heroRef.current) {
      const timer = setTimeout(() => {
        heroRef.current.classList.add('animate-in');
      }, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  const filtered = JOURNAL_ENTRIES.filter((entry) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      entry.title.toLowerCase().includes(q) ||
      entry.category.toLowerCase().includes(q) ||
      entry.excerpt.toLowerCase().includes(q)
    );
  });

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section id="journal-hero" aria-label="Journal hero">
        <div className="hero-bg" aria-hidden="true"></div>
        <div className="journal-hero-content" ref={heroRef}>
          <span className="journal-hero-label">THE ARCHIVE</span>
          <h1 className="journal-hero-title">Journal</h1>
          <p className="journal-hero-sub">
            Thoughts, stories, ideas and observations.
          </p>
        </div>
      </section>

      {/* ── Search + Grid ────────────────────────────────────────────── */}
      <section id="journal-body" aria-label="Journal entries">
        <div className="journal-search-wrap">
          <label htmlFor="journal-search" className="sr-only">Search entries</label>
          <input
            id="journal-search"
            type="search"
            className="journal-search"
            placeholder="Search entries..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search journal entries"
          />
        </div>

        {filtered.length > 0 ? (
          <div className="journal-grid" role="list">
            {filtered.map((entry, i) => (
              <JournalCard key={entry.id} entry={entry} index={i} />
            ))}
          </div>
        ) : (
          <p className="journal-empty">No entries found for "{query}".</p>
        )}
      </section>
    </>
  );
}
