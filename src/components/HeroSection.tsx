import { useEffect, useRef, useCallback } from "react";
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const shatterTimelineRef = useRef<gsap.core.Timeline | null>(null);

  // Text shatter effect — breaks letters apart then reassembles
  const triggerShatter = useCallback(() => {
    if (!headlineRef.current) return;
    const words = headlineRef.current.querySelectorAll(".hero-word");
    if (!words.length) return;

    // Kill previous if running
    if (shatterTimelineRef.current) shatterTimelineRef.current.kill();

    const tl = gsap.timeline();
    shatterTimelineRef.current = tl;

    // Phase 1: Shatter outward
    tl.to(words, {
      x: () => gsap.utils.random(-120, 120),
      y: () => gsap.utils.random(-80, 80),
      rotation: () => gsap.utils.random(-25, 25),
      scale: () => gsap.utils.random(0.6, 1.4),
      opacity: 0.3,
      filter: "blur(6px)",
      duration: 0.45,
      ease: "power3.out",
      stagger: { amount: 0.12, from: "center" },
    });

    // Phase 2: Hold shattered
    tl.to({}, { duration: 0.3 });

    // Phase 3: Reassemble
    tl.to(words, {
      x: 0,
      y: 0,
      rotation: 0,
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
      duration: 0.6,
      ease: "elastic.out(1, 0.5)",
      stagger: { amount: 0.15, from: "edges" },
    });

    // Phase 4: Flash glow on reassembly
    tl.to(
      words,
      {
        textShadow: "0 0 30px #00E0FF, 0 0 60px #00E0FF, 0 0 90px #7B61FF",
        duration: 0.2,
        ease: "power2.in",
      },
      "-=0.3"
    );
    tl.to(words, {
      textShadow: "0 0 20px rgba(0,224,255,0.6), 0 0 40px rgba(0,224,255,0.3)",
      duration: 0.8,
      ease: "power2.out",
    });
  }, []);

  useEffect(() => {
    // Shatter loop — synced roughly to a cat-jump cycle (~4s)
    const shatterInterval = setInterval(() => {
      triggerShatter();
    }, 4000);

    // Also trigger once initially after intro animations finish
    const initialTimeout = setTimeout(() => {
      triggerShatter();
    }, 2800);

    return () => {
      clearInterval(shatterInterval);
      clearTimeout(initialTimeout);
    };
  }, [triggerShatter]);

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
          textShadow: "2px 0 #7B61FF, -2px 0 #00E0FF",
          duration: 0.1,
          repeat: 3,
          yoyo: true,
          delay: 1.8,
          ease: "steps(1)",
          onComplete: () => {
            gsap.to(glitchWords, {
              textShadow: "0 0 20px rgba(0,224,255,0.6), 0 0 40px rgba(0,224,255,0.3)",
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
      {/* Video background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.35) saturate(1.3) contrast(1.1)" }}
        >
          <source src="/videos/hero-cat.mp4" type="video/mp4" />
        </video>
        {/* Color overlay to blend with theme */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(11,15,26,0.7) 0%, rgba(11,15,26,0.4) 40%, rgba(11,15,26,0.6) 70%, rgba(11,15,26,0.95) 100%)",
          }}
        />
        {/* Side vignettes */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 50%, rgba(11,15,26,0.8) 100%)",
          }}
        />
        {/* Cyan tint overlay */}
        <div
          className="absolute inset-0 mix-blend-color"
          style={{ background: "rgba(0,224,255,0.06)" }}
        />
      </div>

      {/* Deep space bg fallback */}
      <div className="absolute inset-0 cosmic-gradient opacity-40" />

      {/* Parallax star layer */}
      <div ref={starsLayerRef} className="absolute inset-0 starfield opacity-30" />

      {/* Nebula clouds */}
      <div
        ref={nebulaRef1}
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full hero-light-pulse"
        style={{ background: "radial-gradient(circle, rgba(123,97,255,0.1) 0%, transparent 70%)" }}
      />
      <div
        ref={nebulaRef2}
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full hero-light-pulse"
        style={{ background: "radial-gradient(circle, rgba(0,224,255,0.06) 0%, transparent 70%)" }}
      />

      {/* Extra radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full hero-light-pulse"
        style={{ background: "radial-gradient(circle, rgba(123,97,255,0.04) 0%, transparent 60%)" }}
      />

      {/* Cat eyes (faint behind video) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 3 }}
        className="absolute top-[28%] left-1/2 -translate-x-1/2 flex gap-16 z-[1]"
      >
        <div
          className="w-6 h-10 rounded-full animate-pulse-glow"
          style={{ background: "rgba(0,224,255,0.4)", filter: "blur(3px)", animationDelay: "0s" }}
        />
        <div
          className="w-6 h-10 rounded-full animate-pulse-glow"
          style={{ background: "rgba(0,224,255,0.4)", filter: "blur(3px)", animationDelay: "0.5s" }}
        />
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
