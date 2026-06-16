import { useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { Crown, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Seo } from "@/components/Seo";
import { loginAdmin, useIsAdmin } from "@/lib/experts-store";
import { toast } from "sonner";

const AdminLoginPage = () => {
  const admin = useIsAdmin();
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  if (admin) return <Navigate to="/admin" replace />;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(password)) {
      toast.success("Welcome back, admin 👑");
      navigate("/admin");
    } else {
      toast.error("Wrong password");
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen">
      <Seo
        title="Admin Login — CrownCare"
        description="Sign in to the CrownCare admin dashboard to manage the expert directory."
        path="/admin/login"
      />
      <Navbar />

      <div className="pt-24 pb-16 container mx-auto px-4 max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-6 text-sm">
          <ArrowLeft size={14} /> Back to site
        </Link>
        <div className="bg-card border border-border rounded-2xl p-8">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Crown className="text-primary" size={28} />
          </div>
          <h1 className="text-2xl font-serif text-center text-foreground mb-1">Admin Login</h1>
          <p className="text-sm text-muted-foreground text-center mb-6">Restricted to the platform owner.</p>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <Label>Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                autoFocus
              />
            </div>
            <Button type="submit" className="w-full">Sign in</Button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLoginPage;
