import heroAtlanta from "@/assets/hero-atlanta.jpg";
import { useLang } from "@/hooks/useLang";
import { ArrowDown } from "lucide-react";

export const HeroSection = () => {
  const { t } = useLang();

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Hero image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroAtlanta}
          alt={t(
            "Vista aérea de Midtown Atlanta de noche con luces de neón de bares gay",
            "Aerial view of Midtown Atlanta at night with gay bar neon lights"
          )}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container max-w-6xl mx-auto px-4 pt-32 pb-20">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6 animate-fade-up">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border border-secondary/50 bg-secondary/10 text-secondary">
              🏆 {t("Mundial 2026 · Atlanta", "World Cup 2026 · Atlanta")}
            </span>
            <span className="text-muted-foreground text-xs">
              {t("Guía Oficial Queer", "Official Queer Guide")}
            </span>
          </div>

          {/* Main heading */}
          <h1
            className="font-display text-[clamp(3rem,12vw,7rem)] leading-[0.9] text-foreground mb-6 animate-fade-up"
            style={{ animationDelay: "100ms", opacity: 0, animationFillMode: "forwards" }}
          >
            {t("BARES GAY", "GAY BARS")}
            <br />
            <span className="text-gradient-primary">{t("EN ATLANTA", "IN ATLANTA")}</span>
          </h1>

          <p
            className="text-lg text-foreground/80 max-w-xl leading-relaxed mb-8 animate-fade-up"
            style={{ animationDelay: "200ms", opacity: 0, animationFillMode: "forwards" }}
          >
            {t(
              "La guía definitiva del nightlife queer en Atlanta — bilingüe, actualizada para el Mundial 2026, y escrita por alguien que conoce la diferencia entre el vibe en Mary's y The Heretic.",
              "The definitive guide to Atlanta's queer nightlife — bilingual, updated for World Cup 2026, and written by someone who knows the difference between the vibe at Mary's and The Heretic."
            )}
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-4 animate-fade-up"
            style={{ animationDelay: "300ms", opacity: 0, animationFillMode: "forwards" }}
          >
            <a
              href="#bar-finder"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-semibold text-primary-foreground transition-all duration-200 hover:opacity-90 glow-primary"
              style={{ background: "var(--gradient-primary)" }}
            >
              {t("Explorar Bares", "Explore Bars")}
            </a>
            <a
              href="#lead-magnet"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-semibold border border-secondary/50 text-secondary bg-secondary/10 hover:bg-secondary/20 transition-all duration-200"
            >
              {t("Mapa PDF Gratis", "Free PDF Map")}
            </a>
          </div>

          {/* Rainbow pride bar */}
          <div
            className="mt-10 flex gap-1 animate-fade-up"
            style={{ animationDelay: "400ms", opacity: 0, animationFillMode: "forwards" }}
          >
            {["#E40303", "#FF8C00", "#FFED00", "#008026", "#004DFF", "#750787"].map((c) => (
              <div key={c} className="h-1 flex-1 rounded-full" style={{ backgroundColor: c }} />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground animate-bounce">
        <ArrowDown size={20} />
      </div>
    </section>
  );
};
