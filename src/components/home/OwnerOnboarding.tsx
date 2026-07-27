import { useState, useEffect } from "react";
import { Check, X, Zap } from "lucide-react";

// Auto-expires after World Cup Final
const FOUNDING_DEADLINE = new Date("2026-07-19T23:59:59-04:00");
const isFoundingActive = () => Date.now() < FOUNDING_DEADLINE.getTime();

export type PricingTier = {
  id: string;
  name: string;
  subtitle: string;
  monthly: number | null;
  annual: number | null;
  annualMonthly: number | null;
  badge: string | null;
  badgeClass: string;
  borderClass: string;
  mobileOrder: number;
  headingClass: string;
  description: string;
  whoFor?: string | null;
  features: string[];
  lockedFeatures?: string[] | null;
  roiProof?: string | null;
  cta: string;
  ctaClass: string;
  ctaGradient?: string | null;
};

export interface PricingContent {
  section_label: string;
  title_line_1: string;
  title_line_2: string;
  title_highlight: string;
  billing_monthly: string;
  billing_annual: string;
  billing_savings: string;
  period_mo: string;
  period_yr: string;
  free_label: string;
  founded_label: string;
  annual_billed_note: string;
  save_label: string;
  trust_bar: { icon: string; title: string; desc: string }[];
  tiers: PricingTier[];
}

interface Props {
  content: PricingContent;
  lang?: "en" | "es";
}

