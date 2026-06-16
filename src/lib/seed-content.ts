// Seed content for blog, videos, products, gallery. Swap real assets in as you go.

export type Video = {
  id: string;
  title: string;
  expert: string;
  category: "Wash Day" | "Protective Styles" | "Scalp Health" | "Product Education" | "Expert Talks";
  youtubeId: string;
  duration: string;
  description: string;
};

export const videos: Video[] = [
  {
    id: "v1",
    title: "Wash day routine for Type 4 hair",
    expert: "Dr. Kemi Adesina, Trichologist",
    category: "Wash Day",
    youtubeId: "dQw4w9WgXcQ",
    duration: "12:34",
    description: "A gentle, moisture-first wash day that respects coily textures.",
  },
  {
    id: "v2",
    title: "Mini twists that actually last 6 weeks",
    expert: "Ama Boateng, Natural Hair Specialist",
    category: "Protective Styles",
    youtubeId: "dQw4w9WgXcQ",
    duration: "18:02",
    description: "Sectioning, tension control and night-time care for long-lasting twists.",
  },
  {
    id: "v3",
    title: "Why your scalp itches (and how to stop it)",
    expert: "Dr. Lerato Nkosi, Dermatologist",
    category: "Scalp Health",
    youtubeId: "dQw4w9WgXcQ",
    duration: "9:48",
    description: "Common scalp conditions in African hair and clinically-backed fixes.",
  },
  {
    id: "v4",
    title: "Reading an ingredients list in 60 seconds",
    expert: "Yaa Mensah, Product Formulator",
    category: "Product Education",
    youtubeId: "dQw4w9WgXcQ",
    duration: "6:11",
    description: "Spot fillers, drying alcohols and hero actives at a glance.",
  },
  {
    id: "v5",
    title: "Porosity test that actually works",
    expert: "Dr. Kemi Adesina, Trichologist",
    category: "Expert Talks",
    youtubeId: "dQw4w9WgXcQ",
    duration: "7:25",
    description: "Forget the float test. Here is how to read your strand under tension.",
  },
  {
    id: "v6",
    title: "Detangling Type 3C without breakage",
    expert: "Ama Boateng, Natural Hair Specialist",
    category: "Wash Day",
    youtubeId: "dQw4w9WgXcQ",
    duration: "14:08",
    description: "Finger detangling, slip products and section discipline.",
  },
];

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readMin: number;
  date: string;
  body: string;
};

export const posts: Post[] = [
  {
    slug: "moisture-vs-protein-balance",
    title: "Moisture vs protein: finding your hair's balance",
    excerpt: "Too much of either tips your hair into mush or snap. Here is the diagnostic.",
    category: "Care 101",
    readMin: 6,
    date: "2025-04-10",
    body: `Healthy African hair sits in a delicate equilibrium between moisture and protein. When that balance tips, you feel it: hair that stretches forever before snapping is begging for protein; hair that snaps the moment you tug it is starved of moisture.

**Signs you need more moisture**
- Strands feel rough or straw-like even right after a wash
- Hair snaps with minimal tension
- Shrinkage feels brittle rather than springy

**Signs you need more protein**
- Hair feels mushy or gummy when wet
- Curls have lost their bounce
- Excessive shedding even with gentle handling

Start with a single deep-conditioning session per week. Alternate a moisture mask (shea butter, glycerin, aloe) with a light protein treatment (rice water rinse, hydrolysed wheat protein) every third wash. Re-evaluate after a month.`,
  },
  {
    slug: "low-porosity-survival-guide",
    title: "Low porosity hair: a survival guide",
    excerpt: "Why water beads off your strands and how to actually moisturise them.",
    category: "Porosity",
    readMin: 7,
    date: "2025-04-22",
    body: `Low porosity hair has tightly bound cuticles. Products sit on top instead of soaking in, and water can take a full hour to penetrate. The fix is heat plus lighter formulas.

**Wash day**
- Pre-poo with warm coconut or jojoba oil for 30 minutes
- Clarify monthly to lift product build-up
- Deep condition under a steamer or with a plastic cap warmed by a blow-dryer

**Daily**
- Use water-based leave-ins, not heavy butters
- Layer lightest to heaviest: water mist, leave-in, gel, then a sealing oil
- Skip protein unless you have heat damage`,
  },
  {
    slug: "edges-recovery-plan-30-days",
    title: "A 30-day recovery plan for thinning edges",
    excerpt: "Tight styles, tension, traction — and the routine that gives your hairline a chance to come back.",
    category: "Scalp Health",
    readMin: 8,
    date: "2025-05-02",
    body: `Traction alopecia is the most common form of preventable hair loss in African women. The good news: caught early, edges can grow back.

**Days 1–10:** Stop all tension. No braids, no high buns, no tight wigs. Switch to a satin bonnet at night and a loose puff or twist-out by day.

**Days 11–20:** Daily massage with a rosemary or peppermint diluted oil (5%). 5 minutes morning and night.

**Days 21–30:** Add a clinically tested topical (minoxidil 2–5% if cleared by a dermatologist). Photograph weekly to track regrowth.

If you see no improvement after 90 days, book a trichologist consultation.`,
  },
  {
    slug: "wash-day-under-90-minutes",
    title: "How to wash, condition and style in under 90 minutes",
    excerpt: "A realistic wash day for busy weeks — without sacrificing your hair.",
    category: "Routines",
    readMin: 5,
    date: "2025-05-14",
    body: `Wash day does not need to consume your whole Sunday. Here is a 90-minute sequence that respects coily and curly textures.

1. **Pre-poo (10 min)** — Section into four, saturate with coconut oil, cover with a plastic cap.
2. **Cleanse (10 min)** — Dilute shampoo 1:1 with water, massage scalp only, rinse.
3. **Condition + detangle (20 min)** — Apply a slip-heavy conditioner section by section, finger detangle, then a wide-tooth comb.
4. **Deep condition (20 min)** — Plastic cap + warm towel, no heat needed.
5. **Style (30 min)** — LOC method (Leave-in, Oil, Cream) then twist or braid for stretch.`,
  },
  {
    slug: "best-protective-styles-by-season",
    title: "Choosing the right protective style for the season",
    excerpt: "Heat, humidity and dry cold each call for different styles.",
    category: "Styling",
    readMin: 6,
    date: "2025-05-25",
    body: `Climate shapes hair behaviour. Match the style to the season for better retention.

**Hot and humid (rainy season):** Braids, mini twists, flat twists. Avoid extensions made of synthetic kanekalon that trap heat against the scalp.

**Dry and hot (harmattan):** Wigs over flat cornrows, sealed with shea butter daily. Mist with rose water every morning.

**Cold and dry winters (UK/US):** Crochet braids or wigs with a silk-lined inner cap. Heavier sealing oils like castor.`,
  },
  {
    slug: "what-a-trichologist-actually-does",
    title: "What a trichologist actually does (and when to see one)",
    excerpt: "Trichologist vs dermatologist vs natural hair coach — explained.",
    category: "Expert Care",
    readMin: 4,
    date: "2025-06-03",
    body: `A trichologist studies the hair and scalp specifically. They diagnose conditions like alopecia, scalp dermatitis, and breakage patterns, and build long-term care plans.

**See a trichologist when:**
- You notice unexplained shedding for more than 3 months
- Your edges or crown are thinning
- Your scalp is persistently flaky, itchy or painful

**See a dermatologist when:** there is visible inflammation, scarring, or systemic symptoms.

**See a natural hair specialist when:** you need help with routine, styling and product strategy — not a medical concern.`,
  },
];

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: "Cleanser" | "Conditioner" | "Leave-in" | "Oil/Butter" | "Styler" | "Treatment";
  hairTypes: string[]; // e.g. ["4A","4B","4C"]
  porosity: ("low" | "medium" | "high")[];
  budget: "£" | "££" | "£££";
  why: string;
  link: string;
};

