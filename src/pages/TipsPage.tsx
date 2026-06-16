import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Droplets, Moon, Scissors, ShieldCheck, Sparkles, Heart, Flame, Apple } from "lucide-react";
import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";


const generalTips = [
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
  {
    icon: Flame,
    title: "Limit Heat Styling",
    text: "Heat damage is irreversible. If you must use heat, always apply a heat protectant and keep the temperature below 180°C.",
  },
  {
    icon: Sparkles,
    title: "Detangle with Care",
    text: "Always detangle on wet, conditioned hair. Start from the ends and work your way up to the roots using your fingers or a wide-tooth comb.",
  },
  {
    icon: Apple,
    title: "Nutrition Matters",
    text: "Hair health starts from within. Eat foods rich in biotin, iron, zinc, and omega-3 fatty acids for stronger, healthier hair growth.",
  },
  {
    icon: Heart,
    title: "Love Your Hair",
    text: "Your natural hair is beautiful. Embrace its texture, learn its language, and give it the patience and care it deserves.",
  },
];

const TipsPage = () => {
  return (
    <div className="min-h-screen">
      <Seo
        title="Hair Care Tips — CrownCare"
        description="Practical daily and weekly tips for Type 3 and Type 4 hair: moisture, protective styling, scalp health, and nighttime routines."
        path="/tips"
      />
      <Navbar />

      <section className="pt-24 pb-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">
              Hair Care Essentials
            </p>
            <h1 className="text-3xl md:text-5xl font-serif text-foreground mb-4">
              Simple Steps, Big Difference
            </h1>
            <p className="text-muted-foreground text-lg">
              Start with these foundational habits to keep your hair healthy, strong, and growing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            {generalTips.map((tip, i) => (
              <motion.div
                key={tip.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
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

          {/* Link to specific hair type pages */}
          <div className="text-center bg-card rounded-2xl p-8 border border-border max-w-2xl mx-auto">
            <h3 className="text-xl font-serif text-foreground mb-2">Want tips for your specific hair type?</h3>
            <p className="text-muted-foreground mb-4">Check out our detailed guides for each hair type.</p>
            <Link to="/hair-types" className="inline-block px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity">
              Explore Hair Types
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default TipsPage;
