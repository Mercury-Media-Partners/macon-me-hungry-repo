import React, { useState, useEffect } from 'react';
import {
  Layers,
  Music,
  Coffee,
  Trees,
  Bus
} from 'lucide-react';
import { en } from '../../i18n/en';

interface Props {
  lang?: string;
  businesses?: any[];
}

export const InteractiveMap: React.FC<Props> = ({ lang = 'en', businesses = [] }) => {
    const t = en;

  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [isClient, setIsClient] = useState(false);
  const [LeafletComponent, setLeafletComponent] = useState<any>(null);

  useEffect(() => {
    setIsClient(true);
    import('./LeafletMapContainer').then((mod) => {
      setLeafletComponent(() => mod.LeafletMapContainer);
    });
  }, []);

  // Don't filter by lat/lng here, LeafletMapContainer handles fallbacks based on neighborhood
  const pins = businesses;

  const filteredItems = activeFilter === 'all' ? pins : pins.filter(p => p.data.category_type === activeFilter);

  return (
    <div className="space-y-4">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 pb-2">
        <span className="text-xs font-label text-muted-foreground uppercase font-bold pr-2 flex items-center gap-1">
          <Layers size={14} /> {'Map Filter:'}
        </span>
        <button
          onClick={() => setActiveFilter('all')}
          className={`filter-chip ${activeFilter === 'all' ? 'filter-chip-active' : ''}`}
        >
          {'All Locations'}
        </button>
        <button
          onClick={() => setActiveFilter('nightlife')}
          className={`filter-chip flex items-center gap-1 ${activeFilter === 'nightlife' ? 'filter-chip-active' : ''}`}
        >
          <Music size={12} /> {'Nightlife'}
        </button>
        <button
          onClick={() => setActiveFilter('lifestyle')}
          className={`filter-chip flex items-center gap-1 ${activeFilter === 'lifestyle' ? 'filter-chip-active' : ''}`}
        >
          <Coffee size={12} /> {'Food & Casual'}
        </button>
      </div>

      {/* Vector GIS Leaflet Map Container */}
      {isClient && LeafletComponent ? (
        <LeafletComponent items={filteredItems} />
      ) : (
        <div className="w-full h-[500px] rounded-2xl bg-card border border-border flex items-center justify-center text-muted-foreground text-sm font-label animate-pulse">
          🛰️ {'Loading Macon GIS Vector Map...'}
        </div>
      )}
    </div>
  );
};
