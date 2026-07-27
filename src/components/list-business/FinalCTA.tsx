import { CountdownTimer } from "./CountdownTimer";

interface FinalCTAContent {
  title: string;
  subtitle: string;
  cta: string;
  closes_label: string;
  deadline_label: string;
  countdown_date: string;
  countdown_expired?: string;
  unit_days?: string;
  unit_hours?: string;
  unit_min?: string;
  unit_sec?: string;
}

interface Props {
  content: FinalCTAContent;
}

export const FinalCTA = ({ content }: Props) => {
  const scrollToForm = () => {
    document.getElementById("partner-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-32 px-4 relative overflow-hidden bg-background">
      {/* Dramatic glow backdrop */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>

      <div className="container max-w-4xl mx-auto relative text-center">
        <p className="section-label mb-4">
          {content.closes_label}
        </p>

        <h2 className="font-display text-6xl md:text-8xl uppercase leading-none mb-6">
          <span className="text-gradient-primary block">{content.title}</span>
        </h2>

        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10">
          {content.subtitle}
        </p>

        {/* Compact countdown */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex flex-col items-center gap-2 px-6 py-4 rounded-2xl border border-border/50 bg-card/30">
            <CountdownTimer
              size="compact"
              deadline={content.countdown_date}
              expiredLabel={content.countdown_expired || "Pricing has closed"}
              unitDays={content.unit_days || "Days"}
              unitHours={content.unit_hours || "Hours"}
              unitMin={content.unit_min || "Min"}
              unitSec={content.unit_sec || "Sec"}
            />
            <p className="text-[10px] text-muted-foreground/60 font-label uppercase tracking-widest">
              {content.deadline_label}
            </p>
          </div>
        </div>

        <button
          onClick={scrollToForm}
          className="inline-flex items-center gap-2 px-10 py-5 rounded-full font-label font-bold text-base uppercase tracking-widest text-white transition-all duration-200 hover:scale-105 hover:opacity-90 shadow-[0_0_40px_hsl(330_100%_58%/0.3)]"
          style={{ background: "var(--gradient-primary)" }}
        >
          {content.cta}
        </button>
      </div>
    </section>
  );
};
