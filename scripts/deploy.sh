#!/usr/bin/env bash
# Despliega la web: trae los cambios de origin/main, la compila con Astro, la comprueba
# y sustituye public/ (lo que sirve Apache) de una vez.
# Desde el PC: ssh vps-forgehost /opt/vps-apps/arctiva-web/scripts/deploy.sh
set -euo pipefail
cd "$(dirname "$0")/.."

# Node viene de nvm; en una sesión no interactiva (ssh) hay que cargarlo a mano.
export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
if [ -s "$NVM_DIR/nvm.sh" ]; then set +u; . "$NVM_DIR/nvm.sh"; set -u; fi

git fetch --quiet origin
git merge --ff-only origin/main
npm ci --no-audit --no-fund --loglevel=error
npm run build --silent
node scripts/check-site.mjs dist

rm -rf public.new public.old
cp -a dist public.new
if [ -d public ]; then mv public public.old; fi
mv public.new public
rm -rf public.old
echo "Desplegada la versión $(cat VERSION) ($(git rev-parse --short HEAD))"
