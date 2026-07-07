import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Hammer, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Seo } from "@/components/Seo";

interface Props {
  title: string;
  kicker: string;
  message: string;
  path: string;
  emoji?: string;
}

const ComingSoonPage = ({ title, kicker, message, path, emoji = "🚧" }: Props) => (
  <div className="min-h-screen flex flex-col">
    <Seo title={`${title} — CrownCare`} description={message} path={path} />
    <Navbar />
    <main className="flex-1 flex items-center justify-center pt-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center px-4 max-w-md mx-auto py-24"
      >
        <div className="text-6xl mb-6">{emoji}</div>
        <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">
          {kicker}
        </p>
        <h1 className="text-3xl md:text-5xl font-serif text-foreground mb-4">{title}</h1>
        <p className="text-muted-foreground text-lg mb-8">{message}</p>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-muted-foreground text-sm font-medium mb-8">
          <Hammer size={14} />
          We're currently working on this
        </div>
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            <ArrowLeft size={15} />
            Back to home
          </Link>
        </div>
      </motion.div>
    </main>
    <Footer />
  </div>
);

export default ComingSoonPage;
