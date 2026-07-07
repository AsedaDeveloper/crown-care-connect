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
    slug: "crowncare-is-launching",
    title: "CrownCare is launching — join us 👑",
    excerpt: "The hair education platform built for African hair is almost here. Here's what's coming and how to be part of it from day one.",
    category: "Announcements",
    readMin: 3,
    date: "2026-07-07",
    body: `For too long, quality hair education for African hair has been scattered, confusing, or simply not made for us. CrownCare is here to change that.

**What is CrownCare?**

CrownCare is a hair education platform built specifically for African hair — every texture, from 3A waves to 4C coils. One place to understand your hair, learn what actually works for it, and connect with real experts who get it.

**What's coming**

- **Hair type deep dives** — learn exactly what your texture needs
- **The hair quiz** — discover your hair type in minutes
- **Personalised routines** — care plans built around your hair, your schedule and your budget
- **Real experts** — consultations with certified hair specialists
- **Community** — share your journey, see real results from real people

**Be part of it from day one**

We're launching soon, and our earliest members will shape what CrownCare becomes. Join the waitlist on our home page to get early access, and be the first to know when we go live.

Your crown deserves this. See you inside. 👑

— The CrownCare Team`,
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
