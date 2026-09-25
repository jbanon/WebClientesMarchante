#!/usr/bin/env python3
"""Genera en web/img/docs/ la portada (primera página) de los PDF de web/docs/ en WebP.

Uso: .venv/bin/python herramientas/portadas.py
Necesita pdftoppm (poppler-utils). Es una herramienta de autoría: volver a ejecutarla
solo si cambia algún PDF o se añade uno a la lista.
"""
import subprocess
import tempfile
from pathlib import Path
from PIL import Image

RAIZ = Path(__file__).resolve().parent.parent
DOCS, IMG = RAIZ / "web" / "docs", RAIZ / "web" / "img" / "docs"

PDFS = [
    "carta-foliados-estandar", "carta-foliados-especiales", "folleto-calidad-cortizo-pvc",
    "catalogo-indupanel-paneles", "pdf-paneles-miniaturas", "pdf-accesorios", "plafones-pf-indupanel",
    "01-avant", "02-lido", "03-natura", "04-avplus", "05-innova", "06-taracea", "07-basica",
    "08-rustica", "09-clasica2", "10-tempo", "11-ip",
    "aperturas-a70-abisagrada", "aperturas-a84-abisagrada", "aperturas-a84-ho",
    "aperturas-c70-corredera", "aperturas-e170-corredera-elevable",
    "ficha-tecnica-a70-abisagrada", "ficha-tecnica-a84-abisagrada", "ficha-tecnica-a84-ho",
    "ficha-tecnica-c70-corredera", "ficha-tecnica-e170-corredera-elevable",
]


def main():
    IMG.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory() as tmp:
        for nombre in PDFS:
            pdf = DOCS / f"{nombre}.pdf"
            subprocess.run(["pdftoppm", "-png", "-r", "110", "-f", "1", "-l", "1", "-singlefile", str(pdf), f"{tmp}/{nombre}"], check=True)
            im = Image.open(f"{tmp}/{nombre}.png").convert("RGB")
            for w in (300, 600):
                r = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
                r.save(IMG / f"{nombre}-{w}.webp", "WEBP", quality=80, method=6)
            print(nombre, im.size)


if __name__ == "__main__":
    main()
