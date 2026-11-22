# arctiva-web

Web pública de Arctiva (<https://arctiva.techmarc.es>). Sitio estático multipágina generado con [Astro](https://astro.build), en inglés (raíz) y castellano (`/es/`), con tema claro por defecto y conmutador a oscuro, sin rastreadores ni recursos de terceros.

## Requisitos

- Node.js 22 y npm (en el VPS, vía nvm).
- Apache en el servidor, con los módulos `headers`, `expires` y `deflate`.

## Estructura

- `src/pages/`: rutas (`/…` en inglés, `/es/…` en castellano); cada una solo instancia un componente de `src/components/pages/`. La tabla de URL de cada idioma está en `src/i18n/routes.ts`; los textos de interfaz, en `src/i18n/ui.ts`.
- `src/data/`: contenido del proyecto por idioma (`en.json`, `es.json`) y `site.json` (dominio, enlaces, versión). `src/legal/`: política del nombre y el logo (`TRADEMARKS*.md`).
- `src/assets/capturas/`: capturas originales (se optimizan a WebP al compilar). `static/`: logos oficiales (`arctiva-*.svg`, no se modifican), tipografía y su licencia.
- `scripts/`: `deploy.sh`, `check-site.mjs` (comprueba el resultado) y vhost. `entrada/`: buzón de archivos recibidos (ignorado por git).
- `dist/` es la salida de la compilación y `public/` lo que sirve Apache; ninguno se versiona.

## Uso

```
npm ci
npm run dev      # servidor de desarrollo
npm run build    # genera dist/
npm run check    # comprueba dist/ (CSS en línea, SEO, enlaces rotos)
```

Para publicar: commit y push a `main`, y `ssh vps-forgehost /opt/vps-apps/arctiva-web/scripts/deploy.sh`. Detalles e instalación en el servidor: `docs/DESPLIEGUE.md`.

## Créditos y licencia

**arctiva-web** está desarrollado y mantenido por **CatLinux**.
Copyright (C) 2026 CatLinux.

Licencia [GPL-3.0-or-later](LICENSE): software libre; puedes usarlo, estudiarlo, modificarlo y compartirlo, también con fines comerciales. Si distribuyes una versión modificada, debe seguir bajo la misma licencia, con su código fuente y conservando los avisos de copyright.

El **nombre y el logo de Arctiva** (los archivos `static/arctiva-*.svg`) **no están cubiertos** por esa licencia: pertenecen a CatLinux y se rigen por la política de `src/legal/`.

### Material de terceros

| Componente | Autor | Licencia | Enlace |
| --- | --- | --- | --- |
| Tipografía Outfit (paquete `@fontsource-variable/outfit` 5.3.0) | The Outfit Project Authors | [SIL Open Font License 1.1](static/fonts/OFL.txt) | https://github.com/Outfitio/Outfit-Fonts |

La tipografía conserva su propia licencia; la GPL de este proyecto no la cubre.
