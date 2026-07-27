import { useLang } from "@/hooks/useLang";
import { LanguageToggle } from "@/components/LanguageToggle";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export const Navbar = () => {
  const { t } = useLang();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#bar-finder", es: "Bares", en: "Bars" },
    { href: "#worldcup", es: "Mundial 2026", en: "World Cup" },
    { href: "#agencia", es: "Agencia", en: "Agency" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 backdrop-blur-md bg-background/80">
      <div className="container max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="font-display text-2xl text-foreground tracking-widest hover:text-primary transition-colors">
          BARES<span className="text-primary">ATL</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              {t(l.es, l.en)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <LanguageToggle />
          <button
            className="md:hidden text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md px-4 pb-4 pt-2 flex flex-col gap-3">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium py-2"
            >
              {t(l.es, l.en)}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};
