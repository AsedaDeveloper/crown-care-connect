import { useEffect, useState } from "react";
import { Quote } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { supabase } from "@/integrations/supabase/client";

type T = {
  id: string;
  name: string;
  hair_type: string;
  quote: string;
  image_url: string | null;
  location: string | null;
};

const TestimonialsPage = () => {
  const [list, setList] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("testimonials").select("*").order("created_at", { ascending: false }).then(({ data }) => {
      setList(data ?? []);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen">
      <Seo title="Stories — CrownCare" description="Real testimonials from people using CrownCare to take care of Type 3 and Type 4 hair." path="/testimonials" />
      <Navbar />
      <main className="pt-24 pb-16 container mx-auto px-4 max-w-5xl">
        <div className="mb-8">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">Stories</p>
          <h1 className="text-3xl md:text-5xl font-serif text-foreground mb-3">Real crowns, real journeys</h1>
          <p className="text-muted-foreground text-lg">From across the African diaspora.</p>
        </div>

        {loading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {list.map((t) => (
              <article key={t.id} className="bg-card border border-border rounded-2xl p-6">
                <Quote size={24} className="text-primary mb-3" />
                <p className="text-foreground text-lg font-serif leading-relaxed mb-4">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  {t.image_url && <img src={t.image_url} alt={t.name} className="w-12 h-12 rounded-full object-cover" />}
                  <div>
                    <p className="font-medium text-foreground">{t.name}</p>
                    <p className="text-sm text-muted-foreground">Type {t.hair_type}{t.location ? ` · ${t.location}` : ""}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default TestimonialsPage;
