import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Seo } from "@/components/Seo";


const hairTypes = [
  {
    type: "Type 3A — Curly",
    slug: "type-3a",
    subtypes: "Loose defined curls",
    description:
      "Large loose curls about the size of a piece of sidewalk chalk. Naturally shiny with a well defined curl pattern and tends to be fine in texture.",
    image: "https://images.unsplash.com/photo-1605980776566-0486c3ac7617?w=800&q=80",
    alt: "Black woman with loose defined 3A curls",
  },
  {
    type: "Type 3B — Curly",
    slug: "type-3b",
    subtypes: "Springy ringlets",
    description:
      "Medium springy curls about the size of a Sharpie marker. More volume than 3A, less prone to frizz, and ranges from fine to medium texture.",
    image: "https://images.unsplash.com/photo-1595956553066-fe24a8c33395?w=800&q=80",
    alt: "Black person with medium springy 3B curls",
  },
  {
    type: "Type 3C — Curly",
    slug: "type-3c",
    subtypes: "Tight corkscrews",
    description:
      "Very tight corkscrew curls about the size of a pencil or straw. Dense and full with lots of volume — borders between curly and coily.",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=800&q=80",
    alt: "Black person with tight 3C corkscrew curls",
  },
  {
    type: "Type 4A — Coily",
    slug: "type-4a",
    subtypes: "Tight S-pattern coils",
    description:
      "Soft defined coils with a clear S-pattern. Appears dense but individual strands are often fine and fragile.",
    image: "https://images.unsplash.com/photo-1503104834685-7205e8607eb9?w=800&q=80",
    alt: "Black woman with defined 4A S-pattern coils",
  },
  {
    type: "Type 4B — Coily",
    slug: "type-4b",
    subtypes: "Z-pattern coils",
    description:
      "Fluffy zigzag coils with less curl definition and big volume. Very prone to shrinkage—can shrink up to 75% of its true length.",
    image: "https://images.unsplash.com/photo-1604335398980-ededcadcc35a?w=800&q=80",
    alt: "Black person with fluffy 4B zigzag coils",
  },
  {
    type: "Type 4C — Coily",
    slug: "type-4c",
    subtypes: "Tight zigzag coils",
    description:
      "Very tight coils with maximum shrinkage — full, dense, and incredibly versatile for styling. The most common texture among Africans.",
    image: "https://images.unsplash.com/photo-1509783236416-c9ad59bae472?w=800&q=80",
    alt: "Black person with dense 4C coily hair",
  },
];

const HairTypesPage = () => {
  return (
    <div className="min-h-screen">
      <Seo
        title="Hair Types 3 & 4 — CrownCare"
        description="Explore Type 3 and Type 4 natural hair — from loose 3A curls to tight 4C coils. Understand your texture and learn how to care for it."
        path="/hair-types"
      />
      <Navbar />

      <section className="pt-24 pb-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">
              Know Your Hair
            </p>
            <h1 className="text-3xl md:text-5xl font-serif text-foreground mb-4">
              Every Texture is Beautiful
            </h1>
            <p className="text-muted-foreground text-lg">
              African hair comes in so many beautiful textures. Click on any type to learn about its unique characteristics and care needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {hairTypes.map((hair, i) => (
              <motion.div
                key={hair.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  to={`/hair-types/${hair.slug}`}
                  className="block bg-card rounded-2xl overflow-hidden border border-border hover:shadow-[var(--shadow-warm)] transition-all hover:scale-[1.02] group h-full"
                >
                  <div className="h-56 overflow-hidden">
                    <img
                      src={hair.image}
                      alt={hair.alt}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="text-lg font-serif text-foreground mb-1 group-hover:text-primary transition-colors">
                      {hair.type}
                    </h2>
                    <p className="text-primary text-sm font-medium mb-3">{hair.subtypes}</p>
                    <p className="text-muted-foreground text-sm mb-4">{hair.description}</p>
                    <span className="text-primary text-sm font-semibold">
                      Learn more →
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default HairTypesPage;
