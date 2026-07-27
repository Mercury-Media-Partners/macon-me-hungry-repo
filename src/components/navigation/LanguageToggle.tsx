import { useStore } from "@nanostores/react";
import { $lang, setLang } from "@/stores/langStore";
import { Globe } from "lucide-react";

export const LanguageToggle = () => {
  const lang = useStore($lang);

  const toggleLanguage = () => {
    const nextLang = lang === "es" ? "en" : "es";
    setLang(nextLang);
    
    if (typeof window !== "undefined") {
      const pathname = window.location.pathname;
      if (nextLang === "es") {
        if (!pathname.startsWith("/es")) {
          // Redirect to Spanish version
          // If pathname is "/" it becomes "/es/"
          // If pathname is "/businesses/x" it becomes "/es/businesses/x"
          const cleanPath = pathname === "/" ? "" : pathname;
          window.location.href = `/es${cleanPath}`;
        }
      } else {
        if (pathname.startsWith("/es")) {
          // Redirect to English version
          const newPath = pathname.replace(/^\/es/, "") || "/";
          window.location.href = newPath;
        }
      }
    }
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-muted/50 text-xs font-bold transition-all hover:border-primary/50 group"
    >
      <Globe size={14} className="group-hover:text-primary transition-colors" />
      <span className="tracking-widest uppercase">
        {lang === "es" ? "EN" : "ES"}
      </span>
    </button>
  );
};
