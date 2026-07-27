import React, { useState, useEffect } from 'react';
import { en } from '../../i18n/en';

interface Props {
  lang?: string;
}

export const WeatherBadge: React.FC<Props> = ({ lang = 'en' }) => {
  const t = en;

  const [temp, setTemp] = useState<number | null>(null);
  const [weatherCode, setWeatherCode] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const fetchWeather = async () => {
      try {
        const unit = 'fahrenheit';
        const url = `https://api.open-meteo.com/v1/forecast?latitude=32.8407&longitude=-83.6324&current=temperature_2m,weather_code&temperature_unit=${unit}`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data && data.current) {
          setTemp(data.current.temperature_2m);
          setWeatherCode(data.current.weather_code);
        }
      } catch (err) {
        console.error('Failed to fetch Macon weather:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [lang]);

  if (!mounted) {
    // Return placeholder for SSR to prevent hydration issues
    return (
      <div className="w-16 h-6 bg-muted/40 border border-border/40 rounded-full animate-pulse" />
    );
  }

  if (loading) {
    return (
      <div className="flex items-center gap-1.5 px-3 py-1 bg-muted/40 border border-border/40 rounded-full text-[10px] font-bold text-muted-foreground/60 animate-pulse">
        <span>🌡️</span>
        <span>--</span>
      </div>
    );
  }

  // Get weather text and emoji
  const getWeatherInfo = (code: number | null) => {
    if (code === null) return { emoji: '🌡️', text: '' };
    if (code === 0) return { emoji: '☀️', text: t.weatherClear };
    if (code >= 1 && code <= 3) return { emoji: '⛅', text: t.weatherCloudy };
    if (code === 45 || code === 48) return { emoji: '🌫️', text: t.weatherFoggy };
    if (code >= 51 && code <= 55) return { emoji: '🌧️', text: t.weatherDrizzle };
    if (code >= 61 && code <= 65) return { emoji: '🌧️', text: t.weatherRainy };
    if (code >= 71 && code <= 75) return { emoji: '❄️', text: t.weatherSnowy };
    if (code >= 80 && code <= 82) return { emoji: '🌦️', text: t.weatherShowers };
    if (code >= 95 && code <= 99) return { emoji: '⛈️', text: t.weatherStormy };
    return { emoji: '🌡️', text: '' };
  };

  const { emoji, text: weatherText } = getWeatherInfo(weatherCode);

  return (
    <div
      title={`${t.weatherMacon}: ${weatherText}`}
      className="flex items-center gap-1.5 px-3 py-1 bg-muted/40 border border-border/60 rounded-full text-[10px] font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground hover:border-primary/20 transition-all cursor-help relative group"
    >
      <span className="text-sm leading-none">{emoji}</span>
      <span>{temp !== null ? `${Math.round(temp)}°${'F'}` : '--'}</span>
      
      {/* Floating Hover Tooltip */}
      <div className="absolute top-full mt-2 right-0 bg-card border border-border px-3 py-1.5 rounded-lg shadow-deep opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-200 text-[9px] lowercase tracking-wide text-muted-foreground normal-case whitespace-nowrap z-50">
        <span className="font-semibold text-foreground">{t.weatherMacon}: </span>
        {weatherText}
      </div>
    </div>
  );
};
