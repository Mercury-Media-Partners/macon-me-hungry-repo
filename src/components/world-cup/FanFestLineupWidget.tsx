import React from 'react';
import {
  Calendar,
  Music,
  Star,
  Trophy,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  MapPin,
  Sparkles,
  Info
} from 'lucide-react';
import lineupData from '../../data/lineup.json';
import { en } from '../../i18n/en';
import { es } from '../../i18n/es';

interface Props {
  lang?: string;
}

export const FanFestLineupWidget: React.FC<Props> = ({ lang = 'en' }) => {
  const t = lang === 'es' ? es : en;

  // State Management
  const [selectedDate, setSelectedDate] = React.useState<string>('2026-06-11');
  const [activeTab, setActiveTab] = React.useState<'lineup' | 'activations'>('lineup');
  const [isMounted, setIsMounted] = React.useState(false);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  // Generate date list from June 11 to July 19, 2026
  const datesList = React.useMemo(() => {
    const dates: string[] = [];
    const start = new Date('2026-06-11T12:00:00');
    const end = new Date('2026-07-19T12:00:00');
    let curr = new Date(start);

    while (curr <= end) {
      const year = curr.getFullYear();
      const month = String(curr.getMonth() + 1).padStart(2, '0');
      const dateVal = String(curr.getDate()).padStart(2, '0');
      dates.push(`${year}-${month}-${dateVal}`);
      curr.setDate(curr.getDate() + 1);
    }
    return dates;
  }, []);

  // Determine user's local date or default simulated date
  React.useEffect(() => {
    setIsMounted(true);
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const dateVal = String(d.getDate()).padStart(2, '0');
    const todayStr = `${year}-${month}-${dateVal}`;

    if (todayStr >= '2026-06-11' && todayStr <= '2026-07-19') {
      setSelectedDate(todayStr);
    } else {
      // Out of bounds: default to opening day June 11, 2026
      setSelectedDate('2026-06-11');
    }
  }, []);

  // Scroll current selected item into view in horizontal list
  React.useEffect(() => {
    if (isMounted && scrollContainerRef.current) {
      const selectedEl = scrollContainerRef.current.querySelector('[data-selected="true"]');
      if (selectedEl) {
        selectedEl.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [selectedDate, isMounted]);

  if (!isMounted) {
    // SSR loading state
    return (
      <div className="glass-panel bg-card/40 backdrop-blur-md rounded-3xl p-8 border border-border animate-pulse h-96 my-8">
        <div className="h-8 bg-muted rounded w-1/3 mb-6"></div>
        <div className="h-12 bg-muted rounded w-full mb-8"></div>
        <div className="h-40 bg-muted rounded w-full"></div>
      </div>
    );
  }

  // Quick Switch Handler: Yesterday, Today, Tomorrow
  const handleQuickSwitch = (target: 'yesterday' | 'today' | 'tomorrow') => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const dateVal = String(d.getDate()).padStart(2, '0');
    const todayStr = `${year}-${month}-${dateVal}`;
    const baseDate = (todayStr >= '2026-06-11' && todayStr <= '2026-07-19')
      ? new Date(todayStr + 'T12:00:00')
      : new Date('2026-06-18T12:00:00'); // Default simulated center

    if (target === 'yesterday') {
      baseDate.setDate(baseDate.getDate() - 1);
    } else if (target === 'tomorrow') {
      baseDate.setDate(baseDate.getDate() + 1);
    }

    const y = baseDate.getFullYear();
    const m = String(baseDate.getMonth() + 1).padStart(2, '0');
    const day = String(baseDate.getDate()).padStart(2, '0');
    const targetStr = `${y}-${m}-${day}`;

    if (targetStr >= '2026-06-11' && targetStr <= '2026-07-19') {
      setSelectedDate(targetStr);
    }
  };

  // Filter artists for current selected date
  const filteredArtists = lineupData.artists.filter((artist) => {
    if (artist.dates.includes('all')) return true;
    return artist.dates.includes(selectedDate);
  });

  const headliners = filteredArtists.filter((a) => a.isHeadliner);
  const regularArtists = filteredArtists.filter((a) => !a.isHeadliner && a.name !== 'Soccer Sidekicks');
  const hasSidekicks = filteredArtists.some((a) => a.name === 'Soccer Sidekicks');

  // Match info
  const matchInfo = lineupData.atlantaMatches[selectedDate as keyof typeof lineupData.atlantaMatches];

  // Helper date parsing for headers
  const displaySelectedDate = new Date(selectedDate + 'T12:00:00').toLocaleDateString(
    lang === 'es' ? 'es-ES' : 'en-US',
    { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }
  );

  const scrollCalendar = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmt = direction === 'left' ? -200 : 200;
      scrollContainerRef.current.scrollBy({ left: scrollAmt, behavior: 'smooth' });
    }
  };

  return (
    <div className="glass-panel bg-card/30 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-border mt-8 mb-12 shadow-deep relative overflow-hidden">
      {/* Decorative radial gradients */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-border/50 pb-6 mb-8">
        <div>
          <span className="section-label mb-1 text-primary">{t.fanFestDates}</span>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold uppercase tracking-tight text-foreground">
            {t.fanFestTitle}
          </h2>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl font-body">
            {t.fanFestDesc}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 self-stretch md:self-auto w-full md:w-auto shrink-0">
          <a
            href={t.getTicketsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-full font-label text-xs font-semibold hover:scale-105 active:scale-95 transition-all glow-primary text-center"
          >
            <span>{t.getTickets}</span>
            <ExternalLink size={12} />
          </a>
          <a
            href={t.moreInfoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-muted border border-border rounded-full font-label text-xs font-semibold hover:bg-muted/70 hover:text-primary transition-all text-center"
          >
            <span>{t.moreInfo}</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Explorer */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Quick Tabs & Date selectors */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Quick switcher (Yesterday / Today / Tomorrow) */}
            <div className="flex bg-muted/50 border border-border p-1 rounded-full text-xs font-label">
              <button
                onClick={() => handleQuickSwitch('yesterday')}
                className="px-3.5 py-1.5 rounded-full hover:text-foreground text-muted-foreground transition-all cursor-pointer"
              >
                {t.yesterday}
              </button>
              <button
                onClick={() => handleQuickSwitch('today')}
                className="px-3.5 py-1.5 rounded-full hover:text-foreground text-muted-foreground transition-all cursor-pointer"
              >
                {t.today}
              </button>
              <button
                onClick={() => handleQuickSwitch('tomorrow')}
                className="px-3.5 py-1.5 rounded-full hover:text-foreground text-muted-foreground transition-all cursor-pointer"
              >
                {t.tomorrow}
              </button>
            </div>

            {/* Mobile Tab Switcher between Lineup & Activations */}
            <div className="flex lg:hidden bg-muted/50 border border-border p-1 rounded-full text-xs font-label w-full sm:w-auto">
              <button
                onClick={() => setActiveTab('lineup')}
                className={`flex-1 sm:flex-initial px-4 py-1.5 rounded-full font-semibold transition-all cursor-pointer ${
                  activeTab === 'lineup' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {lang === 'es' ? 'Presentaciones' : 'Lineup'}
              </button>
              <button
                onClick={() => setActiveTab('activations')}
                className={`flex-1 sm:flex-initial px-4 py-1.5 rounded-full font-semibold transition-all cursor-pointer ${
                  activeTab === 'activations' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {lang === 'es' ? 'Activaciones' : 'Activations'}
              </button>
            </div>
          </div>

          {/* Horizontal Calendar Slider */}
          <div className="relative border border-border/60 bg-black/20 rounded-2xl p-3 flex items-center">
            <button
              onClick={() => scrollCalendar('left')}
              className="absolute left-1 z-10 p-1.5 bg-card/80 rounded-full border border-border text-muted-foreground hover:text-foreground active:scale-95 transition-all shadow-md cursor-pointer"
            >
              <ChevronLeft size={16} />
            </button>

            <div
              ref={scrollContainerRef}
              className="flex items-center gap-2.5 overflow-x-auto px-7 scrollbar-hide py-1.5 w-full select-none"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {datesList.map((dateStr) => {
                const dateObj = new Date(dateStr + 'T12:00:00');
                const isSelected = dateStr === selectedDate;
                const isMday = dateStr in lineupData.atlantaMatches;
                const dayNum = dateObj.getDate();
                const wday = dateObj.toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', {
                  weekday: 'short'
                });
                const mon = dateObj.toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', {
                  month: 'short'
                });

                // Check headliners for this specific chip
                const hasHeadliner = lineupData.artists.some(
                  (a) => a.isHeadliner && a.dates.includes(dateStr)
                );

                return (
                  <button
                    key={dateStr}
                    data-selected={isSelected}
                    onClick={() => setSelectedDate(dateStr)}
                    className={`flex flex-col items-center justify-between w-14 h-16 py-2 rounded-xl border shrink-0 transition-all cursor-pointer relative ${
                      isSelected
                        ? 'bg-primary text-primary-foreground border-primary glow-primary scale-105'
                        : 'bg-muted/40 border-border/40 hover:border-border text-muted-foreground hover:text-foreground hover:bg-muted/70'
                    }`}
                  >
                    <span className="text-[9px] uppercase tracking-tighter opacity-80 leading-none">
                      {mon}. {wday}
                    </span>
                    <span className="text-lg font-bold font-display leading-none">{dayNum}</span>

                    {/* Dot Indicators */}
                    <div className="flex gap-0.5 justify-center items-center h-1.5">
                      {isMday && (
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isSelected ? 'bg-secondary' : 'bg-secondary animate-pulse'
                          }`}
                        />
                      )}
                      {hasHeadliner && (
                        <span className={`w-1.5 h-1.5 rounded-full bg-cyan-400`} />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => scrollCalendar('right')}
              className="absolute right-1 z-10 p-1.5 bg-card/80 rounded-full border border-border text-muted-foreground hover:text-foreground active:scale-95 transition-all shadow-md cursor-pointer"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Selected Lineup Display (Active only when lineup tab on mobile, or always on desktop) */}
          <div className={`${activeTab === 'lineup' ? 'flex' : 'hidden'} lg:flex flex-col gap-5`}>
            {/* Header info for selected day */}
            <div className="flex flex-col gap-2 bg-muted/20 border border-border/40 p-4 rounded-2xl">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                  <Calendar size={15} className="text-primary" />
                  {displaySelectedDate}
                </span>

                {/* Atlanta Host Matchday Alert Banner */}
                {matchInfo && (
                  <div className="flex items-center gap-1.5 text-xs text-secondary font-bold uppercase tracking-widest bg-secondary/10 border border-secondary/20 px-3 py-1 rounded-full">
                    <Trophy size={13} className="fill-secondary/20" />
                    <span>{t.atlantaMatchdayAlert}</span>
                  </div>
                )}
              </div>

              {matchInfo && (
                <p className="text-xs text-muted-foreground leading-relaxed mt-1 font-body">
                  {lang === 'es' ? 'Partido en el Mercedes-Benz Stadium:' : 'Match at Mercedes-Benz Stadium:'}{' '}
                  <span className="font-bold text-foreground">{matchInfo.teams}</span> ({matchInfo.phase})
                </p>
              )}
            </div>

            {/* Lineup Cards Container */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Headliner Spotlight Cards */}
              {headliners.map((hl) => (
                <div
                  key={hl.name}
                  className="relative group p-6 rounded-2xl border bg-gradient-to-br from-primary/10 to-indigo-500/5 hover:border-primary/40 border-primary/20 flex flex-col justify-between min-h-[140px] shadow-sm transition-all duration-300 hover:scale-[1.01] md:col-span-2 overflow-hidden"
                >
                  {/* Glowing backdrop circle */}
                  <div className="absolute -top-12 -right-12 w-24 h-24 bg-primary/20 rounded-full blur-2xl group-hover:scale-150 transition-all duration-300"></div>

                  <div className="relative flex justify-between items-start">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-secondary flex items-center gap-1">
                        <Star size={11} className="fill-secondary text-secondary" />
                        {t.featuredArtistToday}
                      </span>
                      <h4 className="font-display text-2xl md:text-3xl font-black uppercase text-foreground leading-none">
                        <span className="text-gradient-primary">{hl.name}</span>
                      </h4>
                    </div>

                    <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 animate-spin-slow">
                      <Music size={18} />
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground font-body">
                    <MapPin size={13} className="text-primary" />
                    <span>FIFA Fan Fest Main Stage (Downtown Atlanta)</span>
                  </div>
                </div>
              ))}

              {/* Regular performers */}
              {regularArtists.map((artist) => (
                <div
                  key={artist.name}
                  className="bar-card p-5 rounded-2xl border border-border/40 bg-black/40 hover:bg-black/60 flex items-center gap-4 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-muted/60 border border-border/40 flex items-center justify-center text-muted-foreground shrink-0 group-hover:text-primary">
                    <Music size={16} />
                  </div>
                  <div>
                    <h5 className="font-display text-base font-bold text-foreground leading-tight">
                      {artist.name}
                    </h5>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5">
                      Concert Set / Featured Artist
                    </p>
                  </div>
                </div>
              ))}

              {/* Always on Soccer Sidekicks */}
              {hasSidekicks && (
                <div className="bar-card p-5 rounded-2xl border border-border/40 bg-black/20 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-muted/30 border border-border/40 flex items-center justify-center text-muted-foreground shrink-0">
                    <Sparkles size={16} className="text-secondary" />
                  </div>
                  <div>
                    <h5 className="font-display text-sm font-bold text-foreground leading-tight">
                      Soccer Sidekicks
                    </h5>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5">
                      {lang === 'es' ? 'Activación Deportiva Diaria' : 'Daily Sports Activation'}
                    </p>
                  </div>
                </div>
              )}

              {/* Empty state today */}
              {filteredArtists.length === 0 && (
                <div className="p-8 border border-dashed border-border/60 bg-muted/10 rounded-2xl text-center md:col-span-2">
                  <Info size={28} className="mx-auto text-muted-foreground mb-3" />
                  <p className="text-muted-foreground text-sm font-body max-w-sm mx-auto italic">
                    {t.noFeaturedArtists}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Activations Directory (Hidden on mobile lineup tab) */}
        <div className={`lg:col-span-4 ${activeTab === 'activations' ? 'flex' : 'hidden'} lg:flex flex-col gap-6`}>
          {/* Always On Container */}
          <div className="glass-panel bg-card/40 border border-border/50 rounded-2xl p-5 flex flex-col gap-4">
            <div className="flex items-center gap-2 border-b border-border/50 pb-3">
              <Sparkles size={16} className="text-primary" />
              <h4 className="font-display text-sm font-bold uppercase tracking-wider text-foreground">
                {t.alwaysOnTitle}
              </h4>
            </div>

            <ul className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
              {lineupData.alwaysOn.map((act) => (
                <li
                  key={act}
                  className="text-xs text-muted-foreground font-body leading-relaxed flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0" />
                  <span>{act}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Georgia Street vendors Container */}
          <div className="glass-panel bg-card/40 border border-border/50 rounded-2xl p-5 flex flex-col gap-4">
            <div className="flex items-center gap-2 border-b border-border/50 pb-3">
              <MapPin size={16} className="text-secondary" />
              <h4 className="font-display text-sm font-bold uppercase tracking-wider text-foreground">
                {t.georgiaStreetTitle}
              </h4>
            </div>

            <ul className="space-y-2.5">
              {lineupData.georgiaStreet.map((vendor) => (
                <li
                  key={vendor}
                  className="text-xs text-muted-foreground font-body leading-relaxed flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full shrink-0" />
                  <span>{vendor}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
