import { useLang } from "@/hooks/useLang";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const wins = [
  { es: "Conocemos la diferencia entre Mary's y The Heretic", en: "We know the difference between Mary's and The Heretic" },
  { es: "SEO bilingüe nativo — no traducciones automáticas", en: "Native bilingual SEO — not auto-translations" },
  { es: "Experiencia hiperlocal: somos de aquí", en: "Hyper-local expertise: we're from here" },
  { es: "Estrategia de entidad local (no listas genéricas)", en: "Local entity strategy (not generic listicles)" },
  { es: "Sprint de 90 días con resultados medibles", en: "90-day sprint with measurable results" },
];

export const AgencySection = () => {
  const { t } = useLang();

  return (
    <section className="py-20 px-4 relative">
      <div className="container max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: pitch */}
          <div className="animate-fade-up">
            <p className="section-label mb-3">{t("Para Dueños de Bares", "For Bar Owners")}</p>
            <h2 className="font-display text-5xl md:text-6xl text-foreground leading-none mb-6">
              {t("EL EQUIPO", "THE TEAM")}
              <br />
              {t("QUE SÍ", "THAT")}
              <br />
              <span className="text-gradient-primary">{t("CONOCE ATLANTA", "KNOWS ATLANTA")}</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {t(
                "Una agencia de NYC no sabe la diferencia entre el ambiente en Mary's y The Heretic — nosotros sí. Somos un equipo de dos, especializados en SEO bilingüe hiperlocal para el nightlife queer de Atlanta.",
                "A NYC agency doesn't know the difference between the vibe at Mary's and The Heretic — we do. We're a two-person team specializing in hyper-local bilingual SEO for Atlanta's queer nightlife."
              )}
            </p>

            <ul className="space-y-3 mb-8">
              {wins.map((w, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                  <CheckCircle2 size={17} className="text-accent shrink-0 mt-0.5" />
                  {t(w.es, w.en)}
                </li>
              ))}
            </ul>

            <a
              href="mailto:hola@agencia.com"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-semibold text-sm text-primary-foreground transition-all duration-200 hover:opacity-90 glow-primary"
              style={{ background: "var(--gradient-primary)" }}
            >
              {t("Pide tu Auditoría Gratis", "Get Your Free Audit")}
              <ArrowRight size={16} />
            </a>
          </div>

          {/* Right: stat cards */}
          <div className="grid grid-cols-2 gap-4 animate-fade-up" style={{ animationDelay: "150ms" }}>
            {[
              { stat: "#1–3", labelEs: "Ranking objetivo para 'bares gay en atlanta'", labelEn: "Target ranking for 'gay bars atlanta'" },
              { stat: "90d", labelEs: "Sprint de resultados medibles", labelEn: "Measurable results sprint" },
              { stat: "2x", labelEs: "Idiomas, una estrategia cohesiva", labelEn: "Languages, one cohesive strategy" },
              { stat: "2026", labelEs: "El Mundial llega a Atlanta", labelEn: "The World Cup comes to Atlanta" },
            ].map((item, i) => (
              <div
                key={i}
                className="bar-card p-6 text-center animate-fade-up"
                style={{ animationDelay: `${(i + 1) * 80}ms`, opacity: 0, animationFillMode: "forwards" }}
              >
                <div className="font-display text-4xl text-gradient-primary mb-2">{item.stat}</div>
                <p className="text-xs text-muted-foreground leading-snug">{t(item.labelEs, item.labelEn)}</p>
              </div>
            ))}

            {/* B2B CTA card */}
            <div
              className="col-span-2 p-5 rounded-xl border border-primary/30 bg-primary/5 animate-fade-up"
              style={{ animationDelay: "400ms", opacity: 0, animationFillMode: "forwards" }}
            >
              <p className="font-display text-xl text-foreground mb-1">
                {t("SPRINT SEO PARA EL MUNDIAL", "WORLD CUP SEO SPRINT")}
              </p>
              <p className="text-xs text-muted-foreground">
                {t(
                  "Paquete especial para bares de Atlanta que quieren capturar tráfico internacional durante el Mundial 2026.",
                  "Special package for Atlanta bars looking to capture international traffic during World Cup 2026."
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
