#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
rsync -a --delete --chmod=D755,F644 --exclude '.htaccess' web/ /var/www/clientesmarchante/
echo "Publicado en https://clientesmarchante.winsoft.es"
