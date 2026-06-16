import { useMemo, useState } from "react";
import { ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { products } from "@/lib/seed-content";

const HAIR_TYPES = ["All","3A","3B","3C","4A","4B","4C"];
const CATEGORIES = ["All","Cleanser","Conditioner","Leave-in","Oil/Butter","Styler","Treatment"];
const BUDGETS = ["All","£","££","£££"];

const ProductsPage = () => {
  const [type, setType] = useState("All");
  const [cat, setCat] = useState("All");
  const [budget, setBudget] = useState("All");

  const list = useMemo(
    () => products.filter((p) =>
      (type === "All" || p.hairTypes.includes(type)) &&
      (cat === "All" || p.category === cat) &&
      (budget === "All" || p.budget === budget),
    ),
    [type, cat, budget],
  );

  return (
    <div className="min-h-screen">
      <Seo title="Product Recommendations — CrownCare" description="Curated, hair-type-specific product picks for Type 3 and Type 4 hair across budgets." path="/products" />
      <Navbar />
      <main className="pt-24 pb-16 container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">Shop the routine</p>
          <h1 className="text-3xl md:text-5xl font-serif text-foreground mb-3">Product picks</h1>
          <p className="text-muted-foreground text-lg">Filtered by hair type, category and budget. Honest notes, no spon.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          {[
            { label: "Hair type", value: type, set: setType, options: HAIR_TYPES },
            { label: "Category", value: cat, set: setCat, options: CATEGORIES },
            { label: "Budget", value: budget, set: setBudget, options: BUDGETS },
          ].map((f) => (
            <div key={f.label}>
              <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1 block">{f.label}</label>
              <select
                value={f.value}
                onChange={(e) => f.set(e.target.value)}
                className="w-full bg-card border border-border rounded-lg px-3 py-2 text-sm"
              >
                {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((p) => (
            <article key={p.id} className="bg-card border border-border rounded-2xl p-5">
              <p className="text-xs uppercase tracking-wider text-primary mb-1">{p.category} · {p.budget}</p>
              <h2 className="font-serif text-foreground text-lg">{p.name}</h2>
              <p className="text-sm text-muted-foreground mb-3">{p.brand}</p>
              <p className="text-sm text-foreground mb-3">{p.why}</p>
              <div className="flex flex-wrap gap-1 mb-3">
                {p.hairTypes.map((t) => <span key={t} className="text-xs bg-muted px-2 py-0.5 rounded">Type {t}</span>)}
              </div>
              <a href={p.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary text-sm hover:underline">
                Where to buy <ExternalLink size={12} />
              </a>
            </article>
          ))}
          {list.length === 0 && <p className="text-muted-foreground">No products match those filters.</p>}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductsPage;
