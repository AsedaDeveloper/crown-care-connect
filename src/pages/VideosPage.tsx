import { useMemo, useState } from "react";
import { Play } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { videos, type Video } from "@/lib/seed-content";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const CATEGORIES = ["All", "Wash Day", "Protective Styles", "Scalp Health", "Product Education", "Expert Talks"] as const;

const VideosPage = () => {
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");
  const [open, setOpen] = useState<Video | null>(null);

  const list = useMemo(() => (cat === "All" ? videos : videos.filter((v) => v.category === cat)), [cat]);

  return (
    <div className="min-h-screen">
      <Seo
        title="Video Series — CrownCare"
        description="Expert tutorials on wash day, protective styles, scalp health and ingredient education for African hair."
        path="/videos"
      />
      <Navbar />
      <main className="pt-24 pb-16 container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">Watch & learn</p>
          <h1 className="text-3xl md:text-5xl font-serif text-foreground mb-3">Video series</h1>
          <p className="text-muted-foreground text-lg">Bite-sized tutorials from trichologists, dermatologists and natural hair specialists.</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${cat === c ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/70"}`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((v) => (
            <button
              key={v.id}
              onClick={() => setOpen(v)}
              className="text-left bg-card border border-border rounded-2xl overflow-hidden hover:shadow-[var(--shadow-warm)] transition-shadow group"
            >
              <div className="aspect-video bg-muted relative">
                <img
                  src={`https://i.ytimg.com/vi/${v.youtubeId}/hqdefault.jpg`}
                  alt=""
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-foreground/30 group-hover:bg-foreground/40 transition-colors">
                  <Play size={40} className="text-background" />
                </div>
                <span className="absolute bottom-2 right-2 bg-foreground/80 text-background text-xs px-2 py-0.5 rounded">{v.duration}</span>
              </div>
              <div className="p-4">
                <p className="text-xs text-primary uppercase tracking-wider mb-1">{v.category}</p>
                <h3 className="font-serif text-foreground text-lg mb-1">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.expert}</p>
              </div>
            </button>
          ))}
        </div>
      </main>

      <Dialog open={!!open} onOpenChange={() => setOpen(null)}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden">
          <DialogTitle className="sr-only">{open?.title}</DialogTitle>
          {open && (
            <div>
              <div className="aspect-video bg-black">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${open.youtubeId}`}
                  title={open.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-5">
                <h2 className="font-serif text-foreground text-xl mb-1">{open.title}</h2>
                <p className="text-sm text-primary mb-2">{open.expert} · {open.category}</p>
                <p className="text-muted-foreground">{open.description}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default VideosPage;
