import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Cat, Skull, Dna, Globe } from "lucide-react";
import SectionReveal from "@/components/SectionReveal";

const sections = [
  {
    icon: Users,
    title: "The Humans",
    color: "text-neon",
    desc: "Humanity has expanded beyond Earth, establishing colonies and embassies across distant star systems. Political intrigue, power struggles, and fragile alliances define the human condition in the stars. Ambassadors, soldiers, and scientists stand at the frontier of an uncertain future.",
    bgClass: "from-neon/5 via-transparent to-transparent",
  },
  {
    icon: Cat,
    title: "The Telepathic Cats",
    color: "text-primary",
    desc: "Through genetic experiments and natural evolution, certain cat breeds—particularly Siamese—have developed telepathic abilities. They can 'think-talk,' sensing alien presences across vast distances. HAZZ, Ming, SAMI, and CONN are among the most powerful. They are not pets. They are partners.",
    bgClass: "from-alien-purple/5 via-transparent to-transparent",
  },
  {
    icon: Skull,
    title: "The Alien Predators",
    color: "text-destructive",
    desc: "Ancient predators that travel between stars, searching for new worlds to consume. They come to fight, eat, and breed. Their approach was first detected not by human technology, but by the telepathic senses of genetically modified cats. The invasion is not a question of if—but when.",
    bgClass: "from-destructive/5 via-transparent to-transparent",
  },
  {
    icon: Dna,
    title: "Genetic Experiments",
    color: "text-star-gold",
    desc: "The line between natural evolution and scientific intervention blurs. Genetic modifications gave cats their telepathic abilities, but at what cost? The experiments that created humanity's greatest allies may also hold the key to defeating the alien threat—or unleashing something worse.",
    bgClass: "from-star-gold/5 via-transparent to-transparent",
  },
  {
    icon: Globe,
    title: "Future Earth",
    color: "text-neon",
    desc: "Earth has changed. Nations prepare for planetary defense while political turmoil threatens to tear alliances apart. The Suronese Union, the embassies, and every government must face the truth: without unity between humans and cats, Earth falls.",
    bgClass: "from-neon/5 via-transparent to-transparent",
  },
];

const UniverseSection = ({ section, index }: { section: typeof sections[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });
  const Icon = section.icon;

  return (
    <div ref={ref} className={`relative py-24 bg-gradient-to-b ${section.bgClass}`}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto glass-panel p-8 md:p-12 neon-border"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-lg bg-muted/50">
              <Icon className={`${section.color} w-8 h-8`} />
            </div>
            <h2 className={`font-heading text-2xl md:text-3xl font-bold ${section.color}`}>{section.title}</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed text-lg">{section.desc}</p>
        </motion.div>
      </div>
    </div>
  );
};

const Universe = () => (
  <div className="pt-28 pb-20 min-h-screen">
    <SectionReveal className="text-center mb-8 px-6">
      <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-4">The Universe</h1>
      <p className="text-muted-foreground text-lg max-w-xl mx-auto">
        Enter the world of the Murkatz War. Every species has a role to play.
      </p>
    </SectionReveal>
    {sections.map((section, i) => (
      <UniverseSection key={section.title} section={section} index={i} />
    ))}
  </div>
);

export default Universe;
