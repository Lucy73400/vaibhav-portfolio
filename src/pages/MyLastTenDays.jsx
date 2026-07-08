import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// ─── Article data ─────────────────────────────────────────────────────────────
const ARTICLE = {
  title: 'My Last Ten Days',
  meta: 'Personal · 8 Jul 2026',
  tags: ['Personal', 'Life', 'Process', 'Reflection'],
};

// ─── Scroll reveal helper ─────────────────────────────────────────────────────
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
export default function MyLastTenDays() {
  const heroRef    = useRef(null);
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
        aria-label="Article: My Last Ten Days"
      >
        <div className="article-column">

          <p className="article-para reveal-up">
            I wasn't ready. Not the way you're supposed to be ready — calm, rested, confident.
            I came to Pune knowing what was at stake, and the closer the date got, the louder
            everything became.
          </p>

          <p className="article-para reveal-up">
            The exam was on the 3rd of July. My birthday.
          </p>

          <p className="article-para reveal-up">
            The night before, I made a decision I'd probably make again: I didn't sleep. I knew
            if I lay down, I wouldn't wake until 8:15, and 8:15 was my reporting time. So I stayed
            up. Books open, notes spread across the desk, the city quiet outside. Around 3 AM I gave
            myself a half-hour break.
          </p>

          <p className="article-para reveal-up">
            I closed my eyes for thirty minutes.
          </p>

          <p className="article-para reveal-up">
            Then — clank.
          </p>

          <p className="article-para reveal-up">
            My glasses frame snapped. Completely. I sat up and just stared at the two pieces in my
            hand and said, out loud to no one, <em>fuck no</em>. Not before my exam.
          </p>

          <p className="article-para reveal-up">
            I searched the entire apartment for glue. Found nothing. So I did what any reasonable
            person does at 3 AM the night before a major exam — I ordered fast glue on delivery. It
            arrived in twenty minutes. I went downstairs to collect it, in the rain, in my slippers.
            Came back up. Fixed the frame. Went back to studying.
          </p>

          <p className="article-para reveal-up">
            By 4 AM I started packing my bag. By 6 I was out the door — raincoat on, helmet on —
            because my mum had asked me to visit a temple before the exam. It's a ritual. You don't
            skip it.
          </p>

          <p className="article-para reveal-up">
            Forty-five minutes to the temple. Ten minutes from there to the centre. I made it.
          </p>

          <p className="article-para reveal-up">
            I gave the exam. And somewhere between the listening section and the writing, I made a
            new friend — someone heading to Germany this September. There's something about meeting
            people on the edge of their own big decisions that makes you feel less alone in yours.
          </p>

          <p className="article-para reveal-up">
            Coming back, I met another friend. We celebrated at two places. By the time I got home,
            my head felt like something sharp was pressing from the inside. I lay down and didn't move.
          </p>

          <p className="article-para reveal-up">
            The next day, my group came together. We celebrated properly — good energy, good people,
            some blessings I needed, some gifts I didn't expect. It was a good afternoon.
          </p>

          <p className="article-para reveal-up">
            Then, around 6 PM, my phone buzzed.
          </p>

          <p className="article-standalone reveal-up">
            Your IELTS report is now available.
          </p>

          <p className="article-para reveal-up">
            My heart skipped. And kept skipping. I opened the site with the particular kind of dread
            you feel when you already half-know the answer. The score came up. Average. Not what my
            university required.
          </p>

          <p className="article-para reveal-up">
            I sat with it quietly. Didn't tell my brother — he was having a good evening, and I
            couldn't bring myself to be the thing that ended it. I told my mum instead, thinking
            I'd handle the rest tomorrow.
          </p>

          <p className="article-para reveal-up">
            She told him before I could.
          </p>

          <p className="article-para reveal-up">
            He was furious. The kind of furious that comes from someone who cares too much and
            doesn't know what to do with it. He said what he needed to say. I was angry too — at
            him, and more honestly, at myself. That evening, my phone screen cracked. Then it died
            completely. Just switched off and stayed off.
          </p>

          <p className="article-standalone reveal-up">
            I was phoneless.
          </p>

          <p className="article-para reveal-up">
            Then came the red alert. Our area went under — heavy rainfall, shops closed, at least
            two days. The electricity went with it. The water tanker that usually comes on schedule
            didn't make it through the traffic and the rain. So I sat in an apartment with no phone,
            no light, no water, and a result I was still processing.
          </p>

          <p className="article-para reveal-up">
            The only thing that worked was my iPad. I could still reach the people who mattered, on
            Telegram. That was enough to keep me from completely unravelling.
          </p>

          <p className="article-para reveal-up">
            And then — one more thing. The day before the exam, a message had come from someone I
            trusted. That person stepped back. Cleanly, quietly, as if none of it had happened. I
            didn't sleep that night. Not a single hour — not after the text, not after the glasses,
            not after the rain. I folded it all away and kept going, with a glued frame on my face
            and an alarm set for 5.
          </p>

          <p className="article-standalone reveal-up">
            Everything arrived at once. That's the only way I know how to describe those ten days.
          </p>

          <p className="article-para reveal-up">
            We went to meet one of my mentors, Sir, who said something I'd been waiting to hear:
            <em> Vaibhav, according to me — wait till January.</em> My brother, who'd been pushing
            hard, listened. Something shifted in him after that meeting. The advice landed differently
            coming from someone else.
          </p>

          <p className="article-para reveal-up">
            Yesterday, the 7th, things started coming back. Phone screen repaired. Electricity
            returned in the evening. Water came through. Small things. But after that week, they
            felt enormous.
          </p>

          <p className="article-para reveal-up">
            I keep returning to something. When everything breaks at the same time — the result, the
            phone, the power, the water, the person who left — there's a point where you stop fighting
            each individual fire and just sit in the middle of all of it. And something in that
            stillness clarifies.
          </p>

          <p className="article-para reveal-up">
            This might be the end of one version of the plan. January, a new attempt, a different
            score. Or it might be the end of something larger — a chapter closing the way chapters
            have to close before anything new is possible.
          </p>

          <p className="article-para reveal-up">
            I'm not sure yet. But I'm paying attention.
          </p>

          <p className="article-closing reveal-up">
            And that feels like a start.
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
