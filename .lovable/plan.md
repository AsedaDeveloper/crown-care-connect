## Scope

Build on top of the existing CrownCare platform (hair type pages, quiz, experts directory, match-3 game, navbar, branding stay as-is). Add the following:

### 1. Lovable Cloud
Enable Cloud to back persistence for bookings, newsletter, challenges progress. Tables:
- `bookings` (id, expert_id, name, email, date, time, topic, notes, created_at) — public insert, owner-only read via email
- `newsletter_subscribers` (id, email unique, created_at) — public insert, no public read
- `testimonials` (id, name, hair_type, quote, image_url, created_at) — public read, admin insert (seeded)

Existing experts list stays in localStorage (already shipped). No auth required for v1 — admin gate stays as localStorage flag.

### 2. Expert Booking (`/experts/:id` + booking form)
- Expert detail page showing photo, credentials, specialty, bio
- "Book a consultation" form: name, email, preferred date (shadcn DatePicker), time slot, topic
- Submits to `bookings` table; success toast + confirmation card
- Admin page gains a "Bookings" tab listing all requests

### 3. Routine Builder (`/routine`)
- Multi-step form: hair type (3a–4c) → porosity (low/med/high) → goals (moisture/growth/definition/length retention/low manipulation) → budget (£/££/£££)
- Generates a step-by-step weekly routine (pre-poo, cleanse, condition, deep condition, leave-in, seal, style, protect) with product category recommendations per budget tier
- "Save routine" → localStorage; "Export as PDF" via window.print stylesheet
- Visual icons per step, mobile-first cards

### 4. Video Series (`/videos`)
- Curated library of embedded YouTube videos (placeholder data — user can swap URLs later)
- Categories: Wash Day, Protective Styles, Scalp Health, Product Education, Expert Talks
- Filter chips + responsive grid with thumbnails, title, expert, duration

### 5. Resources hub
- `/blog` — Articles list + detail (`/blog/:slug`). Seeded with 6 starter posts on Type 3/4 care. Search + tag filter. SEO meta per post.
- `/products` — Curated product cards filterable by hair type, porosity, category. Affiliate-ready link field. (Static seed data.)
- `/gallery` — Instagram-style masonry grid of community photos with caption + handle. Static seed (user supplies real photos later). Clicking opens lightbox.
- `/testimonials` — Real stories grid pulled from `testimonials` table.
- Newsletter signup component embedded in footer + as a `/subscribe` inline section on home.

### 6. Navigation
Update navbar to a "Learn" / "Tools" / "Community" grouping using shadcn NavigationMenu on desktop, accordion on mobile. New top-level items: Hair Types, Quiz, Experts, Routine Builder, Videos, Blog, Game. Secondary: Products, Gallery, Testimonials in footer + Resources dropdown.

### 7. Accessibility & SEO
- Add `<main>` landmarks where missing
- aria-labels on icon buttons
- Per-route `Seo` component on every new page
- Add new routes to `scripts/generate-sitemap.ts`

## Out of scope (explicit)
- Per-user accounts / sign-up (no auth this round; bookings + newsletter are anonymous submissions)
- Real Instagram API integration (static seed only — wiring to real Instagram needs a Meta app + review)
- Real leaderboards for match-3 (stays per-device localStorage)
- High contrast mode toggle (existing palette already meets AA; can revisit if requested)
- Text-to-speech on articles
- Community Challenges section (skipped per your scope choice)
- Image sourcing — all new image slots use neutral placeholders + alt text; swap URLs once you share photos

## Order of work
1. Enable Lovable Cloud + create DB tables/policies/grants
2. Routine Builder
3. Expert detail + booking
4. Video Series
5. Blog (list + detail) + Products + Gallery + Testimonials + Newsletter
6. Navbar restructure + footer update + sitemap regen
