import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface StorySection {
  text: string[];
  accent?: boolean;
  hasCatEyes?: boolean;
}

const sections: StorySection[] = [
  { text: ["Humanity expanded beyond Earth.", "But something ancient was already watching."] },
  { text: ["Predators travel between stars,", "searching for new worlds to consume."], accent: true },
  { text: ["But one species on Earth heard them first.", "Cats."], hasCatEyes: true },
  { text: ["They can think.", "They can speak.", "And they know the invasion is coming."], accent: true },
];

const StoryBlock = ({ section, index }: { section: StorySection; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const eyesRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      // Text reveals
      textRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 50, filter: "blur(4px)" },
          {
            opacity: 1, y: 0, filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 80%", end: "top 50%", toggleActions: "play none none none" },
            delay: i * 0.2,
          }
        );
      });

      // Cat eyes
      if (eyesRef.current) {
        gsap.fromTo(
          eyesRef.current,
          { opacity: 0, scale: 0.5 },
          {
            opacity: 0.5,
            scale: 1,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: { trigger: ref.current, start: "top 60%", toggleActions: "play none none none" },
          }
        );
      }

      // Parallax background shift
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          y: -60,
          scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: 1 },
        });
      }
    }, ref);

    return () => ctx.revert();
  }, [index]);

  return (
    <div ref={ref} className="min-h-[70vh] flex items-center justify-center relative overflow-hidden">
      {/* Parallax bg accent */}
      {section.accent && (
        <div
          ref={bgRef}
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, transparent, rgba(123,97,255,0.06), transparent)" }}
        />
      )}

      {/* Glowing divider line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 story-divider"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(0,224,255,0.3), transparent)" }}
      />

      {section.hasCatEyes && (
        <div
          ref={eyesRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-20 opacity-0"
        >
          <div className="w-8 h-14 rounded-full" style={{ background: "rgba(0,224,255,0.4)", filter: "blur(6px)", boxShadow: "0 0 30px rgba(0,224,255,0.5)" }} />
          <div className="w-8 h-14 rounded-full" style={{ background: "rgba(0,224,255,0.4)", filter: "blur(6px)", boxShadow: "0 0 30px rgba(0,224,255,0.5)" }} />
        </div>
      )}

      <div className="relative z-10 text-center px-6 max-w-3xl">
        {section.text.map((line, i) => (
          <p
            key={i}
            ref={(el) => { textRefs.current[i] = el; }}
            className={`text-2xl md:text-4xl font-heading font-light leading-relaxed mb-4 opacity-0 ${
              section.accent ? "text-primary text-glow" : "text-foreground"
            }`}
          >
            {line}
          </p>
        ))}
      </div>
    </div>
  );
};

const ScrollStory = () => {
  const revealRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!revealRef.current) return;
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, scale: 0.85, filter: "blur(10px)" },
          {
            opacity: 1, scale: 1, filter: "blur(0px)",
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: { trigger: revealRef.current, start: "top 60%", toggleActions: "play none none none" },
          }
        );
      }
      if (descRef.current) {
        gsap.fromTo(
          descRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0,
            duration: 1,
            delay: 0.5,
            ease: "power2.out",
            scrollTrigger: { trigger: revealRef.current, start: "top 60%", toggleActions: "play none none none" },
          }
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
      <div ref={revealRef} className="min-h-[80vh] flex items-center justify-center relative">
        <div className="absolute inset-0 cosmic-gradient" />
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <h2
            ref={titleRef}
            className="font-heading text-4xl md:text-6xl font-bold text-primary text-glow mb-6 opacity-0"
          >
            The Murkatz War
          </h2>
          <p
            ref={descRef}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed opacity-0"
          >
            A science fiction trilogy about survival, telepathic cats, alien predators, and the fragile alliance that may save Earth.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScrollStory;
