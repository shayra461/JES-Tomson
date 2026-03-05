import { useState, useRef } from "react";
import { motion } from "framer-motion";

interface BookCardProps {
  cover: string;
  title: string;
  subtitle: string;
  onClick: () => void;
  delay?: number;
}

const BookCard = ({ cover, title, subtitle, onClick, delay = 0 }: BookCardProps) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -15, y: x * 15 });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="cursor-pointer group"
      style={{ perspective: "1000px" }}
    >
      <div
        className="relative transition-transform duration-200 ease-out"
        style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
      >
        {/* Glow */}
        <div className="absolute -inset-2 bg-neon/0 group-hover:bg-neon/10 rounded-xl blur-xl transition-all duration-500" />
        <div className="absolute -inset-1 neon-border rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Book cover */}
        <div className="relative rounded-lg overflow-hidden shadow-2xl">
          <img
            src={cover}
            alt={title}
            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
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
