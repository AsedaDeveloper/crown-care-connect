import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import ProductTour from "@/components/ProductTour";
import PremiumModal from "@/components/PremiumModal";
import { Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { Crown } from "lucide-react";
import { Seo } from "@/components/Seo";

const Index = () => {
  const [premiumOpen, setPremiumOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Seo
        title="CrownCare — Hair Education for Africans"
        description="Learn about your unique African hair type, connect with experts, and discover routines that help your crown thrive."
        path="/"
      />
      <Navbar />
      <HeroSection />


      {/* Quick links section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 data-tour="quick-links" className="text-3xl md:text-5xl font-serif text-foreground mb-4">
              Start Your Journey
            </h2>
            <p className="text-muted-foreground text-lg">
              Explore everything CrownCare has to offer — for every hair texture.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { title: "Hair Types", desc: "Deep dives on 3A through 4C", emoji: "🌀", to: "/hair-types" },
              { title: "Meet Your Crown", desc: "Find your hair type in minutes", emoji: "👑", to: "/quiz" },
              { title: "Routine Builder", desc: "Custom plan from 4 questions", emoji: "🧴", to: "/routine" },
              { title: "Find Experts", desc: "Book a real consultation", emoji: "👩🏾‍⚕️", to: "/experts" },
              { title: "Video Series", desc: "Tutorials from trichologists", emoji: "🎬", to: "/videos" },
              { title: "Blog", desc: "Practical, evidence-based reads", emoji: "📚", to: "/blog" },
              { title: "Product Picks", desc: "Curated by hair type & budget", emoji: "🛍️", to: "/products" },
              { title: "Stories", desc: "Real journeys from the community", emoji: "💬", to: "/testimonials" },
              { title: "Crown Match", desc: "Mini match-3 game", emoji: "🎮", to: "/game" },
            ].map((item, i) => (
              <motion.div
                key={item.to}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={item.to}
                  className="block bg-card rounded-2xl p-6 border border-border hover:shadow-[var(--shadow-warm)] transition-all hover:scale-[1.02] text-center group"
                >
                  <div className="text-4xl mb-3">{item.emoji}</div>
                  <h3 className="text-lg font-serif text-foreground mb-1 group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium CTA banner */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <Crown size={20} className="text-primary-foreground" />
              <span className="text-sm font-semibold uppercase tracking-widest text-primary-foreground/80">
                CrownCare Premium
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif text-primary-foreground mb-3">
              Your crown deserves expert care.
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-lg mx-auto">
              Get monthly expert sessions, a personalised routine, and members-only content — for GHS 100–150/month.
            </p>
            <button
              onClick={() => setPremiumOpen(true)}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-background text-foreground font-semibold text-base hover:bg-background/90 transition-colors shadow-lg"
            >
              <Crown size={18} />
              Get Early Access
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
      <PremiumModal open={premiumOpen} onClose={() => setPremiumOpen(false)} />
      <ProductTour />
    </div>
  );
};

export default Index;
