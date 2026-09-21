#!/usr/bin/env python3
"""Extrae el contenido de cada página del espejo wget a un .md por página."""
import re
from pathlib import Path
from bs4 import BeautifulSoup
from markdownify import markdownify as md

ORIGEN = Path("antigua/marchantepvc.com")
DESTINO = Path("contenido/paginas")
EXCLUIR = {"wp-includes", "wp-content", "wp-json", "feed", "comments", "team"}

def original(nombre):
    """Quita el sufijo de tamaño de WordPress: foto-300x200.jpg -> foto.jpg"""
    return re.sub(r"-\d+x\d+(?=\.\w+$)", "", nombre)

DESTINO.mkdir(parents=True, exist_ok=True)

for html in sorted(ORIGEN.rglob("index.html")):
    rel = html.parent.relative_to(ORIGEN)
    if rel.parts and rel.parts[0] in EXCLUIR:
        continue
    nombre = "inicio" if not rel.parts else "__".join(rel.parts)

    soup = BeautifulSoup(html.read_text(encoding="utf-8", errors="ignore"), "html.parser")
    titulo = soup.title.get_text(strip=True) if soup.title else nombre
    meta = soup.find("meta", attrs={"name": "description"})
    descripcion = meta["content"].strip() if meta and meta.get("content") else ""

    for t in soup(["script", "style", "noscript", "form", "iframe", "svg"]):
        t.decompose()
    for sel in ["header", "footer", "nav", ".elementor-location-header", ".elementor-location-footer"]:
        for t in soup.select(sel):
            t.decompose()

    cuerpo = soup.find("main") or soup.find("article") or soup.body
    imagenes = sorted({original(Path(i.get("src") or i.get("data-src") or "").name)
                       for i in cuerpo.find_all("img") if (i.get("src") or i.get("data-src"))})
    pdfs = sorted({Path(a["href"]).name for a in cuerpo.find_all("a", href=True)
                   if a["href"].lower().split("?")[0].endswith(".pdf")})

    texto = md(str(cuerpo), heading_style="ATX", strip=["img", "a"])
    texto = re.sub(r"[ \t]+\n", "\n", texto)
    texto = re.sub(r"\n{3,}", "\n\n", texto).strip()

    salida = [f"# {titulo}", "",
              f"- URL original: https://marchantepvc.com/{'/'.join(rel.parts)}{'/' if rel.parts else ''}",
              f"- Meta descripción: {descripcion or '(ninguna)'}", ""]
    salida += ["## Imágenes usadas en esta página", ""] + [f"- {i}" for i in imagenes] + [""]
    if pdfs:
        salida += ["## PDFs enlazados", ""] + [f"- {p}" for p in pdfs] + [""]
    salida += ["## Contenido", "", texto, ""]

    (DESTINO / f"{nombre}.md").write_text("\n".join(salida), encoding="utf-8")
    print(f"OK  {nombre}.md  ({len(texto)} caracteres, {len(imagenes)} imágenes)")
