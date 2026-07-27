import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
  category?: string;
}

interface FAQContent {
  section_label: string;
  title: string;
  items: FAQItem[];
}

interface Props {
  content: FAQContent;
}

const slugify = (text: string) =>
  "faq-" + text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const trackFaqOpen = (question: string) => {
  const w = window as typeof window & { umami?: { track: (name: string, data?: Record<string, unknown>) => void } };
  w.umami?.track("faq_open", { question });
};

export const FAQSection = ({ content }: Props) => {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    const index = content.items.findIndex((item) => slugify(item.q) === hash);
    if (index === -1) return;
    setOpen(index);
    document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [content.items]);

  const toggle = (i: number) => {
    const next = open === i ? null : i;
    setOpen(next);
    if (next !== null) trackFaqOpen(content.items[next].q);
  };

  // Group items by category while preserving first-seen category order.
  // Items without a category fall into a single unlabeled group.
  const categories: { name: string | null; items: { item: FAQItem; index: number }[] }[] = [];
  content.items.forEach((item, index) => {
    const name = item.category ?? null;
    let group = categories.find((c) => c.name === name);
    if (!group) {
      group = { name, items: [] };
      categories.push(group);
    }
    group.items.push({ item, index });
  });
  const hasCategories = categories.some((c) => c.name !== null);

  return (
    <section className="py-24 px-4 bg-background">
      <div className="container max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <p className="section-label mb-3">{content.section_label}</p>
          <h2 className="font-display text-4xl md:text-5xl uppercase text-foreground">
            {content.title}
          </h2>
        </div>

        <div className="space-y-10">
          {categories.map((group) => (
            <div key={group.name ?? "uncategorized"} id={group.name ? slugify(group.name).replace(/^faq-/, "") : undefined}>
              {hasCategories && group.name && (
                <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-4">
                  {group.name}
                </h3>
              )}
              <div className="space-y-3">
                {group.items.map(({ item, index: i }) => {
                  const answerId = `${slugify(item.q)}-answer`;
                  return (
                    <div
                      key={i}
                      id={slugify(item.q)}
                      className={`rounded-xl border transition-all duration-200 overflow-hidden scroll-mt-24 ${
                        open === i ? "border-accent/30 bg-card/60" : "border-border bg-card/30 hover:border-border/80"
                      }`}
                    >
                      <button
                        onClick={() => toggle(i)}
                        className="w-full flex items-center justify-between p-5 text-left cursor-pointer"
                        aria-expanded={open === i}
                        aria-controls={answerId}
                        id={`${slugify(item.q)}-button`}
                      >
                        <span className="font-label font-semibold text-sm text-foreground leading-snug pr-4">
                          {item.q}
                        </span>
                        <ChevronDown
                          size={16}
                          className={`text-muted-foreground flex-shrink-0 transition-transform duration-200 ${
                            open === i ? "rotate-180 text-primary" : ""
                          }`}
                        />
                      </button>

                      <div
                        id={answerId}
                        role="region"
                        aria-labelledby={`${slugify(item.q)}-button`}
                        className="grid transition-[grid-template-rows] duration-300 ease-in-out"
                        style={{ gridTemplateRows: open === i ? "1fr" : "0fr" }}
                      >
                        <div className="overflow-hidden">
                          <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
