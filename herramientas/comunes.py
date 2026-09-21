#!/usr/bin/env python3
"""Copia la cabecera y el pie comunes a todas las páginas de web/.

Las páginas son HTML completo y son la fuente de verdad; este script solo mantiene
idéntico el bloque comprendido entre los marcadores
    <!-- cabecera --> ... <!-- /cabecera -->   y   <!-- pie --> ... <!-- /pie -->
a partir de herramientas/comunes/cabecera.html y pie.html, y marca el enlace activo
del menú (aria-current). Uso: .venv/bin/python herramientas/comunes.py
"""
import re
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
WEB, COM = RAIZ / "web", RAIZ / "herramientas" / "comunes"


def main():
    partes = {n: (COM / f"{n}.html").read_text(encoding="utf-8").strip() for n in ("cabecera", "pie")}
    for pag in sorted(WEB.rglob("*.html")):
        if "area-clientes" in pag.parts:  # la demo del portal pinta su propio marco con portal.js
            continue
        ruta = "/" + str(pag.parent.relative_to(WEB)).strip(".") + "/"
        ruta = ruta.replace("//", "/")
        html = pag.read_text(encoding="utf-8")
        for n, bloque in partes.items():
            if n == "cabecera" and pag.name == "index.html":
                seccion = "/" + ruta.strip("/").split("/")[0] + "/"
                bloque = bloque.replace(f'<a href="{ruta}">', f'<a href="{ruta}" aria-current="page">')
                if seccion != ruta and seccion != "//":
                    bloque = bloque.replace(f'<li><a href="{seccion}">', f'<li><a href="{seccion}" aria-current="true">')
            html, k = re.subn(rf"<!-- {n} -->.*?<!-- /{n} -->", lambda m: f"<!-- {n} -->\n{bloque}\n<!-- /{n} -->", html, flags=re.S)
            if not k:
                print(f"AVISO: {pag.relative_to(WEB)} no tiene marcador de {n}")
        pag.write_text(html, encoding="utf-8")
    print("cabecera y pie sincronizados")


if __name__ == "__main__":
    main()
