#!/usr/bin/env python3
"""Auditoría de móvil de todas las páginas de web/ (requisito prioritario, ver CLAUDE.md).

Comprueba en 360×800, 390×844, 414×896 y horizontal 844×390:
  · scroll horizontal           · zonas táctiles < 44×44 px (enlaces y botones no «en línea»)
  · campos de formulario < 16px · texto < 12 px
  · elementos fijos (barra de contacto / WhatsApp) que tapen enlaces o botones al final de página
Uso:  .venv/bin/python herramientas/movil.py [--motor webkit] [--capturas] [ruta ...]
      --motor chromium|webkit (por defecto chromium; webkit = motor de Safari en iPhone)
      --capturas guarda referencia/capturas/movil/<pagina>-<ancho>.png
"""
import functools, http.server, sys, threading
from pathlib import Path
from playwright.sync_api import sync_playwright

RAIZ = Path(__file__).resolve().parent.parent
WEB = RAIZ / "web"
VISTAS = {"360": (360, 800), "390": (390, 844), "414": (414, 896), "horizontal": (844, 390)}

JS = r"""
() => {
  const vis = e => { const r = e.getBoundingClientRect(), s = getComputedStyle(e);
    return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none' && e.offsetParent !== null || s.position === 'fixed' && r.width > 0; };
  const out = { desborde: document.documentElement.scrollWidth > window.innerWidth + 1, tactil: [], campos: [], texto: [], anchos: [] };
  if (out.desborde) document.querySelectorAll('body *').forEach(e => { const r = e.getBoundingClientRect(); if (r.right > innerWidth + 1 && r.width < 2000 && out.anchos.length < 5) out.anchos.push(e.tagName + '.' + e.className); });
  document.querySelectorAll('a, button, summary, input[type=checkbox], input[type=radio], select, input:not([type=hidden]), textarea').forEach(e => {
    if (!vis(e) || e.closest('.trampa') || e.classList.contains('salto')) return;
    let r = e.getBoundingClientRect();
    if (e.matches('input[type=radio], input[type=checkbox]')) { const l = e.closest('label'); if (l) r = l.getBoundingClientRect(); }
    // enlaces dentro de un párrafo o frase: exentos (WCAG 2.5.8, «inline»)
    const enLinea = e.tagName === 'A' && getComputedStyle(e).display === 'inline' && e.parentElement && e.parentElement.textContent.trim().length > e.textContent.trim().length + 12;
    if (!enLinea && (r.height < 43.5 || r.width < 43.5)) out.tactil.push((e.textContent.trim() || e.getAttribute('aria-label') || e.name || e.tagName).slice(0, 28) + ` ${Math.round(r.width)}×${Math.round(r.height)}`);
  });
  document.querySelectorAll('input:not([type=checkbox]):not([type=radio]), select, textarea').forEach(e => { if (vis(e) && !e.closest('.trampa') && !e.closest('.trampa') && parseFloat(getComputedStyle(e).fontSize) < 16) out.campos.push(e.name); });
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let n;
  while ((n = w.nextNode())) { const t = n.textContent.trim(), p = n.parentElement; if (t.length > 2 && p && vis(p) && parseFloat(getComputedStyle(p).fontSize) < 12 && out.texto.length < 5) out.texto.push(t.slice(0, 24)); }
  return out;
}
"""
JS_FIJOS = r"""
() => { // al final de la página: ¿algún elemento fijo tapa un enlace o botón?
  window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' });
  const tapados = [];
  document.querySelectorAll('.whatsapp, .barra-contacto').forEach(f => {
    if (getComputedStyle(f).display === 'none') return;
    const fr = f.getBoundingClientRect();
    document.querySelectorAll('main a, main button, footer a, .portal a, .portal button').forEach(e => {
      if (f.contains(e)) return; const r = e.getBoundingClientRect();
      if (r.width && r.bottom > fr.top + 2 && r.top < fr.bottom - 2 && r.right > fr.left + 2 && r.left < fr.right - 2) tapados.push(e.textContent.trim().slice(0, 24));
    });
  });
  return tapados;
}
"""


def rutas():
    r = ["/" + str(p.parent.relative_to(WEB)).replace(".", "") for p in sorted(WEB.rglob("index.html"))]
    return [x if x.endswith("/") else x + "/" for x in r] + ["/404.html"]


def main():
    args = sys.argv[1:]; motor = "chromium"; capt = False
    if "--motor" in args: i = args.index("--motor"); motor = args[i + 1]; del args[i:i + 2]
    if "--capturas" in args: capt = True; args.remove("--capturas")

    class H(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *a): pass
    srv = http.server.ThreadingHTTPServer(("127.0.0.1", 0), functools.partial(H, directory=str(WEB)))
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    base = f"http://127.0.0.1:{srv.server_address[1]}"
    problemas = 0
    with sync_playwright() as p:
        nav = getattr(p, motor).launch()
        for nombre, (w, h) in VISTAS.items():
            ctx = nav.new_context(viewport={"width": w, "height": h}, device_scale_factor=1, has_touch=True, is_mobile=(motor == "chromium"))
            pag = ctx.new_page()
            for ruta in args or rutas():
                pag.goto(base + ruta, wait_until="networkidle")
                # la demo del portal redirige al login si no hay sesión: se simula
                if ruta.startswith("/area-clientes/") and "acceso" not in ruta:
                    pag.evaluate("try { sessionStorage.setItem('mpvc-demo-sesion', '1'); localStorage.setItem('mpvc-demo-sesion', '1') } catch (e) {}")
                    pag.goto(base + ruta, wait_until="networkidle")
                r = pag.evaluate(JS); tap = pag.evaluate(JS_FIJOS)
                fallos = []
                if r["desborde"]: fallos.append("SCROLL HORIZONTAL " + ", ".join(r["anchos"]))
                if r["tactil"]: fallos.append(f"táctil<44: {len(r['tactil'])} → " + " | ".join(r["tactil"][:6]))
                if r["campos"]: fallos.append("campos<16px: " + ",".join(r["campos"]))
                if r["texto"]: fallos.append("texto<12px: " + " | ".join(r["texto"]))
                if tap: fallos.append("tapado por elemento fijo: " + " | ".join(tap[:5]))
                if fallos:
                    problemas += len(fallos); print(f"[{motor} {nombre}] {ruta}"); [print("    " + f) for f in fallos]
                if capt:
                    d = RAIZ / "referencia/capturas/movil"; d.mkdir(parents=True, exist_ok=True)
                    pag.evaluate("window.scrollTo(0,0)"); pag.evaluate("document.querySelectorAll('img[loading=lazy]').forEach(i => i.loading = 'eager')"); pag.wait_for_load_state("networkidle")
                    pag.screenshot(path=str(d / f"{ruta.strip('/').replace('/', '_').replace('.html', '') or 'inicio'}-{nombre}.png"), full_page=True)
            ctx.close()
        nav.close()
    print(f"{motor}: {len(args or rutas())} páginas × {len(VISTAS)} vistas, {problemas} problemas")


if __name__ == "__main__":
    main()
