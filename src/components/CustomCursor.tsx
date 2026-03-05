import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const trail = trailRef.current;
    if (!cursor || !trail) return;

    const onMove = (e: MouseEvent) => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.15, ease: "power2.out" });
      gsap.to(trail, { x: e.clientX, y: e.clientY, duration: 0.4, ease: "power2.out" });
    };

    const onEnterInteractive = () => {
      gsap.to(cursor, { scale: 2.5, opacity: 0.6, duration: 0.3 });
      gsap.to(trail, { scale: 2, opacity: 0.3, duration: 0.3 });
    };

    const onLeaveInteractive = () => {
      gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3 });
      gsap.to(trail, { scale: 1, opacity: 0.4, duration: 0.3 });
    };

    window.addEventListener("mousemove", onMove);

    const addHoverListeners = () => {
      document.querySelectorAll("a, button, .cursor-pointer, .btn-glow, .btn-glow-purple").forEach((el) => {
        el.addEventListener("mouseenter", onEnterInteractive);
        el.addEventListener("mouseleave", onLeaveInteractive);
      });
    };

    addHoverListeners();
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{
          background: "hsl(var(--neon-blue))",
          boxShadow: "0 0 12px hsla(var(--neon-blue), 0.8), 0 0 30px hsla(var(--neon-blue), 0.4)",
        }}
      />
      <div
        ref={trailRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 opacity-40 hidden md:block"
        style={{
          border: "1px solid hsla(var(--neon-blue), 0.5)",
          background: "hsla(var(--neon-blue), 0.05)",
        }}
      />
    </>
  );
};

export default CustomCursor;
