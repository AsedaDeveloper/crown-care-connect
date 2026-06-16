import { useCallback, useEffect, useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles, X } from "lucide-react";

interface TourStep {
  target: string | null;
  title: string;
  body: string;
  side: "top" | "bottom";
}

const STEPS: TourStep[] = [
  {
    target: null,
    title: "Welcome to CrownCare 👑",
    body: "Let us walk you through the platform. Under a minute, we promise.",
    side: "bottom",
  },
  {
    target: "hero-explore",
    title: "Explore Hair Types",
    body: "Start here — deep dives on every African hair texture from 3A waves to 4C coils.",
    side: "bottom",
  },
  {
    target: "hero-quiz",
    title: "Take the Hair Quiz",
    body: "Answer 5 quick questions and we'll pinpoint your exact hair type for free.",
    side: "bottom",
  },
  {
    target: "quick-links",
    title: "Your Full Toolkit",
    body: "Routine builder, curated product picks, expert videos, blogs, and community stories — all in one place.",
    side: "bottom",
  },
  {
    target: "navbar-cta",
    title: "Book a Consultation",
    body: "Ready for personalised advice? Connect one-on-one with a certified hair expert.",
    side: "bottom",
  },
];

const PAD = 8;
const TIP_W = 320;
const TIP_GAP = 14;
const SCROLL_SETTLE_MS = 560;
const TOUR_KEY = "crowncare_tour_v1";

interface SpotRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

function clamp(val: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(val, hi));
}

export const ProductTour = () => {
  const [active, setActive] = useState(false);
  const [step, setStep] = useState(0);
  const [spotRect, setSpotRect] = useState<SpotRect | null>(null);

  const cur = STEPS[step];

  const measureTarget = useCallback(async (target: string | null) => {
    if (!target) {
      setSpotRect(null);
      return;
    }
    const el = document.querySelector<HTMLElement>(`[data-tour="${target}"]`);
    if (!el) {
      setSpotRect(null);
      return;
    }
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    await new Promise<void>((res) => setTimeout(res, SCROLL_SETTLE_MS));
    const r = el.getBoundingClientRect();
    setSpotRect({
      top: r.top - PAD,
      left: r.left - PAD,
      width: r.width + PAD * 2,
      height: r.height + PAD * 2,
    });
  }, []);

  useEffect(() => {
    if (!active) return;
    measureTarget(cur.target);
    const onResize = () => measureTarget(cur.target);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [active, step, cur.target, measureTarget]);

  // Auto-start on first visit
  useEffect(() => {
    if (!localStorage.getItem(TOUR_KEY)) {
      const id = setTimeout(() => setActive(true), 1400);
      return () => clearTimeout(id);
    }
  }, []);

  const finish = () => {
    setActive(false);
    localStorage.setItem(TOUR_KEY, "1");
  };

  const next = () => (step < STEPS.length - 1 ? setStep((s) => s + 1) : finish());
  const prev = () => step > 0 && setStep((s) => s - 1);

  const tooltipPos = (): CSSProperties => {
    if (!spotRect) {
      return {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: TIP_W,
      };
    }
    const cx = spotRect.left + spotRect.width / 2;
    const left = clamp(cx - TIP_W / 2, 12, window.innerWidth - TIP_W - 12);
    if (cur.side === "bottom") {
      return { position: "fixed", top: spotRect.top + spotRect.height + TIP_GAP, left, width: TIP_W };
    }
    return { position: "fixed", bottom: window.innerHeight - spotRect.top + TIP_GAP, left, width: TIP_W };
  };

  return (
    <>
      {/* Floating re-trigger button when tour is inactive */}
      {!active && (
        <button
          onClick={() => { setStep(0); setActive(true); }}
          aria-label="Start guided tour"
          className="fixed bottom-5 right-5 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold shadow-lg hover:opacity-90 transition-opacity"
        >
          <Sparkles size={14} />
          Take a tour
        </button>
      )}

      <AnimatePresence>
        {active && (
          <>
            {/* Spotlight ring + dim — pointer-events:none so it never blocks page elements */}
            {spotRect && (
              <motion.div
                key={`spot-${step}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  position: "fixed",
                  zIndex: 9001,
                  pointerEvents: "none",
                  top: spotRect.top,
                  left: spotRect.left,
                  width: spotRect.width,
                  height: spotRect.height,
                  borderRadius: 10,
                  // Two-layer box-shadow: huge outer dim + thin primary ring
                  boxShadow:
                    "0 0 0 9999px rgba(0,0,0,0.62), 0 0 0 2px hsl(var(--primary))",
                }}
              />
            )}

            {/* Welcome-step full-page dim (no spotlight) */}
            {!spotRect && (
              <motion.div
                key="tour-dim"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  position: "fixed",
                  inset: 0,
                  zIndex: 9000,
                  background: "rgba(0,0,0,0.55)",
                  pointerEvents: "none",
                }}
              />
            )}

            {/* Tooltip card */}
            <motion.div
              key={`tip-${step}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              style={{ ...tooltipPos(), zIndex: 9002 }}
              className="rounded-2xl bg-card border border-border shadow-2xl p-5"
            >
              {/* Progress dots + close */}
              <div className="flex items-center gap-1.5 mb-3">
                {STEPS.map((_, i) => (
                  <span
                    key={i}
                    className={`block h-1.5 rounded-full transition-all duration-300 ${
                      i === step
                        ? "w-5 bg-primary"
                        : "w-1.5 bg-muted-foreground/30"
                    }`}
                  />
                ))}
                <button
                  onClick={finish}
                  aria-label="Close tour"
                  className="ml-auto text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X size={15} />
                </button>
              </div>

              <h3 className="font-serif text-lg text-foreground mb-1.5">{cur.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{cur.body}</p>

              <div className="flex items-center gap-2">
                {step > 0 && (
                  <button
                    onClick={prev}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-border text-sm text-foreground hover:bg-muted transition-colors"
                  >
                    <ChevronLeft size={14} />
                    Back
                  </button>
                )}
                <button
                  onClick={next}
                  className="ml-auto flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  {step < STEPS.length - 1 ? (
                    <>Next <ChevronRight size={14} /></>
                  ) : (
                    "Let's go! 🎉"
                  )}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductTour;
