import { atom } from 'nanostores';

export type SiteMode = 'day' | 'night';

const getInitialMode = (): SiteMode => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('maconmehungry-mode');
    if (saved === 'day' || saved === 'night') return saved;
  }
  return 'night';
};

export const $siteMode = atom<SiteMode>(getInitialMode());

export function setSiteMode(mode: SiteMode) {
  $siteMode.set(mode);
  if (typeof window !== 'undefined') {
    localStorage.setItem('maconmehungry-mode', mode);
    const root = document.documentElement;
    if (mode === 'day') {
      root.classList.remove('dark');
      root.classList.add('light');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
    }
  }
}
