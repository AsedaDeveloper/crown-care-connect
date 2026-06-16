import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Stethoscope, FlaskConical, Leaf, MessageCircle, Phone, Mail, Calendar, ExternalLink } from "lucide-react";
import { useExperts, type Expert } from "@/lib/experts-store";

const categoryIcons: Record<string, any> = {
  Trichologist: FlaskConical,
  Dermatologist: Stethoscope,
  "Product Specialist": Leaf,
  "Natural Hair Specialist": Leaf,
  "Community Support": MessageCircle,
};

const ContactLink = ({ expert }: { expert: Expert }) => {
  if (!expert.contact) return null;
  if (expert.contactType === "email") {
    return (
      <a href={`mailto:${expert.contact}`} className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline">
        <Mail size={14} /> {expert.contact}
      </a>
    );
  }
  if (expert.contactType === "whatsapp") {
    const num = expert.contact.replace(/[^\d+]/g, "");
    return (
      <a href={`https://wa.me/${num.replace(/^\+/, "")}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline">
        <Phone size={14} /> {expert.contact}
      </a>
    );
  }
  return (
    <a href={expert.contact} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline">
      <Calendar size={14} /> Book a session <ExternalLink size={12} />
    </a>
  );
};

const ExpertsSection = () => {
  const { experts } = useExperts();

  return (
    <section id="experts" className="py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">
            Expert Guidance
          </p>
          <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-4">
            You Don't Have to Figure It Out Alone
          </h2>
          <p className="text-muted-foreground text-lg">
            Connect with qualified professionals who understand African hair and can help you on your journey.
          </p>
        </div>

        {experts.length === 0 ? (
          <div className="max-w-xl mx-auto text-center bg-background border border-border rounded-2xl p-10">
            <p className="text-muted-foreground">
              We're onboarding experts right now. Check back soon to meet the people who'll help you grow your crown.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {experts.map((expert, i) => {
              const Icon = categoryIcons[expert.specialty] ?? Leaf;
              return (
                <motion.div
                  key={expert.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-background rounded-2xl overflow-hidden border border-border hover:shadow-[var(--shadow-warm)] transition-shadow flex flex-col"
                >
                  <div className="h-48 bg-muted overflow-hidden">
                    {expert.photoUrl ? (
                      <img src={expert.photoUrl} alt={expert.name} className="w-full h-full object-cover" loading="lazy" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-primary/10">
                        <Icon className="text-primary" size={48} />
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col gap-3 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-serif text-lg text-foreground">{expert.name}</h3>
                        <p className="text-primary text-sm font-medium">{expert.specialty}</p>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap ${
                          expert.available
                            ? "bg-secondary/15 text-secondary"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {expert.available ? "Available" : "Not available"}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground flex-1">{expert.bio}</p>
                    <ContactLink expert={expert} />
                    <Link
                      to={`/experts/${expert.id}`}
                      className="mt-2 inline-flex justify-center items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                    >
                      <Calendar size={14} /> Book consultation
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default ExpertsSection;
