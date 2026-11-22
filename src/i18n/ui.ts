import type { Lang, PageKey } from './routes';
import en from '../data/en.json';
import es from '../data/es.json';
import site from '../data/site.json';

export { site };

// Textos de interfaz de la web nueva. El contenido del proyecto está en src/data/<lang>.json.
const ui = {
  en: {
    page: {
      home: 'Home', features: 'Features', center: 'Arctiva Center', screenshots: 'Screenshots',
      download: 'Download', roadmap: 'Roadmap', news: 'News', faq: 'FAQ', community: 'Community',
      trademarks: 'Trademark policy',
    } as Record<PageKey, string>,
    skip: 'Skip to content',
    menu: 'Menu',
    theme: 'Dark mode',
    github: 'Source code on GitHub',
    foot_site: 'Website',
    foot_project: 'Project',
    foot_help: 'Help and support',
    home_more_features: 'See all features',
    home_more_center: 'Discover Arctiva Center',
    home_more_shots: 'See all screenshots',
    home_status_link: 'Requirements and status',
    home_roadmap_link: 'View the roadmap',
    highlights: [
      { k: 'look', h: 'Its own look', p: 'A Windows-style KDE Plasma desktop, light by default, with its own boot menu, boot screen and login screen.', to: 'features' },
      { k: 'center', h: 'Arctiva Center', p: 'Personalisation, updates, applications, drivers and extras in one app.', to: 'center' },
      { k: 'store', h: 'App store', p: 'Programs from the official Arch repositories and Flathub, with the source always visible. The AUR is optional.', to: 'center' },
      { k: 'snap', h: 'Snapshots', p: 'Btrfs snapshots with Snapper. If an update goes wrong, boot an earlier one from the GRUB menu.', to: 'features' },
      { k: 'games', h: 'Games', p: 'Steam, Lutris, GameMode, MangoHud and Gamescope in the Gaming profile; Heroic and ProtonPlus as extras.', to: 'features' },
      { k: 'win', h: 'Windows programs', p: 'Open a .exe or .msi and Arctiva explains what will happen and opens it with Bottles. Not everything works.', to: 'features' },
    ] as { k: string; h: string; p: string; to: PageKey }[],
    lang_hint: null as null | { text: string; cta: string; close: string },
    font_credit: ['Outfit typeface © The Outfit Project Authors, under the ', 'SIL Open Font License 1.1', '.'],
    nf_title: 'Page not found',
    nf_text: 'This page does not exist or has moved.',
    nf_back: 'Go to the home page',
    close: 'Close',
    build_h: 'Build it from the source code',
    build_p: 'Until there is an ISO, you can build it yourself from the source code in the project repository.',
    meta: {
      features: { title: 'Features', desc: 'Everything Arctiva includes: graphical installer, KDE Plasma desktop, Btrfs snapshots, drivers, games and Windows programs, on top of Arch Linux.', lead: 'What Arctiva includes, from the graphical installer to the snapshots that let you undo a failed update.' },
      center: { title: 'Arctiva Center', desc: 'Arctiva Center brings personalisation, updates, the app store, drivers and extras together in one native app that looks like Plasma.', lead: 'The app that brings Arctiva\'s tools together, and the store where you install programs.' },
      screenshots: { title: 'Screenshots', desc: 'Screenshots of Arctiva 0.7.0: desktop, installer, GRUB snapshots, Arctiva Center, the app store and the .exe dialog.', lead: '' },
      download: { title: 'Download and requirements', desc: 'Arctiva has no ISO to download yet. Planned requirements, things to know and how to build the ISO from the source code.', lead: '' },
      roadmap: { title: 'Roadmap', desc: 'The Arctiva roadmap, from the foundations to the first stable release: what is already complete (up to 0.7) and what is planned.', lead: '' },
      community: { title: 'Community and support', desc: 'Ask questions, follow releases and report bugs on GitHub, or support Arctiva with a GitHub sponsorship or a coffee.', lead: '' },
      trademarks: { title: 'Trademark policy', desc: 'Policy for the Arctiva name and logo: what you can do without asking and what needs written permission from CatLinux.', lead: '' },
    } as Record<string, { title: string; desc: string; lead: string }>,
  },
  es: {
    page: {
      home: 'Inicio', features: 'Características', center: 'Arctiva Center', screenshots: 'Capturas',
      download: 'Descargar', roadmap: 'Hoja de ruta', news: 'Novedades', faq: 'Preguntas frecuentes',
      community: 'Comunidad', trademarks: 'Política de marca',
    } as Record<PageKey, string>,
    skip: 'Saltar al contenido',
    menu: 'Menú',
    theme: 'Modo oscuro',
    github: 'Código fuente en GitHub',
    foot_site: 'Web',
    foot_project: 'Proyecto',
    foot_help: 'Ayuda y apoyo',
    home_more_features: 'Ver todas las características',
    home_more_center: 'Conoce Arctiva Center',
    home_more_shots: 'Ver todas las capturas',
    home_status_link: 'Requisitos y estado',
    home_roadmap_link: 'Ver la hoja de ruta',
    highlights: [
      { k: 'look', h: 'Aspecto propio', p: 'Escritorio KDE Plasma al estilo de Windows, claro por defecto, con menú de arranque, pantalla de arranque e inicio de sesión propios.', to: 'features' },
      { k: 'center', h: 'Arctiva Center', p: 'Personalización, actualizaciones, aplicaciones, controladores y extras en una sola aplicación.', to: 'center' },
      { k: 'store', h: 'Tienda de aplicaciones', p: 'Programas de los repositorios oficiales de Arch y de Flathub, con el origen siempre visible. El AUR es opcional.', to: 'center' },
      { k: 'snap', h: 'Instantáneas', p: 'Instantáneas de Btrfs con Snapper. Si una actualización sale mal, arrancas una anterior desde el menú de GRUB.', to: 'features' },
      { k: 'games', h: 'Juegos', p: 'Steam, Lutris, GameMode, MangoHud y Gamescope en el perfil Juegos; Heroic y ProtonPlus como extras.', to: 'features' },
      { k: 'win', h: 'Programas de Windows', p: 'Abre un .exe o .msi y Arctiva te explica qué va a pasar y lo abre con Bottles. No todo funciona.', to: 'features' },
    ] as { k: string; h: string; p: string; to: PageKey }[],
    lang_hint: null as null | { text: string; cta: string; close: string },
    font_credit: ['Tipografía Outfit © The Outfit Project Authors, bajo la ', 'SIL Open Font License 1.1', '.'],
    nf_title: 'Página no encontrada',
    nf_text: 'Esta página no existe o ha cambiado de sitio.',
    nf_back: 'Ir a la portada',
    close: 'Cerrar',
    build_h: 'Constrúyela desde el código fuente',
    build_p: 'Mientras no haya ISO, puedes construirla tú desde el código fuente del repositorio del proyecto.',
    meta: {
      features: { title: 'Características', desc: 'Todo lo que incluye Arctiva: instalador gráfico, KDE Plasma, instantáneas de Btrfs, controladores, juegos y programas de Windows, sobre Arch Linux.', lead: 'Qué incluye Arctiva, desde el instalador gráfico hasta las instantáneas que deshacen una actualización fallida.' },
      center: { title: 'Arctiva Center', desc: 'Arctiva Center reúne personalización, actualizaciones, tienda, controladores y extras en una sola aplicación nativa con el aspecto de Plasma.', lead: 'La aplicación que reúne las herramientas de Arctiva y la tienda donde instalas programas.' },
      screenshots: { title: 'Capturas', desc: 'Capturas de Arctiva 0.7.0: escritorio, instalador, instantáneas en GRUB, Arctiva Center, la tienda y el diálogo de .exe.', lead: '' },
      download: { title: 'Descarga y requisitos', desc: 'Arctiva aún no tiene ISO para descargar. Requisitos previstos, cosas que conviene saber y cómo construir la ISO desde el código fuente.', lead: '' },
      roadmap: { title: 'Hoja de ruta', desc: 'La hoja de ruta de Arctiva, de los cimientos a la primera versión estable: lo que ya está completo (hasta la 0.7) y lo que está previsto.', lead: '' },
      community: { title: 'Comunidad y apoyo', desc: 'Pregunta, sigue las versiones y avisa de fallos en GitHub, o apoya Arctiva con un patrocinio de GitHub o un café.', lead: '' },
      trademarks: { title: 'Política de marca', desc: 'Política del nombre y el logo de Arctiva: qué puedes hacer sin pedir permiso y qué necesita permiso por escrito de CatLinux.', lead: '' },
    } as Record<string, { title: string; desc: string; lead: string }>,
  },
};

// Aviso que se muestra en las páginas en inglés a quien tiene el navegador en español.
ui.en.lang_hint = { text: '¿Prefieres leer esta web en español?', cta: 'Ver en español', close: 'Cerrar' };

const data = { en, es };

export function useT(lang: Lang) {
  return { d: data[lang], u: ui[lang], site };
}
