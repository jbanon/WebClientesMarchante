#!/usr/bin/env python3
"""Captura el menú móvil abierto (390 px) y el desplegable de escritorio."""
import functools, http.server, threading
from pathlib import Path
from playwright.sync_api import sync_playwright
RAIZ = Path(__file__).resolve().parent.parent
class H(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a): pass
srv = http.server.ThreadingHTTPServer(("127.0.0.1", 0), functools.partial(H, directory=str(RAIZ / "web")))
threading.Thread(target=srv.serve_forever, daemon=True).start()
base = f"http://127.0.0.1:{srv.server_address[1]}"
with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={"width": 390, "height": 844}); pg.goto(base + "/ventanas/a84-abisagrada/")
    pg.click(".menu-boton"); pg.wait_for_timeout(300)
    pg.screenshot(path=str(RAIZ / "referencia/capturas/_menu-movil.png"))
    pg = b.new_page(viewport={"width": 1440, "height": 600}); pg.goto(base + "/")
    pg.hover(".nav__lista > li:first-child > a"); pg.wait_for_timeout(400)
    pg.screenshot(path=str(RAIZ / "referencia/capturas/_menu-escritorio.png"))
    b.close()
