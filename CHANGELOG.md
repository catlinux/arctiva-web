# Changelog

Formato [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/); versionado [SemVer](https://semver.org/lang/es/).

## [Sin publicar]

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
