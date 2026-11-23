# Changelog

Formato [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/); versionado [SemVer](https://semver.org/lang/es/).

## [Sin publicar]

## [0.9.0] - 2026-11-23

### Cambiado
- Contenido al día con Arctiva 0.8.1 (versión preliminar): versión en la insignia, la descarga, la FAQ y los datos estructurados; enlaces a la release v0.8.1 y a `arctiva-0.8.1-x86_64.iso`; la ISO pesa unos 1,7 GiB.
- Arctiva Center: «Actualizaciones» describe el botón único (Arch, Flatpak y AUR opcional); «Aplicaciones» menciona la cola de instalaciones con progreso; nuevo apartado «Energía» con los perfiles de energía.
- «Live ISO e instalador»: Kate, Ark, Okular, Gwenview, Spectacle y KWalletManager no vienen en la ISO y se instalan con internet o la primera vez que el equipo se conecta.

## [0.8.0] - 2026-11-22

### Añadido
- Preguntas frecuentes (`/faq/`, `/es/preguntas-frecuentes/`) con datos estructurados `FAQPage`, enlazadas en la cabecera y el pie. La respuesta sobre la ISO apunta a la descarga de GitHub Releases (0.8.0, beta).
- «Arctiva Games» en «Qué incluye» (en desarrollo): extra opcional de Arctiva Center, fuera de la ISO, que instala lanzadores de juegos de Windows con Proton o Wine; nuevo y poco probado en hardware real. También se menciona en la tarjeta «Juegos» de la portada.

## [0.7.1] - 2026-11-22

### Corregido
- Hoja de ruta (0.4): el repositorio firmado [arctiva] ya está publicado, se quita «aún sin publicar».

### Cambiado
- El botón principal de la portada pasa de «Descarga: próximamente» a «Descargar la beta».

## [0.7.0] - 2026-11-22

### Añadido
- Página de descarga con la beta de Arctiva 0.8.0: enlace a la release de GitHub, huella de la clave y las órdenes de verificación (`sha256sum` y `gpg --verify`).

### Cambiado
- Contenido al día con Arctiva 0.8.0: insignia de la portada («Beta · versión 0.8.0»), hoja de ruta (0.8–0.9 en desarrollo) y «Requisitos» (antes «previstos»). Las claves `noiso_*` pasan a `beta_*`.
- Titular de la sección de la portada: «Linux para el día a día» (antes mencionaba Arch Linux).

## [0.6.0] - 2026-11-22

### Añadido
- Web multipágina: características, Arctiva Center, capturas (con visor), descarga y requisitos, hoja de ruta, comunidad y apoyo, y política de marca, en inglés y castellano.

### Cambiado
- Cambian las URL: ya no hay una sola página por idioma. `/en/` pasa a `/` y las rutas en castellano cuelgan de `/es/`.
- La web pasa a generarse con Astro 7 (antes, `build.py`): plantilla base con cabecera fija, menú móvil, selector de idioma desplegable, conmutador de modo claro/oscuro (claro por defecto), pie con mapa del sitio y portada nueva con los colores del sistema (Arctiva Light y Breeze Dark). Capturas optimizadas a WebP en varios tamaños.
- Tipografía Outfit (SIL Open Font License 1.1) servida desde la propia web para los titulares, con su crédito en el pie y el texto de la licencia en `/fonts/OFL.txt`.
- Solo inglés (en la raíz) y castellano (`/es/`); se retiran catalán, gallego y euskera.
- `scripts/check-site.mjs` comprueba también que el título no pase de 60 caracteres ni la descripción de 155.
- `scripts/deploy.sh` compila con Astro, comprueba el resultado con `scripts/check-site.mjs` y sustituye `public/` de una vez.

## [0.5.0] - 2026-11-22

### Añadido
- Sección «Capturas» con 17 imágenes de Arctiva 0.7.0 tomadas en una máquina virtual (escritorio, inicio de sesión, arranque, GRUB, instalador, Arctiva Center, tienda, AUR y diálogo de .exe), en los cinco idiomas. Cada imagen abre su tamaño completo en una pestaña nueva.

## [0.4.0] - 2026-11-22

### Cambiado
- Contenido al día con la versión 0.7.0 de Arctiva (fases 1 a 6 terminadas), en los cinco idiomas: insignia de la portada, «Qué incluye» (aspecto propio, tienda, programas de Windows, Heroic y ProtonPlus como extras), Arctiva Center (páginas Bienvenida, Personalización, Aplicaciones…) y hoja de ruta (0.4 a 0.7 completadas).
- Arctiva Center pasa de «En desarrollo» a «Completado».
- Aviso en «Conviene saber» sobre GRUB en modo texto con el cifrado de disco; se indica el peso de la ISO (≈ 1,8 GiB) en el aviso de que aún no hay descarga.

## [0.3.4] - 2026-11-21

### Añadido
- Tarjeta de Buy Me a Coffee en «Apoya Arctiva», para quien no tiene cuenta de GitHub.

## [0.3.3] - 2026-11-21

### Cambiado
- Requisitos con los datos del proyecto: 25 GB de disco (40 GB recomendados) y USB de 4 GB o más.
- Versión mostrada en la portada: 0.4.0.

## [0.3.2] - 2026-11-21

### Añadido
- Enlace a GitHub Discussions en la sección «Comunidad».
- `.github/FUNDING.yml` con GitHub Sponsors para mostrar el botón «Sponsor» en este repositorio.

## [0.3.1] - 2026-11-21

### Añadido
- Sección «Apoya Arctiva» con GitHub Sponsors; la opción de Buy Me a Coffee (para quien no tiene cuenta de GitHub) se activará con `support.coffee` en `src/site.json`.

## [0.3.0] - 2026-11-21

### Añadido
- Sección «Comunidad» con enlaces a las novedades de cada versión (Releases) y a los fallos (Issues) del repositorio; el enlace a Discussions se activará con `community.discussions` en `src/site.json`.

### Cambiado
- El principio «Claros con lo que falta» se sustituye por «Ayuda propia».

## [0.2.1] - 2026-11-21

### Cambiado
- Textos más sobrios en los cinco idiomas: menos adornos, encabezados descriptivos y limitaciones conocidas redactadas sin dramatismo.
- Estado «Hecho» renombrado a «Completado» (y equivalentes en los demás idiomas).
- Las ventanas de muestra usan una barra de título neutra en lugar de los botones de macOS.
- Los enlaces externos se abren en una pestaña nueva.

## [0.2.0] - 2026-11-21

### Cambiado
- Rediseño completo: tema oscuro con la paleta del logo, fondo de estrellas y auroras con parallax, cabecera de cristal con barra de progreso y sección activa, cinta de tecnologías.
- Animaciones por scroll: aparición escalonada de secciones, instalador en diez pasos que avanza al desplazarse, terminal que muestra cómo volver a una instantánea y hoja de ruta con línea de progreso. Se desactivan con «reducir movimiento» y la página es legible sin JavaScript.
- Contenido ampliado según la descripción del proyecto (versión 0.3.10): principios, características con su estado real (hecho, en desarrollo, previsto), perfiles de instalación, Arctiva Center, hoja de ruta completa, requisitos y limitaciones conocidas, en los cinco idiomas.

## [0.1.2] - 2026-11-21

### Cambiado
- `docs/DESPLIEGUE.md`: flujo de actualización documentado, incluida la orden desde el equipo Windows.

## [0.1.1] - 2026-11-21

### Añadido
- Licencia GPL-3.0-or-later (`LICENSE`, titular CatLinux) y sección de créditos y licencia en el README, con la salvedad de que el nombre y el logo no quedan cubiertos.

## [0.1.0] - 2026-11-21

### Añadido
- Web estática con generador (`build.py`), plantilla común y textos en inglés, castellano, catalán, gallego y euskera.
- Modo claro y oscuro automático, diseño adaptable a móvil, sin JavaScript en las páginas de contenido.
- Selector de idioma en la raíz según el idioma del navegador, `robots.txt` y `sitemap.xml`.
- Logos oficiales sin modificar (logotipo, símbolo en color y monocromo, icono para el favicon).
- Páginas con la política del nombre y el logo (inglés y castellano; el resto de idiomas enlaza a la inglesa).
- Enlaces al código, hoja de ruta, arquitectura, cambios y repositorio de paquetes firmado, con la huella de su clave.
- Aviso de proyecto independiente, no afiliado a Arch Linux.
- Scripts de despliegue (`deploy.sh`) y de instalación del vhost con certificado (`instalar-vhost.sh`).
