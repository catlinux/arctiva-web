#!/usr/bin/env bash
# Despliega la web: trae los cambios de origin/main y regenera public/.
# Se puede lanzar desde el equipo de casa: ssh vps-forgehost /opt/vps-apps/arctiva-web/scripts/deploy.sh
set -euo pipefail
cd "$(dirname "$0")/.."
git fetch --quiet origin
git merge --ff-only origin/main
python3 build.py
echo "Desplegada la versión $(cat VERSION) ($(git rev-parse --short HEAD))"
