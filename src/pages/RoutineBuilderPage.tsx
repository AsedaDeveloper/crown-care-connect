import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Download, RotateCcw, Save, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

const HAIR_TYPES = ["3A","3B","3C","4A","4B","4C"] as const;
const POROSITIES = ["low","medium","high"] as const;
const GOALS = ["Moisture","Growth","Definition","Length retention","Low manipulation","Scalp health"] as const;
const BUDGETS = ["£","££","£££"] as const;

type Form = {
  hairType: typeof HAIR_TYPES[number] | "";
  porosity: typeof POROSITIES[number] | "";
  budget: typeof BUDGETS[number] | "";
  goals: string[];
};

const empty: Form = { hairType: "", porosity: "", budget: "", goals: [] };

const buildRoutine = (f: Form) => {
  const heavier = f.hairType.startsWith("4");
  const lowPo = f.porosity === "low";
  const tier = f.budget === "£££" ? "premium" : f.budget === "££" ? "mid-range" : "budget-friendly";
  const productLine = (cat: string, low: string, mid: string, hi: string) => {
    if (f.budget === "£") return low;
    if (f.budget === "££") return mid;
    return hi;
  };

  return [
    {
      step: "Pre-poo (night before or 30 min pre-wash)",
      detail: `Saturate sections with ${lowPo ? "warm jojoba or grapeseed" : "coconut or olive"} oil. Cover with a plastic cap.`,
      product: productLine("oil", "Tropic Isle JBCO", "Mielle Hawaiian Ginger Pre-shampoo", "Bread Beauty Hair Oil"),
    },
    {
      step: "Cleanse — once per week",
      detail: lowPo
        ? "Use a clarifying-leaning shampoo diluted 1:1 with warm water. Focus on the scalp."
        : "Moisturising sulphate-free shampoo. Massage scalp for 2 minutes.",
      product: productLine("cleanser", "Cantu Sulfate-Free Cleansing Cream", "Shea Moisture African Black Soap", "Bread Beauty Hair-Wash"),
    },
    {
      step: "Conditioner + finger detangle",
      detail: "Apply section by section. Detangle from tips up. Rinse with cool water.",
      product: productLine("conditioner", "Aunt Jackie's Knot On My Watch", "Mielle Babassu Conditioner", "Adwoa Beauty Baomint Conditioner"),
    },
    {
      step: "Deep condition — weekly",
      detail: heavier
        ? "30 min with a plastic cap under a warm towel. Add a tablespoon of honey for slip."
        : "20 min, no heat needed for most weeks.",
      product: productLine("dc", "Shea Moisture Manuka Honey Masque", "Camille Rose Algae Mask", "Bread Beauty Macadamia Hair-Mask"),
    },
    {
      step: "Leave-in",
      detail: lowPo
        ? "Water-based, lightweight. Mist hair first, then apply leave-in to damp strands."
        : "Cream leave-in applied to soaking wet sections.",
      product: productLine("leavein", "Cantu Curl Activator Cream", "Camille Rose Curl Maker", "Pattern Beauty Leave-In"),
    },
    {
      step: "Seal (LOC or LCO)",
      detail: heavier
        ? "Cream then heavier butter to lock in moisture."
        : "Cream then a light oil — avoid heavy butters.",
      product: productLine("sealer", "Alikay Naturals Shea-Yogurt", "Mielle Pomegranate & Honey", "Pattern Beauty Heavy Butter"),
    },
    ...(f.goals.includes("Scalp health") ? [{
      step: "Scalp massage — 5 min daily",
      detail: "Diluted rosemary or peppermint (5%) on edges and crown.",
      product: "The Mane Choice Tropical Moringa Oil",
    }] : []),
    ...(f.goals.includes("Length retention") || f.goals.includes("Low manipulation") ? [{
      step: "Protective style — every 2–3 weeks",
      detail: "Mini twists, flat twists or low-tension braids. Re-moisturise every 3 days.",
      product: "Spray bottle with water + glycerin + a few drops of leave-in",
    }] : []),
    {
      step: "Nightly protect",
      detail: "Pineapple, satin bonnet, or satin pillowcase. Re-twist every 2–3 nights if styling.",
      product: "Satin bonnet (any quality silk-lined option)",
    },
  ].map((s, i) => ({ ...s, number: i + 1, tier }));
};

