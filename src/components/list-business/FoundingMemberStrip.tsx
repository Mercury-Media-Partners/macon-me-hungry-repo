interface Props {
  marqueeLabel: string;
  businesses: string[];
}

export const FoundingMemberStrip = ({ marqueeLabel, businesses }: Props) => {
  // Duplicate for seamless loop
  const doubled = [...businesses, ...businesses];

  return (
    <section className="py-12 border-y border-border/40 bg-muted/10 overflow-hidden relative">
      <div className="text-center mb-6">
        <p className="section-label">
          {marqueeLabel}
        </p>
      </div>

      {/* Marquee track */}
      <div className="relative flex overflow-hidden">
        {/* Fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex gap-3 marquee-track w-max">
          {doubled.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-border bg-card/60 text-xs font-label font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap flex-shrink-0"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
