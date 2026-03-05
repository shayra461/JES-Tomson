import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";

const SurpriseMoments = () => {
  const eyesRef = useRef<HTMLDivElement>(null);
  const pawsContainerRef = useRef<HTMLDivElement>(null);

  const showEyes = useCallback(() => {
    if (!eyesRef.current) return;
    const x = 100 + Math.random() * (window.innerWidth - 200);
    const y = 100 + Math.random() * (window.innerHeight - 200);
    gsap.set(eyesRef.current, { x, y, opacity: 0 });
    gsap.to(eyesRef.current, {
      opacity: 0.7,
      duration: 1.5,
      ease: "power2.inOut",
      yoyo: true,
      repeat: 1,
      onComplete: () => gsap.set(eyesRef.current!, { opacity: 0 }),
    });
  }, []);

  const showPaws = useCallback(() => {
    if (!pawsContainerRef.current) return;
    const container = pawsContainerRef.current;
    container.innerHTML = "";
    const startX = Math.random() * (window.innerWidth - 300);
    const startY = 200 + Math.random() * (window.innerHeight - 400);

    for (let i = 0; i < 5; i++) {
      const paw = document.createElement("div");
      paw.className = "absolute";
      paw.style.left = `${startX + i * 50}px`;
      paw.style.top = `${startY + (i % 2 === 0 ? 0 : -20)}px`;
      paw.style.transform = `rotate(${-30 + Math.random() * 10}deg)`;
      paw.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="#00E0FF"><ellipse cx="12" cy="16" rx="5" ry="4" opacity="0.4"/><circle cx="7" cy="10" r="2.5" opacity="0.3"/><circle cx="17" cy="10" r="2.5" opacity="0.3"/><circle cx="10" cy="7" r="2" opacity="0.3"/><circle cx="14" cy="7" r="2" opacity="0.3"/></svg>`;
      container.appendChild(paw);

      gsap.fromTo(
        paw,
        { opacity: 0, scale: 0.5 },
        {
          opacity: 0.6,
          scale: 1,
          duration: 0.4,
          delay: i * 0.2,
          ease: "back.out(1.7)",
          onComplete: () => {
            gsap.to(paw, { opacity: 0, duration: 0.8, delay: 1 });
          },
        }
      );
    }
  }, []);

  useEffect(() => {
    const intervals: ReturnType<typeof setTimeout>[] = [];

    const scheduleEyes = () => {
      const delay = 8000 + Math.random() * 7000; // 8-15s
      intervals.push(setTimeout(() => { showEyes(); scheduleEyes(); }, delay));
    };
    const schedulePaws = () => {
      const delay = 10000 + Math.random() * 8000; // 10-18s
      intervals.push(setTimeout(() => { showPaws(); schedulePaws(); }, delay));
    };

    // First triggers - appear quickly
    intervals.push(setTimeout(showEyes, 2000 + Math.random() * 2000));
    intervals.push(setTimeout(showPaws, 4000 + Math.random() * 3000));
    scheduleEyes();
    schedulePaws();

    return () => intervals.forEach(clearTimeout);
  }, [showEyes, showPaws]);

  return (
    <>
      <div
        ref={eyesRef}
        className="fixed pointer-events-none z-[50] opacity-0"
      >
        <div className="flex gap-10">
          <div
            className="w-5 h-8 rounded-full"
            style={{
              background: "#00E0FF",
              boxShadow: "0 0 20px rgba(0,224,255,0.8), 0 0 40px rgba(0,224,255,0.4)",
            }}
          />
          <div
            className="w-5 h-8 rounded-full"
            style={{
              background: "#00E0FF",
              boxShadow: "0 0 20px rgba(0,224,255,0.8), 0 0 40px rgba(0,224,255,0.4)",
            }}
          />
        </div>
      </div>

      <div ref={pawsContainerRef} className="fixed inset-0 pointer-events-none z-[50]" />
    </>
  );
};

export default SurpriseMoments;
