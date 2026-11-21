# Despliegue

Servidor: VPS ForgeHost, Apache sirve `/opt/vps-apps/arctiva-web/public` para `arctiva.techmarc.es`.

## Primera instalación

1. `cd /opt/vps-apps/arctiva-web && python3 build.py`
2. `sudo NOEMAIL=1 bash scripts/instalar-vhost.sh` (instala el vhost, pide el certificado con Certbot y recarga Apache).
3. Comprobar: `curl -I https://arctiva.techmarc.es/`

## Actualizar contenido

1. Editar `src/i18n/*.json` (o la plantilla), hacer commit y push a `main` (`catlinux/arctiva-web`).
2. Lanzar el despliegue. Desde el equipo Windows (o cualquier equipo con el alias SSH `vps-forgehost`):

   ```
   ssh vps-forgehost /opt/vps-apps/arctiva-web/scripts/deploy.sh
   ```

   En el propio servidor basta `/opt/vps-apps/arctiva-web/scripts/deploy.sh`.

El script hace `git fetch` y `git merge --ff-only origin/main` (falla si el árbol del servidor tiene cambios propios o divergentes) y regenera `public/` con `build.py`. Al terminar imprime la versión y el commit desplegados; compruébalos con `curl -I https://arctiva.techmarc.es/`. No toca Apache ni el vhost.

## Añadir un idioma

Copiar `src/i18n/en.json` a `src/i18n/<codigo>.json`, traducirlo y añadir el código a `languages` en `src/site.json`.

## Notas

- La política de seguridad (CSP) del vhost solo permite recursos propios; un recurso externo nuevo exige cambiarla en `scripts/arctiva.techmarc.es.conf`.
- Si cambia el vhost, hay que volver a instalarlo (`install` + `reload`); el desplegado normal no lo toca.
