import { useState } from "react";
import { Menu, X, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useIsAdmin } from "@/lib/experts-store";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const learn = [
  { label: "Hair Types", href: "/hair-types", desc: "3A–4C deep dives" },
  { label: "Hair Quiz", href: "/quiz", desc: "Find your hair type" },
  { label: "Blog", href: "/blog", desc: "Care guides & science" },
  { label: "Video Series", href: "/videos", desc: "Tutorials from experts" },
  { label: "Tips", href: "/tips", desc: "Daily habits" },
];
const tools = [
  { label: "Routine Builder", href: "/routine", desc: "Custom weekly plan" },
  { label: "Product Picks", href: "/products", desc: "Curated by type & budget" },
  { label: "Crown Match", href: "/game", desc: "Mini match-3 game" },
];
const community = [
  { label: "Experts", href: "/experts", desc: "Book a consultation" },
  { label: "Gallery", href: "/gallery", desc: "Real crowns, real photos" },
  { label: "Stories", href: "/testimonials", desc: "Community journeys" },
];

const mobileLinks = [
  { group: "Learn", items: learn },
  { group: "Tools", items: tools },
  { group: "Community", items: community },
];

const MenuColumn = ({ items }: { items: typeof learn }) => (
  <ul className="grid w-[260px] gap-1 p-3">
    {items.map((item) => (
      <li key={item.href}>
        <Link
          to={item.href}
          className="block rounded-md px-3 py-2 hover:bg-muted"
        >
          <div className="text-sm font-medium text-foreground">{item.label}</div>
          <div className="text-xs text-muted-foreground">{item.desc}</div>
        </Link>
      </li>
    ))}
  </ul>
);

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const admin = useIsAdmin();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="font-serif text-2xl text-foreground">
          Crown<span className="text-primary">Care</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-2">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-sm">Learn</NavigationMenuTrigger>
                <NavigationMenuContent><MenuColumn items={learn} /></NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-sm">Tools</NavigationMenuTrigger>
                <NavigationMenuContent><MenuColumn items={tools} /></NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-sm">Community</NavigationMenuTrigger>
                <NavigationMenuContent><MenuColumn items={community} /></NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {admin && (
            <Link
              to="/admin"
              className="ml-2 inline-flex items-center gap-1.5 text-sm font-medium text-secondary hover:text-secondary/80 transition-colors"
            >
              <Shield size={14} /> Admin
            </Link>
          )}
          <Link
            data-tour="navbar-cta"
            to="/experts"
            className="ml-2 px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Book consultation
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-foreground"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-background border-b border-border"
          >
            <div className="flex flex-col gap-5 p-4">
              {mobileLinks.map((g) => (
                <div key={g.group}>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">{g.group}</p>
                  <div className="flex flex-col gap-2 pl-1">
                    {g.items.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={() => setOpen(false)}
                        className="text-sm font-medium text-foreground"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              {admin && (
                <Link
                  to="/admin"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-secondary"
                >
                  <Shield size={14} /> Admin Dashboard
                </Link>
              )}
              <Link
                to="/experts"
                onClick={() => setOpen(false)}
                className="px-5 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-semibold text-center"
              >
                Book consultation
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
