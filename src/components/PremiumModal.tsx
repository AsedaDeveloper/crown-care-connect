import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Crown, X, Check, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const PERKS = [
  "Monthly 1-on-1 session with a certified hair expert",
  "Personalised hair routine built for your exact texture",
  "Early access to new tutorials and video series",
  "Members-only product picks and exclusive discounts",
];

interface Props {
  open: boolean;
  onClose: () => void;
}

const PremiumModal = ({ open, onClose }: Props) => {
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact.trim()) return;
    setLoading(true);
    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({ email: `[PREMIUM] ${contact.trim()}` });
    setLoading(false);
    if (error) {
      toast.error("Something went wrong. Try again.");
      return;
    }
    setDone(true);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => { setDone(false); setContact(""); }, 400);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="pm-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-[8000] bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            key="pm-modal"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="fixed z-[8001] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md mx-auto px-4"
          >
            <div className="rounded-2xl bg-card border border-border shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="relative bg-primary px-6 pt-7 pb-6 text-primary-foreground">
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 opacity-70 hover:opacity-100 transition-opacity"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
                <div className="flex items-center gap-2 mb-2">
                  <Crown size={20} />
                  <span className="text-sm font-semibold uppercase tracking-widest opacity-90">
                    CrownCare Premium
                  </span>
                </div>
                <p className="text-3xl font-serif leading-tight">
                  GHS 100 – 150
                  <span className="text-base font-sans font-normal opacity-80"> / month</span>
                </p>
                <p className="text-sm opacity-80 mt-1">Early supporter price — locks in before we launch</p>
              </div>

              {/* Body */}
              <div className="px-6 py-5">
                {!done ? (
                  <>
                    <ul className="space-y-2.5 mb-5">
                      {PERKS.map((p) => (
                        <li key={p} className="flex items-start gap-2.5 text-sm text-foreground">
                          <Check size={15} className="text-primary mt-0.5 shrink-0" />
                          {p}
                        </li>
                      ))}
                    </ul>

                    <form onSubmit={handleSubmit} className="space-y-3">
                      <input
                        type="text"
                        placeholder="Your email or WhatsApp number"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        required
                        className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-60"
                      >
                        {loading ? <Loader2 size={15} className="animate-spin" /> : <Crown size={15} />}
                        {loading ? "Saving…" : "Yes, I'm interested!"}
                      </button>
                      <p className="text-xs text-center text-muted-foreground">
                        No payment yet — we'll reach out when it's ready.
                      </p>
                    </form>
                  </>
                ) : (
                  <div className="text-center py-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                      <Crown size={22} className="text-primary" />
                    </div>
                    <h3 className="font-serif text-lg text-foreground mb-1">You're on the list!</h3>
                    <p className="text-sm text-muted-foreground">
                      We'll reach out soon with next steps. Thank you for supporting CrownCare. 👑
                    </p>
                    <button
                      onClick={handleClose}
                      className="mt-5 px-6 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
                    >
                      Done
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PremiumModal;
