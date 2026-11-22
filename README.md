# arctiva-web

Web pública de Arctiva (<https://arctiva.techmarc.es>). Sitio estático de una sola página por idioma, con tema oscuro y animaciones por scroll (respeta «reducir movimiento»), sin rastreadores ni recursos de terceros, en cinco idiomas: inglés, castellano, catalán, gallego y euskera.

## Requisitos

- Python 3 (solo biblioteca estándar) para generar el sitio.
- Apache en el servidor, con los módulos `headers`, `expires` y `deflate`.

## Estructura

- `src/template.html`: plantilla común. `src/app.js`: animaciones por scroll (se incrusta en cada página por la CSP; la web funciona sin él). Estilos en `assets/style.css`. `src/site.json`: dominio, enlace al repositorio e idiomas.
- `src/i18n/<idioma>.json`: todo el texto de cada idioma. Todas las claves son obligatorias en todos los idiomas.
- `src/legal/`: política del nombre y el logo (`TRADEMARKS*.md`), publicada como `/en/trademarks.html` y `/es/trademarks.html`.
- `assets/`: estilos y logos oficiales (`arctiva-logo.svg`, `arctiva-mark.svg`, `arctiva-mark-mono.svg`, `arctiva-icon.svg`). No se modifican ni se redibujan.
- `entrada/`: buzón de archivos recibidos (ignorado por git).
- `build.py`: genera `public/` (no se versiona). `scripts/`: despliegue y vhost.

## Uso

Generar en local: `python3 build.py` y abrir `public/index.html`.

Para cambiar texto, editar el JSON del idioma, hacer commit y push a `main`, y desplegar:

```
ssh vps-forgehost /opt/vps-apps/arctiva-web/scripts/deploy.sh
```

El script hace `git fetch` + `merge --ff-only` de `origin/main` y regenera `public/`. El servidor solo sirve `public/`.

Instalación en el servidor (una sola vez, con sudo): ver `docs/DESPLIEGUE.md`.

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
