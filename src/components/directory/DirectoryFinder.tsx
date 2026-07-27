import { useState, useEffect } from "react";
import { useStore } from "@nanostores/react";
import { MapPin, Clock, Zap, Music, Star, Coffee, Dumbbell, Briefcase, ShoppingBag, BookOpen, Scissors, Heart, Trees } from "lucide-react";
import { getCategoryLabel } from "../../utils/categoryTranslations";
import { openVenueDrawer } from "@/stores/drawerStore";
import { VenueQuickDrawer } from "./VenueQuickDrawer";
import { ItineraryBar } from "./ItineraryBar";
import { MerchantClaimCard } from "./MerchantClaimCard";
import { MobileFilterSheet } from "./MobileFilterSheet";

type CategoryFilter = string;
type Hood = "all" | "downtown" | "historic-district";

interface DirectoryItem {
  id: string;
  type: "business" | "park";
  data: {
    title: string;
    neighborhood: string;
    vibe: string;
    category: string;
    category_type: "nightlife" | "lifestyle" | "wellness" | "professional" | "outdoors";
    operating_mode?: "day" | "night" | "both";
    address: string;
    hours: string;
    stadiumMin: number;
    rating: number;
    tagline: string;
    tier: "free" | "promoter" | "professional" | "headliner";
    has_patio?: boolean;
    bilingual_staff?: boolean;
    isPetFriendly?: boolean;
    hasPlayground?: boolean;
    hasFountains?: boolean;
    transit_station?: string;
    transit_time_en?: string;
    transit_time_es?: string;
  };
}

interface DirectoryFinderProps {
  initialBusinesses: DirectoryItem[];
}

// Unified categories
const activeCategories = [
  { key: "all", label: { en: "All", es: "Todos" }, icon: <Zap size={13} /> },
  { key: "Brewpub", label: { en: "Breweries", es: "Cervecerías" }, icon: <Zap size={13} /> },
  { key: "Burger Joint", label: { en: "Burgers", es: "Hamburguesas" }, icon: <Coffee size={13} /> },
  { key: "Southern Cuisine", label: { en: "Southern", es: "Sureña" }, icon: <Heart size={13} /> },
  { key: "Soul Food", label: { en: "Soul Food", es: "Comida Soul" }, icon: <Heart size={13} /> },
  { key: "Coffee Shop", label: { en: "Cafes", es: "Cafés" }, icon: <Coffee size={13} /> },
  { key: "Boutique", label: { en: "Boutiques", es: "Tiendas" }, icon: <ShoppingBag size={13} /> },
];

const tierWeight: Record<string, number> = { headliner: 0, professional: 1, promoter: 2, free: 3 };

const hoods: { key: Hood; label: { en: string; es: string } }[] = [
  { key: "all", label: { en: "All Areas", es: "Todos" } },
  { key: "downtown", label: { en: "Downtown", es: "Centro" } },
  { key: "historic-district", label: { en: "Historic District", es: "Histórico" } },
];

