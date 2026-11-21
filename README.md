# arctiva-web

Web pública de Arctiva (<https://arctiva.techmarc.es>). Sitio estático, sin rastreadores ni recursos de terceros, en cinco idiomas: inglés, castellano, catalán, gallego y euskera.

## Requisitos

- Python 3 (solo biblioteca estándar) para generar el sitio.
- Apache en el servidor, con los módulos `headers`, `expires` y `deflate`.

## Estructura

- `src/template.html`: plantilla común. `src/site.json`: dominio, enlace al repositorio e idiomas.
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

## Licencia

Licencia del código de la web: pendiente de decidir por el titular (no hay `LICENSE` todavía). El nombre y el logo de Arctiva no están cubiertos por la licencia del código: ver la política en `src/legal/`.
