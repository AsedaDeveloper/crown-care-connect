import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Share2, RotateCcw, Sparkles, Lock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PremiumModal from "@/components/PremiumModal";
import { Button } from "@/components/ui/button";
import { Seo } from "@/components/Seo";


/* ─── types ─── */
type Gender = "male" | "female" | "neutral";

interface Option {
  emoji: string;
  label: string;
  scores?: Record<string, number>;
  gender?: Gender;
}

interface Question {
  question: string;
  options: Option[];
  microcopy: string;
}

/* ─── questions ─── */
const questions: Question[] = [
  {
    question: "First things first — which best describes you?",
    options: [
      { emoji: "👦🏾", label: "I'm a guy", gender: "male" },
      { emoji: "👧🏾", label: "I'm a girl", gender: "female" },
      { emoji: "🧑🏾", label: "I prefer not to say", gender: "neutral" },
    ],
    microcopy: "This just helps us personalise your Crown Profile!",
  },
  {
    question: "Look at your hair right now. What does it look like?",
    options: [
      { emoji: "🌀", label: "Loose soft curls or waves", scores: { "3a": 5, "3b": 2 } },
      { emoji: "🌀🌀", label: "Tight defined spirals", scores: { "3b": 5, "3c": 3 } },
      { emoji: "☁️", label: "Tight coils that spring up when stretched", scores: { "3c": 3, "4a": 5, "4b": 2 } },
      { emoji: "☁️☁️", label: "Very tight coils or zigzag pattern that shrinks a lot", scores: { "4b": 5, "4c": 4 } },
      { emoji: "😐", label: "I genuinely cannot tell", scores: { "4a": 2, "4b": 2, "4c": 2 } },
    ],
    microcopy: "No wrong answer — even 'I can't tell' tells us something useful!",
  },
  {
    question: "When you pour water on your hair, what happens?",
    options: [
      { emoji: "💦", label: "It sits on top for a while before soaking in", scores: { "4b": 2, "4c": 3 } },
      { emoji: "🌊", label: "It soaks in really quickly", scores: { "3a": 2, "3b": 2, "3c": 1 } },
      { emoji: "🤷🏾", label: "I've never really noticed", scores: {} },
      { emoji: "🚿", label: "I always use products so I can't tell", scores: {} },
    ],
    microcopy: "You can try this right now! Just sprinkle a little water on a section 😄",
  },
  {
    question: "A few hours after washing your hair without putting anything on it, what do you notice?",
    options: [
      { emoji: "😩", label: "It feels really tight and uncomfortable", scores: { "4b": 2, "4c": 3 } },
      { emoji: "😊", label: "It feels fine and pretty normal", scores: { "3a": 2, "3b": 2 } },
      { emoji: "😬", label: "It gets flaky or itchy", scores: { "4a": 1, "4b": 1 } },
      { emoji: "🤔", label: "I always put something on straight away so I don't know", scores: {} },
      { emoji: "😶", label: "I have never really paid attention", scores: {} },
    ],
    microcopy: "Even 'I don't know' is a totally valid answer — we'll figure it out together 👑",
  },
  {
    question: "When your hair dries after a wash, how much does it shrink?",
    options: [
      { emoji: "📏", label: "Barely — it looks about the same length", scores: { "3a": 4, "3b": 2 } },
      { emoji: "📐", label: "A little — maybe a quarter shorter", scores: { "3b": 3, "3c": 3 } },
      { emoji: "🌀", label: "About half my length disappears", scores: { "4a": 4, "4b": 2 } },
      { emoji: "🤯", label: "More than half — people think I cut my hair", scores: { "4b": 4, "4c": 5 } },
      { emoji: "🤷🏾", label: "I've never compared wet vs dry", scores: {} },
    ],
    microcopy: "Shrinkage is one of the biggest clues to your hair type — and it's a sign of healthy elasticity!",
  },
  {
    question: "Look closely at your hair when it's soaking wet vs when it's dry. What do you notice?",
    options: [
      { emoji: "💧", label: "My curls look the same wet or dry", scores: { "3a": 3, "3b": 3 } },
      { emoji: "🔍", label: "Defined curls when wet, slightly frizzy when dry", scores: { "3c": 3, "4a": 3 } },
      { emoji: "☁️", label: "Defined coils when wet, but they vanish into fluff when dry", scores: { "4b": 4, "4c": 3 } },
      { emoji: "🧶", label: "I can't see a curl pattern even when wet — more like a dense zigzag", scores: { "4c": 5 } },
      { emoji: "😅", label: "Honestly, I've never studied it that closely", scores: {} },
    ],
    microcopy: "Wet hair shows your true pattern — dry hair shows how it behaves. Both matter!",
  },
  {
    question: "When your hair breaks off, what does the broken strand look like?",
    options: [
      { emoji: "🪶", label: "Really thin, almost see-through", scores: { "3a": 2, "3b": 1, "4a": 2 } },
      { emoji: "💪", label: "Thick and visible", scores: { "3c": 2, "4b": 2, "4c": 2 } },
      { emoji: "😐", label: "Normal I think", scores: { "3b": 1, "4a": 1 } },
      { emoji: "😳", label: "I did not know I should be checking this", scores: {} },
    ],
    microcopy: "Most people have never checked this and that is completely okay!",
  },
  {
    question: "Pick the one that sounds most like you right now:",
    options: [
      { emoji: "😤", label: "My hair breaks off a lot and I don't know why", scores: {} },
      { emoji: "🏜️", label: "No matter what I use it always feels dry", scores: {} },
      { emoji: "📏", label: "My hair just does not seem to grow", scores: {} },
      { emoji: "😵", label: "I don't even know where to start", scores: {} },
      { emoji: "🙂", label: "My hair is okay — I just want to understand it better", scores: {} },
    ],
    microcopy: "This is the most important question — be honest with yourself!",
  },
  {
    question: "How often do you actually think about your hair care?",
    options: [
      { emoji: "😅", label: "Basically never — hair just happens", scores: {} },
      { emoji: "🤔", label: "Sometimes when something goes wrong", scores: {} },
      { emoji: "📆", label: "I have a routine but I'm not sure it's working", scores: {} },
      { emoji: "🎓", label: "I think about it a lot — I just need better guidance", scores: {} },
    ],
    microcopy: "You're almost done! One more step to meet your crown 👑",
  },
];