export function getOpenStatus(hoursStr: string): { status: 'open' | 'closed' | 'varies'; labelEn: string; labelEs: string } {
  if (!hoursStr) {
    return { status: 'closed', labelEn: 'Closed', labelEs: 'Cerrado' };
  }
  
  const cleanHours = hoursStr.toLowerCase().trim();
  
  if (cleanHours.includes('varies') || cleanHours.includes('appointment')) {
    return { status: 'varies', labelEn: 'Varies', labelEs: 'Varía' };
  }
  
  // Get current time in America/New_York (Macon timezone)
  let now: Date;
  try {
    const atlTimeStr = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
    now = new Date(atlTimeStr);
  } catch (e) {
    now = new Date(); // fallback to local browser time
  }
  
  const currentDay = now.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  
  // Helper to parse day names
  const dayMap: Record<string, number> = {
    sun: 0, sunday: 0,
    mon: 1, monday: 1,
    tue: 2, tues: 2, tuesday: 2,
    wed: 3, wednesday: 3,
    thu: 4, thur: 4, thurs: 4, thursday: 4,
    fri: 5, friday: 5,
    sat: 6, saturday: 6
  };
  
  // Helper to parse a time string to minutes from midnight
  function parseTimeToMinutes(timeStr: string): number | null {
    const match = timeStr.trim().match(/(\d+)(?::(\d+))?\s*(am|pm)/i);
    if (!match) return null;
    let h = parseInt(match[1], 10);
    const m = match[2] ? parseInt(match[2], 10) : 0;
    const p = match[3].toLowerCase();
    
    if (p === 'pm' && h !== 12) h += 12;
    if (p === 'am' && h === 12) h = 0;
    
    return h * 60 + m;
  }
  
  // Helper to expand a day range (e.g. "mon-fri" -> [1, 2, 3, 4, 5])
  function expandDayRange(rangeStr: string): number[] {
    const cleanRange = rangeStr.trim().toLowerCase();
    if (cleanRange.includes('-') || cleanRange.includes('–')) {
      const parts = cleanRange.split(/[-–]/);
      const startDay = dayMap[parts[0].trim()];
      const endDay = dayMap[parts[1].trim()];
      
      if (startDay === undefined || endDay === undefined) return [];
      
      const days: number[] = [];
      let curr = startDay;
      while (curr !== endDay) {
        days.push(curr);
        curr = (curr + 1) % 7;
      }
      days.push(endDay);
      return days;
    } else {
      const day = dayMap[cleanRange];
      return day !== undefined ? [day] : [];
    }
  }

  // Split schedules by comma, e.g. "Mon-Fri - 5pm-3am, Sat - 2pm-3am"
  const rules = cleanHours.split(',');
  const daySchedules: { start: number; end: number }[][] = Array.from({ length: 7 }, () => []);

  for (const rule of rules) {
    const trimmedRule = rule.trim();

    // Split on " - " (space–dash–space) to keep "Mon-Fri" and "5pm-3am" intact.
    // Fallback: also try splitting on " – " (en-dash with spaces).
    const sepMatch = trimmedRule.match(/^(.+?)\s+[-–]\s+(.+)$/);
    if (!sepMatch) continue;

    const dayPart  = sepMatch[1].trim();  // e.g. "Mon-Fri"
    const timePart = sepMatch[2].trim();  // e.g. "5pm-3am"

    if (timePart.toLowerCase().includes('closed')) continue;

    // The time range may use a dash or en-dash: "5pm-3am" or "5pm–3am"
    // Use a regex that handles optional spaces around the separator
    const timeMatch = timePart.match(/^(.+?)\s*[-–]\s*(.+)$/);
    if (!timeMatch) continue;

    const startMin = parseTimeToMinutes(timeMatch[1]);
    const endMin   = parseTimeToMinutes(timeMatch[2]);

    if (startMin === null || endMin === null) continue;

    const days = expandDayRange(dayPart);
    for (const d of days) {
      daySchedules[d].push({ start: startMin, end: endMin });
    }
  }
  
  // Check today's schedules
  for (const sched of daySchedules[currentDay]) {
    if (sched.start === sched.end) {
      return { status: 'open', labelEn: 'Open Now', labelEs: 'Abierto Ahora' };
    }
    if (sched.start <= sched.end) {
      if (currentMinutes >= sched.start && currentMinutes <= sched.end) {
        return { status: 'open', labelEn: 'Open Now', labelEs: 'Abierto Ahora' };
      }
    } else {
      if (currentMinutes >= sched.start) {
        return { status: 'open', labelEn: 'Open Now', labelEs: 'Abierto Ahora' };
      }
    }
  }
  
  // Check yesterday's schedules for overnight extension
  const yesterday = (currentDay + 6) % 7;
  for (const sched of daySchedules[yesterday]) {
    if (sched.start > sched.end) {
      if (currentMinutes <= sched.end) {
        return { status: 'open', labelEn: 'Open Now', labelEs: 'Abierto Ahora' };
      }
    }
  }
  
  return { status: 'closed', labelEn: 'Closed', labelEs: 'Cerrado' };
}

