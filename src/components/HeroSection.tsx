import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const nebulaRef1 = useRef<HTMLDivElement>(null);
  const nebulaRef2 = useRef<HTMLDivElement>(null);
  const starsLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Nebula drift
      if (nebulaRef1.current) {
        gsap.to(nebulaRef1.current, { x: 60, y: -30, duration: 20, repeat: -1, yoyo: true, ease: "sine.inOut" });
      }
      if (nebulaRef2.current) {
        gsap.to(nebulaRef2.current, { x: -40, y: 20, duration: 25, repeat: -1, yoyo: true, ease: "sine.inOut" });
      }

      // Parallax stars on scroll
      if (starsLayerRef.current) {
        gsap.to(starsLayerRef.current, {
          y: 200,
          scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: 1 },
        });
      }

      // Word-by-word headline reveal
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll(".hero-word");
        gsap.fromTo(
          words,
          { opacity: 0, y: 30, filter: "blur(8px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", stagger: 0.12, duration: 0.8, delay: 0.3, ease: "power3.out" }
        );
      }

      // Subtext
      if (subtextRef.current) {
        gsap.fromTo(
          subtextRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1, delay: 1.2, ease: "power2.out" }
        );
      }

      // Glitch flicker on second line
      const glitchWords = headlineRef.current?.querySelectorAll(".hero-glitch");
      if (glitchWords?.length) {
        gsap.to(glitchWords, {
          textShadow: "2px 0 hsl(var(--alien-purple)), -2px 0 hsl(var(--neon-blue))",
          duration: 0.1,
          repeat: 3,
          yoyo: true,
          delay: 1.8,
          ease: "steps(1)",
          onComplete: () => {
            gsap.to(glitchWords, {
              textShadow: "0 0 20px hsla(var(--neon-blue), 0.6), 0 0 40px hsla(var(--neon-blue), 0.3)",
              duration: 0.5,
            });
          },
        });
      }

      // Slow light pulses
      gsap.to(".hero-light-pulse", {
        opacity: 0.08,
        scale: 1.2,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 1.5,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const line1 = "Humanity reached the stars…";
  const line2 = "Something reached back.";

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Deep space bg */}
      <div className="absolute inset-0 cosmic-gradient" />

      {/* Parallax star layer */}
      <div ref={starsLayerRef} className="absolute inset-0 starfield opacity-40" />

      {/* Nebula clouds */}
      <div
        ref={nebulaRef1}
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full hero-light-pulse"
        style={{ background: "radial-gradient(circle, hsla(var(--alien-purple), 0.12) 0%, transparent 70%)" }}
      />
      <div
        ref={nebulaRef2}
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full hero-light-pulse"
        style={{ background: "radial-gradient(circle, hsla(var(--neon-blue), 0.08) 0%, transparent 70%)" }}
      />

      {/* Extra radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full hero-light-pulse" style={{ background: "radial-gradient(circle, hsla(var(--alien-purple), 0.05) 0%, transparent 60%)" }} />

      {/* Cat eyes */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 3 }}
        className="absolute top-[28%] left-1/2 -translate-x-1/2 flex gap-16"
      >
        <div className="w-6 h-10 rounded-full animate-pulse-glow" style={{ background: "hsla(var(--neon-blue), 0.6)", filter: "blur(2px)", animationDelay: "0s" }} />
        <div className="w-6 h-10 rounded-full animate-pulse-glow" style={{ background: "hsla(var(--neon-blue), 0.6)", filter: "blur(2px)", animationDelay: "0.5s" }} />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <h1
          ref={headlineRef}
          className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
        >
          <span className="block text-foreground">
            {line1.split(" ").map((word, i) => (
              <span key={i} className="hero-word inline-block mr-[0.3em] opacity-0">{word}</span>
            ))}
          </span>
          <span className="block text-primary mt-2">
            {line2.split(" ").map((word, i) => (
              <span key={i} className="hero-word hero-glitch inline-block mr-[0.3em] opacity-0 text-glow">{word}</span>
            ))}
          </span>
        </h1>

        <p
          ref={subtextRef}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed opacity-0"
        >
          A science fiction saga where telepathic cats and humans must unite to survive an approaching alien invasion.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/universe"
            className="btn-glow px-8 py-4 rounded-lg font-heading text-sm tracking-widest uppercase text-primary"
          >
            Explore the Story
          </Link>
          <Link
            to="/books"
            className="btn-glow-purple px-8 py-4 rounded-lg font-heading text-sm tracking-widest uppercase text-secondary"
          >
            View the Books
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-muted-foreground text-xs font-heading tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-px h-8"
          style={{ background: "linear-gradient(to bottom, hsl(var(--primary)), transparent)" }}
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
