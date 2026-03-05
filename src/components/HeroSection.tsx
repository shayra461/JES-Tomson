import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Nebula bg layers */}
      <div className="absolute inset-0 cosmic-gradient" />
      <div className="absolute inset-0 starfield opacity-40" />
      
      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-alien-purple/5 blur-[120px]" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-neon/5 blur-[80px] animate-pulse-glow" />

      {/* Cat eyes */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 3 }}
        className="absolute top-[30%] left-1/2 -translate-x-1/2 flex gap-16"
      >
        <div className="w-6 h-10 rounded-full bg-neon/60 blur-sm animate-pulse-glow" style={{ animationDelay: "0s" }} />
        <div className="w-6 h-10 rounded-full bg-neon/60 blur-sm animate-pulse-glow" style={{ animationDelay: "0.5s" }} />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
        >
          <span className="text-foreground">Humanity reached the stars…</span>
          <br />
          <span className="text-primary text-glow">Something reached back.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          A science fiction saga where telepathic cats and humans must unite to survive an approaching alien invasion.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
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
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-muted-foreground text-xs font-heading tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-px h-8 bg-gradient-to-b from-primary to-transparent"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