export const OwnerOnboarding = ({ content, lang = "en" }: Props) => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [showFounding, setShowFounding] = useState(false);

  const getDemoLink = (tierId: string) => {
    const prefix = "";
    if (tierId === "headliner") return `${prefix}/businesses/peachtree-and-peachtree-social-club`;
    if (tierId === "professional") return `${prefix}/businesses/mercury-media-partners`;
    if (tierId === "promoter") return `${prefix}/businesses/traffic-on-the-beltline`;
    if (tierId === "free") return `${prefix}/businesses/finca-to-filter`;
    return null;
  };

  useEffect(() => {
    setShowFounding(isFoundingActive());
  }, []);

  const getPrice = (tier: PricingTier) => {
    if (tier.monthly === null) return content.free_label;
    return isAnnual ? `$${tier.annualMonthly}` : `$${tier.monthly}`;
  };

  const getPeriod = (tier: PricingTier) => {
    if (tier.monthly === null) return "";
    return content.period_mo;
  };

  const getAnnualSavings = (tier: PricingTier) => {
    if (!tier.monthly || !tier.annual || !isAnnual) return null;
    return tier.monthly * 12 - tier.annual;
  };

  const scrollToForm = (tierId: string) => {
    const el = document.getElementById("partner-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        const select = document.getElementById("form-tier") as HTMLSelectElement | null;
        if (select) select.value = tierId;
      }, 600);
    }
  };

  return (
    <section id="pricing" className="py-24 px-4 relative overflow-hidden bg-background">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container max-w-6xl mx-auto relative">
        {/* Section header */}
        <div className="text-center mb-12">
          <p className="section-label mb-3">
            {content.section_label}
          </p>
          <h2 className="font-display text-5xl md:text-7xl text-foreground leading-none mb-6 uppercase">
            {content.title_line_1}
            <br />
            <span className="text-gradient-primary">{content.title_line_2}</span>
          </h2>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 bg-muted/40 border border-border rounded-full p-1.5 select-none">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-5 py-2.5 rounded-full text-sm font-label font-bold uppercase tracking-widest transition-all duration-200 cursor-pointer ${
                !isAnnual ? "bg-background text-foreground shadow-md" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {content.billing_monthly}
            </button>
            <button
              role="switch"
              aria-checked={isAnnual}
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative inline-flex h-7 w-12 shrink-0 items-center rounded-full border border-border bg-muted/50 p-0.5 transition-all duration-300 hover:border-primary/30 cursor-pointer"
            >
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full bg-background shadow-md transform transition-all duration-300 ${
                  isAnnual ? "translate-x-5" : "translate-x-0"
                }`}
                style={isAnnual ? { background: "var(--gradient-primary)" } : {}}
              />
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-5 py-2.5 rounded-full text-sm font-label font-bold uppercase tracking-widest transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                isAnnual ? "bg-background text-foreground shadow-md" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {content.billing_annual}
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-accent/20 text-accent border border-accent/30 tracking-wider">
                {content.billing_savings}
              </span>
            </button>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {content.tiers.map((tier) => {
            const savings = getAnnualSavings(tier);
            return (
              <div
                key={tier.id}
                className={`tier-card ${tier.borderClass} relative flex flex-col`}
              >


                {/* Badge */}
                {tier.badge && (
                  <span className={`inline-block self-start px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border mb-4 ${tier.badgeClass}`}>
                    {tier.badge}
                  </span>
                )}

                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mb-0.5">{tier.name}</p>
                  <p className="text-[11px] text-muted-foreground/60 italic mb-2">{tier.subtitle}</p>

                  <div className="flex items-baseline gap-1 mb-1">
                    <span className={`font-display text-5xl leading-none ${tier.headingClass}`}>
                      {getPrice(tier)}
                    </span>
                    {getPeriod(tier) && (
                      <span className="text-muted-foreground text-sm">{getPeriod(tier)}</span>
                    )}
                  </div>

                  {/* Annual info row */}
                  <div className="h-6 mb-2">
                    {tier.annual && isAnnual ? (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          ${tier.annual}{content.period_yr} —
                        </span>
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-accent/15 text-accent border border-accent/25 uppercase tracking-wider">
                          <Zap size={9} fill="currentColor" />
                          {content.save_label} ${savings}
                        </span>
                      </div>
                    ) : tier.annual ? (
                      <p className="text-[11px] text-muted-foreground/60">
                        ${tier.annualMonthly}{content.period_mo} {content.annual_billed_note}
                      </p>
                    ) : null}
                  </div>

                  {/* Founding Partner badge */}
                  {showFounding && tier.monthly !== null && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-secondary/30 bg-secondary/10 mb-3">
                      <span className="text-secondary text-[10px] font-label font-bold uppercase tracking-widest">
                        🏆 {content.founded_label}
                      </span>
                    </div>
                  )}

                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{tier.description}</p>
                </div>

                {/* Feature list */}
                <ul className="space-y-2.5 mb-5 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                      <Check size={14} className="text-accent mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                  {tier.lockedFeatures?.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground/40 line-through">
                      <X size={14} className="mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Who is this for — Headliner only */}
                {tier.whoFor && (
                  <div className="p-3 rounded-lg bg-secondary/5 border border-secondary/20 mb-4">
                    <p className="text-xs text-muted-foreground leading-relaxed">{tier.whoFor}</p>
                  </div>
                )}

                {/* ROI proof */}
                {tier.roiProof && (
                  <div className="p-3 rounded-lg bg-muted/50 border border-border mb-5">
                    <p className="text-xs text-muted-foreground leading-relaxed italic">💡 {tier.roiProof}</p>
                  </div>
                )}

                {/* CTA */}
                <button
                  onClick={() => scrollToForm(tier.id)}
                  className={`block w-full py-3.5 rounded-full font-label text-center text-sm tracking-widest uppercase transition-all duration-200 hover:scale-105 hover:opacity-90 cursor-pointer ${tier.ctaClass}`}
                  style={tier.ctaGradient ? { background: tier.ctaGradient } : {}}
                >
                  {tier.cta}
                </button>

                {getDemoLink(tier.id) && (
                  <a
                    href={getDemoLink(tier.id)!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center text-xs text-muted-foreground hover:text-primary mt-3 underline decoration-muted-foreground/30 hover:decoration-primary transition-all font-body"
                  >
                    {"View Example Profile →"}
                  </a>
                )}
              </div>
            );
          })}
        </div>

        {/* Trust bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          {content.trust_bar.map((item) => (
            <div key={item.title} className="p-4 rounded-xl border border-border bg-muted/20 flex flex-col items-center gap-1.5">
              <span className="text-2xl">{item.icon}</span>
              <p className="text-sm font-bold text-foreground">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
