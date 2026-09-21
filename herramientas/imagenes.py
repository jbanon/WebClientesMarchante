#!/usr/bin/env python3
"""Genera en web/img/ las versiones WebP de las imágenes de recursos/.

Uso: .venv/bin/python herramientas/imagenes.py
Es una herramienta de autoría (no un paso de compilación de la web): solo hay que
volver a ejecutarla si cambian las imágenes de origen.
"""
from pathlib import Path
from PIL import Image, ImageOps

RAIZ = Path(__file__).resolve().parent.parent
REC, IMG = RAIZ / "recursos", RAIZ / "web" / "img"

FOTOS = {  # destino: origen  → anchos 640/1024/1600
    "obras/comedor-corredera-valle": "imagenes/obras/corredera-elevadora-comedor-vistas-valle.jpeg",
    "obras/vivienda-unifamiliar": "imagenes/obras/vivienda-unifamiliar-moderna-blanca-ventanas-oscuras.jpeg",
    "obras/fachada-antracita": "imagenes/obras/fachada-edificio-ventanas-antracita-contrapicado.jpeg",
    "obras/sala-reuniones": "imagenes/obras/sala-reuniones-ventanas-oscilobatientes-bicolor.jpeg",
    "obras/atico-anochecer": "imagenes/obras/atico-terraza-piscina-correderas-anochecer.jpeg",
    "obras/nino-corredera": "imagenes/obras/nino-junto-a-corredera-salon-interior.jpeg",
}
PERFILES = ["a70-abisagrada", "a84-abisagrada", "a84-ho-abisagrada", "c70-corredera", "e170-elevadora"]
LOGOS = {
    "marca/logo-marchante.png": "marca/logo-marchante.png",
    "marca/logo-marchante-blanco.png": "marca/logo-marchante-texto-blanco.png",
    "marca/partners/cortizo": "marca/partners/logo-cortizo-negro.png",
    "marca/partners/climalit": "marca/partners/Logo-climalit.png",
    "marca/partners/guardian-sun": "marca/partners/Guardian_Sun_Logo-1.png",
    "marca/partners/procomsa-gu": "marca/partners/LOGO-PROCOMSA-GU-COLOR.png",
    "marca/partners/indupanel": "marca/partners/indupanel-logo-1.png",
}


def guardar(im, destino, calidad=78):
    destino.parent.mkdir(parents=True, exist_ok=True)
    im.save(destino, "WEBP", quality=calidad, method=6)


def main():
    for dest, orig in FOTOS.items():
        im = ImageOps.exif_transpose(Image.open(REC / orig)).convert("RGB")
        for w in (640, 1024, 1600):
            real = min(w, im.width)  # el nombre lleva el ancho nominal aunque el original sea 1 px menor
            guardar(im.resize((real, round(im.height * real / im.width)), Image.LANCZOS), IMG / f"{dest}-{w}.webp")

    # Renders de perfil: recorte cuadrado centrado en el sujeto (ocupa el tercio central)
    for p in PERFILES:
        im = Image.open(REC / f"imagenes/productos/perfil-{p}-seccion.webp").convert("RGB")
        lado = im.height
        x0 = (im.width - lado) // 2 - 20
        cuadrado = im.crop((x0, 0, x0 + lado, lado))
        for w in (400, 700):
            guardar(cuadrado.resize((w, w), Image.LANCZOS), IMG / f"productos/perfil-{p}-{w}.webp", 86)

    # Muestras de foliado: recorte cuadrado central
    for f in sorted((REC / "imagenes/colores-foliado").glob("*.jpg")):
        im = Image.open(f).convert("RGB")
        lado = min(im.size) // 2
        cx, cy = im.width // 2, im.height // 2
        im = im.crop((cx - lado // 2, cy - lado // 2, cx + lado // 2, cy + lado // 2)).resize((480, 480), Image.LANCZOS)
        nombre = f.stem.lower().replace("-scaled", "")
        guardar(im, IMG / f"foliado/{nombre}.webp", 80)

    for dest, orig in LOGOS.items():
        im = Image.open(REC / orig).convert("RGBA")
        if dest.endswith(".png"):
            (IMG / dest).parent.mkdir(parents=True, exist_ok=True)
            im.save(IMG / dest, optimize=True)
        else:
            im.thumbnail((400, 400), Image.LANCZOS)
            guardar(im, IMG / f"{dest}.webp", 90)

    # Imagen para compartir en redes (Open Graph)
    im = Image.open(REC / FOTOS["obras/comedor-corredera-valle"]).convert("RGB")
    im = ImageOps.fit(im, (1200, 630), Image.LANCZOS)
    im.save(IMG / "compartir.jpg", quality=82)

    total = sum(f.stat().st_size for f in IMG.rglob("*") if f.is_file())
    print(f"{len(list(IMG.rglob('*.*')))} archivos, {total/1024:.0f} KB")


if __name__ == "__main__":
    main()
