import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { Input } from "@/components/ui/input";
import { posts } from "@/lib/seed-content";

const BlogPage = () => {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("All");
  const categories = useMemo(() => ["All", ...Array.from(new Set(posts.map((p) => p.category)))], []);

  const filtered = posts.filter(
    (p) =>
      (cat === "All" || p.category === cat) &&
      (p.title.toLowerCase().includes(q.toLowerCase()) || p.excerpt.toLowerCase().includes(q.toLowerCase())),
  );

  return (
    <div className="min-h-screen">
      <Seo title="Blog — CrownCare" description="Articles on African hair care, scalp health, protective styling and product education." path="/blog" />
      <Navbar />
      <main className="pt-24 pb-16 container mx-auto px-4 max-w-5xl">
        <div className="mb-8">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">Read</p>
          <h1 className="text-3xl md:text-5xl font-serif text-foreground mb-3">CrownCare Journal</h1>
          <p className="text-muted-foreground text-lg">Practical, evidence-based articles for Type 3 and Type 4 hair.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search articles" className="pl-9" />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button key={c} onClick={() => setCat(c)} className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${cat === c ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/70"}`}>{c}</button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((p) => (
            <Link key={p.slug} to={`/blog/${p.slug}`} className="bg-card border border-border rounded-2xl p-6 hover:shadow-[var(--shadow-warm)] transition-shadow">
              <p className="text-xs uppercase tracking-wider text-primary mb-2">{p.category}</p>
              <h2 className="font-serif text-foreground text-xl mb-2">{p.title}</h2>
              <p className="text-muted-foreground text-sm mb-3">{p.excerpt}</p>
              <p className="text-xs text-muted-foreground inline-flex items-center gap-1"><Clock size={12} /> {p.readMin} min read</p>
            </Link>
          ))}
          {filtered.length === 0 && <p className="text-muted-foreground">No articles match your search.</p>}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPage;
