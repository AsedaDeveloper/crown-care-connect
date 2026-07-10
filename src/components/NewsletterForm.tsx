import { useState } from "react";
import { Mail } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const ZAPIER_WEBHOOK = "https://hooks.zapier.com/hooks/catch/27993072/43jdmhp/";

const schema = z.object({
  email: z.string().trim().email("Enter a valid email").max(255),
});

type Props = { variant?: "inline" | "stacked" };

const NewsletterForm = ({ variant = "inline" }: Props) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ email });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
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
        body: JSON.stringify({
          name: "Newsletter subscriber",
          email: parsed.data.email,
          newsletter: true,
        }),
      });
      setLoading(false);
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        console.error("Newsletter error:", err);
        toast.error("Could not subscribe. Try again.");
        return;
      }

      // Mirror to Google Sheets via Zapier webhook (silent — Supabase is source of truth)
      fetch(ZAPIER_WEBHOOK, {
        method: "POST",
        body: JSON.stringify({
          name: "Newsletter subscriber",
          email: parsed.data.email,
          whatsapp: "",
          age: "",
          gender: "",
          newsletter: "Yes",
          signed_up_at: new Date().toISOString(),
        }),
      }).catch(() => {});

      setEmail("");
      toast.success("Welcome to the CrownCare digest 👑");
    } catch (err) {
      setLoading(false);
      console.error("Newsletter network error:", err);
      toast.error("Could not subscribe. Try again.");
    }
  };

  return (
    <form
      onSubmit={submit}
      className={
        variant === "inline"
          ? "flex flex-col sm:flex-row gap-2 w-full max-w-md"
          : "space-y-2 w-full max-w-md"
      }
    >
      <label htmlFor="newsletter-email" className="sr-only">Email address</label>
      <Input
        id="newsletter-email"
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="flex-1"
      />
      <Button type="submit" disabled={loading}>
        <Mail size={16} /> {loading ? "Subscribing..." : "Subscribe"}
      </Button>
    </form>
  );
};

export default NewsletterForm;
