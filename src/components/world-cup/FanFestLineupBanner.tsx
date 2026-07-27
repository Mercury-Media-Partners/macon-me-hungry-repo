import React from 'react';
import { Music, Star, ArrowRight, ExternalLink } from 'lucide-react';
import lineupData from '../../data/lineup.json';
import { en } from '../../i18n/en';
import { es } from '../../i18n/es';

interface Props {
  lang?: string;
}

export const FanFestLineupBanner: React.FC<Props> = ({ lang = 'en' }) => {
  const t = lang === 'es' ? es : en;

  // Client-side date determination
  const [dateStr, setDateStr] = React.useState<string>('2026-06-18');
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
    const d = new Date();
    // Simulate/test date range June 11 to July 19, 2026
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const todayStr = `${year}-${month}-${day}`;

    if (todayStr >= '2026-06-11' && todayStr <= '2026-07-19') {
      setDateStr(todayStr);
    } else {
      // Out of range (off-season/dev testing) — default to opening day with headliner
      setDateStr('2026-06-11');
    }
  }, []);

  if (!isMounted) {
    // SSR Placeholder to avoid hydration mismatch
    return (
      <div className="glass-panel bg-card/40 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-primary/20 animate-pulse h-40 max-w-6xl mx-auto my-8">
        <div className="h-6 bg-muted rounded w-1/4 mb-4"></div>
        <div className="h-10 bg-muted rounded w-1/2"></div>
      </div>
    );
  }

  // Find artists for the determined date
  const todaysArtists = lineupData.artists.filter((artist) => {
    if (artist.dates.includes('all')) return true;
    return artist.dates.includes(dateStr);
  });

  const headliner = todaysArtists.find((a) => a.isHeadliner);
  const regularArtists = todaysArtists.filter((a) => !a.isHeadliner && a.name !== 'Soccer Sidekicks');
  const isMatchday = dateStr in lineupData.maconMatches;

  const displayDate = new Date(dateStr + 'T12:00:00').toLocaleDateString(
    lang === 'es' ? 'es-ES' : 'en-US',
    { weekday: 'short', month: 'short', day: 'numeric' }
  );

  return (
    <div className="relative max-w-6xl mx-auto my-8 px-4">
      {/* Glow aura background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/5 to-primary/5 rounded-3xl blur-xl -z-10 pointer-events-none"></div>

      <div className="glass-panel bg-card/60 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-primary/20 flex flex-col md:flex-row justify-between items-center gap-6 transition-colors duration-300 hover:border-primary/40">
        <div className="flex flex-col gap-3 flex-1">
          {/* Header Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/15 border border-primary/20 px-2.5 py-0.5 rounded-full">
              {t.fanFestTitle}
            </span>
            {isMatchday && (
              <span className="text-[10px] font-bold uppercase tracking-widest text-secondary bg-secondary/15 border border-secondary/20 px-2.5 py-0.5 rounded-full flex items-center gap-1 animate-pulse">
                {t.maconMatchdayAlert}
              </span>
            )}
            <span className="text-xs text-muted-foreground font-semibold px-1">
              {displayDate}
            </span>
          </div>

          {/* Main Title/Artist spotlight */}
          {headliner ? (
            <div>
              <p className="text-xs text-muted-foreground font-medium flex items-center gap-1 mb-1">
                <Star size={12} className="text-secondary fill-secondary" />
                {t.featuredArtistToday}
              </p>
              <h3 className="font-display text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-foreground">
                <span className="text-gradient-primary">{headliner.name}</span>
              </h3>
            </div>
          ) : regularArtists.length > 0 ? (
            <div>
              <p className="text-xs text-muted-foreground font-medium flex items-center gap-1 mb-1">
                <Music size={12} className="text-primary" />
                {t.featuredArtists}
              </p>
              <h3 className="font-display text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-foreground leading-tight">
                {regularArtists.slice(0, 3).map((a) => a.name).join(' · ')}
                {regularArtists.length > 3 && ' ...'}
              </h3>
            </div>
          ) : (
            <p className="text-muted-foreground text-sm italic font-body">
              {t.noFeaturedArtists}
            </p>
          )}

          {/* Supporting schedule note */}
          {headliner && regularArtists.length > 0 && (
            <p className="text-xs text-muted-foreground leading-relaxed font-body">
              {lang === 'es' ? 'También se presentan:' : 'Also performing:'}{' '}
              <span className="font-medium text-foreground">
                {regularArtists.slice(0, 4).map((a) => a.name).join(', ')}
                {regularArtists.length > 4 && ' ...'}
              </span>
            </p>
          )}
        </div>

        {/* CTA Actions */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
          <a
            href={lang === 'es' ? '/es/matches' : '/matches'}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-label text-sm font-semibold hover:scale-105 active:scale-95 transition-all glow-primary text-center"
          >
            <span>{t.viewFullLineup}</span>
            <ArrowRight size={16} />
          </a>
          <a
            href={t.getTicketsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-full font-label text-sm font-semibold hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_25px_rgba(245,158,11,0.5)] text-center"
          >
            <span>{t.getTickets}</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
};