export const DirectoryFinder = ({ initialBusinesses, lang: initialLang = "en" }: DirectoryFinderProps & { lang?: string }) => {
  if (typeof window === "undefined") {
    
  }
  const lang = "en";
    const t = (en: string, es: string) => (lang === "es" ? es : en);

  // ── State hooks must come before any derived values that depend on them ──
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [hood, setHood] = useState<Hood>("all");
  const [search, setSearch] = useState("");
  const [hasPatioOnly, setHasPatioOnly] = useState(false);
  const [bilingualStaffOnly, setBilingualStaffOnly] = useState(false);
  const [onlyOpenNow, setOnlyOpenNow] = useState(false);

  const modeMatched = initialBusinesses;

  // Helper to count category matches (respecting active neighborhood & custom features filter)
  const getCategoryCount = (categoryKey: string) => {
    return modeMatched.filter((b) => {
      // Neighborhood filter
      const bHood = b.data.neighborhood.toLowerCase();
      const hoodMatch =
        hood === "all" ||
        (hood === "downtown" && bHood === "downtown") ||
        (hood === "historic-district" && bHood === "historic district");
      if (!hoodMatch) return false;

      // Custom feature filters
      if (hasPatioOnly && !b.data.has_patio) return false;
      if (bilingualStaffOnly && !b.data.bilingual_staff) return false;

      // Search match (if any)
      const q = search.toLowerCase();
      const searchMatch =
        !q ||
        b.data.title.toLowerCase().includes(q) ||
        b.data.tagline.toLowerCase().includes(q) ||
        b.data.category.toLowerCase().includes(q);
      if (!searchMatch) return false;

      return categoryKey === "all" || b.data.category === categoryKey;
    }).length;
  };

  // Helper to count neighborhood matches (respecting active category & custom features filter)
  const getHoodCount = (hoodKey: Hood) => {
    return modeMatched.filter((b) => {
      // Category filter
      const catMatch = categoryFilter === "all" || b.data.category === categoryFilter;
      if (!catMatch) return false;

      // Custom feature filters
      if (hasPatioOnly && !b.data.has_patio) return false;
      if (bilingualStaffOnly && !b.data.bilingual_staff) return false;

      // Search match (if any)
      const q = search.toLowerCase();
      const searchMatch =
        !q ||
        b.data.title.toLowerCase().includes(q) ||
        b.data.tagline.toLowerCase().includes(q) ||
        b.data.category.toLowerCase().includes(q);
      if (!searchMatch) return false;

      const bHood = b.data.neighborhood.toLowerCase();
      return (
        hoodKey === "all" ||
        (hoodKey === "downtown" && bHood === "downtown") ||
        (hoodKey === "historic-district" && bHood === "historic district")
      );
    }).length;
  };

  // Hash parameter parsing effect
  useEffect(() => {
    const parseHashParams = () => {
      const hash = window.location.hash;
      let queryString = "";
      if (hash.includes("?")) {
        queryString = hash.split("?")[1];
      }
      const params = new URLSearchParams(queryString);
      const queryParams = new URLSearchParams(window.location.search);

      const hoodParam = params.get("hood") || queryParams.get("hood");
      const categoryParam = params.get("category") || queryParams.get("category");
      const filterParam = params.get("filter") || queryParams.get("filter");
      const searchParam = params.get("search") || params.get("q") || queryParams.get("search") || queryParams.get("q");

      if (hoodParam) {
        setHood(hoodParam as Hood);
      }
      if (categoryParam) {
        setCategoryFilter(categoryParam);
      }
      if (filterParam) {
        if (filterParam === "patio") {
          setHasPatioOnly(true);
        } else if (filterParam === "bilingual") {
          setBilingualStaffOnly(true);
        } else if (filterParam === "open") {
          setOnlyOpenNow(true);
        }
      }
      if (searchParam) {
        setSearch(searchParam);
      }
    };

    parseHashParams();
    window.addEventListener("hashchange", parseHashParams);

    // Check URL query parameters for venue drawer deep-linking
    const queryParams = new URLSearchParams(window.location.search);
    const venueParam = queryParams.get("venue");
    if (venueParam) {
      openVenueDrawer(venueParam);
    }

    return () => {
      window.removeEventListener("hashchange", parseHashParams);
    };
  }, []);



  const filtered = initialBusinesses
    .filter((b) => {
      // Search filter
      const q = search.trim().toLowerCase();
      const searchMatch =
        !q ||
        b.data.title.toLowerCase().includes(q) ||
        b.data.tagline.toLowerCase().includes(q) ||
        b.data.category.toLowerCase().includes(q) ||
        b.data.neighborhood.toLowerCase().includes(q);

      if (!searchMatch) return false;

      // Category filter
      const catMatch = categoryFilter === "all" || b.data.category === categoryFilter;
      if (!catMatch) return false;



      // Neighborhood filter
      const bHood = b.data.neighborhood.toLowerCase();
      const hoodMatch =
        hood === "all" ||
        (hood === "downtown" && bHood === "downtown") ||
        (hood === "historic-district" && bHood === "historic district");
      if (!hoodMatch) return false;

      // Custom Filters
      if (hasPatioOnly && !b.data.has_patio) return false;
      if (bilingualStaffOnly && !b.data.bilingual_staff) return false;
      if (onlyOpenNow) {
        const openStatus = getOpenStatus(b.data.hours);
        if (openStatus.status !== "open") return false;
      }

      return true;
    })
    // Sort: 100% Organic & Merit-Based (Highest Rating First)
    .sort((a, b) => b.data.rating - a.data.rating);

  return (
    <section id="bar-finder" className="py-20 px-4">
      <div className="container max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <p className="section-label mb-2">{"Directory"}</p>
          <h2 className="font-display text-5xl md:text-6xl text-foreground leading-none mb-4 uppercase">
            {"FIND YOUR SPACE"}
          </h2>
          <p className="text-muted-foreground max-w-xl">
            {"Restaurants, cafes, local services & more — your day-to-day queer Macon."}
          </p>
        </div>

        {/* Mobile Filter Sheet Component */}
        <MobileFilterSheet
          categories={activeCategories}
          hoods={hoods}
          activeCategory={categoryFilter}
          onSelectCategory={setCategoryFilter}
          activeHood={hood}
          onSelectHood={setHood}
          hasPatioOnly={hasPatioOnly}
          onTogglePatio={() => setHasPatioOnly(!hasPatioOnly)}
          bilingualStaffOnly={bilingualStaffOnly}
          onToggleBilingual={() => setBilingualStaffOnly(!bilingualStaffOnly)}
          getCategoryCount={getCategoryCount}
          getHoodCount={getHoodCount}
          onReset={() => {
            setCategoryFilter("all");
            setHood("all");
            setSearch("");
            setHasPatioOnly(false);
            setBilingualStaffOnly(false);
          }}
        />

        {/* Desktop Filters */}
        <div className="hidden md:block space-y-4 mb-10">
          <input
            type="text"
            placeholder={"Search..."}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-72 px-4 py-2 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors text-sm"
          />
          <div className="flex flex-wrap gap-2">
            <span className="text-xs text-muted-foreground self-center pr-2">
              {"Category:"}
            </span>
            {activeCategories.map((cat) => {
              const count = getCategoryCount(cat.key);
              const isDisabled = count === 0 && categoryFilter !== cat.key;
              return (
                <button
                  key={cat.key}
                  disabled={isDisabled}
                  onClick={() => setCategoryFilter(cat.key)}
                  className={`filter-chip flex items-center gap-1.5 transition-all ${categoryFilter === cat.key ? "filter-chip-active" : ""} ${isDisabled ? "opacity-35 cursor-not-allowed pointer-events-none" : ""}`}
                >
                  {cat.icon}
                  <span>{lang === "es" ? cat.label.es : cat.label.en}</span>
                  <span className={`text-[10px] ${categoryFilter === cat.key ? "opacity-100 font-bold" : "opacity-75"}`}>({count})</span>
                </button>
              );
            })}
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs text-muted-foreground self-center pr-2">
              {"Area:"}
            </span>
            {hoods.map((h) => {
              const count = getHoodCount(h.key);
              const isDisabled = count === 0 && hood !== h.key;
              return (
                <button
                  key={h.key}
                  disabled={isDisabled}
                  onClick={() => setHood(h.key)}
                  className={`filter-chip transition-all ${hood === h.key ? "filter-chip-active" : ""} ${isDisabled ? "opacity-35 cursor-not-allowed pointer-events-none" : ""}`}
                >
                  <span>{lang === "es" ? h.label.es : h.label.en}</span>
                  <span className={`text-[10px] ml-1 ${hood === h.key ? "opacity-100 font-bold" : "opacity-75"}`}>({count})</span>
                </button>
              );
            })}
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs text-muted-foreground self-center pr-2">
              {"Features:"}
            </span>
            <button
              onClick={() => setOnlyOpenNow(!onlyOpenNow)}
              className={`filter-chip flex items-center gap-1.5 ${onlyOpenNow ? "filter-chip-active" : ""}`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{"Open Right Now"}</span>
            </button>
            <button
              onClick={() => setHasPatioOnly(!hasPatioOnly)}
              className={`filter-chip flex items-center gap-1.5 ${hasPatioOnly ? "filter-chip-active" : ""}`}
            >
              🌳 {"Patios & Outdoor"}
            </button>
            <button
              onClick={() => setBilingualStaffOnly(!bilingualStaffOnly)}
              className={`filter-chip flex items-center gap-1.5 ${bilingualStaffOnly ? "filter-chip-active" : ""}`}
            >
              💬 {"Bilingual Staff"}
            </button>
          </div>
        </div>

        {/* Business Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-16 px-4 bg-muted/20 rounded-2xl border border-border/50">
              <p className="text-muted-foreground text-base mb-4 font-body">
                {"No listings match those filters."}
              </p>
              <button
                onClick={() => {
                  setCategoryFilter("all");
                  setHood("all");
                  setSearch("");
                  setHasPatioOnly(false);
                  setBilingualStaffOnly(false);
                  setOnlyOpenNow(false);
                }}
                className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider font-label hover:scale-105 transition-transform cursor-pointer"
              >
                {"Reset All Filters"}
              </button>
            </div>
          )}
          {filtered.map((biz, idx) => {
            const basePath = "";
            const detailUrl = biz.type === "park" || biz.type === "attraction" ? `${basePath}/outdoors-culture/${biz.id}` : `${basePath}/businesses/${biz.id}`;
            const renderClaimCard = idx > 0 && idx % 6 === 0;

            return (
              <div key={biz.id} className="contents">
                {renderClaimCard && <MerchantClaimCard />}
                <a
                  href={detailUrl}
                  onClick={(e) => {
                    if (!e.ctrlKey && !e.metaKey && e.button === 0) {
                      e.preventDefault();
                      openVenueDrawer(biz.id);
                    }
                  }}
                  className={`block p-5 transition-all group ${
                    biz.data.tier === "headliner" ? "bar-card-headliner" : biz.data.tier === "professional" ? "bar-card-professional" : "bar-card hover:border-primary/50"
                  }`}
                >
                  {/* Partner / Spotlight badge */}
                  {(biz.data.tier === "partner" || biz.data.tier === "headliner" || biz.data.tier === "promoter") && (
                    <div className="flex items-center gap-1 mb-2 text-[10px] font-bold tracking-widest uppercase text-secondary">
                      <Zap size={10} fill="currentColor" />
                      <span>{"Sponsored Spotlight"}</span>
                    </div>
                  )}
                  {/* Professional badge */}
                  {biz.data.tier === "professional" && (
                    <div className="flex items-center gap-1 mb-2 text-[10px] font-bold tracking-widest uppercase text-accent">
                      <Briefcase size={10} fill="currentColor" />
                      <span>{"Verified Professional"}</span>
                    </div>
                  )}

                  <div className="flex items-start justify-between mb-3">
                    <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-primary/15 text-primary border border-primary/30">
                      {getCategoryLabel(biz.data.category, lang)}
                    </span>
                    <div className="flex items-center gap-1 text-secondary text-sm font-semibold">
                      <Star size={13} fill="currentColor" />
                      {biz.data.rating}
                    </div>
                  </div>

                  <h3 className="font-display text-2xl text-foreground mb-1 uppercase group-hover:text-primary transition-colors">
                    {biz.data.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed italic line-clamp-2">
                    "{biz.data.tagline}"
                  </p>

                  {(() => {
                    const openStatus = getOpenStatus(biz.data.hours);
                    return (
                      <div className="border-t border-border pt-4 space-y-2 text-xs text-muted-foreground">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <MapPin size={12} className="text-primary shrink-0" />
                            <span className="truncate">{biz.data.neighborhood}</span>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <Clock size={12} className={`${openStatus.status === 'open' ? 'text-emerald-500' : openStatus.status === 'closed' ? 'text-rose-500' : 'text-muted-foreground'} shrink-0`} />
                            <span className={`font-semibold ${openStatus.status === 'open' ? 'text-emerald-500' : openStatus.status === 'closed' ? 'text-rose-500' : 'text-muted-foreground'}`}>
                              {lang === 'es' ? openStatus.labelEs : openStatus.labelEn}
                            </span>
                          </div>
                        </div>
                        {biz.data.transit_station && (
                          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground/80 pt-0.5 border-t border-border/40">
                            <span className="shrink-0">🚆</span>
                            <span className="truncate">
                              {biz.data.transit_station} Station — {lang === 'es' ? biz.data.transit_time_es : biz.data.transit_time_en}
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })()}


                </a>
              </div>
            );
          })}
        </div>

        {/* Count */}
        <p className="mt-6 text-xs text-muted-foreground text-right">
          {filtered.length} {"listings found"}
        </p>
      </div>

      {/* Slide-over Drawer & Floating Itinerary Bar */}
      <VenueQuickDrawer businesses={initialBusinesses} />
      <ItineraryBar businesses={initialBusinesses} />
    </section>
  );
};
