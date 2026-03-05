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
      <SectionReveal className="py-20 text-center">
        <div className="glass-panel max-w-2xl mx-auto p-12 neon-border">
          <h3 className="font-heading text-2xl md:text-3xl text-primary text-glow mb-4">Ready to Join the War?</h3>
          <p className="text-muted-foreground mb-8">Discover why cats may be humanity's last hope.</p>
          <button onClick={() => navigate("/books")} className="btn-glow px-8 py-4 rounded-lg font-heading text-sm tracking-widest uppercase text-primary">
            Start Reading
          </button>
        </div>
      </SectionReveal>
    </div>
  );
};

export default Index;
