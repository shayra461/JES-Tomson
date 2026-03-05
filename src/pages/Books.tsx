import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import BookCard from "@/components/BookCard";
import SectionReveal from "@/components/SectionReveal";
import book1 from "@/assets/book-1.jpg";
import book2 from "@/assets/book-2.jpg";
import book3 from "@/assets/book-3.jpg";

const booksData = [
  {
    id: "1",
    cover: book1,
    title: "HAZZardous Duty",
    subtitle: "Murkatz War, Book 1",
    synopsis: `Suddenly the image of an unknown creature came full blown into Jillian's mind and she gasped. Mike looked at her then the same image was in his mind, and for a moment, he forgot to breathe...

"Words too slow. Think-talk is better. CATS can think talk, even SMALL ONES. WE show you THEM. Some here now. THEY think of many to come. THEY come to fight, eat, and breed... eat humans and CATS."

A decidedly feminine thought-voice picked up when HAZZ paused. "HAZZ shows you THEM so you will understand. We have kept this secret while we learned. We have other secrets you must know. Quinn will keep our secrets?" Ming asked.

"They're telepathic!" Jillian exclaimed, turning to Mike. He grinned at her and nodded.

"Some CATS only think-talk when near-near... some can think-talk and listen far... HAZZ can think-talk and listen far, far, far..."`,
  },
  {
    id: "2",
    cover: book2,
    title: "SAMItransparent Mission",
    subtitle: "Murkatz War, Book 2",
    synopsis: `With the death of the Suronese empress, the embassies in Surilong temporarily close until the chaos ends and the surviving candidate becomes the new emperor. Two brothers and their uncle claim the throne of the Suronese Union. At least two are targeted for assassination.

Minister Abdul Shi Chan's hold on sanity continues to slip along with his hold on power. His twisted obsession with the beautiful Junior Ambassador Jillian Connor continues to grow and he is determined to possess her.

The leaders of every nation are set to go public with news of the coming alien invasion of Earth. Mike, Jillian and the CATS face a dangerously uncertain future as they prepare to return to Surilong. For Jillian, the worst monster might not be alien.`,
  },
  {
    id: "3",
    cover: book3,
    title: "CONNections Can Kill",
    subtitle: "Murkatz War, Book 3",
    synopsis: `The alliance between humans and telepathic cats faces its greatest test as the alien threat draws ever closer to Earth. The connections forged in crisis may be the only thing standing between survival and extinction.

As political alliances fracture and personal loyalties are tested, the Murkatz War reaches its explosive conclusion. Every connection carries weight—and some connections can kill.`,
  },
];

const Books = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeBookId = searchParams.get("book");
  const activeBook = booksData.find((b) => b.id === activeBookId);

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="container mx-auto px-6">
        <SectionReveal className="text-center mb-16">
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-4">The Books</h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            The Murkatz War trilogy — humanity's fight for survival alongside telepathic cats.
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-20">
          {booksData.map((book, i) => (
            <BookCard
              key={book.id}
              cover={book.cover}
              title={book.title}
              subtitle={book.subtitle}
              delay={i * 0.15}
              onClick={() => setSearchParams({ book: book.id })}
            />
          ))}
        </div>

        {/* Upcoming */}
        <SectionReveal className="text-center mb-12">
          <h2 className="font-heading text-2xl md:text-3xl text-primary text-glow mb-4">Upcoming Books</h2>
          <p className="text-muted-foreground">The saga continues. Stay tuned for more.</p>
        </SectionReveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[1, 2].map((i) => (
            <div key={i} className="glass-panel neon-border-purple aspect-[2/3] flex items-center justify-center">
              <p className="font-heading text-sm text-muted-foreground tracking-wider">Coming Soon</p>
            </div>
          ))}
        </div>
      </div>

      {/* Book detail modal */}
      <AnimatePresence>
        {activeBook && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setSearchParams({})}
          >
            <div className="absolute inset-0 bg-background/80 backdrop-blur-md" />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative glass-panel neon-border max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8 md:p-12"
            >
              <button onClick={() => setSearchParams({})} className="absolute top-4 right-4 text-muted-foreground hover:text-primary">
                <X size={24} />
              </button>
              <div className="grid md:grid-cols-[280px_1fr] gap-8">
                <img src={activeBook.cover} alt={activeBook.title} className="rounded-lg shadow-2xl w-full" />
                <div>
                  <p className="font-heading text-sm text-primary tracking-wider mb-2">{activeBook.subtitle}</p>
                  <h2 className="font-heading text-3xl font-bold text-foreground mb-6">{activeBook.title}</h2>
                  <div className="text-muted-foreground leading-relaxed whitespace-pre-line text-sm">
                    {activeBook.synopsis}
                  </div>
                  <div className="mt-8 flex flex-wrap gap-4">
                    <button className="btn-glow px-6 py-3 rounded-lg font-heading text-xs tracking-widest uppercase text-primary">
                      Buy Now
                    </button>
                    <button className="btn-glow-purple px-6 py-3 rounded-lg font-heading text-xs tracking-widest uppercase text-secondary">
                      Read Sample
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Books;
