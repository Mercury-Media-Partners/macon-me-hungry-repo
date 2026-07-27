import { useState } from "react";
import { useLang } from "@/hooks/useLang";
import { MapPin, Clock, Zap, Music, Star } from "lucide-react";

type Vibe = "all" | "dance" | "chill" | "drag" | "leather";
type Hood = "all" | "midtown" | "east-atlanta";

const bars = [
  {
    name: "Blake's on the Park",
    nameEs: "Blake's on the Park",
    neighborhood: "midtown",
    vibe: "dance",
    address: "227 10th St NE",
    hours: "4pm–3am",
    stadiumMin: 22,
    tags: ["Rooftop", "Latin Nights"],
    tagsEs: ["Terraza", "Noches Latinas"],
    rating: 4.8,
    desc: "The Gayborhood's anchor bar with an iconic rooftop overlooking Piedmont Park.",
    descEs: "El bar ancla del Gayborhood con una icónica terraza con vista al Piedmont Park.",
  },
  {
    name: "Bulldogs Bar",
    nameEs: "Bulldogs Bar",
    neighborhood: "midtown",
    vibe: "chill",
    address: "893 Peachtree St NE",
    hours: "2pm–3am",
    stadiumMin: 20,
    tags: ["Sports Bar", "Classic"],
    tagsEs: ["Bar Deportivo", "Clásico"],
    rating: 4.5,
    desc: "Midtown's beloved classic — great drinks, great people, zero pretense.",
    descEs: "El clásico amado de Midtown — buenos tragos, buena gente, sin pretensiones.",
  },
  {
    name: "Mary's",
    nameEs: "Mary's",
    neighborhood: "east-atlanta",
    vibe: "drag",
    address: "1287 Glenwood Ave SE",
    hours: "5pm–3am",
    stadiumMin: 30,
    tags: ["Drag Shows", "Indie Vibes"],
    tagsEs: ["Shows de Drag", "Ambiente Indie"],
    rating: 4.9,
    desc: "EAV's cult-favorite queer dive. Legendary drag nights in an unpretentious space.",
    descEs: "El favorito de culto queer de EAV. Noches de drag legendarias en un espacio sin pretensiones.",
  },
  {
    name: "The Heretic",
    nameEs: "The Heretic",
    neighborhood: "midtown",
    vibe: "leather",
    address: "2069 Cheshire Bridge Rd NE",
    hours: "8pm–3am",
    stadiumMin: 18,
    tags: ["Leather", "EDM"],
    tagsEs: ["Cuero", "EDM"],
    rating: 4.7,
    desc: "Atlanta's premier leather and kink club. Big room energy, serious sound system.",
    descEs: "El principal club de cuero y kink de Atlanta. Gran energía de sala, sistema de sonido serio.",
  },
  {
    name: "Lips Atlanta",
    nameEs: "Lips Atlanta",
    neighborhood: "midtown",
    vibe: "drag",
    address: "1391 N Highland Ave NE",
    hours: "6pm–midnight",
    stadiumMin: 24,
    tags: ["Dinner Show", "Drag Brunch"],
    tagsEs: ["Cena Show", "Brunch Drag"],
    rating: 4.6,
    desc: "Full drag dinner theater — birthday queens welcome. Book ahead for World Cup weeks.",
    descEs: "Teatro completo de drag con cena — reinas de cumpleaños bienvenidas. Reserve para semanas del Mundial.",
  },
  {
    name: "Woofs Atlanta",
    nameEs: "Woofs Atlanta",
    neighborhood: "midtown",
    vibe: "chill",
    address: "2425 Piedmont Rd NE",
    hours: "3pm–3am",
    stadiumMin: 15,
    tags: ["Sports", "Bear Bar"],
    tagsEs: ["Deportes", "Bar Bear"],
    rating: 4.4,
    desc: "The bear community's home base. Every World Cup match on massive screens.",
    descEs: "La base de la comunidad bear. Cada partido del Mundial en pantallas gigantes.",
  },
];

const vibeIcons: Record<Vibe, React.ReactNode> = {
  all: <Zap size={13} />,
  dance: <Music size={13} />,
  chill: <Star size={13} />,
  drag: <Star size={13} />,
  leather: <Zap size={13} />,
};

