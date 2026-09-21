#!/usr/bin/env bash
# Comprobación obligatoria antes de cada commit: nombres que NO pueden aparecer en el
# proyecto (base de referencia externa y otro fabricante de perfiles). Debe salir vacía.
# Los patrones se componen por trozos para que este fichero no los contenga.
set -uo pipefail
cd "$(dirname "$0")/.."
A="pers""ycom"; B="premi""door|k.mmer""ling|ulti-?m""ate|emb""ero"
EXC=(--exclude-dir=.git --exclude-dir=.venv --exclude-dir=antigua)
R1=$(grep -ril "$A" "${EXC[@]}" . || true)
R2=$(grep -rilE "$B" "${EXC[@]}" --exclude-dir=descartadas . || true)
M=$(git log --format='%H %s%n%b' | grep -iE "$A|$B" || true)
if [ -n "$R1$R2$M" ]; then echo "¡NOMBRES PROHIBIDOS!"; echo "$R1"; echo "$R2"; echo "$M"; exit 1; fi
echo "OK: sin nombres prohibidos en ficheros ni en mensajes de commit"
