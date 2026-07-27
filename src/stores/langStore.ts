import { atom } from 'nanostores';

export type Lang = 'es' | 'en';

const getInitialLang = (): Lang => {
  if (typeof window !== 'undefined') {
    const path = window.location.pathname;
    if (path.startsWith('/es') || path.startsWith('/es/')) {
      return 'es';
    }
    return 'en';
  }
  return 'en'; // default fallback for server-side initial state
};

export const $lang = atom<Lang>(getInitialLang());

export function setLang(lang: Lang) {
  $lang.set(lang);
}

export function t(es: string, en: string) {
  return $lang.get() === 'es' ? es : en;
}
