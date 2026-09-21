#!/usr/bin/env python3
"""Recorta un tramo vertical de una captura para revisarla a tamaño real.
Uso: trozo.py captura.png y_inicio [alto]  → referencia/capturas/_trozo.png"""
import sys
from PIL import Image
im = Image.open(sys.argv[1]); y = int(sys.argv[2]); h = int(sys.argv[3]) if len(sys.argv) > 3 else 1400
im.crop((0, y, im.width, min(im.height, y + h))).save("referencia/capturas/_trozo.png")
