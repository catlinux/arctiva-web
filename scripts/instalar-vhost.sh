#!/usr/bin/env bash
# Instala el vhost de arctiva.techmarc.es y pide el certificado. Se ejecuta una sola vez.
# Uso: sudo NOEMAIL=1 bash scripts/instalar-vhost.sh   (o EMAIL=tu@correo)
# Requisitos: DNS apuntando a este servidor y public/ ya generado (python3 build.py).
set -euo pipefail
[ "$(id -u)" -eq 0 ] || { echo "Ejecutar con sudo" >&2; exit 1; }
DIR=$(cd "$(dirname "$0")/.." && pwd)
IP=94.249.241.235
D=arctiva.techmarc.es
if [ -n "${EMAIL:-}" ]; then MAIL=(-m "$EMAIL"); elif [ -n "${NOEMAIL:-}" ]; then MAIL=(--register-unsafely-without-email); else
  echo "Define EMAIL=... o NOEMAIL=1" >&2; exit 1; fi
[ -f "$DIR/public/index.html" ] || { echo "Falta public/: ejecuta antes python3 build.py" >&2; exit 1; }
got=$(host -W 4 -t A "$D" 1.1.1.1 2>/dev/null | awk '/has address/{print $NF}' | head -1)
[ "$got" = "$IP" ] || { echo "ERROR: $D resuelve a '${got:-nada}', no a $IP" >&2; exit 1; }

install -m 644 "$DIR/scripts/$D.conf" /etc/apache2/sites-available/$D.conf
a2ensite "$D"
apache2ctl configtest
systemctl reload apache2
certbot --apache --non-interactive --agree-tos "${MAIL[@]}" --redirect -d "$D"
apache2ctl configtest
systemctl reload apache2
echo "OK: https://$D"
