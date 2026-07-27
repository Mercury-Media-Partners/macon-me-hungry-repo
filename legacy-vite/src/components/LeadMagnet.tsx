import { useState } from "react";
import { useLang } from "@/hooks/useLang";
import { Download, CheckCircle2 } from "lucide-react";

export const LeadMagnet = () => {
  const { t } = useLang();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="py-20 px-4">
      <div className="container max-w-4xl mx-auto">
        <div className="relative rounded-2xl overflow-hidden border border-secondary/40 p-8 md:p-14 text-center animate-fade-up"
          style={{
            background: "linear-gradient(135deg, hsl(42 100% 52% / 0.08), hsl(224 25% 8%), hsl(330 100% 58% / 0.06))",
          }}
        >
          {/* Glow orbs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-secondary/50 bg-secondary/10 text-secondary text-xs font-semibold mb-6">
              <Download size={13} />
              {t("PDF GRATIS", "FREE PDF")}
            </div>

            <h2 className="font-display text-4xl md:text-6xl text-foreground leading-none mb-4">
              {t("MAPA NOCTURNO", "NIGHTLIFE MAP")}
              <br />
              <span className="text-gradient-gold">{t("MUNDIAL 2026", "WORLD CUP 2026")}</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-8">
              {t(
                "Descarga el mapa definitivo de bares queer en Atlanta para el Mundial 2026. Incluye rutas MARTA, horas de apertura y tips de seguridad.",
                "Download the definitive queer bar map for Atlanta's World Cup 2026. Includes MARTA routes, opening hours, and safety tips."
              )}
            </p>

            {submitted ? (
              <div className="flex items-center justify-center gap-3 text-accent font-semibold text-lg animate-fade-in">
                <CheckCircle2 size={24} />
                {t("¡Revisa tu correo!", "Check your inbox!")}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("tu@correo.com", "your@email.com")}
                  className="flex-1 px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors text-sm"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg font-semibold text-sm text-secondary-foreground transition-all duration-200 hover:opacity-90 glow-gold animate-pulse-glow whitespace-nowrap"
                  style={{ background: "var(--gradient-gold)" }}
                >
                  {t("Descargar Mapa", "Get the Map")}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
