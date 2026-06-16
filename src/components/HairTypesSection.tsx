import { motion } from "framer-motion";

const hairTypes = [
  {
    type: "Type 3 — Curly",
    subtypes: "3A · 3B · 3C",
    description:
      "Defined curls ranging from loose loops to tight corkscrews. Needs moisture and gentle detangling.",
    tips: "Use leave-in conditioner, avoid sulfates, and finger-detangle when wet.",
    emoji: "🌀",
  },
  {
    type: "Type 4A — Coily",
    subtypes: "Tight S-pattern coils",
    description:
      "Tightly coiled hair with a visible S-pattern. Appears dense but is actually very fine and fragile.",
    tips: "Deep condition weekly, use the LOC method, and protect at night with satin.",
    emoji: "〰️",
  },
  {
    type: "Type 4B — Coily",
    subtypes: "Z-pattern coils",
    description:
      "Sharp Z-shaped angles instead of curls. Very prone to shrinkage—can shrink up to 75% of its length!",
    tips: "Stretch styles help show length. Keep moisture locked in with heavy butters and oils.",
    emoji: "⚡",
  },
  {
    type: "Type 4C — Coily",
    subtypes: "Tight zigzag coils",
    description:
      "The tightest coil pattern with the most shrinkage. Incredibly versatile for styling but needs extra care.",
    tips: "Gentle handling is key. Protective styles, regular trims, and deep moisture are your best friends.",
    emoji: "🔄",
  },
];

const HairTypesSection = () => {
  return (
    <section id="hair-types" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">
            Know Your Hair
          </p>
          <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-4">
            Every Strand Tells a Story
          </h2>
          <p className="text-muted-foreground text-lg">
            African hair is incredibly diverse. Understanding your hair type is the first
            step to giving it the care it deserves.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {hairTypes.map((hair, i) => (
            <motion.div
              key={hair.type}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-2xl p-8 border border-border hover:shadow-[var(--shadow-card)] transition-shadow"
            >
              <div className="text-4xl mb-4">{hair.emoji}</div>
              <h3 className="text-xl font-serif text-foreground mb-1">{hair.type}</h3>
              <p className="text-primary text-sm font-medium mb-3">{hair.subtypes}</p>
              <p className="text-muted-foreground mb-4">{hair.description}</p>
              <div className="bg-muted rounded-lg p-4">
                <p className="text-sm font-semibold text-foreground mb-1">💡 Pro Tip</p>
                <p className="text-sm text-muted-foreground">{hair.tips}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HairTypesSection;