const encouragements = [
  "Great start! Let's keep going 👑",
  "You're doing amazing! 🌟",
  "Almost halfway there! 💛",
  "Keep it up — you're doing great! 👑",
  "Nice one! Your crown is taking shape ✨",
  "You're doing great! Almost there 👑",
  "So close to meeting your crown! ✨",
  "Last question coming up! 🎉",
  "Let's see your results! 👑",
];

/* ─── result profiles ─── */
interface HairProfile {
  type: string;
  title: string;
  description: string;
  descriptionMale: string;
  habit: string;
  habitMale: string;
  product: string;
  slug: string;
}

const profiles: Record<string, HairProfile> = {
  "3a": {
    type: "Type 3A",
    title: "Loose Defined Curls",
    description:
      "Your curls are loose, shiny, and full of bounce! They love lightweight moisture and gentle handling to keep their beautiful shape.",
    descriptionMale:
      "Your curls are loose and defined with natural bounce! They stay healthy with lightweight products and minimal touching.",
    habit: "Scrunch your curls with a cotton t-shirt after washing instead of rubbing with a towel",
    habitMale: "Pat your hair dry with a cotton t-shirt instead of rubbing with a towel",
    product: "A lightweight leave-in conditioner",
    slug: "type-3a",
  },
  "3b": {
    type: "Type 3B",
    title: "Tight Springy Curls",
    description:
      "Your curls are tight, springy, and full of personality! They thrive with regular moisture and products that define without weighing them down.",
    descriptionMale:
      "Your curls are tight and springy with real definition! They stay strong with regular moisture and the right products.",
    habit: "Apply a curl cream to soaking wet hair right after washing — never let it dry without product",
    habitMale: "Keep your hair from drying out by applying a cream to it while it's still wet after washing",
    product: "A medium-hold curl defining cream",
    slug: "type-3b",
  },
  "3c": {
    type: "Type 3C",
    title: "Very Tight Dense Curls",
    description:
      "Your curls are tight, dense, and incredibly versatile! They need rich moisture and careful detangling to show off their full beauty.",
    descriptionMale:
      "Your curls are tight and dense with serious versatility! They stay healthy with deep moisture and gentle handling.",
    habit: "Deep condition your hair once a week — leave it on for at least 20 minutes",
    habitMale: "Give your hair a deep moisture treatment once a week — leave it on for 20 minutes",
    product: "A thick deep conditioning mask",
    slug: "type-3c",
  },
  "4a": {
    type: "Type 4A",
    title: "Soft Tight Coils",
    description:
      "Your coils are tight, soft, and beautifully defined! They love the LOC method — liquid, oil, cream — to lock in all that moisture.",
    descriptionMale:
      "Your coils are tight and defined with a soft texture! Layer water, oil, then cream to keep your hair from drying out.",
    habit: "Moisturise your hair every 2–3 days, not just on wash day",
    habitMale: "Keep your hair from drying out every 2–3 days, not just when you wash it",
    product: "A hydrating hair oil like jojoba or sweet almond",
    slug: "type-4a",
  },
  "4b": {
    type: "Type 4B",
    title: "Fluffy Zigzag Coils",
    description:
      "Your coils have a beautiful Z-pattern and incredible volume! Heavy butters and protective styles will help your hair flourish and retain length.",
    descriptionMale:
      "Your coils have a zigzag pattern with amazing volume! Rich products and low manipulation styles help with length retention.",
    habit: "Sleep with a satin pillowcase or bonnet every single night — this alone reduces breakage massively",
    habitMale: "Sleep on a satin pillowcase every night — this alone makes a huge difference to breakage",
    product: "A thick shea butter-based hair cream",
    slug: "type-4b",
  },
  "4c": {
    type: "Type 4C",
    title: "Very Tight Coils",
    description:
      "Your coils are the tightest pattern — incredibly versatile and strong! Daily moisture and gentle handling will unlock your hair's full potential.",
    descriptionMale:
      "Your coils are super tight and incredibly versatile! Daily moisture and gentle handling are the keys to keeping them strong.",
    habit: "Never detangle dry hair — always use water and conditioner, working from ends to roots",
    habitMale: "Never comb or pick dry hair — always wet it with water and conditioner first, starting from the ends",
    product: "A heavy leave-in butter and a spray bottle of water",
    slug: "type-4c",
  },
};

