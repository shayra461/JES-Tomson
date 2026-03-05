import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";

const CatSVG = ({ flip = false }: { flip?: boolean }) => (
  <svg
    width="80"
    height="50"
    viewBox="0 0 80 50"
    fill="none"
    style={{ transform: flip ? "scaleX(-1)" : undefined }}
  >
    <ellipse cx="40" cy="35" rx="22" ry="12" fill="#00E0FF" opacity="0.8" />
    <circle cx="18" cy="24" r="10" fill="#00E0FF" opacity="0.85" />
    <polygon points="11,16 8,6 16,14" fill="#00E0FF" opacity="0.9" />
    <polygon points="22,14 26,5 24,16" fill="#00E0FF" opacity="0.9" />
    <circle cx="18" cy="26" r="5" fill="#0B0F1A" opacity="0.6" />
    <ellipse cx="15" cy="23" rx="2" ry="2.5" fill="#00E0FF" opacity="1">
      <animate attributeName="opacity" values="1;0.2;1" dur="3s" repeatCount="indefinite" />
    </ellipse>
    <ellipse cx="21" cy="23" rx="2" ry="2.5" fill="#00E0FF" opacity="1">
      <animate attributeName="opacity" values="1;0.2;1" dur="3s" begin="0.2s" repeatCount="indefinite" />
    </ellipse>
    <ellipse cx="15" cy="23" rx="3" ry="3.5" fill="#00E0FF" opacity="0.2" />
    <ellipse cx="21" cy="23" rx="3" ry="3.5" fill="#00E0FF" opacity="0.2" />
    <path d="M62,32 Q72,20 74,12 Q76,8 72,10" stroke="#00E0FF" strokeWidth="3" fill="none" opacity="0.7" strokeLinecap="round" />
    <line x1="28" y1="44" x2="24" y2="50" stroke="#00E0FF" strokeWidth="2.5" opacity="0.7" strokeLinecap="round" />
    <line x1="35" y1="46" x2="38" y2="50" stroke="#00E0FF" strokeWidth="2.5" opacity="0.7" strokeLinecap="round" />
    <line x1="48" y1="46" x2="44" y2="50" stroke="#00E0FF" strokeWidth="2.5" opacity="0.7" strokeLinecap="round" />
    <line x1="54" y1="44" x2="58" y2="50" stroke="#00E0FF" strokeWidth="2.5" opacity="0.7" strokeLinecap="round" />
  </svg>
);

const animations = [
  // Run across top
  (el: HTMLDivElement) => {
    const startLeft = Math.random() > 0.5;
    const y = 60 + Math.random() * 120;
    gsap.set(el, { x: startLeft ? -100 : window.innerWidth + 100, y, opacity: 1 });
    return gsap.to(el, {
      x: startLeft ? window.innerWidth + 100 : -100,
      duration: 2.5 + Math.random(),
      ease: "power1.inOut",
      onComplete: () => gsap.set(el, { opacity: 0 }),
    });
  },
  // Jump arc across middle
  (el: HTMLDivElement) => {
    const startLeft = Math.random() > 0.5;
    const midY = 200 + Math.random() * 300;
    gsap.set(el, { x: startLeft ? -100 : window.innerWidth + 100, y: midY, opacity: 1 });
    const tl = gsap.timeline();
    tl.to(el, {
      x: window.innerWidth / 2,
      y: midY - 150,
      duration: 0.8,
      ease: "power2.out",
    });
    tl.to(el, {
      x: startLeft ? window.innerWidth + 100 : -100,
      y: midY + 50,
      duration: 0.8,
      ease: "power2.in",
      onComplete: () => gsap.set(el, { opacity: 0 }),
    });
    return tl;
  },
  // Quick dash across bottom
  (el: HTMLDivElement) => {
    const y = window.innerHeight - 80 - Math.random() * 100;
    gsap.set(el, { x: -100, y, opacity: 1 });
    return gsap.to(el, {
      x: window.innerWidth + 100,
      duration: 1.8,
      ease: "power1.in",
      onComplete: () => gsap.set(el, { opacity: 0 }),
    });
  },
];

const CatCharacter = () => {
  const catRef = useRef<HTMLDivElement>(null);
  const [flip, setFlip] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const triggerAnimation = useCallback(() => {
    if (!catRef.current) return;
    const idx = Math.floor(Math.random() * animations.length);
    setFlip(Math.random() > 0.5);
    animations[idx](catRef.current);
  }, []);

  useEffect(() => {
    const scheduleNext = () => {
      const delay = 20000 + Math.random() * 20000;
      timeoutRef.current = setTimeout(() => {
        triggerAnimation();
        scheduleNext();
      }, delay);
    };

    // First appearance after 5-8 seconds so user sees it
    timeoutRef.current = setTimeout(() => {
      triggerAnimation();
      scheduleNext();
    }, 5000 + Math.random() * 3000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [triggerAnimation]);

  return (
    <div
      ref={catRef}
      className="fixed pointer-events-none z-[100] opacity-0"
      style={{
        filter: "drop-shadow(0 4px 8px rgba(0,224,255,0.4)) drop-shadow(0 0 20px rgba(0,224,255,0.2))",
      }}
    >
      <CatSVG flip={flip} />
    </div>
  );
};

export default CatCharacter;
