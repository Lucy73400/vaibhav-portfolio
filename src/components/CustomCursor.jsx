import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    let rx = 0;
    let ry = 0;
    let currentMx = 0;
    let currentMy = 0;
    let rafId = null;

    const handleMouseMove = (e) => {
      currentMx = e.clientX;
      currentMy = e.clientY;
      // Dot snaps immediately, centered via CSS translate(-50%, -50%)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(calc(${currentMx}px - 50%), calc(${currentMy}px - 50%), 0)`;
      }
    };

    const animateRing = () => {
      rx += (currentMx - rx) * 0.14;
      ry += (currentMy - ry) * 0.14;
      if (ringRef.current) {
        // Ring also centered via CSS translate(-50%, -50%), so offset by half its size
        ringRef.current.style.transform = `translate3d(calc(${rx}px - 50%), calc(${ry}px - 50%), 0)`;
      }
      rafId = requestAnimationFrame(animateRing);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(animateRing);

    // Setup interactive hover states
    const addedListeners = new WeakMap();

    const setupHovers = () => {
      const targets = document.querySelectorAll('a, button, .interactive-card, .selected-image-container, .vis-play');

      const handleMouseEnter = () => {
        if (ringRef.current) {
          ringRef.current.style.width = '64px';
          ringRef.current.style.height = '64px';
          ringRef.current.style.borderColor = 'rgba(200, 187, 168, 0.95)';
          ringRef.current.style.backgroundColor = 'rgba(200, 187, 168, 0.05)';
        }
        if (dotRef.current) {
          dotRef.current.style.opacity = '0';
          dotRef.current.style.transform = `translate3d(calc(${currentMx}px - 50%), calc(${currentMy}px - 50%), 0) scale(0)`;
        }
      };

      const handleMouseLeave = () => {
        if (ringRef.current) {
          ringRef.current.style.width = '32px';
          ringRef.current.style.height = '32px';
          ringRef.current.style.borderColor = 'rgba(255, 255, 255, 0.45)';
          ringRef.current.style.backgroundColor = 'transparent';
        }
        if (dotRef.current) {
          dotRef.current.style.opacity = '1';
          dotRef.current.style.transform = `translate3d(calc(${currentMx}px - 50%), calc(${currentMy}px - 50%), 0) scale(1)`;
        }
      };

      targets.forEach((t) => {
        if (!addedListeners.has(t)) {
          t.addEventListener('mouseenter', handleMouseEnter);
          t.addEventListener('mouseleave', handleMouseLeave);
          addedListeners.set(t, { handleMouseEnter, handleMouseLeave });
        }
      });
    };

    setupHovers();

    const observer = new MutationObserver(() => setupHovers());
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div id="cur" ref={dotRef} aria-hidden="true"></div>
      <div id="ring" ref={ringRef} aria-hidden="true"></div>
    </>
  );
}