/* ─── component ─── */
const QuizPage = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [gender, setGender] = useState<Gender>("neutral");
  const [scores, setScores] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);
  const [showEncouragement, setShowEncouragement] = useState(false);
  const [paywallOpen, setPaywallOpen] = useState(false);

  const handleAnswer = (option: Option) => {
    // Q1 sets gender
    if (currentQ === 0 && option.gender) {
      setGender(option.gender);
      localStorage.setItem("crowncare_gender", option.gender);
    }

    // accumulate scores
    if (option.scores) {
      const newScores = { ...scores };
      Object.entries(option.scores).forEach(([k, v]) => {
        newScores[k] = (newScores[k] || 0) + v;
      });
      setScores(newScores);
    }

    if (currentQ < questions.length - 1) {
      setShowEncouragement(true);
      setTimeout(() => {
        setShowEncouragement(false);
        setCurrentQ((q) => q + 1);
      }, 1200);
    } else {
      // last question → loading screen
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setFinished(true);
      }, 3000);
    }
  };

  const getResult = (): HairProfile => {
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const key = sorted.length > 0 ? sorted[0][0] : "4a";
    const profile = profiles[key];
    localStorage.setItem("crowncare_hairtype", key);
    return profile;
  };

  const restart = () => {
    setCurrentQ(0);
    setScores({});
    setGender("neutral");
    setFinished(false);
    setLoading(false);
    setShowEncouragement(false);
  };

  const result = finished ? getResult() : null;
  const progress = loading || finished ? 100 : (currentQ / questions.length) * 100;
  const isMale = gender === "male";

  const handleShare = () => {
    if (!result) return;
    const text = `I just discovered my hair type with Crown Care! I have ${result.type} — ${result.title} 👑\n\nTake the quiz: ${window.location.origin}/quiz`;
    if (navigator.share) {
      navigator.share({ title: "My Crown Profile", text });
    } else {
      navigator.clipboard.writeText(text);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "#1a3a2a" }}>
      <Seo
        title="Meet Your Crown — Hair Type Quiz"
        description="Take the Meet Your Crown quiz and discover your natural hair type, plus a personalized starter routine for your Type 3 or Type 4 crown."
        path="/quiz"
      />
      <Navbar />

      <section className="pt-24 pb-16 min-h-screen">
        <div className="container mx-auto px-4 max-w-2xl">
          {/* Logo */}
          <div className="text-center mb-6">
            <h1 className="font-serif text-3xl md:text-4xl" style={{ color: "#d4a843" }}>
              Crown<span style={{ color: "#f0e6d0" }}>Care</span>
            </h1>
          </div>

          {/* Title */}
          <div className="text-center mb-6">
            <p className="text-sm uppercase tracking-widest mb-2 font-semibold" style={{ color: "#d4a843" }}>
              Meet Your Crown
            </p>
            <h2 className="text-2xl md:text-4xl font-serif mb-2" style={{ color: "#f0e6d0" }}>
              Discover Your Hair Type
            </h2>
            <p className="text-sm" style={{ color: "#a8c5a0" }}>
              Answer 9 quick questions — no fancy hair knowledge needed.
            </p>
          </div>

          {/* Progress bar */}
          <div className="w-full rounded-full h-2 mb-8" style={{ background: "#2d5a3d" }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: "#d4a843" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>

          <AnimatePresence mode="wait">
            {/* Encouragement overlay */}
            {showEncouragement && (
              <motion.div
                key="encourage"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex items-center justify-center py-16"
              >
                <p className="text-xl font-semibold text-center" style={{ color: "#d4a843" }}>
                  {encouragements[currentQ] || "Keep going! 👑"}
                </p>
              </motion.div>
            )}

            {/* Loading screen */}
            {loading && !finished && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-20"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="text-6xl mb-6"
                >
                  👑
                </motion.div>
                <p className="text-xl font-serif" style={{ color: "#d4a843" }}>
                  Building your Crown Profile...
                </p>
              </motion.div>
            )}

            {/* Questions */}
            {!showEncouragement && !loading && !finished && (
              <motion.div
                key={`q-${currentQ}`}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl p-6 md:p-8"
                style={{ background: "#24493a", border: "1px solid #3a6b52" }}
              >
                <p className="text-xs mb-1" style={{ color: "#a8c5a0" }}>
                  Question {currentQ + 1} of {questions.length}
                </p>
                <h3 className="text-lg md:text-xl font-serif mb-6" style={{ color: "#f0e6d0" }}>
                  {questions[currentQ].question}
                </h3>
                <div className="space-y-3">
                  {questions[currentQ].options.map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => handleAnswer(opt)}
                      className="w-full text-left p-4 rounded-xl transition-all flex items-start gap-3"
                      style={{
                        background: "#1a3a2a",
                        border: "1px solid #3a6b52",
                        color: "#f0e6d0",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "#d4a843";
                        e.currentTarget.style.background = "#2d5a3d";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "#3a6b52";
                        e.currentTarget.style.background = "#1a3a2a";
                      }}
                    >
                      <span className="text-xl flex-shrink-0">{opt.emoji}</span>
                      <span className="text-sm md:text-base">{opt.label}</span>
                    </button>
                  ))}
                </div>
                <p className="text-xs mt-4 italic" style={{ color: "#7ba87a" }}>
                  {questions[currentQ].microcopy}
                </p>
              </motion.div>
            )}

            {/* Results */}
            {finished && result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl p-6 md:p-8 text-center"
                style={{ background: "#24493a", border: "1px solid #3a6b52" }}
              >
                <div className="text-5xl mb-4">👑</div>
                <h2 className="text-2xl md:text-3xl font-serif mb-2" style={{ color: "#d4a843" }}>
                  Meet your crown!
                </h2>
                <p className="text-3xl font-serif font-bold mb-4" style={{ color: "#f0e6d0" }}>
                  You have {result.type} hair
                </p>
                <p className="text-lg mb-1 font-semibold" style={{ color: "#d4a843" }}>
                  {result.title}
                </p>
                <p className="mb-8 max-w-md mx-auto text-sm leading-relaxed" style={{ color: "#a8c5a0" }}>
                  {isMale ? result.descriptionMale : result.description}
                </p>

                {/* 3 things */}
                <div className="space-y-4 text-left max-w-md mx-auto mb-8">
                  <div className="rounded-xl p-4" style={{ background: "#1a3a2a" }}>
                    <p className="text-xs uppercase tracking-wider mb-1" style={{ color: "#d4a843" }}>
                      ✅ One simple habit to start today
                    </p>
                    <p className="text-sm" style={{ color: "#f0e6d0" }}>
                      {isMale ? result.habitMale : result.habit}
                    </p>
                  </div>
                  <div className="rounded-xl p-4" style={{ background: "#1a3a2a" }}>
                    <p className="text-xs uppercase tracking-wider mb-1" style={{ color: "#d4a843" }}>
                      🧴 One product type we recommend
                    </p>
                    <p className="text-sm" style={{ color: "#f0e6d0" }}>
                      {result.product}
                    </p>
                  </div>
                </div>

                {/* Premium routine CTA → paywall */}
                <button
                  onClick={() => setPaywallOpen(true)}
                  className="w-full max-w-md mx-auto mb-4 px-6 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 text-base transition-transform hover:scale-[1.02]"
                  style={{ background: "#d4a843", color: "#1a3a2a" }}
                >
                  <Sparkles size={18} />
                  Create your routine with CrownCare
                  <span
                    className="ml-1 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded-full"
                    style={{ background: "#1a3a2a", color: "#d4a843" }}
                  >
                    <Lock size={10} /> Premium
                  </span>
                </button>
                <p className="text-xs mb-6 max-w-md mx-auto" style={{ color: "#7ba87a" }}>
                  A personalised week-by-week routine built for your {result.type} hair.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    to="/experts"
                    className="px-6 py-3 rounded-lg font-semibold inline-flex items-center justify-center gap-2 text-sm"
                    style={{ background: "transparent", color: "#d4a843", border: "1px solid #3a6b52" }}
                  >
                    Talk to an expert about your crown <ArrowRight size={16} />
                  </Link>
                  <Button
                    variant="outline"
                    onClick={handleShare}
                    className="inline-flex items-center gap-2 border-[#3a6b52] text-[#d4a843] hover:bg-[#2d5a3d]"
                    style={{ background: "transparent" }}
                  >
                    <Share2 size={16} /> Share my Crown Profile
                  </Button>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    to={`/hair-types/${result.slug}`}
                    className="text-sm underline"
                    style={{ color: "#a8c5a0" }}
                  >
                    Learn more about {result.type} hair →
                  </Link>
                  <button onClick={restart} className="text-sm underline inline-flex items-center gap-1 justify-center" style={{ color: "#7ba87a" }}>
                    <RotateCcw size={14} /> Retake quiz
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
      <PremiumModal open={paywallOpen} onClose={() => setPaywallOpen(false)} />
      <Footer />
    </div>
  );
};

export default QuizPage;
