import { atom } from 'nanostores';

const STORAGE_KEY = 'maconmehungry-itinerary';

function getInitialItinerary(): string[] {
  if (typeof window === 'undefined') return [];

  // Check URL query param first
  const params = new URLSearchParams(window.location.search);
  const itineraryParam = params.get('itinerary');
  if (itineraryParam) {
    const slugs = itineraryParam.split(',').map(s => s.trim()).filter(Boolean);
    if (slugs.length > 0) {
      return slugs;
    }
  }

  // Fallback to localStorage
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    // Ignore storage parse errors
  }

  return [];
}

export const $itineraryStore = atom<string[]>(getInitialItinerary());

export function saveItinerary(slugs: string[]) {
  $itineraryStore.set(slugs);
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
    } catch (e) {
      // Ignore write errors
    }
  }
}

export function addToItinerary(slug: string) {
  const current = $itineraryStore.get();
  if (!current.includes(slug)) {
    saveItinerary([...current, slug]);
  }
}

export function removeFromItinerary(slug: string) {
  const current = $itineraryStore.get();
  saveItinerary(current.filter(s => s !== slug));
}

export function toggleItinerary(slug: string) {
  const current = $itineraryStore.get();
  if (current.includes(slug)) {
    removeFromItinerary(slug);
  } else {
    addToItinerary(slug);
  }
}

export function clearItinerary() {
  saveItinerary([]);
}

export function getItineraryShareUrl(): string {
  if (typeof window === 'undefined') return '';
  const current = $itineraryStore.get();
  if (current.length === 0) return window.location.origin;

  const url = new URL(window.location.origin);
  url.searchParams.set('itinerary', current.join(','));
  return url.toString();
}
