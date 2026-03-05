import { useState } from "react";
import { motion } from "framer-motion";
import SectionReveal from "@/components/SectionReveal";
import { Mail, MessageSquare, BookOpen } from "lucide-react";

const Community = () => {
  const [email, setEmail] = useState("");
  const [fanIdea, setFanIdea] = useState("");
  const [submitted, setSubmitted] = useState<string | null>(null);

  const handleSubmit = (type: string) => {
    setSubmitted(type);
    setTimeout(() => setSubmitted(null), 3000);
  };

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        <SectionReveal className="text-center mb-16">
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-4">Join the Murkatz Community</h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Connect with fellow readers, get exclusive content, and help shape the universe.
          </p>
        </SectionReveal>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-panel neon-border p-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <Mail className="text-primary w-6 h-6" />
              <h3 className="font-heading text-lg text-primary">Newsletter</h3>
            </div>
            <p className="text-muted-foreground text-sm mb-6">Get updates on new releases, behind-the-scenes content, and exclusive previews.</p>
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 bg-muted/50 border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
              <button
                onClick={() => handleSubmit("newsletter")}
                className="btn-glow px-5 py-3 rounded-lg font-heading text-xs tracking-wider uppercase text-primary"
              >
                Join
              </button>
            </div>
            {submitted === "newsletter" && <p className="text-primary text-sm mt-3">✓ Welcome aboard!</p>}
          </motion.div>

          {/* Free chapter */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-panel neon-border-purple p-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="text-secondary w-6 h-6" />
              <h3 className="font-heading text-lg text-secondary">Free Chapter</h3>
            </div>
            <p className="text-muted-foreground text-sm mb-6">Download a free chapter of HAZZardous Duty and meet the telepathic cats.</p>
            <button
              onClick={() => handleSubmit("chapter")}
              className="btn-glow-purple px-6 py-3 rounded-lg font-heading text-xs tracking-wider uppercase text-secondary w-full"
            >
              Get Free Chapter
            </button>
            {submitted === "chapter" && <p className="text-secondary text-sm mt-3">✓ Check your email!</p>}
          </motion.div>

          {/* Fan ideas */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel neon-border p-8 md:col-span-2"
          >
            <div className="flex items-center gap-3 mb-4">
              <MessageSquare className="text-primary w-6 h-6" />
              <h3 className="font-heading text-lg text-primary">Fan Idea Submission</h3>
            </div>
            <p className="text-muted-foreground text-sm mb-2">
              If you were a telepathic cat, how would you deal with dogs?
            </p>
            <p className="text-muted-foreground/60 text-xs mb-4 italic">Share your creative ideas and fan theories!</p>
            <textarea
              value={fanIdea}
              onChange={(e) => setFanIdea(e.target.value)}
              placeholder="Share your idea..."
              rows={4}
              className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none mb-4"
            />
            <button
              onClick={() => handleSubmit("idea")}
              className="btn-glow px-6 py-3 rounded-lg font-heading text-xs tracking-wider uppercase text-primary"
            >
              Submit Idea
            </button>
            {submitted === "idea" && <p className="text-primary text-sm mt-3">✓ Thanks for sharing!</p>}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Community;
