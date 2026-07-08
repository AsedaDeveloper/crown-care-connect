import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Droplets, Moon, Scissors, ShieldCheck, Sparkles, Heart, Leaf } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Seo } from "@/components/Seo";


type HairData = {
  title: string;
  subtypes: string;
  image: string;
  imageAlt: string;
  overview: string;
  characteristics: string[];
  routine: { step: string; detail: string }[];
  tips: { icon: any; title: string; text: string }[];
  doList: string[];
  dontList: string[];
};

const hairTypeData: Record<string, HairData> = {
  "type-3a": {
    title: "Type 3A — Curly",
    subtypes: "Loose defined curls",
    image: "https://images.unsplash.com/photo-1495490140452-5a226aef25d4?w=900&q=80",
    imageAlt: "Black woman with loose defined 3A curls",
    overview:
      "Type 3A hair has large loose curls about the size of a piece of sidewalk chalk. It's naturally shiny with a well defined curl pattern and tends to be fine in texture, which makes it light and bouncy but easily weighed down.",
    characteristics: [
      "Large loose curls (sidewalk chalk size)",
      "Well defined curl pattern",
      "Naturally shiny",
      "Tends to be fine in texture",
      "Easily weighed down by heavy products",
    ],
    routine: [
      { step: "Cleanse", detail: "Use a lightweight sulfate-free shampoo 1–2 times a week. Co-wash on other days." },
      { step: "Condition", detail: "Apply a moisturising conditioner and finger-detangle in the shower." },
      { step: "Style", detail: "Use a light leave-in and a curl cream or mousse on soaking wet hair." },
      { step: "Dry", detail: "Air dry or diffuse on low heat. Don't touch curls while they set." },
    ],
    tips: [
      { icon: Droplets, title: "Keep it Light", text: "3A loves water-based products. Heavy butters can flatten the pattern." },
      { icon: Moon, title: "Pineapple at Night", text: "Loose high ponytail and a satin pillowcase preserves curls overnight." },
      { icon: Scissors, title: "Trim Regularly", text: "Every 8–10 weeks to keep ends fresh and curls bouncy." },
      { icon: ShieldCheck, title: "Avoid Heat", text: "Heat damages the curl pattern fast on fine hair. Always use a protectant." },
    ],
    doList: [
      "Use the squish to condish technique",
      "Detangle when hair is wet and conditioned",
      "Dry with a microfibre towel or cotton t-shirt",
      "Deep condition every 2 weeks",
    ],
    dontList: [
      "Brush curls when dry",
      "Use heavy waxes or butters daily",
      "Touch curls while they're drying",
      "Use regular towels — they cause frizz",
    ],
  },
  "type-3b": {
    title: "Type 3B — Curly",
    subtypes: "Springy ringlets",
    image: "https://images.unsplash.com/photo-1656473040206-53753fbbc767?w=900&q=80",
    imageAlt: "Black person with medium springy 3B curls",
    overview:
      "Type 3B hair has medium springy curls about the size of a Sharpie marker. It has more volume than 3A but is also drier and more prone to frizz, so keeping moisture in is the top priority.",
    characteristics: [
      "Medium springy ringlets (Sharpie size)",
      "More volume than 3A",
      "Drier and more frizz-prone than 3A",
      "Fine to medium texture",
      "Holds definition well when styled",
    ],
    routine: [
      { step: "Cleanse", detail: "Sulfate-free shampoo once a week. Co-wash mid-week to refresh." },
      { step: "Condition", detail: "Use a rich conditioner and detangle gently with a wide-tooth comb." },
      { step: "Style", detail: "Layer leave-in, curl cream, and a defining gel using the praying hands method." },
      { step: "Dry", detail: "Diffuse on low or air dry. Scrunch the cast out once fully dry." },
    ],
    tips: [
      { icon: Droplets, title: "Layer Your Products", text: "3B holds onto product well — layering leave-in, cream and gel gives serious definition." },
      { icon: Moon, title: "Satin Sleep", text: "Bonnet or satin pillowcase keeps curls intact for day-2 hair." },
      { icon: Sparkles, title: "Plop to Dry", text: "Plopping in a t-shirt for 20 minutes encourages curl formation and reduces frizz." },
      { icon: Heart, title: "Refresh, Don't Restyle", text: "A water and leave-in spritz revives curls between wash days." },
    ],
    doList: [
      "Use a curl cream and gel combo",
      "Plop hair after applying products",
      "Deep condition every 2 weeks",
      "Refresh with water between wash days",
    ],
    dontList: [
      "Brush dry curls",
      "Use sulfates that strip moisture",
      "Touch hair while drying",
      "Skip a leave-in",
    ],
  },
  "type-3c": {
    title: "Type 3C — Curly",
    subtypes: "Tight corkscrews",
    image: "https://images.unsplash.com/photo-1641522682419-7e52d83a8ce5?w=900&q=80",
    imageAlt: "Black person with tight 3C corkscrew curls",
    overview:
      "Type 3C hair has very tight corkscrew curls about the size of a pencil or straw. It's dense and full with lots of volume, sitting right on the border between curly and coily.",
    characteristics: [
      "Tight corkscrew curls (pencil or straw size)",
      "Dense and full of volume",
      "Borders between curly and coily",
      "Noticeable shrinkage when dry (often 30–50%)",
      "Needs consistent moisture",
    ],
    routine: [
      { step: "Cleanse", detail: "Sulfate-free shampoo every 7–10 days. Co-wash to keep moisture up." },
      { step: "Deep Condition", detail: "Weekly with heat or a steamer for 20+ minutes." },
      { step: "Style", detail: "Apply leave-in, then curl cream, then gel in sections on soaking wet hair." },
      { step: "Dry", detail: "Air dry or diffuse low and slow. Don't manipulate while drying." },
    ],
    tips: [
      { icon: Droplets, title: "Section Your Wash", text: "Working in 4 sections prevents tangles and gives every coil moisture." },
      { icon: Moon, title: "Pineapple + Bonnet", text: "Loose pineapple under a satin bonnet protects definition through the night." },
      { icon: Sparkles, title: "Finger Coil", text: "For maximum definition, finger coil small sections after applying gel." },
      { icon: Heart, title: "Embrace Shrinkage", text: "Shrinkage is healthy — it means your hair has elasticity." },
    ],
    doList: [
      "Wash and style in sections",
      "Use a denman brush or fingers to define",
      "Deep condition weekly",
      "Sleep in a satin bonnet",
    ],
    dontList: [
      "Detangle dry hair",
      "Use a regular brush",
      "Skip deep conditioning",
      "Pile hair on top of head when washing",
    ],
  },
  "type-4a": {
    title: "Type 4A — Coily",
    subtypes: "Tight S-pattern coils",
    image: "https://images.unsplash.com/photo-1652118856074-fae1150da58b?w=900&q=80",
    imageAlt: "Black woman with defined 4A S-pattern coils",
    overview:
      "Type 4A hair has a defined coil pattern with tight S-shaped curls about the width of a crochet needle. It looks dense but individual strands are often fine and delicate.",
    characteristics: [
      "Tight S-shaped coil pattern",
      "Visible curl definition when wet",
      "Fine individual strands but dense overall",
      "Shrinkage of 60–70%",
      "Fragile and prone to breakage",
    ],
    routine: [
      { step: "Pre-poo", detail: "Apply coconut or olive oil before washing to reduce moisture loss." },
      { step: "Cleanse", detail: "Gentle sulfate-free shampoo every 7–10 days. Focus on the scalp." },
      { step: "Deep Condition", detail: "Use a deep conditioner with heat for 20–30 minutes every wash day." },
      { step: "LOC Method", detail: "Liquid (water/leave-in), Oil (jojoba/argan), then Cream to lock in moisture." },
    ],
    tips: [
      { icon: Droplets, title: "LOC Method is Key", text: "Layer Liquid, Oil, then Cream to lock moisture into your coils all week." },
      { icon: Moon, title: "Satin Everything", text: "Satin bonnet, satin pillowcase, satin scrunchies — cotton steals moisture overnight." },
      { icon: Sparkles, title: "Finger Detangle", text: "Combs and brushes can snap 4A strands. Detangle with fingers on wet conditioned hair." },
      { icon: Heart, title: "Protective Styles", text: "Twists, braids, and updos reduce manipulation and let your hair grow without breakage." },
    ],
    doList: [
      "Deep condition every wash day",
      "Moisturise and seal every other day",
      "Use the LOC or LCO method",
      "Wear protective styles for 2–4 weeks",
      "Trim every 10–12 weeks",
    ],
    dontList: [
      "Comb or brush dry hair",
      "Use heat frequently",
      "Leave protective styles in over 6 weeks",
      "Skip deep conditioning",
      "Use products with drying alcohols",
    ],
  },
  "type-4b": {
    title: "Type 4B — Coily",
    subtypes: "Z-pattern coils",
    image: "https://images.unsplash.com/photo-1577746838851-816a43ca8733?w=900&q=80",
    imageAlt: "Black person with fluffy 4B zigzag coils",
    overview:
      "Type 4B hair bends in sharp Z-shaped angles rather than curling. It's fluffy with less definition but huge volume — and one of the most fragile hair types, with extreme shrinkage that can hide your true length.",
    characteristics: [
      "Z-shaped or zig-zag pattern",
      "Less defined curl pattern than 4A",
      "Very dense with lots of volume",
      "Shrinkage of 70–75%",
      "Extremely fragile at bend points",
    ],
    routine: [
      { step: "Pre-poo", detail: "Saturate with a heavy oil blend (castor + olive) 30 minutes before washing." },
      { step: "Cleanse", detail: "Wash in sections using a sulfate-free shampoo. Don't pile hair up." },
      { step: "Deep Condition", detail: "Apply in sections, sit under a hooded dryer or steamer for 30+ minutes." },
      { step: "Seal & Style", detail: "Use heavy butters like shea and oils like castor to seal. Twist or braid for definition." },
    ],
    tips: [
      { icon: Droplets, title: "Stretch Your Hair", text: "Banding, threading, or African threading stretches 4B and shows true length without heat." },
      { icon: ShieldCheck, title: "Section Everything", text: "Always work in small sections to prevent matting and reduce breakage." },
      { icon: Sparkles, title: "Heavy Butters Win", text: "4B loves thick rich products — shea butter, mango butter, and castor oil are essential." },
      { icon: Heart, title: "Low Manipulation", text: "Less touching = more growth. Twist-outs, flat twists, and bantu knots last for days." },
    ],
    doList: [
      "Wash and detangle in sections",
      "Use heavy creams and butters to seal",
      "Try stretch styles to prevent tangles",
      "Steam your hair for deep moisture",
      "Be patient — 4B grows, it just shrinks a lot!",
    ],
    dontList: [
      "Detangle from roots to ends — always start from ends",
      "Use fine-tooth combs",
      "Skip pre-poo treatments",
      "Pull tightly on edges",
      "Compare your hair to other textures",
    ],
  },
  "type-4c": {
    title: "Type 4C — Coily",
    subtypes: "Tight zigzag coils",
    image: "https://images.unsplash.com/photo-1632765854612-9b02b6ec2b15?w=900&q=80",
    imageAlt: "Black person with dense 4C coily hair",
    overview:
      "Type 4C is the tightest coil pattern and one of the most common hair types among people of African descent. It has the most shrinkage of any hair type but is also incredibly versatile for styling — from TWAs to elaborate updos.",
    characteristics: [
      "Very tight zigzag coils, often no visible curl pattern",
      "Maximum shrinkage — up to 75% or more",
      "Dense, thick, and full of volume",
      "Most fragile of all hair types",
      "Incredibly versatile for styling",
    ],
    routine: [
      { step: "Pre-poo", detail: "Apply a thick oil blend or conditioner overnight before wash day." },
      { step: "Cleanse", detail: "In 4–8 sections, use a cleansing conditioner or gentle sulfate-free shampoo every 7–14 days." },
      { step: "Deep Condition + Steam", detail: "Apply in sections. Steam or use a plastic cap for 30–45 minutes." },
      { step: "LCO Method", detail: "For 4C, Liquid–Cream–Oil often works better than LOC." },
    ],
    tips: [
      { icon: Droplets, title: "Water is Your #1 Product", text: "Spritz daily, then seal with oil. Dry 4C breaks — hydrated 4C thrives." },
      { icon: Moon, title: "Night Routine is Non-Negotiable", text: "Twist or braid before bed, cover with a satin bonnet, and sleep on a satin pillowcase." },
      { icon: Sparkles, title: "Shrinkage = Healthy Hair", text: "Shrinkage means elasticity. Embrace it or use gentle stretch methods like banding." },
      { icon: Heart, title: "Gentle, Gentle, Gentle", text: "4C breaks at the slightest rough handling. Be gentle in every step." },
    ],
    doList: [
      "Moisturise daily — 4C loses moisture fastest",
      "Use the LCO method",
      "Protective style regularly but not too tightly",
      "Deep condition with every wash",
      "Finger detangle or use a very wide-tooth comb",
      "Celebrate your shrinkage",
    ],
    dontList: [
      "Go more than 3 days without adding moisture",
      "Use tight rubber bands or metal clips",
      "Detangle dry hair — ever",
      "Leave braids or twists in over 8 weeks",
      "Use heat more than once a month",
      "Pull tightly on edges — traction alopecia is real",
    ],
  },
};

