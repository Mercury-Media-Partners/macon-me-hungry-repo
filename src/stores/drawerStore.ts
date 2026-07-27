import { atom } from 'nanostores';

export const $activeVenueSlug = atom<string | null>(null);

export function openVenueDrawer(slug: string) {
  $activeVenueSlug.set(slug);
  if (typeof window !== 'undefined') {
    const url = new URL(window.location.href);
    url.searchParams.set('venue', slug);
    window.history.pushState({}, '', url.toString());
  }
}

export function closeVenueDrawer() {
  $activeVenueSlug.set(null);
  if (typeof window !== 'undefined') {
    const url = new URL(window.location.href);
    if (url.searchParams.has('venue')) {
      url.searchParams.delete('venue');
      window.history.pushState({}, '', url.toString());
    }
  }
}
