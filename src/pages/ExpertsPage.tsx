import Navbar from "@/components/Navbar";
import ExpertsSection from "@/components/ExpertsSection";
import Footer from "@/components/Footer";
import { Seo } from "@/components/Seo";

const ExpertsPage = () => {
  return (
    <div className="min-h-screen">
      <Seo
        title="Find Hair Experts — CrownCare"
        description="Connect with trusted dermatologists, trichologists, and natural hair specialists who understand African hair textures."
        path="/experts"
      />
      <Navbar />
      <div className="pt-16">
        <ExpertsSection />
      </div>
      <Footer />
    </div>
  );
};

export default ExpertsPage;

