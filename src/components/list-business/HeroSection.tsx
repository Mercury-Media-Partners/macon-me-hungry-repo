import { CountdownTimer } from "./CountdownTimer";

interface HeroContent {
  eyebrow: string;
  title_lines: string[];
  title_highlight: string;
  subtitle: string;
  countdown_label: string;
  countdown_date: string;
  countdown_closes_in: string;
  countdown_final: string;
  countdown_expired?: string;
  unit_days?: string;
  unit_hours?: string;
  unit_min?: string;
  unit_sec?: string;
  cta_claim: string;
  cta_pricing: string;
  stats: { value: string; label: string }[];
}

interface Props {
  content: HeroContent;
}

export const HeroSection = ({ content }: Props) => {
  const scrollToForm = () => {
    document.getElementById("partner-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center text-center px-4 pt-28 pb-12 overflow-hidden"
    >
      {/* Background skyline and glows */}
      <div className="absolute inset-0 z-0">
        <picture className="absolute inset-0 w-full h-full pointer-events-none select-none">
          <source srcSet="/images/b2b-skyline-day.webp" type="image/webp" />
          <img
            src="/images/b2b-skyline-day.png"
            alt=""
            className="w-full h-full object-cover opacity-25 filter grayscale contrast-125 brightness-90"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent pointer-events-none" />

        {/* Glows overlay */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/6 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/4 rounded-full blur-[80px] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-secondary/30 bg-secondary/10 mb-4">
          <span className="text-secondary text-xs font-label font-bold uppercase tracking-widest">
            ✨ {content.eyebrow}
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl uppercase leading-tight mb-4 tracking-tight">
          {content.title_lines.map((line, idx) => (
            <span key={idx} className="text-foreground block">{line}</span>
          ))}
          <span className="text-gradient-accent block mt-1">{content.title_highlight}</span>
        </h1>

        {/* Subhead */}
        <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-6 font-body">
          {content.subtitle}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <button
            onClick={scrollToForm}
            className="btn btn-primary"
            style={{ background: "var(--gradient-primary)" }}
          >
            {content.cta_claim}
          </button>
          <a
            href="#pricing"
            className="btn btn-secondary backdrop-blur-md bg-card/40"
          >
            {content.cta_pricing}
          </a>
        </div>

        {/* Social proof mini-stat */}
        <div className="flex items-center justify-center gap-6 lg:gap-12 pt-6 border-t border-border/30">
          {content.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-2xl md:text-3xl text-foreground leading-none">{stat.value}</p>
              <p className="text-[10px] md:text-xs text-muted-foreground font-label uppercase tracking-wide mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