const HairTypeDetailPage = () => {
  const { slug } = useParams();
  const data = slug ? hairTypeData[slug] : null;

  if (!data) {
    return (
      <div className="min-h-screen">
        <Seo
          title="Hair Type Not Found — CrownCare"
          description="The hair type you were looking for could not be found. Browse all Type 3 and Type 4 hair types on CrownCare."
          path={`/hair-types/${slug ?? ""}`}
        />
        <Navbar />
        <div className="pt-24 pb-16 container mx-auto px-4 text-center">
          <h1 className="text-3xl font-serif text-foreground mb-4">Hair type not found</h1>
          <Link to="/hair-types" className="text-primary hover:underline">← Back to Hair Types</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Seo
        title={`${data.title} — CrownCare`}
        description={data.overview.slice(0, 155)}
        path={`/hair-types/${slug}`}
      />

      <Navbar />
      <section className="pt-24 pb-16 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link to="/hair-types" className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
            <ArrowLeft size={16} /> Back to Hair Types
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-8">
              <img src={data.image} alt={data.imageAlt} className="w-full h-full object-cover" />
            </div>
            <h1 className="text-3xl md:text-5xl font-serif text-foreground mb-2">{data.title}</h1>
            <p className="text-primary font-medium mb-6">{data.subtypes}</p>
            <p className="text-muted-foreground text-lg mb-12">{data.overview}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-12">
            <h2 className="text-2xl font-serif text-foreground mb-4">Characteristics</h2>
            <div className="flex flex-wrap gap-3">
              {data.characteristics.map((c) => (
                <span key={c} className="px-4 py-2 bg-card border border-border rounded-full text-sm text-foreground">
                  {c}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mb-12">
            <h2 className="text-2xl font-serif text-foreground mb-6">Care Routine</h2>
            <div className="space-y-4">
              {data.routine.map((r, i) => (
                <div key={r.step} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-bold text-sm">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{r.step}</h3>
                    <p className="text-muted-foreground">{r.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mb-12">
            <h2 className="text-2xl font-serif text-foreground mb-6">Care Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.tips.map((tip) => (
                <div key={tip.title} className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <tip.icon className="text-secondary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-serif text-foreground mb-1">{tip.title}</h3>
                    <p className="text-sm text-muted-foreground">{tip.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-secondary/5 border border-secondary/20 rounded-2xl p-6">
                <h3 className="text-xl font-serif text-secondary mb-4">✅ Do's</h3>
                <ul className="space-y-2">
                  {data.doList.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                      <Leaf className="text-secondary flex-shrink-0 mt-0.5" size={14} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-destructive/5 border border-destructive/20 rounded-2xl p-6">
                <h3 className="text-xl font-serif text-destructive mb-4">❌ Don'ts</h3>
                <ul className="space-y-2">
                  {data.dontList.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                      <ShieldCheck className="text-destructive flex-shrink-0 mt-0.5" size={14} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default HairTypeDetailPage;
