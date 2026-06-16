import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import NewsletterForm from "@/components/NewsletterForm";

const cols = [
  { title: "Learn", links: [
    ["Hair Types", "/hair-types"],
    ["Quiz", "/quiz"],
    ["Blog", "/blog"],
    ["Videos", "/videos"],
    ["Tips", "/tips"],
  ]},
  { title: "Tools", links: [
    ["Routine Builder", "/routine"],
    ["Products", "/products"],
    ["Crown Match", "/game"],
  ]},
  { title: "Community", links: [
    ["Experts", "/experts"],
    ["Gallery", "/gallery"],
    ["Stories", "/testimonials"],
  ]},
];

const Footer = () => {
  return (
    <footer className="pt-16 pb-10 bg-foreground text-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr,repeat(3,1fr)] gap-8 mb-10">
          <div>
            <p className="font-serif text-2xl mb-2">
              Crown<span className="text-primary">Care</span>
            </p>
            <p className="text-background/60 text-sm mb-4 max-w-xs">
              Premium hair education for Africans. Get a weekly digest with one expert tip.
            </p>
            <NewsletterForm />
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <p className="text-sm font-semibold text-background mb-3">{c.title}</p>
              <ul className="space-y-2">
                {c.links.map(([label, href]) => (
                  <li key={href}>
                    <Link to={href} className="text-sm text-background/60 hover:text-background transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-6 border-t border-background/10">
          <p className="text-xs text-background/50">© {new Date().getFullYear()} CrownCare</p>
          <div className="flex items-center gap-1 text-background/60 text-sm">
            Made with <Heart size={14} className="text-primary mx-1" /> for royalty
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
