import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Sparkles, CheckCircle2, Users } from "lucide-react";
import { toast } from "sonner";
import { fetchSignupCount } from "@/lib/activity";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const AGE_RANGES = ["Under 18", "18–24", "25–34", "35–44", "45–54", "55+"];
const GENDERS = ["Female", "Male", "Prefer not to say"];

const inputCls =
  "w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm";

const SignupSection = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    whatsapp: "",
    age: "",
    gender: "",
    newsletter: true,
  });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetchSignupCount().then(setCount);
  }, []);

  const set =
    (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || (!form.email.trim() && !form.whatsapp.trim())) {
      toast.error("Please enter your name and at least an email or WhatsApp number.");
      return;
    }
    const payload = {
      name: form.name.trim(),
      email: form.email.trim() || null,
      whatsapp: form.whatsapp.trim() || null,
      age: form.age || null,
      gender: form.gender || null,
      newsletter: form.newsletter,
    };
    setLoading(true);
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/waitlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": SUPABASE_KEY,
          "Authorization": `Bearer ${SUPABASE_KEY}`,
          "Prefer": "return=minimal",
        },
        body: JSON.stringify(payload),
      });
      setLoading(false);
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        console.error("Signup error:", err);
        toast.error(err.message || "Something went wrong. Please try again.");
        return;
      }
      // Row is now in Supabase; the DB webhook mirrors it to Google Sheets.
    } catch (e) {
      setLoading(false);
      console.error("Network error:", e);
      toast.error("Network error. Please try again.");
      return;
    }
    setDone(true);
  };

  return (
    <section className="py-20 bg-muted/40 border-y border-border">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mx-auto text-center"
        >
          {!done ? (
            <>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest mb-4">
                <Sparkles size={12} />
                Early Access
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-3">
                Be the first to know.
              </h2>
              <p className="text-muted-foreground mb-6">
                Join the CrownCare community — get early access, expert tips, and updates delivered straight to you.
              </p>

              {/* Live count of real signups */}
              {count !== null && count > 0 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="inline-flex items-center gap-2 text-sm text-foreground mb-8"
                >
                  <Users size={14} className="text-primary" />
                  <span>
                    Join <strong className="font-semibold">{count.toLocaleString()}</strong>{" "}
                    {count === 1 ? "person" : "others"} on the early-access list
                  </span>
                </motion.p>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-left">
                <input
                  type="text"
                  placeholder="Your name *"
                  value={form.name}
                  onChange={set("name")}
                  required
                  className={inputCls}
                />
                <div className="grid grid-cols-2 gap-3">
                  <select
                    value={form.age}
                    onChange={set("age")}
                    className={`${inputCls} ${form.age ? "" : "text-muted-foreground"}`}
                  >
                    <option value="">Age range</option>
                    {AGE_RANGES.map((a) => (
                      <option key={a} value={a}>{a}</option>
                    ))}
                  </select>
                  <select
                    value={form.gender}
                    onChange={set("gender")}
                    className={`${inputCls} ${form.gender ? "" : "text-muted-foreground"}`}
                  >
                    <option value="">Gender</option>
                    {GENDERS.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>
                <input
                  type="email"
                  placeholder="Email address"
                  value={form.email}
                  onChange={set("email")}
                  className={inputCls}
                />
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-xs text-muted-foreground">or</span>
                  <div className="flex-1 h-px bg-border" />
                </div>
                <input
                  type="tel"
                  placeholder="WhatsApp number (e.g. 0501234567)"
                  value={form.whatsapp}
                  onChange={set("whatsapp")}
                  className={inputCls}
                />
                <label className="flex items-center gap-2.5 mt-1 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={form.newsletter}
                    onChange={(e) => setForm((f) => ({ ...f, newsletter: e.target.checked }))}
                    className="w-4 h-4 rounded border-border accent-[hsl(var(--primary))]"
                  />
                  <span className="text-sm text-muted-foreground">
                    Subscribe to our newsletter for hair tips &amp; updates
                  </span>
                </label>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-60 mt-1"
                >
                  {loading ? (
                    <><Loader2 size={16} className="animate-spin" /> Saving…</>
                  ) : (
                    "Join the Community"
                  )}
                </button>
                <p className="text-xs text-center text-muted-foreground">
                  No spam. We'll only reach out with things worth your time.
                </p>
              </form>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-8"
            >
              <CheckCircle2 size={48} className="text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-serif text-foreground mb-2">You're in! 🎉</h3>
              <p className="text-muted-foreground">
                Welcome to the CrownCare community. We'll be in touch soon.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default SignupSection;
