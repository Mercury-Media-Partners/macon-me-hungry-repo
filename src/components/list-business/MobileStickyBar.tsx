import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface StickyBarContent {
  label: string;
  sublabel: string;
  cta: string;
}

interface Props {
  content: StickyBarContent;
}

export const MobileStickyBar = ({ content }: Props) => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("outatl-sticky-dismissed") === "true") {
      setDismissed(true);
      return;
    }

    const handleScroll = () => {
      if (window.scrollY > 300) setVisible(true);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const dismiss = () => {
    setDismissed(true);
    sessionStorage.setItem("outatl-sticky-dismissed", "true");
  };

  const scrollToForm = () => {
    document.getElementById("partner-form")?.scrollIntoView({ behavior: "smooth" });
  };

  if (dismissed || !visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      {/* Backdrop blur bar */}
      <div className="border-t border-border/60 bg-background/90 backdrop-blur-md px-4 py-3 flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-label font-bold text-foreground uppercase tracking-wide truncate">
            {content.label}
          </p>
          <p className="text-[10px] text-muted-foreground truncate">
            {content.sublabel}
          </p>
        </div>
        <button
          onClick={scrollToForm}
          className="flex-shrink-0 px-4 py-2.5 rounded-full font-label font-bold text-xs uppercase tracking-widest text-white transition-all active:scale-95"
          style={{ background: "var(--gradient-primary)" }}
        >
          {content.cta}
        </button>
        <button
          onClick={dismiss}
          className="flex-shrink-0 p-1.5 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Dismiss"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};
