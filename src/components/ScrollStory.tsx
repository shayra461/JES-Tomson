import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface StorySection {
  text: string[];
  accent?: boolean;
}

const sections: StorySection[] = [
  { text: ["Humanity expanded beyond Earth.", "But something ancient was already watching."] },
  { text: ["Predators travel between stars,", "searching for new worlds to consume."], accent: true },
  { text: ["But one species on Earth heard them first.", "Cats."] },
  { text: ["They can think.", "They can speak.", "And they know the invasion is coming."], accent: true },
];

const StoryBlock = ({ section, index }: { section: StorySection; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <div ref={ref} className="min-h-[70vh] flex items-center justify-center relative">
      {/* Background accents */}
      {section.accent && (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-alien-purple/5 to-transparent" />
      )}
      {index === 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.3 } : {}}
          transition={{ duration: 2 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-20"
        >
          <div className="w-8 h-14 rounded-full bg-neon/40 blur-md" />
          <div className="w-8 h-14 rounded-full bg-neon/40 blur-md" />
        </motion.div>
      )}

      <div className="relative z-10 text-center px-6 max-w-3xl">
        {section.text.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.3, duration: 0.8 }}
            className={`text-2xl md:text-4xl font-heading font-light leading-relaxed mb-4 ${
              section.accent ? "text-primary text-glow" : "text-foreground"
            }`}
          >
            {line}
          </motion.p>
        ))}
      </div>
    </div>
  );
};

const ScrollStory = () => {
  const revealRef = useRef(null);
  const revealInView = useInView(revealRef, { once: true, margin: "-20%" });

  return (
    <div className="relative">
      {sections.map((section, i) => (
        <StoryBlock key={i} section={section} index={i} />
      ))}

      {/* Series reveal */}
      <div ref={revealRef} className="min-h-[80vh] flex items-center justify-center relative">
        <div className="absolute inset-0 cosmic-gradient" />
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            animate={revealInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1 }}
            className="font-heading text-4xl md:text-6xl font-bold text-primary text-glow mb-6"
          >
            The Murkatz War
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={revealInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed"
          >
            A science fiction trilogy about survival, telepathic cats, alien predators, and the fragile alliance that may save Earth.
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default ScrollStory;
