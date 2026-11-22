# Despliegue

Servidor: VPS ForgeHost, Apache sirve `/opt/vps-apps/arctiva-web/public` para `arctiva.techmarc.es`.

## Primera instalación

1. `cd /opt/vps-apps/arctiva-web && npm ci && npm run build && node scripts/check-site.mjs dist && cp -a dist public`
2. `sudo NOEMAIL=1 bash scripts/instalar-vhost.sh` (instala el vhost, pide el certificado con Certbot y recarga Apache).
3. Comprobar: `curl -I https://arctiva.techmarc.es/`

## Actualizar contenido

1. Editar `src/data/*.json`, `src/i18n/ui.ts` o los componentes, hacer commit y push a `main` (`catlinux/arctiva-web`).
2. Lanzar el despliegue. Desde el equipo Windows (o cualquier equipo con el alias SSH `vps-forgehost`):

   ```
   ssh vps-forgehost /opt/vps-apps/arctiva-web/scripts/deploy.sh
   ```

   En el propio servidor basta `/opt/vps-apps/arctiva-web/scripts/deploy.sh`.

El script hace `git fetch` y `git merge --ff-only origin/main` (falla si el árbol del servidor tiene cambios propios o divergentes) instala dependencias (`npm ci`), compila con Astro, comprueba `dist/` con `scripts/check-site.mjs` y sustituye `public/` de una vez. Al terminar imprime la versión y el commit desplegados; compruébalos con `curl -I https://arctiva.techmarc.es/`. No toca Apache ni el vhost.

## Añadir un idioma

Añadir el código a `LANGS` y las rutas en `src/i18n/routes.ts`, copiar `src/data/en.json` a `src/data/<codigo>.json` y traducirlo, añadir el idioma en `src/i18n/ui.ts` y `languages` en `src/data/site.json`, y crear las páginas en `src/pages/<codigo>/`.

## Notas

- La política de seguridad (CSP) del vhost solo permite recursos propios; un recurso externo nuevo exige cambiarla en `scripts/arctiva.techmarc.es.conf`.
- Si cambia el vhost, hay que volver a instalarlo (`install` + `reload`); el desplegado normal no lo toca.