export const products: Product[] = [
  { id: "p1", name: "African Black Soap Shampoo", brand: "Shea Moisture", category: "Cleanser", hairTypes: ["4A","4B","4C"], porosity: ["medium","high"], budget: "££", why: "Gentle clarifier that does not strip natural oils.", link: "#" },
  { id: "p2", name: "Hydrating Cream Conditioner", brand: "Mielle Organics", category: "Conditioner", hairTypes: ["3B","3C","4A"], porosity: ["low","medium"], budget: "££", why: "Light slip without weighing curls down.", link: "#" },
  { id: "p3", name: "Avocado Hair Milk", brand: "Camille Rose", category: "Leave-in", hairTypes: ["4A","4B","4C"], porosity: ["high"], budget: "£££", why: "Deep hydration sealed in by avocado butter.", link: "#" },
  { id: "p4", name: "Jamaican Black Castor Oil", brand: "Tropic Isle", category: "Oil/Butter", hairTypes: ["3A","3B","3C","4A","4B","4C"], porosity: ["low","medium","high"], budget: "£", why: "Edge growth and scalp circulation.", link: "#" },
  { id: "p5", name: "Curl Defining Gel", brand: "Eco Styler", category: "Styler", hairTypes: ["3A","3B","3C","4A"], porosity: ["medium","high"], budget: "£", why: "Hold without flake; budget hero.", link: "#" },
  { id: "p6", name: "Rice Water Strength Treatment", brand: "Mielle Organics", category: "Treatment", hairTypes: ["4A","4B","4C"], porosity: ["high"], budget: "££", why: "Targeted protein rebuild for fragile coils.", link: "#" },
  { id: "p7", name: "Whipped Shea Butter", brand: "Alikay Naturals", category: "Oil/Butter", hairTypes: ["4B","4C"], porosity: ["high"], budget: "££", why: "Heavy seal for the driest textures.", link: "#" },
  { id: "p8", name: "Clarifying Apple Cider Rinse", brand: "Aunt Jackie's", category: "Cleanser", hairTypes: ["3A","3B","3C","4A","4B","4C"], porosity: ["low","medium","high"], budget: "£", why: "Monthly reset against build-up.", link: "#" },
];

export type GalleryItem = {
  id: string;
  imageUrl: string;
  caption: string;
  handle: string;
  hairType: string;
};

// Placeholder gallery — swap imageUrl with real photos as you collect them.
export const gallery: GalleryItem[] = [
  { id: "g1", imageUrl: "", caption: "Twist out, day 3", handle: "@adwoa.crown", hairType: "4C" },
  { id: "g2", imageUrl: "", caption: "Wash & go after the routine builder", handle: "@zanele.coils", hairType: "3C" },
  { id: "g3", imageUrl: "", caption: "Edges six months in 🙌", handle: "@ngozi.naturals", hairType: "4B" },
  { id: "g4", imageUrl: "", caption: "Mini twists, week two", handle: "@fatou.kinks", hairType: "4A" },
  { id: "g5", imageUrl: "", caption: "Flat twist out on stretched hair", handle: "@kemi.curls", hairType: "3B" },
  { id: "g6", imageUrl: "", caption: "Bantu knot out 💛", handle: "@ama.crowns", hairType: "4A" },
];
