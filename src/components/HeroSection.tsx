import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background image - editorial natural Black hair portrait */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1544535379-b81233c1a64e?w=1920&q=80"
          alt="Beautiful natural coily afro hair filling the frame, lit by warm sunlight"
          className="w-full h-full object-cover"
          fetchPriority="high"
          decoding="async"
        />
        {/* Semi-transparent dark green overlay for legibility */}
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(0, 50, 30, 0.55)" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-primary font-semibold text-sm uppercase tracking-widest mb-4"
          >
            Every Hair Texture is Beautiful
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-6xl lg:text-7xl font-serif text-background leading-tight mb-6"
          >
            Know Your Hair. <br />
            <span className="text-primary italic">Love</span> It.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-lg md:text-xl text-background/80 mb-8 max-w-lg"
          >
            Whether your hair is straight, wavy, curly, or coily — learn what makes it unique, 
            get expert advice, and discover care routines that actually work for you.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              data-tour="hero-explore"
              to="/hair-types"
              className="px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold text-center hover:opacity-90 transition-opacity"
            >
              Explore Hair Types
            </Link>
            <Link
              data-tour="hero-quiz"
              to="/quiz"
              className="px-8 py-4 rounded-lg border-2 border-background/30 text-background font-semibold text-center hover:bg-background/10 transition-colors"
            >
              Take the Quiz
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
