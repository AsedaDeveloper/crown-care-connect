import { motion } from "framer-motion";
import { Droplets, Moon, Scissors, ShieldCheck } from "lucide-react";

const tips = [
  {
    icon: Droplets,
    title: "Moisture is Everything",
    text: "African hair thrives on hydration. Use water-based products and seal with oils like shea butter, coconut, or jojoba oil.",
  },
  {
    icon: Moon,
    title: "Protect at Night",
    text: "Sleep on a satin or silk pillowcase, or wrap your hair with a satin bonnet to prevent breakage and retain moisture.",
  },
  {
    icon: Scissors,
    title: "Regular Trims",
    text: "Trimming every 8–12 weeks prevents split ends from traveling up the hair shaft and causing more damage.",
  },
  {
    icon: ShieldCheck,
    title: "Be Gentle",
    text: "Avoid tight hairstyles that pull on edges. Traction alopecia from tight braids and weaves is a leading cause of hair loss in young adults.",
  },
];

const TipsSection = () => {
  return (
    <section id="tips" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">
            Hair Care Essentials
          </p>
          <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-4">
            Simple Steps, Big Difference
          </h2>
          <p className="text-muted-foreground text-lg">
            Start with these foundational habits to keep your hair healthy, strong, and growing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {tips.map((tip, i) => (
            <motion.div
              key={tip.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-5"
            >
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                <tip.icon className="text-secondary" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-serif text-foreground mb-2">{tip.title}</h3>
                <p className="text-muted-foreground">{tip.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TipsSection;