const RoutineBuilderPage = () => {
  const [form, setForm] = useState<Form>(() => {
    try { return JSON.parse(localStorage.getItem("crowncare_routine_form") || "") || empty; } catch { return empty; }
  });
  const [generated, setGenerated] = useState(false);

  const routine = useMemo(() => (generated ? buildRoutine(form) : []), [form, generated]);
  const canGenerate = form.hairType && form.porosity && form.budget;

  const toggleGoal = (g: string) =>
    setForm((f) => ({ ...f, goals: f.goals.includes(g) ? f.goals.filter((x) => x !== g) : [...f.goals, g] }));

  const save = () => {
    localStorage.setItem("crowncare_routine_form", JSON.stringify(form));
    localStorage.setItem("crowncare_routine_result", JSON.stringify(routine));
    toast.success("Routine saved to this device");
  };

  return (
    <div className="min-h-screen">
      <Seo
        title="Routine Builder — CrownCare"
        description="Build a custom hair care routine tailored to your hair type, porosity, goals and budget."
        path="/routine"
      />
      <Navbar />
      <main className="pt-24 pb-16 container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">Tool</p>
          <h1 className="text-3xl md:text-5xl font-serif text-foreground mb-3">Build your routine</h1>
          <p className="text-muted-foreground text-lg">Answer four short questions. We will generate a weekly plan with product recommendations matched to your hair, your goals and your budget.</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Hair type</Label>
              <Select value={form.hairType} onValueChange={(v: any) => setForm({ ...form, hairType: v })}>
                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>{HAIR_TYPES.map((t) => <SelectItem key={t} value={t}>Type {t}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div>
              <Label>Porosity</Label>
              <Select value={form.porosity} onValueChange={(v: any) => setForm({ ...form, porosity: v })}>
                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>{POROSITIES.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div>
              <Label>Budget</Label>
              <Select value={form.budget} onValueChange={(v: any) => setForm({ ...form, budget: v })}>
                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="£">£ Budget-friendly</SelectItem>
                  <SelectItem value="££">££ Mid-range</SelectItem>
                  <SelectItem value="£££">£££ Premium</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label className="mb-3 block">Your goals (pick any)</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {GOALS.map((g) => (
                <label key={g} className="flex items-center gap-2 cursor-pointer bg-muted/50 hover:bg-muted rounded-lg px-3 py-2">
                  <Checkbox checked={form.goals.includes(g)} onCheckedChange={() => toggleGoal(g)} />
                  <span className="text-sm">{g}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button disabled={!canGenerate} onClick={() => setGenerated(true)}>
              Generate routine
            </Button>
            <Button variant="outline" onClick={() => { setForm(empty); setGenerated(false); }}>
              <RotateCcw size={16} /> Reset
            </Button>
          </div>
        </div>

        {generated && routine.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 space-y-4 print:mt-0"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-2xl md:text-3xl font-serif text-foreground">Your weekly routine</h2>
              <div className="flex gap-2 print:hidden">
                <Button variant="outline" onClick={save}><Save size={16} /> Save</Button>
                <Button variant="outline" onClick={() => window.print()}><Download size={16} /> Print / PDF</Button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground print:hidden">
              Tier: <span className="font-medium text-foreground">{routine[0].tier}</span> · Type {form.hairType} · {form.porosity} porosity
            </p>

            <ol className="space-y-3">
              {routine.map((s) => (
                <li key={s.number} className="bg-card border border-border rounded-xl p-5 flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/15 text-primary font-serif flex items-center justify-center flex-shrink-0">{s.number}</div>
                  <div className="flex-1">
                    <h3 className="font-serif text-foreground text-lg mb-1">{s.step}</h3>
                    <p className="text-muted-foreground text-sm mb-2">{s.detail}</p>
                    <p className="text-sm text-primary inline-flex items-center gap-1"><Check size={14} /> {s.product}</p>
                  </div>
                </li>
              ))}
            </ol>
          </motion.div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default RoutineBuilderPage;
