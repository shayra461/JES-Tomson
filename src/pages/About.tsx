import { motion } from "framer-motion";
import SectionReveal from "@/components/SectionReveal";
import authorPhoto from "@/assets/author-photo.png";

const About = () => (
  <div className="pt-28 pb-20 min-h-screen">
    <div className="container mx-auto px-6 max-w-4xl">
      <SectionReveal className="text-center mb-16">
        <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-4">About the Author</h1>
      </SectionReveal>

      <div className="relative">
        {/* Spotlight effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-neon/5 rounded-full blur-[100px]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative glass-panel neon-border p-8 md:p-12"
        >
          <div className="flex flex-col items-center mb-8">
            <div className="w-40 h-40 rounded-full neon-border overflow-hidden mb-6">
              <img src={authorPhoto} alt="J.E.S. Tomson - Author" className="w-full h-full object-cover" />
            </div>
            <h2 className="font-heading text-2xl text-primary text-glow">J.E.S. Tomson</h2>
          </div>

          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              J.E.S. Tomson is a science fiction author whose imagination spans the galaxies. With a deep fascination for genetics, interspecies communication, and the vast unknowns of space, Tomson crafts stories that blur the line between scientific possibility and speculative wonder.
            </motion.p>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
              The Murkatz War series was born from a simple question: <span className="text-primary italic">"What if cats could talk—and what if they had something urgent to tell us?"</span> That question evolved into an epic saga spanning multiple star systems, political intrigue, and the unbreakable bond between humans and their feline companions.
            </motion.p>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.6 }}>
              A lifelong lover of animals—particularly cats—Tomson brings authentic warmth and personality to the telepathic cat characters that are the heart of the series. Each cat has a distinct voice, personality, and role in the story, from the far-reaching mind of HAZZ to the sharp intellect of Ming.
            </motion.p>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.8 }}>
              Inspired by classic science fiction and modern genetics research, the Murkatz War explores what it truly means to communicate, to trust across species, and to unite against a threat that could end everything. The series is a love letter to science fiction, to cats, and to the idea that our greatest allies might be closer than we think.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </div>
  </div>
);

export default About;
