
-- Bookings
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  expert_id TEXT NOT NULL,
  expert_name TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  preferred_date DATE NOT NULL,
  time_slot TEXT NOT NULL,
  topic TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.bookings TO anon, authenticated;
GRANT ALL ON public.bookings TO service_role;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a booking" ON public.bookings FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Newsletter
CREATE TABLE public.newsletter_subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.newsletter_subscribers TO anon, authenticated;
GRANT ALL ON public.newsletter_subscribers TO service_role;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can subscribe" ON public.newsletter_subscribers FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Testimonials
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  hair_type TEXT NOT NULL,
  quote TEXT NOT NULL,
  image_url TEXT,
  location TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.testimonials TO anon, authenticated;
GRANT ALL ON public.testimonials TO service_role;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read testimonials" ON public.testimonials FOR SELECT TO anon, authenticated USING (true);

-- Seed a few testimonials
INSERT INTO public.testimonials (name, hair_type, quote, location) VALUES
('Adwoa', '4C', 'I finally understood why my hair shrinks so much. CrownCare gave me a routine that actually retains length.', 'Accra, Ghana'),
('Zanele', '3C', 'The quiz nailed my type and the routine builder paired me with products I actually love.', 'Johannesburg, SA'),
('Ngozi', '4B', 'Booking a trichologist through CrownCare changed my edges. Real experts, real African hair.', 'Lagos, Nigeria'),
('Fatou', '4A', 'I used to flat-iron weekly. The protective styling videos saved my crown.', 'Dakar, Senegal');
