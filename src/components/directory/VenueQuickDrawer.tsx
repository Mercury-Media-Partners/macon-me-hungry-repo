import { useEffect } from "react";
import { useStore } from "@nanostores/react";
import { $activeVenueSlug, closeVenueDrawer } from "@/stores/drawerStore";
import { MapPin, Clock, Star, X, Plus, Check, ExternalLink, Navigation, Train } from "lucide-react";
import { getOpenStatus } from "./DirectoryFinder";
import { getCategoryLabel } from "../../utils/categoryTranslations";

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
    transit_station?: string;
    transit_time_en?: string;
    transit_time_es?: string;
  };
}

interface VenueQuickDrawerProps {
  businesses: DirectoryItem[];
}

export const VenueQuickDrawer = ({ businesses }: VenueQuickDrawerProps) => {
  const activeSlug = useStore($activeVenueSlug);
  const lang = "en";
  
  const venue = businesses.find((b) => b.id === activeSlug);

  // Lock background scroll when drawer is open
  useEffect(() => {
    if (activeSlug) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeSlug]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeSlug) {
        closeVenueDrawer();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSlug]);

  if (!activeSlug || !venue) return null;

  const openStatus = getOpenStatus(venue.data.hours);
  const basePath = "";
  const detailUrl =
    venue.type === "park"
      ? `${basePath}/outdoors-culture/${venue.id}`
      : `${basePath}/businesses/${venue.id}`;

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${venue.data.title} ${venue.data.address} Macon GA`
  )}`;

  return (
    <div
      className="fixed inset-0 z-[100] flex justify-end bg-background/80 backdrop-blur-sm animate-fade-in"
      onClick={closeVenueDrawer}
      role="dialog"
      aria-modal="true"
      aria-label={venue.data.title}
    >
      {/* Slide-over Drawer Panel */}
      <div
        className="relative w-full max-w-lg h-full bg-card border-l border-border shadow-2xl flex flex-col overflow-y-auto p-6 md:p-8 animate-slide-left text-card-foreground"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-accent/20 text-foreground border border-accent/30">
              {getCategoryLabel(venue.data.category, lang)}
            </span>
            <div className="flex items-center gap-1 text-secondary text-sm font-bold">
              <Star size={14} fill="currentColor" />
              <span>{venue.data.rating}</span>
            </div>
          </div>
          <button
            onClick={closeVenueDrawer}
            className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            aria-label={"Close"}
          >
            <X size={20} />
          </button>
        </div>

        {/* Title & Tagline */}
        <div className="py-6 border-b border-border/50">
          <h2 className="font-display text-3xl md:text-4xl text-foreground uppercase tracking-tight mb-2">
            {venue.data.title}
          </h2>
          <p className="text-sm md:text-base text-muted-foreground italic leading-relaxed">
            "{venue.data.tagline}"
          </p>
        </div>

        {/* Live Info Details */}
        <div className="py-6 space-y-4 border-b border-border/50 text-sm">
          {/* Address */}
          <div className="flex items-start gap-3 text-muted-foreground">
            <MapPin size={18} className="text-accent shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground">{venue.data.neighborhood}</p>
              <p className="text-xs">{venue.data.address}</p>
            </div>
          </div>

          {/* Live Hours */}
          <div className="flex items-center gap-3">
            <Clock
              size={18}
              className={`${
                openStatus.status === "open"
                  ? "text-emerald-500"
                  : openStatus.status === "closed"
                  ? "text-rose-500"
                  : "text-muted-foreground"
              } shrink-0`}
            />
            <div className="flex items-center gap-2">
              <span
                className={`font-bold text-xs uppercase tracking-wider ${
                  openStatus.status === "open"
                    ? "text-emerald-500"
                    : openStatus.status === "closed"
                    ? "text-rose-500"
                    : "text-muted-foreground"
                }`}
              >
                {openStatus.labelEn}
              </span>
              <span className="text-xs text-muted-foreground">({venue.data.hours})</span>
            </div>
          </div>

          {/* MARTA Station */}
          {venue.data.transit_station && (
            <div className="flex items-center gap-3 text-muted-foreground">
              <Train size={18} className="text-amber-500 shrink-0" />
              <p className="text-xs">
                <span className="font-semibold text-foreground">{venue.data.transit_station} Station</span>
                {" — "}
                <span>{venue.data.transit_time_en}</span>
              </p>
            </div>
          )}
        </div>

        {/* Feature Badges */}
        <div className="py-6 border-b border-border/50">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 font-label">
            {"Key Highlights"}
          </p>
          <div className="flex flex-wrap gap-2">
            {venue.data.has_patio && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                🌳 {"Patio & Outdoor"}
              </span>
            )}
            {venue.data.bilingual_staff && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
                💬 {"Bilingual Staff"}
              </span>
            )}

          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-auto pt-6 space-y-3">
          {/* Removed Night Out Button */}

          {/* Links */}
          <div className="grid grid-cols-2 gap-3">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 rounded-xl border border-border bg-muted/40 hover:bg-muted text-foreground text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
            >
              <Navigation size={14} />
              <span>{"Directions"}</span>
            </a>
            <a
              href={detailUrl}
              className="py-3 px-4 rounded-xl border border-border bg-muted/40 hover:bg-muted text-foreground text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
            >
              <span>{"Full Profile"}</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
