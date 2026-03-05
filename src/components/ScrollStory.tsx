import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import storyBg1 from "@/assets/story-bg-1.jpg";
import storyBg2 from "@/assets/story-bg-2.jpg";
import storyBg3 from "@/assets/story-bg-3.jpg";
import storyBg4 from "@/assets/story-bg-4.jpg";
import storyBg5 from "@/assets/story-bg-5.jpg";

gsap.registerPlugin(ScrollTrigger);

interface StorySection {
  lines: { text: string; className?: string }[];
  bgImage: string;
  chapter: string;
  overlayColor: string;
  accentColor: string;
}

const sections: StorySection[] = [
  {
    chapter: "CHAPTER I",
    lines: [
      { text: "Humanity expanded", className: "text-white story-text-shadow" },
      { text: "beyond Earth.", className: "text-primary text-glow" },
      { text: "But something ancient", className: "text-white story-text-shadow" },
      { text: "was already watching.", className: "text-primary text-glow" },
    ],
    bgImage: storyBg1,
    overlayColor: "rgba(11,15,26,0.55)",
    accentColor: "#00E0FF",
  },
  {
    chapter: "CHAPTER II",
    lines: [
      { text: "Predators travel", className: "text-white story-text-shadow" },
      { text: "between stars,", className: "text-destructive story-text-shadow-red" },
      { text: "searching for new worlds", className: "text-white story-text-shadow" },
      { text: "to consume.", className: "text-destructive story-text-shadow-red" },
    ],
    bgImage: storyBg2,
    overlayColor: "rgba(11,15,26,0.45)",
    accentColor: "#FF3B3B",
  },
  {
    chapter: "CHAPTER III",
    lines: [
      { text: "But one species", className: "text-white story-text-shadow" },
      { text: "on Earth heard them first.", className: "text-white story-text-shadow" },
      { text: "Cats.", className: "text-primary text-glow font-bold !text-5xl md:!text-8xl" },
    ],
    bgImage: storyBg3,
    overlayColor: "rgba(11,15,26,0.35)",
    accentColor: "#00E0FF",
  },
  {
    chapter: "CHAPTER IV",
    lines: [
      { text: "They can think.", className: "text-white text-glow-purple" },
      { text: "They can speak.", className: "text-white text-glow-purple" },
      { text: "And they know the invasion", className: "text-white story-text-shadow" },
      { text: "is coming.", className: "text-primary text-glow font-bold" },
    ],
    bgImage: storyBg4,
    overlayColor: "rgba(11,15,26,0.4)",
    accentColor: "#7B61FF",
  },
];

const StoryBlock = ({ section, index }: { section: StorySection; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const chapterRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      // Parallax background
      if (bgRef.current) {
        gsap.fromTo(bgRef.current,
          { y: -80, scale: 1.15 },
          { y: 80, scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: 1 } }
        );
      }

      // Chapter label
      if (chapterRef.current) {
        gsap.fromTo(chapterRef.current,
          { opacity: 0, letterSpacing: "0.5em", x: -40 },
          { opacity: 1, letterSpacing: "0.3em", x: 0, duration: 1.2, ease: "power3.out",
            scrollTrigger: { trigger: ref.current, start: "top 75%", toggleActions: "play none none none" } }
        );
      }

      // Accent line
      if (lineRef.current) {
        gsap.fromTo(lineRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 1.5, ease: "power3.inOut",
            scrollTrigger: { trigger: ref.current, start: "top 70%", toggleActions: "play none none none" } }
        );
      }

      // Text lines stagger
      textRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(el,
          { opacity: 0, y: 60, filter: "blur(6px)", rotateX: 15 },
          { opacity: 1, y: 0, filter: "blur(0px)", rotateX: 0,
            duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
            delay: i * 0.15 }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, [index]);

  return (
    <div ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Full-bleed background image with parallax */}
      <div ref={bgRef} className="absolute inset-[-80px] z-0">
        <img
          src={section.bgImage}
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 z-[1]" style={{ background: section.overlayColor }} />

      {/* Gradient edges for seamless blend */}
      <div className="absolute inset-0 z-[2]" style={{
        background: `linear-gradient(180deg, hsl(222 40% 7%) 0%, transparent 20%, transparent 80%, hsl(222 40% 7%) 100%)`
      }} />

      {/* Side vignette */}
      <div className="absolute inset-0 z-[2]" style={{
        background: `radial-gradient(ellipse at center, transparent 40%, hsl(222 40% 7% / 0.7) 100%)`
      }} />

      {/* Animated accent line */}
      <div ref={lineRef} className="absolute top-[15%] left-1/2 -translate-x-1/2 z-[5] origin-left"
        style={{ width: 120, height: 2, background: `linear-gradient(90deg, transparent, ${section.accentColor}, transparent)`, transformOrigin: "center" }} />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        {/* Chapter label */}
        <span ref={chapterRef} className="block font-heading text-xs md:text-sm tracking-[0.3em] uppercase mb-8 opacity-0"
          style={{ color: section.accentColor, textShadow: `0 0 15px ${section.accentColor}` }}>
          {section.chapter}
        </span>

        {/* Story text — with backdrop for readability */}
        <div className="space-y-2 md:space-y-3 py-8 px-6 rounded-2xl" style={{ perspective: "800px", background: "rgba(11,15,26,0.35)", backdropFilter: "blur(4px)" }}>
          {section.lines.map((line, i) => (
            <p key={i}
              ref={(el) => { textRefs.current[i] = el; }}
              className={`text-2xl md:text-5xl lg:text-6xl font-heading font-semibold leading-tight opacity-0 ${line.className || ""}`}
            >
              {line.text}
            </p>
          ))}
        </div>

        {/* Decorative bottom element */}
        <div className="mt-12 flex items-center justify-center gap-3 opacity-30">
          <div className="w-2 h-2 rounded-full" style={{ background: section.accentColor }} />
          <div className="w-8 h-px" style={{ background: section.accentColor }} />
          <div className="w-2 h-2 rounded-full" style={{ background: section.accentColor }} />
        </div>
      </div>
    </div>
  );
};

