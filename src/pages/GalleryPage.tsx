import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { gallery, type GalleryItem } from "@/lib/seed-content";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const GalleryPage = () => {
  const [open, setOpen] = useState<GalleryItem | null>(null);

  return (
    <div className="min-h-screen">
      <Seo title="Community Gallery — CrownCare" description="Real photos and stories from the CrownCare community — tag #CrownCare to be featured." path="/gallery" />
      <Navbar />
      <main className="pt-24 pb-16 container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">Community</p>
          <h1 className="text-3xl md:text-5xl font-serif text-foreground mb-3">Real crowns</h1>
          <p className="text-muted-foreground text-lg">Tag <span className="text-primary font-medium">#CrownCare</span> on Instagram to be featured here.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {gallery.map((g) => (
            <button
              key={g.id}
              onClick={() => setOpen(g)}
              className="group block aspect-square rounded-xl overflow-hidden bg-muted relative"
              aria-label={`Open photo: ${g.caption}`}
            >
              {g.imageUrl ? (
                <img src={g.imageUrl} alt={`${g.caption} — Type ${g.hairType} hair by ${g.handle}`} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-card text-muted-foreground text-xs p-3 text-center">
                  Photo placeholder · share to feature
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/80 to-transparent p-3 text-background text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="font-medium">{g.handle}</p>
                <p>Type {g.hairType}</p>
              </div>
            </button>
          ))}
        </div>
      </main>

      <Dialog open={!!open} onOpenChange={() => setOpen(null)}>
        <DialogContent className="max-w-xl">
          <DialogTitle className="font-serif text-foreground">{open?.handle}</DialogTitle>
          {open && (
            <div>
              <div className="aspect-square bg-muted rounded-lg overflow-hidden mb-3">
                {open.imageUrl ? (
                  <img src={open.imageUrl} alt={open.caption} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">Photo placeholder</div>
                )}
              </div>
              <p className="text-foreground">{open.caption}</p>
              <p className="text-sm text-muted-foreground mt-1">Type {open.hairType}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default GalleryPage;
