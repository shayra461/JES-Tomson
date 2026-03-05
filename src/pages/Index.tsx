import HeroSection from "@/components/HeroSection";
import ScrollStory from "@/components/ScrollStory";
import BookCard from "@/components/BookCard";
import SectionReveal from "@/components/SectionReveal";
import { useNavigate } from "react-router-dom";
import book1 from "@/assets/book-1.jpg";
import book2 from "@/assets/book-2.jpg";
import book3 from "@/assets/book-3.jpg";

const books = [
  { cover: book1, title: "HAZZardous Duty", subtitle: "Murkatz War, Book 1", id: "1" },
  { cover: book2, title: "SAMItransparent Mission", subtitle: "Murkatz War, Book 2", id: "2" },
  { cover: book3, title: "CONNections Can Kill", subtitle: "Murkatz War, Book 3", id: "3" },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div>
      <HeroSection />
      <ScrollStory />

      {/* Book showcase */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <SectionReveal className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">The Trilogy</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Three books. One war. The fate of two species.</p>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {books.map((book, i) => (
              <BookCard
                key={book.id}
                cover={book.cover}
                title={book.title}
                subtitle={book.subtitle}
                delay={i * 0.15}
                onClick={() => navigate(`/books?book=${book.id}`)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, hsla(186,100%,50%,0.15) 0%, transparent 60%)" }} />
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          {/* Vertical scan lines */}
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary/10 to-transparent" />
          <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-secondary/10 to-transparent" />
        </div>

        <SectionReveal className="relative z-10">
          <div className="max-w-4xl mx-auto px-6 text-center">
            {/* Decorative top element */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/60" />
              <div className="w-3 h-3 rotate-45 border border-primary/60" />
              <span className="font-heading text-xs tracking-[0.4em] uppercase text-primary/60">Transmission Incoming</span>
              <div className="w-3 h-3 rotate-45 border border-primary/60" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/60" />
            </div>

            <h3 className="font-heading text-3xl md:text-5xl lg:text-6xl text-foreground mb-3 leading-tight">
              Ready to Join
              <span className="block text-primary text-glow mt-2">the War?</span>
            </h3>

            <p className="text-muted-foreground text-lg md:text-xl max-w-lg mx-auto mb-12 leading-relaxed">
              Discover why cats may be humanity's last hope.
            </p>

            {/* Button cluster */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
              <button
                onClick={() => navigate("/books")}
                className="btn-glow group px-12 py-5 rounded-lg font-heading text-sm tracking-widest uppercase text-primary relative z-10"
              >
                <span className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  Start Reading
                  <span className="text-primary/60 group-hover:translate-x-1 transition-transform duration-300">→</span>
                </span>
              </button>
              <button
                onClick={() => navigate("/universe")}
                className="btn-glow-purple group px-12 py-5 rounded-lg font-heading text-sm tracking-widest uppercase text-secondary relative z-10"
              >
                <span className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                  Explore Universe
                  <span className="text-secondary/60 group-hover:translate-x-1 transition-transform duration-300">→</span>
                </span>
              </button>
            </div>

            {/* Decorative bottom element */}
            <div className="flex items-center justify-center gap-3 mt-12">
              <div className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-pulse" />
              <div className="w-1.5 h-1.5 rounded-full bg-secondary/40 animate-pulse" style={{ animationDelay: "0.5s" }} />
              <div className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-pulse" style={{ animationDelay: "1s" }} />
            </div>
          </div>
        </SectionReveal>
      </section>
    </div>
  );
};

export default Index;
