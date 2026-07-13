import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// ─── Article data ─────────────────────────────────────────────────────────────
const ARTICLE = {
  title: 'One Good Week',
  meta: 'Personal · July 2026',
  tags: ['Personal', 'Life', 'Reflection'],
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
export default function OneGoodWeek() {
  const heroRef    = useRef(null);
  const articleRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

      <article
        className="article-body"
        ref={articleRef}
        aria-label="Article: One Good Week"
      >
        <div className="article-column">

          <p className="article-para reveal-up">
            After the last ten days, I needed this one.
            This week showed up differently — quieter, warmer, the kind that does not announce itself but leaves you feeling like something good happened without you trying too hard to make it happen.
          </p>

          <h2 className="article-subheading reveal-up">The Consultant</h2>
          <p className="article-para reveal-up">
            I met the new consultant my sir had recommended — the one we talked about last time. Or maybe I mentioned him. Honestly, I do not remember. My memory has been doing its own thing lately.
            Either way, I met him. And something clicked immediately. He is a friend of my sir, and he carries himself with a kind of calm confidence that makes you think: this person knows what he is doing. What sealed it for me — he is from the same region I grew up in. There is a particular kind of trust that comes with that. You do not have to explain certain things. You just understand each other. I am going with him.
          </p>

          <h2 className="article-subheading reveal-up">The Temple, The Wait, and Nature Impeccable Timing</h2>
          <div className="article-image reveal-up">
            <a href="https://ibb.co/jPgysShc"><img src="https://i.ibb.co/NdZ9bMx8/Snapchat-1152783091.jpg" alt="Temple" border="0" /></a>
          </div>
          <p className="article-para reveal-up">
            The same day, it was my brother birthday. His ritual every year: visit a temple. Simple, grounded, consistent.
            We reached at 3 in the afternoon, which is exactly when temples decide to take a nap. Closed. Reopening at 3:30. So we waited — three of us standing there, phones in hand, doing absolutely nothing productive. 3:30 came. The temple was still thinking about it. 3:40. Still thinking. The weather started doing that thing where it looks suspicious. Grey. Humid. Plotting something.
            We decided to leave.
            The moment we stepped out — and I mean the exact moment, as if the sky had been watching us specifically and waiting for its cue — it started raining. Lightly. Just a polite little drizzle that said: you waited forty minutes and left two minutes early. noted. Not a storm. Not a downpour. Just enough to make us feel personally selected. We laughed and kept moving.
            That evening I met my sir for chai. He already knew I had met his friend and he was genuinely happy. He said: Vaibhav, I am very happy that you met him. We had tea, talked a little, and went our separate ways. Some evenings do not need to be long to feel complete.
          </p>

          <p className="article-para reveal-up">
            [PHOTO 1 — here. The good-week energy of the first half: the outing, the chai, the ease of it.]
          </p>

          <h2 className="article-subheading reveal-up">The Laptop Chronicles</h2>
          <p className="article-para reveal-up">
            Right after tea, I met my friend. He was visibly upset. His laptop had decided to stop cooperating — stuck in a reboot loop, all important data locked inside.
            We went to a nearby repair shop. The technician looked at the laptop for approximately forty-five seconds and declared with full confidence: SSD is corrupted.
            My friend and I looked at each other.
            No words. No gestures. Just a look. Pure telepathy. Because here is the thing — we are both people who have spent years in college fixing laptops. Reinstalling Windows at midnight. Troubleshooting drivers at 2 AM. We have seen things. This specific error we had not personally dealt with before, which is the only reason we were at a repair shop in the first place. But that forty-five second diagnosis, delivered before a single diagnostic was run, told us everything we needed to know. We left.
            Next morning, we went to the regular technician — the one we should have gone to first. My friend was direct: I do not care about fixing it, I want the data back. The technician worked on it, confirmed the drive was readable, then hit a wall: all his pendrives were full and the data was too large.
            One person could fix this. My best friend. She has an external hard disk.
            I called her. She said no. I spent ten minutes convincing her. She said fine. The hard disk arrived but it was already late, so we went home and planned for the next day.
            The next day I could not make it. My friend went alone.
            The day after, I went to his place fully prepared to help — and walked in without my laptop, which was the one thing I was supposed to bring. We spent 220 rupees in petrol figuring that out. The repair is still ongoing. I have to check up on him.
          </p>

          <h2 className="article-subheading reveal-up">Study Days</h2>
          <p className="article-para reveal-up">
            In between all of this: IELTS preparation. Notes. Practice sections. That particular kind of overthinking where you sit with the material and quietly wonder if your brain has simply decided to retire early. It has not. It is just slow sometimes. I am used to it.
          </p>

          <h2 className="article-subheading reveal-up">Mr. Nobody and the Whiteboard</h2>
          <div className="article-image reveal-up">
            <a href="https://ibb.co/yFyCbwvh"><img src="https://i.ibb.co/Kxqg3M4N/IMG-6262.jpg" alt="Whiteboard" border="0" /></a>
          </div>
          <p className="article-para reveal-up">
            One evening, my other friend came over — the one I call my intellectual thoughts buddy. He had been buried in work all week and I wanted to catch up, let him breathe a little.
            I had been watching a film called Mr. Nobody. If you have not seen it — it is about time, choices, parallel universes, and every possible version of a life unfolding simultaneously. The kind of film that makes your brain itch for days.
            There is a whiteboard at my flat. I do not entirely know why I did this, but I started mapping the film on it. Drawing timelines. Connecting the threads between universes. Getting it out of my head and onto a surface — that is a habit I have. Writing it down makes the thinking sharper. It makes everything feel less like noise and more like something I actually understand.
            What started as me explaining a movie became something else entirely. As it always does with us. Without noticing, we drifted into talking about life. Not the film anymore. Choices. Direction. What it means to keep going when you are not sure where you are headed. We are both drawn to that kind of conversation and we never have to force our way there — we just arrive.
            We spent a good amount of time together. I wished him well for Monday and left.
          </p>

          <p className="article-para reveal-up">
            [PHOTO 2 — here. The whiteboard, the evening, that kind of energy that only certain friendships have.]
          </p>

          <h2 className="article-subheading reveal-up">Last Stop: Best Friend, Then Shawarma</h2>
          <p className="article-para reveal-up">
            I went straight to my best friend place. She was not home. I waited outside for a while and just as I was about to leave, she came back. She was upset about something. I am going to stop here — some things stay between people.
            But we spent good time. We laughed. We talked about the things that needed to be said. We gossiped, because that is part of it too. At some point I looked at the time: two hours to midnight.
            I said goodbye and went to find dinner.
            I found shawarma.
            Listen — I had been wanting shawarma for days. I got on the bike, rode home fast, and I will not pretend I was not singing out loud the entire way. Nobody was watching. It was late. I had earned it.
            I got home. I had dinner. That was the end of the week.
          </p>

          <h2 className="article-subheading reveal-up">What This Week Left Me With</h2>
          <p className="article-para reveal-up">
            Life is like a train.
            We spend so much time talking about changing direction, switching tracks, finding a new path. But here is what I keep coming back to: before you can change tracks, the train has to be moving. A stopped train cannot switch anything. A moving train can.
            It does not matter if you are going slow. It does not matter if the next station is unclear. What matters is movement. Keep the train going. The rest figures itself out.
            Keep moving. That is all.
          </p>

          <div className="article-tags reveal-up" aria-label="Article tags">
            {ARTICLE.tags.map((tag) => (
              <span key={tag} className="article-tag">{tag}</span>
            ))}
          </div>

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