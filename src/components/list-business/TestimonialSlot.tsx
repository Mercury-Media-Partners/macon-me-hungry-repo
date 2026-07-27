interface TestimonialContent {
  section_label: string;
  title: string;
  body: string;
  cta: string;
}

interface Props {
  content: TestimonialContent;
}

export const TestimonialSlot = ({ content }: Props) => {
  const scrollToForm = (tier: string) => {
    const el = document.getElementById("partner-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      // Pre-select tier in the form
      setTimeout(() => {
        const select = document.getElementById("form-tier") as HTMLSelectElement | null;
        if (select) select.value = tier;
      }, 600);
    }
  };

  return (
    <section className="py-20 px-4 bg-background">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <p className="section-label mb-3">
            {content.section_label}
          </p>
          <h2 className="font-display text-3xl md:text-5xl uppercase text-foreground">
            {content.title}
          </h2>
        </div>

        {/* Placeholder card — swappable for real testimonial */}
        <div className="relative rounded-2xl border border-dashed border-secondary/40 bg-card/40 p-10 text-center overflow-hidden">
          {/* Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-primary/5 pointer-events-none" />

          <div className="relative">
            {/* Badge */}
            <span className="inline-block px-3 py-1 rounded-full border border-secondary/40 bg-secondary/10 text-secondary text-[10px] font-label font-bold uppercase tracking-widest mb-6">
              ✦ {content.section_label}
            </span>

            {/* Quote mark */}
            <div className="text-6xl font-display text-secondary/20 leading-none mb-2">"</div>

            <p className="text-xl md:text-2xl font-display text-muted-foreground italic mb-2 leading-relaxed">
              {content.body}
            </p>

            {content.cta.includes("→") && (content.cta.toLowerCase().includes("see") || content.cta.toLowerCase().includes("explore") || content.cta.toLowerCase().includes("ver") || content.cta.toLowerCase().includes("ejemplo")) ? (
              <a
                href={content.cta.toLowerCase().includes("ver") || content.cta.toLowerCase().includes("ejemplo") ? "/es/businesses/ocmulgee-brewpub" : "/businesses/ocmulgee-brewpub"}
                className="inline-flex px-6 py-3 rounded-full font-label font-bold text-xs uppercase tracking-widest text-background transition-all duration-200 hover:scale-105 hover:opacity-90"
                style={{ background: "var(--gradient-gold)" }}
              >
                {content.cta}
              </a>
            ) : (
              <button
                onClick={() => scrollToForm("headliner")}
                className="inline-flex px-6 py-3 rounded-full font-label font-bold text-xs uppercase tracking-widest text-background transition-all duration-200 hover:scale-105 hover:opacity-90"
                style={{ background: "var(--gradient-gold)" }}
              >
                {content.cta}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
