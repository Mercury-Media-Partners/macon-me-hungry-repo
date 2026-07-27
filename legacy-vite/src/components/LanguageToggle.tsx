import { useLang } from "@/hooks/useLang";

export const LanguageToggle = () => {
  const { lang, setLang } = useLang();
  return (
    <div className="flex items-center gap-1 bg-muted rounded-full p-1 border border-border">
      <button
        onClick={() => setLang("es")}
        className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 ${
          lang === "es"
            ? "bg-primary text-primary-foreground glow-primary"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        ES
      </button>
      <button
        onClick={() => setLang("en")}
        className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 ${
          lang === "en"
            ? "bg-primary text-primary-foreground glow-primary"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        EN
      </button>
    </div>
  );
};
