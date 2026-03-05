import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

interface BookCardProps {
  cover: string;
  title: string;
  subtitle: string;
  onClick: () => void;
  delay?: number;
}

const BookCard = ({ cover, title, subtitle, onClick, delay = 0 }: BookCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const inner = innerRef.current;
    const glow = glowRef.current;
    if (!card || !inner || !glow) return;

    const onMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(inner, {
        rotateX: y * -20,
        rotateY: x * 20,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(glow, { opacity: 1, duration: 0.3 });
    };

    const onLeave = () => {
      gsap.to(inner, { rotateX: 0, rotateY: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" });
      gsap.to(glow, { opacity: 0, duration: 0.4 });
    };

    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);
    return () => {
      card.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      ref={cardRef}
      onClick={onClick}
      className="cursor-pointer group"
      style={{ perspective: "1000px" }}
    >
      <div ref={innerRef} className="relative transition-none" style={{ transformStyle: "preserve-3d" }}>
        {/* Glow */}
        <div
          ref={glowRef}
          className="absolute -inset-2 rounded-xl opacity-0"
          style={{
            background: "radial-gradient(circle, hsla(var(--neon-blue), 0.15) 0%, transparent 70%)",
            boxShadow: "0 0 30px hsla(var(--neon-blue), 0.2)",
          }}
        />
        <div className="absolute -inset-1 neon-border rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Book cover */}
        <div className="relative rounded-lg overflow-hidden shadow-2xl">
          <img
            src={cover}
            alt={title}
            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Overlay */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4"
            style={{ background: "linear-gradient(to top, hsla(var(--deep-space), 0.8), transparent)" }}
          >
            <div>
              <p className="font-heading text-sm text-primary tracking-wider">{subtitle}</p>
              <p className="font-heading text-lg text-foreground">{title}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BookCard;
