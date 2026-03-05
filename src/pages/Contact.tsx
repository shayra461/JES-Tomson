import { useState } from "react";
import { motion } from "framer-motion";
import SectionReveal from "@/components/SectionReveal";
import { Mail, Twitter, BookOpen } from "lucide-react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="container mx-auto px-6 max-w-3xl">
        <SectionReveal className="text-center mb-16">
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-4">Contact</h1>
          <p className="text-muted-foreground text-lg">Reach out — whether you're human or telepathic cat.</p>
        </SectionReveal>

        <div className="grid md:grid-cols-[1fr_auto] gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel neon-border p-8"
          >
            <h3 className="font-heading text-lg text-primary mb-6">Send a Message</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
              <input
                type="email"
                placeholder="Your email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
              <textarea
                placeholder="Your message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={5}
                className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
              />
              <button
                onClick={handleSend}
                className="btn-glow px-8 py-3 rounded-lg font-heading text-xs tracking-widest uppercase text-primary w-full"
              >
                {sent ? "✓ Message Sent!" : "Send Message"}
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            {[
              { icon: Mail, label: "Email", value: "contact@jestomson.com" },
              { icon: Twitter, label: "Social", value: "@JESTomson" },
              { icon: BookOpen, label: "Goodreads", value: "J.E.S. Tomson" },
            ].map((item) => (
              <div key={item.label} className="glass-panel neon-border-purple p-6 flex items-center gap-4">
                <item.icon className="text-secondary w-5 h-5 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground font-heading tracking-wider uppercase">{item.label}</p>
                  <p className="text-foreground text-sm">{item.value}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
