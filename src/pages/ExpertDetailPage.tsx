import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { ArrowLeft, Calendar as CalendarIcon, Check } from "lucide-react";
import { z } from "zod";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useExperts } from "@/lib/experts-store";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const TIME_SLOTS = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00"];

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(100),
  email: z.string().trim().email("Valid email required").max(255),
  topic: z.string().trim().min(3, "Topic required").max(200),
  notes: z.string().trim().max(1000).optional(),
});

const ExpertDetailPage = () => {
  const { id } = useParams();
  const { experts } = useExperts();
  const expert = experts.find((e) => e.id === id);

  const [date, setDate] = useState<Date | undefined>();
  const [slot, setSlot] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  if (!expert) return <Navigate to="/experts" replace />;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) { toast.error("Pick a preferred date"); return; }
    if (!slot) { toast.error("Pick a time slot"); return; }
    const parsed = schema.safeParse({ name, email, topic, notes });
    if (!parsed.success) { toast.error(parsed.error.issues[0].message); return; }

    setLoading(true);
    const { error } = await supabase.from("bookings").insert({
      expert_id: expert.id,
      expert_name: expert.name,
      name: parsed.data.name,
      email: parsed.data.email,
      preferred_date: format(date, "yyyy-MM-dd"),
      time_slot: slot,
      topic: parsed.data.topic,
      notes: parsed.data.notes ?? null,
    });
    setLoading(false);
    if (error) { toast.error("Could not send request. Try again."); return; }
    setDone(true);
    toast.success("Booking request sent");
  };

  return (
    <div className="min-h-screen">
      <Seo title={`${expert.name} — CrownCare`} description={`Book a consultation with ${expert.name}, ${expert.specialty}.`} path={`/experts/${expert.id}`} />
      <Navbar />
      <main className="pt-24 pb-16 container mx-auto px-4 max-w-4xl">
        <Link to="/experts" className="inline-flex items-center gap-2 text-primary hover:underline text-sm mb-4">
          <ArrowLeft size={14} /> All experts
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-[200px,1fr] gap-6 bg-card border border-border rounded-2xl p-6 mb-8">
          <div className="w-full md:w-[200px] aspect-square rounded-xl overflow-hidden bg-muted">
            {expert.photoUrl
              ? <img src={expert.photoUrl} alt={`${expert.name}, ${expert.specialty}`} className="w-full h-full object-cover" />
              : <div className="w-full h-full bg-primary/10" />}
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-primary mb-1">{expert.specialty}</p>
            <h1 className="text-3xl md:text-4xl font-serif text-foreground mb-2">{expert.name}</h1>
            <p className="text-muted-foreground leading-relaxed mb-4">{expert.bio}</p>
            <p className="text-sm">{expert.available ? "🟢 Accepting new clients" : "⚪ Waitlist only"}</p>
          </div>
        </div>

        {done ? (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border rounded-2xl p-8 text-center">
            <div className="w-14 h-14 rounded-full bg-secondary/20 text-secondary flex items-center justify-center mx-auto mb-4">
              <Check size={28} />
            </div>
            <h2 className="font-serif text-2xl text-foreground mb-2">Request sent</h2>
            <p className="text-muted-foreground">{expert.name} will reach out to <span className="text-foreground">{email}</span> to confirm. Check your inbox in the next 48 hours.</p>
          </motion.div>
        ) : (
          <form onSubmit={submit} className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-5">
            <h2 className="font-serif text-2xl text-foreground">Request a consultation</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="bk-name">Your name</Label>
                <Input id="bk-name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="bk-email">Email</Label>
                <Input id="bk-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Preferred date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}>
                      <CalendarIcon size={16} />
                      {date ? format(date, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={date} onSelect={setDate} disabled={(d) => d < new Date(new Date().setHours(0,0,0,0))} initialFocus className="p-3 pointer-events-auto" />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label>Time slot</Label>
                <Select value={slot} onValueChange={setSlot}>
                  <SelectTrigger><SelectValue placeholder="Pick a time" /></SelectTrigger>
                  <SelectContent>{TIME_SLOTS.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="bk-topic">What would you like to discuss?</Label>
              <Input id="bk-topic" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. Thinning edges, scalp itch, routine review" required />
            </div>

            <div>
              <Label htmlFor="bk-notes">Anything else (optional)</Label>
              <Textarea id="bk-notes" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} maxLength={1000} />
            </div>

            <Button type="submit" disabled={loading} className="w-full md:w-auto">
              {loading ? "Sending..." : "Send booking request"}
            </Button>
          </form>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ExpertDetailPage;
