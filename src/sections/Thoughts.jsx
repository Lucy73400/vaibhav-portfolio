import { useEffect, useRef } from 'react';

export default function Thoughts() {
  const thoughtsRef = useRef(null);

  useEffect(() => {
    if (!thoughtsRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, { threshold: 0.15 });

    observer.observe(thoughtsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="creative-thoughts" className="reveal-up" ref={thoughtsRef}>
      <div className="thoughts-content">
        <span className="thought-symbol">✦</span>
        <blockquote className="thought-quote">
          "I don't chase perfection.<br />I chase moments that stay with people."
        </blockquote>
        <p className="thought-sub">— Vaibhav</p>
      </div>
    </section>
  );
}
