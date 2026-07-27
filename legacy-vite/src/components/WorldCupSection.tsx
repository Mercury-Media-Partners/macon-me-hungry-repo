import { useLang } from "@/hooks/useLang";
import { Trophy, Bus, Shield, Globe } from "lucide-react";

const tips = [
  {
    icon: <Trophy size={22} />,
    titleEs: "Partidos en Pantalla Grande",
    titleEn: "Matches on the Big Screen",
    descEs: "Todos los bares del directorio transmiten los partidos del Mundial 2026. Bulldogs y Woofs tienen las mejores pantallas.",
    descEn: "Every bar in our directory will broadcast World Cup 2026 matches. Bulldogs and Woofs have the best screens.",
  },
  {
    icon: <Bus size={22} />,
    titleEs: "Del Estadio al Bar",
    titleEn: "Stadium to Bar",
    descEs: "Mercedes-Benz Stadium está a 20 min en Uber de Midtown. MARTA's Blue Line te deja en 5th & Tech Green.",
    descEn: "Mercedes-Benz Stadium is 20 min by Uber to Midtown. MARTA's Blue Line drops you at 5th & Tech Green.",
  },
  {
    icon: <Shield size={22} />,
    titleEs: "¿Es seguro Midtown Atlanta?",
    titleEn: "Is Midtown Atlanta Safe?",
    descEs: "Sí. El Gayborhood de Midtown es uno de los vecindarios más amigables y vibrantes de Atlanta. Caminable de noche.",
    descEn: "Yes. Midtown's Gayborhood is one of Atlanta's most welcoming and vibrant neighborhoods. Walkable at night.",
  },
  {
    icon: <Globe size={22} />,
    titleEs: "Bares Bilingüe-Friendly",
    titleEn: "Bilingual-Friendly Bars",
    descEs: "Blake's y Mary's tienen personal hispanohablante. Pide en español sin problema — somos Atlanta, somos inclusivos.",
    descEn: "Blake's and Mary's have Spanish-speaking staff. Order in Spanish with no problem — this is Atlanta, we're inclusive.",
  },
];

export const WorldCupSection = () => {
  const { lang, t } = useLang();

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* BG accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent pointer-events-none" />

      <div className="container max-w-6xl mx-auto relative">
        <div className="mb-12 text-center animate-fade-up">
          <p className="section-label mb-2 text-secondary">{t("Mundial 2026", "World Cup 2026")}</p>
          <h2 className="font-display text-5xl md:text-7xl text-foreground leading-none mb-4">
            {t("GUÍA DE", "THE OFFICIAL")}
            <br />
            <span className="text-gradient-gold">{t("SOBREVIVENCIA", "SURVIVAL GUIDE")}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t(
              "Atlanta es sede del Mundial 2026. Esta es tu guía queer y bilingüe para vivir los partidos como se debe.",
              "Atlanta is a 2026 World Cup host city. This is your queer, bilingual guide to experiencing the matches the right way."
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tips.map((tip, i) => (
            <div
              key={i}
              className="bar-card p-6 flex gap-5 items-start animate-fade-up"
              style={{ animationDelay: `${i * 100}ms`, opacity: 0, animationFillMode: "forwards" }}
            >
              <div className="w-11 h-11 rounded-lg bg-secondary/15 border border-secondary/30 flex items-center justify-center text-secondary shrink-0">
                {tip.icon}
              </div>
              <div>
                <h3 className="font-display text-xl text-foreground mb-2">
                  {t(tip.titleEs, tip.titleEn)}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t(tip.descEs, tip.descEn)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Schema bait */}
        <div className="mt-12 p-6 rounded-xl border border-secondary/30 bg-secondary/5">
          <p className="font-display text-lg text-secondary mb-4">
            {t("PREGUNTAS FRECUENTES", "FREQUENTLY ASKED")}
          </p>
          <div className="space-y-4">
            {[
              {
                q: t("¿Cuándo son los partidos del Mundial en Atlanta?", "When are World Cup matches in Atlanta?"),
                a: t(
                  "Atlanta (Mercedes-Benz Stadium) alberga partidos de grupo y de eliminatorias en junio-julio 2026. Consulta FIFA.com para el calendario exacto.",
                  "Atlanta (Mercedes-Benz Stadium) hosts group stage and knockout matches in June-July 2026. Check FIFA.com for the exact schedule."
                ),
              },
              {
                q: t("¿Hay bares gay cerca del estadio?", "Are there gay bars near the stadium?"),
                a: t(
                  "El estadio está en Downtown, a 20 minutos de Midtown (el Gayborhood). Uber y MARTA son las opciones más fáciles.",
                  "The stadium is in Downtown, 20 minutes from Midtown (the Gayborhood). Uber and MARTA are the easiest options."
                ),
              },
            ].map((faq, i) => (
              <div key={i} className="border-t border-border pt-4">
                <p className="font-semibold text-foreground text-sm mb-1">{faq.q}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
