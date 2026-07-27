import React, { useState, useEffect } from 'react';
import {
  Layers,
  Music,
  Coffee,
  Trees,
  Bus
} from 'lucide-react';
import { en } from '../../i18n/en';
import { es } from '../../i18n/es';

interface Props {
  lang?: string;
}

export const InteractiveMap: React.FC<Props> = ({ lang = 'en' }) => {
  const isEs = lang === 'es';
  const t = isEs ? es : en;

  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [isClient, setIsClient] = useState(false);
  const [LeafletComponent, setLeafletComponent] = useState<any>(null);

  useEffect(() => {
    setIsClient(true);
    import('./LeafletMapContainer').then((mod) => {
      setLeafletComponent(() => mod.LeafletMapContainer);
    });
  }, []);

  const pins = [
    { id: 'stadium', data: { title: 'Mercedes-Benz Stadium', neighborhood: 'Downtown', category: 'Stadium', category_type: 'fanfest', address: '1 AMB Dr NW', hours: 'Event Times', rating: 5.0, lat: 33.7554, lng: -84.4010 } },
    { id: 'fanfest', data: { title: 'Centennial Olympic Park', neighborhood: 'Downtown', category: 'Park & Culture', category_type: 'park', address: '265 Park Ave West NW', hours: '6:00 AM - 11:00 PM', rating: 4.8, lat: 33.7603, lng: -84.3931 } },
    { id: 'blakes-on-the-park', data: { title: "Blake's on the Park", neighborhood: 'Midtown', category: 'Dance Club', category_type: 'nightlife', address: '227 10th St NE', hours: '5:00 PM - 3:00 AM', rating: 4.5, lat: 33.7810, lng: -84.3793 } },
    { id: 'bulldogs-bar', data: { title: 'Bulldogs Bar', neighborhood: 'Midtown', category: 'Dive Bar', category_type: 'nightlife', address: '893 Peachtree St NE', hours: '4:00 PM - 3:00 AM', rating: 4.4, lat: 33.7788, lng: -84.3846 } },
    { id: 'the-heretic', data: { title: 'The Heretic', neighborhood: 'Cheshire Bridge', category: 'Dance Club', category_type: 'nightlife', address: '2069 Cheshire Bridge Rd', hours: '8:00 PM - 3:00 AM', rating: 4.6, lat: 33.8152, lng: -84.3524 } },
    { id: 'finca-to-filter', data: { title: 'FiNCA to FiLTER', neighborhood: 'Midtown', category: 'Coffee Shop', category_type: 'lifestyle', address: '1010 Peachtree St NE', hours: '7:00 AM - 6:00 PM', rating: 4.9, lat: 33.7821, lng: -84.3837 } },
    { id: 'marys', data: { title: "Mary's EAV", neighborhood: 'East Macon', category: 'Dive Bar', category_type: 'nightlife', address: '1287 Glenwood Ave SE', hours: '5:00 PM - 2:00 AM', rating: 4.7, lat: 33.7402, lng: -84.3465 } },
    { id: 'my-sisters-room', data: { title: "My Sister's Room", neighborhood: 'Midtown', category: 'Dance Club', category_type: 'nightlife', address: '84 12th St NE', hours: '6:00 PM - 3:00 AM', rating: 4.8, lat: 33.7834, lng: -84.3852 } },
    { id: 'woofs-macon', data: { title: "Woofs Macon", neighborhood: 'Plaza Midtown', category: 'Sports Bar', category_type: 'nightlife', address: '494 Plasters Ave NE', hours: '11:00 AM - 12:00 AM', rating: 4.6, lat: 33.8051, lng: -84.3682 } },
    { id: 'midtown-marta', data: { title: 'Midtown MARTA Station', neighborhood: 'Midtown', category: 'Transit', category_type: 'transit', address: 'Peachtree St & 10th St', hours: '24/7 Transit', rating: 4.2, lat: 33.7811, lng: -84.3863 } },
    { id: 'piedmont-park', data: { title: 'Piedmont Park', neighborhood: 'Midtown', category: 'Park', category_type: 'park', address: '1320 Monroe Dr NE', hours: '6:00 AM - 11:00 PM', rating: 4.9, lat: 33.7850, lng: -84.3738 } }
  ];

  const filteredItems = activeFilter === 'all' ? pins : pins.filter(p => p.data.category_type === activeFilter);

  return (
    <div className="space-y-4">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 pb-2">
        <span className="text-xs font-label text-muted-foreground uppercase font-bold pr-2 flex items-center gap-1">
          <Layers size={14} /> {isEs ? 'Filtro Mapa:' : 'Map Filter:'}
        </span>
        <button
          onClick={() => setActiveFilter('all')}
          className={`filter-chip ${activeFilter === 'all' ? 'filter-chip-active' : ''}`}
        >
          {isEs ? 'Todos los Puntos' : 'All Markers'}
        </button>
        <button
          onClick={() => setActiveFilter('nightlife')}
          className={`filter-chip flex items-center gap-1 ${activeFilter === 'nightlife' ? 'filter-chip-active' : ''}`}
        >
          <Music size={12} /> {isEs ? 'Vida Nocturna' : 'Nightlife'}
        </button>
        <button
          onClick={() => setActiveFilter('lifestyle')}
          className={`filter-chip flex items-center gap-1 ${activeFilter === 'lifestyle' ? 'filter-chip-active' : ''}`}
        >
          <Coffee size={12} /> {isEs ? 'Cafés y Tiendas' : 'Cafes & Retail'}
        </button>
        <button
          onClick={() => setActiveFilter('park')}
          className={`filter-chip flex items-center gap-1 ${activeFilter === 'park' ? 'filter-chip-active' : ''}`}
        >
          <Trees size={12} /> {isEs ? 'Parques y Cultura' : 'Parks & Culture'}
        </button>
        <button
          onClick={() => setActiveFilter('transit')}
          className={`filter-chip flex items-center gap-1 ${activeFilter === 'transit' ? 'filter-chip-active' : ''}`}
        >
          <Bus size={12} /> {isEs ? 'Estaciones MARTA' : 'MARTA Transit'}
        </button>
      </div>

      {/* Vector GIS Leaflet Map Container */}
      {isClient && LeafletComponent ? (
        <LeafletComponent items={filteredItems} />
      ) : (
        <div className="w-full h-[500px] rounded-2xl bg-card border border-border flex items-center justify-center text-muted-foreground text-sm font-label animate-pulse">
          🛰️ {isEs ? 'Cargando Mapa Vectorial GIS de Macon...' : 'Loading Macon GIS Vector Map...'}
        </div>
      )}
    </div>
  );
};
