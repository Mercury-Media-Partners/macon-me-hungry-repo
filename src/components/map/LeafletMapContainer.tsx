import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useStore } from "@nanostores/react";
import { $activeVenueSlug, openVenueDrawer } from "@/stores/drawerStore";
import { getOpenStatus } from "../directory/DirectoryFinder";

interface MapItem {
  id: string;
  data: {
    title: string;
    neighborhood: string;
    category: string;
    category_type: string;
    address: string;
    hours: string;
    rating: number;
    lat?: number;
    lng?: number;
  };
}

interface LeafletMapContainerProps {
  items: MapItem[];
}

const hoodCoords: Record<string, [number, number]> = {
  midtown: [33.7816, -84.3828],
  "east macon": [33.7402, -84.3465],
  buckhead: [33.8398, -84.3797],
  downtown: [33.7573, -84.3963],
  default: [33.7750, -84.3750],
};

function getMarkerIcon(categoryType: string) {
  let color = "#ec4899"; // pink (nightlife)
  if (categoryType === "lifestyle" || categoryType === "cafe") color = "#f59e0b"; // amber
  if (categoryType === "outdoors" || categoryType === "park") color = "#10b981"; // emerald
  if (categoryType === "wellness" || categoryType === "professional") color = "#14b8a6"; // teal

  const svg = `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="${color}" stroke="#ffffff" stroke-width="1.5"/>
    <circle cx="12" cy="9" r="2.5" fill="#ffffff"/>
  </svg>`;

  return L.divIcon({
    html: svg,
    className: "custom-leaflet-marker",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
}

export const LeafletMapContainer = ({ items }: LeafletMapContainerProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const markersRef = useRef<Record<string, L.Marker>>({});

  const activeSlug = useStore($activeVenueSlug);
  const lang = "en";
  

  // Initialize Leaflet Map
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    // Detect dark or light mode
    const isDark = document.documentElement.classList.contains("dark");
    const tileUrl = isDark
      ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      : "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";

    const map = L.map(containerRef.current, {
      center: [33.7780, -84.3750],
      zoom: 13,
      zoomControl: true,
      scrollWheelZoom: false,
    });

    L.tileLayer(tileUrl, {
      attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap',
      maxZoom: 19,
    }).addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Populate Map Markers
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Clear existing markers
    Object.values(markersRef.current).forEach((m) => m.remove());
    markersRef.current = {};

    // Add venue markers
    items.forEach((item) => {
      let lat = item.data.lat;
      let lng = item.data.lng;

      if (!lat || !lng) {
        const hoodKey = item.data.neighborhood?.toLowerCase() || "";
        const fallback = hoodCoords[hoodKey] || hoodCoords.default;
        // Apply slight jitter for unpositioned fallback markers
        lat = fallback[0] + (Math.random() - 0.5) * 0.01;
        lng = fallback[1] + (Math.random() - 0.5) * 0.01;
      }

      const openStatus = getOpenStatus(item.data.hours);
      const icon = getMarkerIcon(item.data.category_type);

      const marker = L.marker([lat, lng], { icon }).addTo(map);

      const popupHtml = `
        <div style="font-family: inherit; min-width: 180px;">
          <span style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: #ec4899; tracking: 0.05em;">
            ${item.data.category}
          </span>
          <h4 style="font-weight: 700; font-size: 15px; margin: 2px 0 4px; text-transform: uppercase; color: #ffffff;">
            ${item.data.title}
          </h4>
          <p style="font-size: 11px; color: #a1a1aa; margin-bottom: 6px;">📍 ${item.data.neighborhood}</p>
          <div style="margin-bottom: 8px;">
            <span style="font-size: 10px; font-weight: 700; text-transform: uppercase; padding: 2px 6px; border-radius: 4px; background: ${
              openStatus.status === "open" ? "rgba(16,185,129,0.2)" : "rgba(244,63,94,0.2)"
            }; color: ${openStatus.status === "open" ? "#10b981" : "#f43f5e"};">
              ${openStatus.labelEn}
            </span>
          </div>
          <button id="drawer-btn-${item.id}" style="width: 100%; padding: 6px 10px; background: #ec4899; color: #ffffff; border: none; border-radius: 6px; font-weight: 700; font-size: 11px; text-transform: uppercase; cursor: pointer;">
            ${"Quick View"} →
          </button>
        </div>
      `;

      marker.bindPopup(popupHtml);

      marker.on("popupopen", () => {
        const btn = document.getElementById(`drawer-btn-${item.id}`);
        if (btn) {
          btn.onclick = () => openVenueDrawer(item.id);
        }
      });

      markersRef.current[item.id] = marker;
    });
  }, [items, isEs]);

  // Sync active venue selection (fly to venue when activeSlug changes)
  useEffect(() => {
    if (!activeSlug || !mapRef.current) return;
    const marker = markersRef.current[activeSlug];
    if (marker) {
      const latLng = marker.getLatLng();
      mapRef.current.flyTo(latLng, 15, { duration: 1.2 });
      marker.openPopup();
    }
  }, [activeSlug]);

  return (
    <div className="relative w-full h-[500px] rounded-2xl overflow-hidden border border-border shadow-2xl z-10">
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
};
