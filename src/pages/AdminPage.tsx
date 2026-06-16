import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { Plus, Pencil, Trash2, LogOut, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useExperts, useIsAdmin, logoutAdmin, type Expert } from "@/lib/experts-store";
import { Seo } from "@/components/Seo";
import { toast } from "sonner";

const SPECIALTIES = [
  "Trichologist",
  "Dermatologist",
  "Product Specialist",
  "Natural Hair Specialist",
  "Community Support",
];

const emptyForm: Omit<Expert, "id"> = {
  name: "",
  specialty: "Trichologist",
  photoUrl: "",
  bio: "",
  contact: "",
  contactType: "email",
  available: true,
};

const AdminPage = () => {
  const admin = useIsAdmin();
  const { experts, add, update, remove } = useExperts();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Expert | null>(null);
  const [form, setForm] = useState<Omit<Expert, "id">>(emptyForm);

  if (!admin) return <Navigate to="/admin/login" replace />;

  const startNew = () => {
    setEditing(null);
    setForm(emptyForm);
    setOpen(true);
  };

  const startEdit = (e: Expert) => {
    setEditing(e);
    const { id, ...rest } = e;
    setForm(rest);
    setOpen(true);
  };

  const handleSave = () => {
    if (!form.name.trim() || !form.bio.trim()) {
      toast.error("Name and bio are required");
      return;
    }
    if (editing) {
      update(editing.id, form);
      toast.success("Expert updated");
    } else {
      add(form);
      toast.success("Expert added");
    }
    setOpen(false);
  };

  const handleDelete = (e: Expert) => {
    if (confirm(`Remove ${e.name}?`)) {
      remove(e.id);
      toast.success("Expert removed");
    }
  };

  return (
    <div className="min-h-screen">
      <Seo
        title="Admin Dashboard — CrownCare"
        description="Manage the CrownCare expert directory: add, edit, and remove dermatologists, trichologists, and natural hair specialists."
        path="/admin"
      />
      <Navbar />

      <div className="pt-24 pb-16 container mx-auto px-4 max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-2 text-sm">
              <ArrowLeft size={14} /> Back to site
            </Link>
            <h1 className="text-3xl md:text-4xl font-serif text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage experts shown on the Connect page.</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={startNew}>
              <Plus size={16} /> Add Expert
            </Button>
            <Button variant="outline" onClick={() => { logoutAdmin(); toast.success("Logged out"); }}>
              <LogOut size={16} /> Logout
            </Button>
          </div>
        </div>

        {experts.length === 0 ? (
          <div className="text-center bg-card border border-border rounded-2xl p-12">
            <p className="text-muted-foreground mb-4">No experts yet. Add your first one to populate the Connect page.</p>
            <Button onClick={startNew}><Plus size={16} /> Add Expert</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {experts.map((e) => (
              <div key={e.id} className="bg-card border border-border rounded-2xl p-4 flex gap-4">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                  {e.photoUrl ? (
                    <img src={e.photoUrl} alt={e.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-primary/10" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="font-serif text-foreground truncate">{e.name}</h3>
                      <p className="text-sm text-primary">{e.specialty}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {e.available ? "🟢 Available" : "⚪ Not available"}
                      </p>
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      <button onClick={() => startEdit(e)} className="p-2 hover:bg-muted rounded-lg" aria-label="Edit">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => handleDelete(e)} className="p-2 hover:bg-destructive/10 text-destructive rounded-lg" aria-label="Delete">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{e.bio}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Expert" : "Add Expert"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Full name</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Dr. Ama Mensah" />
            </div>
            <div>
              <Label>Specialisation</Label>
              <Select value={form.specialty} onValueChange={(v) => setForm({ ...form, specialty: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {SPECIALTIES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Profile photo URL</Label>
              <Input value={form.photoUrl} onChange={(e) => setForm({ ...form, photoUrl: e.target.value })} placeholder="https://..." />
              <p className="text-xs text-muted-foreground mt-1">Paste a public image URL (Unsplash, your own host, etc.)</p>
            </div>
            <div>
              <Label>Short bio (2–3 sentences)</Label>
              <Textarea rows={3} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} placeholder="Specialises in scalp health and hair loss prevention for Type 4 hair..." />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Contact type</Label>
                <Select value={form.contactType} onValueChange={(v: any) => setForm({ ...form, contactType: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    <SelectItem value="booking">Booking link</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Contact value</Label>
                <Input value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} placeholder={form.contactType === "email" ? "name@email.com" : form.contactType === "whatsapp" ? "+233..." : "https://..."} />
              </div>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border p-3">
              <div>
                <Label>Availability</Label>
                <p className="text-xs text-muted-foreground">Currently accepting new clients</p>
              </div>
              <Switch checked={form.available} onCheckedChange={(v) => setForm({ ...form, available: v })} />
            </div>
            <Button className="w-full" onClick={handleSave}>{editing ? "Save changes" : "Add expert"}</Button>
          </div>
        </DialogContent>
      </Dialog>
      <Footer />
    </div>
  );
};

export default AdminPage;
