import { useState } from "react";
import { useStore } from "@nanostores/react";
import { $lang } from "@/stores/langStore";
import { Calendar, Clock, MapPin, Sparkles, ExternalLink, Music, Flame, Star } from "lucide-react";
import { openVenueDrawer } from "@/stores/drawerStore";

interface EventItem {
  id: string;
  venueId: string;
  venueTitle: string;
  venueNeighborhood: string;
  venueCategory: string;
  name: string;
  day: string;
  time: string;
  description?: string;
  ticket_url?: string;
}

interface EventsRadarProps {
  events: EventItem[];
}

export const EventsRadar = ({ events }: EventsRadarProps) => {
  const lang = useStore($lang);
  const isEs = lang === "es";

  const [selectedDay, setSelectedDay] = useState<string>("all");

  const filteredEvents =
    selectedDay === "all"
      ? events
      : events.filter((e) => e.day.toLowerCase().includes(selectedDay.toLowerCase()));

  return (
    <div className="space-y-8">
      {/* Day Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-border/50">
        <span className="text-xs font-label text-muted-foreground uppercase font-bold pr-2 flex items-center gap-1">
          <Calendar size={14} className="text-primary" />
          {isEs ? "Filtrar por Día:" : "Filter by Day:"}
        </span>
        <button
          onClick={() => setSelectedDay("all")}
          className={`filter-chip ${selectedDay === "all" ? "filter-chip-active" : ""}`}
        >
          {isEs ? "Todos los Eventos" : "All Events"}
        </button>
        <button
          onClick={() => setSelectedDay("Friday")}
          className={`filter-chip ${selectedDay === "Friday" ? "filter-chip-active" : ""}`}
        >
          🔥 {isEs ? "Viernes" : "Friday Night"}
        </button>
        <button
          onClick={() => setSelectedDay("Saturday")}
          className={`filter-chip ${selectedDay === "Saturday" ? "filter-chip-active" : ""}`}
        >
          💃 {isEs ? "Sábado" : "Saturday Night"}
        </button>
        <button
          onClick={() => setSelectedDay("Sunday")}
          className={`filter-chip ${selectedDay === "Sunday" ? "filter-chip-active" : ""}`}
        >
          👑 {isEs ? "Domingo (Drag Brunch)" : "Sunday Drag Brunch"}
        </button>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.length === 0 && (
          <p className="text-muted-foreground col-span-3 text-center py-16">
            {isEs ? "No hay eventos programados para ese día." : "No events scheduled for that day."}
          </p>
        )}
        {filteredEvents.map((evt) => (
          <div
            key={evt.id}
            className="p-6 rounded-2xl border border-border bg-gradient-to-br from-card via-card to-muted/30 shadow-md hover:border-primary/50 transition-all group flex flex-col justify-between"
          >
            <div>
              {/* Event Badge */}
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary/15 text-primary border border-primary/30 flex items-center gap-1">
                  <Sparkles size={10} />
                  {evt.venueCategory}
                </span>
                <span className="text-xs font-bold text-secondary uppercase tracking-wider font-label flex items-center gap-1">
                  <Calendar size={12} />
                  {evt.day}
                </span>
              </div>

              {/* Event Name */}
              <h3 className="font-display text-2xl text-foreground uppercase tracking-tight mb-2 group-hover:text-primary transition-colors">
                {evt.name}
              </h3>

              {/* Venue & Time */}
              <div className="space-y-1.5 mb-4 text-xs text-muted-foreground font-body">
                <p className="font-semibold text-foreground flex items-center gap-1.5">
                  <MapPin size={12} className="text-primary" />
                  <span>{evt.venueTitle}</span>
                  <span className="text-muted-foreground/60">• {evt.venueNeighborhood}</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <Clock size={12} className="text-amber-500" />
                  <span>{evt.time}</span>
                </p>
              </div>

              {/* Description */}
              {evt.description && (
                <p className="text-xs text-muted-foreground/90 leading-relaxed italic mb-6">
                  "{evt.description}"
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-4 border-t border-border/40">
              <button
                onClick={() => openVenueDrawer(evt.venueId)}
                className="flex-1 py-2.5 px-3 rounded-xl bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 glow-primary font-label hover:scale-[1.02] transition-all"
              >
                <span>{isEs ? "Ver Lugar" : "View Venue"}</span>
              </button>
              {evt.ticket_url && (
                <a
                  href={evt.ticket_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl border border-border bg-muted/40 hover:bg-muted text-foreground text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1 font-label transition-colors"
                >
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