export const BarFinder = () => {
  const { lang, t } = useLang();
  const [vibe, setVibe] = useState<Vibe>("all");
  const [hood, setHood] = useState<Hood>("all");
  const [search, setSearch] = useState("");

  const filtered = bars.filter((b) => {
    const matchVibe = vibe === "all" || b.vibe === vibe;
    const matchHood = hood === "all" || b.neighborhood === hood;
    const query = search.toLowerCase();
    const matchSearch =
      !query ||
      b.name.toLowerCase().includes(query) ||
      b.tags.some((t) => t.toLowerCase().includes(query)) ||
      b.tagsEs.some((t) => t.toLowerCase().includes(query));
    return matchVibe && matchHood && matchSearch;
  });

  const vibes: { key: Vibe; es: string; en: string }[] = [
    { key: "all", es: "Todos", en: "All" },
    { key: "dance", es: "Bailar", en: "Dance" },
    { key: "chill", es: "Tranquilo", en: "Chill" },
    { key: "drag", es: "Drag Show", en: "Drag" },
    { key: "leather", es: "Leather", en: "Leather" },
  ];

  const hoods: { key: Hood; es: string; en: string }[] = [
    { key: "all", es: "Todos", en: "All Areas" },
    { key: "midtown", es: "Midtown", en: "Midtown" },
    { key: "east-atlanta", es: "East Atlanta", en: "East Atlanta" },
  ];

  return (
    <section id="bar-finder" className="py-20 px-4">
      <div className="container max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10 animate-fade-up">
          <p className="section-label mb-2">{t("Directorio", "Directory")}</p>
          <h2 className="font-display text-5xl md:text-6xl text-foreground leading-none mb-4">
            {t("ENCUENTRA TU BAR", "FIND YOUR BAR")}
          </h2>
          <p className="text-muted-foreground max-w-xl">
            {t(
              "Filtra por ambiente, barrio y tiempo al estadio. Actualizado para el Mundial 2026.",
              "Filter by vibe, neighborhood, and stadium proximity. Updated for World Cup 2026."
            )}
          </p>
        </div>

        {/* Filters */}
        <div className="space-y-4 mb-10">
          {/* Search */}
          <input
            type="text"
            placeholder={t("Buscar bares...", "Search bars...")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-72 px-4 py-2 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors text-sm"
          />
          {/* Vibe filter */}
          <div className="flex flex-wrap gap-2">
            <span className="text-xs text-muted-foreground self-center pr-2">
              {t("Ambiente:", "Vibe:")}
            </span>
            {vibes.map((v) => (
              <button
                key={v.key}
                onClick={() => setVibe(v.key)}
                className={`filter-chip flex items-center gap-1.5 ${vibe === v.key ? "filter-chip-active" : ""}`}
              >
                {vibeIcons[v.key]}
                {t(v.es, v.en)}
              </button>
            ))}
          </div>
          {/* Hood filter */}
          <div className="flex flex-wrap gap-2">
            <span className="text-xs text-muted-foreground self-center pr-2">
              {t("Barrio:", "Area:")}
            </span>
            {hoods.map((h) => (
              <button
                key={h.key}
                onClick={() => setHood(h.key)}
                className={`filter-chip ${hood === h.key ? "filter-chip-active" : ""}`}
              >
                {t(h.es, h.en)}
              </button>
            ))}
          </div>
        </div>

        {/* Bar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.length === 0 && (
            <p className="text-muted-foreground col-span-3 text-center py-16">
              {t("No se encontraron bares con esos filtros.", "No bars match those filters.")}
            </p>
          )}
          {filtered.map((bar, i) => (
            <div
              key={bar.name}
              className="bar-card animate-fade-up"
              style={{ animationDelay: `${i * 80}ms`, opacity: 0, animationFillMode: "forwards" }}
            >
              {/* Vibe badge */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-primary/15 text-primary border border-primary/30">
                    {bar.vibe === "drag"
                      ? t("Drag Show", "Drag Show")
                      : bar.vibe === "dance"
                      ? t("Bailar", "Dance")
                      : bar.vibe === "leather"
                      ? t("Leather", "Leather")
                      : t("Tranquilo", "Chill")}
                  </span>
                  <div className="flex items-center gap-1 text-secondary text-sm font-semibold">
                    <Star size={13} fill="currentColor" />
                    {bar.rating}
                  </div>
                </div>

                <h3 className="font-display text-2xl text-foreground mb-1">{lang === "es" ? bar.nameEs : bar.name}</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {lang === "es" ? bar.descEs : bar.desc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {(lang === "es" ? bar.tagsEs : bar.tags).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[11px] bg-muted text-muted-foreground border border-border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Meta info */}
                <div className="border-t border-border pt-4 grid grid-cols-2 gap-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <MapPin size={12} className="text-primary shrink-0" />
                    <span>{bar.address}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={12} className="text-primary shrink-0" />
                    <span>{bar.hours}</span>
                  </div>
                </div>

                {/* Stadium proximity */}
                <div className="mt-3 flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                      style={{ width: `${Math.max(10, 100 - bar.stadiumMin * 2.5)}%` }}
                    />
                  </div>
                  <span className="text-[11px] text-muted-foreground whitespace-nowrap">
                    {bar.stadiumMin} min {t("al estadio", "to stadium")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Count */}
        <p className="mt-6 text-xs text-muted-foreground text-right">
          {filtered.length} {t("bares encontrados", "bars found")}
        </p>
      </div>
    </section>
  );
};
