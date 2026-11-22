export type Lang = 'en' | 'es';
export const LANGS: Lang[] = ['en', 'es'];
export const DEFAULT_LANG: Lang = 'en';

// Única fuente de las URL de cada página en cada idioma: la usan la navegación,
// el selector de idioma, los hreflang y el sitemap.
export const routes = {
  home: { en: '/', es: '/es/' },
  features: { en: '/features/', es: '/es/caracteristicas/' },
  center: { en: '/center/', es: '/es/center/' },
  screenshots: { en: '/screenshots/', es: '/es/capturas/' },
  download: { en: '/download/', es: '/es/descargar/' },
  roadmap: { en: '/roadmap/', es: '/es/hoja-de-ruta/' },
  news: { en: '/news/', es: '/es/novedades/' },
  faq: { en: '/faq/', es: '/es/preguntas-frecuentes/' },
  community: { en: '/community/', es: '/es/comunidad/' },
  trademarks: { en: '/trademarks/', es: '/es/marca/' },
} as const;

export type PageKey = keyof typeof routes;

// Páginas visibles en la cabecera y en el pie. Añadir aquí una página solo cuando exista.
export const NAV: PageKey[] = ['features', 'center', 'screenshots', 'roadmap', 'community'];
export const FOOTER_SITE: PageKey[] = ['home', 'features', 'center', 'screenshots', 'download', 'roadmap', 'community', 'trademarks'];

export const url = (page: PageKey, lang: Lang) => routes[page][lang];