const ScrollStory = () => {
  const revealRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const bgRevealRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!revealRef.current) return;
    const ctx = gsap.context(() => {
      // Parallax bg
      if (bgRevealRef.current) {
        gsap.fromTo(bgRevealRef.current,
          { y: -60, scale: 1.1 },
          { y: 60, scrollTrigger: { trigger: revealRef.current, start: "top bottom", end: "bottom top", scrub: 1 } }
        );
      }

      if (subtitleRef.current) {
        gsap.fromTo(subtitleRef.current,
          { opacity: 0, letterSpacing: "1em" },
          { opacity: 1, letterSpacing: "0.4em", duration: 1.5, ease: "power3.out",
            scrollTrigger: { trigger: revealRef.current, start: "top 60%", toggleActions: "play none none none" } }
        );
      }

      if (titleRef.current) {
        gsap.fromTo(titleRef.current,
          { opacity: 0, scale: 0.7, filter: "blur(15px)" },
          { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.5, ease: "power3.out",
            scrollTrigger: { trigger: revealRef.current, start: "top 55%", toggleActions: "play none none none" } }
        );
      }

      if (descRef.current) {
        gsap.fromTo(descRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1, delay: 0.6, ease: "power2.out",
            scrollTrigger: { trigger: revealRef.current, start: "top 55%", toggleActions: "play none none none" } }
        );
      }
    }, revealRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="relative">
      {sections.map((section, i) => (
        <StoryBlock key={i} section={section} index={i} />
      ))}

      {/* Series reveal */}
      <div ref={revealRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div ref={bgRevealRef} className="absolute inset-[-60px] z-0">
          <img src={storyBg5} alt="" className="w-full h-full object-cover" loading="lazy" />
        </div>
        <div className="absolute inset-0 z-[1]" style={{ background: "rgba(11,15,26,0.6)" }} />
        <div className="absolute inset-0 z-[2]" style={{
          background: `linear-gradient(180deg, hsl(222 40% 7%) 0%, transparent 25%, transparent 75%, hsl(222 40% 7%) 100%)`
        }} />
        <div className="absolute inset-0 z-[2]" style={{
          background: "radial-gradient(ellipse at center, transparent 30%, hsl(222 40% 7% / 0.8) 100%)"
        }} />

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <span ref={subtitleRef} className="block font-heading text-xs md:text-sm tracking-[0.4em] uppercase text-secondary mb-6 opacity-0">
            The Saga Begins
          </span>
          <h2 ref={titleRef}
            className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-primary text-glow mb-8 opacity-0">
            The Murkatz War
          </h2>
          <p ref={descRef} className="text-lg md:text-xl text-muted-foreground leading-relaxed opacity-0 max-w-2xl mx-auto">
            A science fiction trilogy about survival, telepathic cats, alien predators, and the fragile alliance that may save Earth.
          </p>

          {/* Decorative frame */}
          <div className="mt-12 flex items-center justify-center gap-4">
            <div className="w-16 h-px bg-primary/40" />
            <div className="w-3 h-3 rotate-45 border border-primary/60" />
            <div className="w-16 h-px bg-primary/40" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollStory;
