interface StepItem {
  icon: string;
  step: string;
  heading: string;
  body: string;
}

interface HowItWorksContent {
  title: string;
  steps: StepItem[];
}

interface Props {
  content: HowItWorksContent;
}

export const HowItWorks = ({ content }: Props) => {
  return (
    <section className="py-24 px-4 bg-background">
      <div className="container max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="section-label mb-3">{content.title}</p>
          <h2 className="font-display text-4xl md:text-6xl uppercase text-foreground">
            LIVE IN <span className="text-gradient-accent">24 HOURS</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line on desktop */}
          <div className="hidden md:block absolute top-10 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px bg-gradient-to-r from-primary/20 via-accent/30 to-primary/20" />

          {content.steps.map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center relative group">
              {/* Step bubble */}
              <div className="relative mb-6">
                <div className="w-20 h-20 rounded-full border border-border bg-card flex items-center justify-center text-3xl transition-all duration-300 group-hover:border-accent/30 group-hover:scale-110">
                  {item.icon}
                </div>
                <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-primary/20 border border-accent/30 flex items-center justify-center text-[10px] font-label font-bold text-primary">
                  {item.step}
                </span>
              </div>

              <h3 className="font-label text-base font-bold text-foreground uppercase tracking-wide mb-3">
                {item.heading}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
