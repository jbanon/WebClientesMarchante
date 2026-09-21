# Checklist de revisión

> **Última revisión: 21/09/2026 (segunda pasada)**, tras la carta de colores Cortizo, los
> datos oficiales de los sistemas, el bloque de móvil y la demo del área de clientes.
> Lo nuevo está en el apartado «Segunda revisión»; el resto es la revisión de la Fase 3,
> que sigue vigente salvo lo que se indica.

## Segunda revisión

Alcance: **34 páginas HTML** (22 de la web pública + 12 de `/area-clientes/`), publicadas
en https://clientesmarchante.winsoft.es con `herramientas/publicar.sh`.

### Móvil (requisito prioritario) — `herramientas/movil.py`
Auditoría automática de las 33 páginas navegables en **360×800, 390×844, 414×896 y
horizontal 844×390** (132 combinaciones) con Chromium en modo táctil: **0 problemas**.
- [x] Sin scroll horizontal en ninguna página ni anchura.
- [x] Texto ≥ 12 px en todo el sitio (cuerpo a 17 px); campos de formulario a 16 px (iPhone no hace zoom).
- [x] Zonas táctiles ≥ 44×44 px en enlaces y botones: migas, pie, índices, menú, filtros,
      casillas, opciones, enlaces de flecha, teléfonos… Quedan exentos solo los enlaces
      dentro de una frase (criterio WCAG 2.5.8 para enlaces «en línea»).
- [x] Menú móvil cómodo con una mano: enlaces de ≥ 44 px, submenús a dos columnas y
      acciones fijas abajo (Pedir presupuesto · Área clientes · teléfono). Cierre con Escape.
- [x] «Área clientes» visible en la cabecera (móvil y escritorio), en el menú móvil y en el pie.
- [x] Tabla comparativa de `/ventanas/`: en móvil es una tarjeta por sistema con pares
      dato–valor (en tableta, dos columnas); en escritorio sigue siendo tabla.
- [x] WhatsApp no tapa nada: en móvil y tableta se sustituye el botón flotante por una
      barra inferior fija (Llamar · WhatsApp · Presupuesto) para la que la página reserva
      espacio; comprobado que al final de cada página no cubre ningún enlace ni botón.
      En escritorio ancho el botón queda en el margen, fuera de la columna de contenido.
- [x] Horizontal (844×390): la cabecera deja de ser fija y la barra inferior se reduce.
- [x] Carta de colores: rejilla adaptable (2 columnas a 360–414 px, hasta 6 en escritorio), nombres a 16 px.
- [x] Revisión visual con capturas de portada, ventanas, contacto, foliado, menú abierto y las pantallas del portal.
- [ ] **WebKit (Safari de iPhone): NO probado.** El navegador está descargado, pero faltan
      librerías del sistema y hace falta sudo: `sudo .venv/bin/playwright install-deps webkit`.
      Después: `.venv/bin/python herramientas/movil.py --motor webkit`. Precauciones ya
      tomadas para Safari: campos a 16 px, `viewport-fit=cover` + `env(safe-area-inset-bottom)`
      en las barras inferiores, sin `100vh` en elementos críticos, `-webkit-text-size-adjust`.

### Carta de colores y sistemas
- [x] 48 muestras de la carta oficial de Cortizo en 4 familias, servidas desde `/img/colores/` (0 peticiones a terceros).
- [x] Aviso de colores orientativos por la calibración de pantalla.
- [x] Muestras antiguas (de otro fabricante) movidas a `descartadas/`; INVENTARIO.md actualizado.
- [x] Datos técnicos contrastados con las 5 páginas oficiales de Cortizo; tabla de fuente por dato en PREGUNTAS.md (apartado C).
- [x] Denominación Cortizo en fichas, menú, comparativa y formulario; URLs sin cambios.
- [x] Sin referencias al otro fabricante en web/, documentos ni herramientas (`herramientas/comprobar_nombres.sh`).
- [x] Textos de colores y sistemas redactados con palabras propias (de Cortizo, solo datos).

### Demo del área de clientes (`/area-clientes/`)
- [x] Login simulado (cualquier usuario y contraseña), indicado en la pantalla de acceso; sin sesión, todas las pantallas llevan al acceso.
- [x] Franja «Demo · Datos ficticios» fija en las 12 pantallas; `noindex, nofollow` en las 12; fuera del sitemap.
- [x] Recorrido probado con Playwright: entrar → aceptar presupuesto (cambia a «Aceptado») → abrir incidencia con pedido preseleccionado → aparece en el listado → salir. 0 errores de JavaScript, 0 peticiones externas.
- [x] Descargas: PDF de muestra (presupuesto, factura, albarán) y los 18 PDF reales de `web/docs/`.
- [x] Nombres de clientes, obras y personas claramente ficticios; colores de la carta Cortizo.
- [x] Mismo sistema visual (tipografías, paleta, botones) y mismos criterios de móvil; navegación inferior de 5 secciones en móvil.
- [x] Propuestas propias marcadas en pantalla con la etiqueta «Propuesta» y recogidas en PREGUNTAS_CLIENTE.md.
- [x] Datos con forma de API y documentados (`web/area-clientes/datos/LEEME.md`).

### Servidor
- [x] `despliegue/redirecciones.nginx.conf` generado desde `web/.htaccess`; `nginx -t` correcto y redirecciones probadas en un nginx temporal (301 en páginas, PDF y restos de WordPress; 404 propio).
- [ ] **Pendiente de instalar en el nginx real (requiere root)**: ver PREGUNTAS.md, apartado K.
- [x] Publicado y comprobado por HTTPS: portada, portal, JSON de datos e imágenes responden 200.

---

# Revisión de la Fase 3

Revisado el 21/09/2026 sobre las 22 páginas HTML de `web/` (20 del mapa del sitio en
`sitemap.xml` + `404.html` + `estilo.html`).

Cómo se ha comprobado:
- **Capturas** a página completa de todas las páginas a **390 px** (móvil) y **1440 px**
  (escritorio) con Playwright + Chromium: `.venv/bin/python herramientas/capturas.py`
  (salida en `referencia/capturas/`, no versionada). El script avisa además de errores
  de consola, recursos que fallan (404) y desborde horizontal.
- **Comprobación estática**: `.venv/bin/python herramientas/enlaces.py` (enlaces
  internos, anclas, recursos, `alt`, `width/height`, un solo `h1`, `title` y
  `description` presentes y únicos).
- Menú móvil y desplegable de escritorio: `herramientas/captura_menu.py`.
- Pruebas de teclado y de peticiones externas con Playwright.

## Páginas

| Página | Móvil 390 | Escritorio 1440 | Observaciones |
|---|:-:|:-:|---|
| `/` | ✅ | ✅ | Foto principal a sangre en móvil; tarjetas de sistema compactas en móvil |
| `/ventanas/` | ✅ | ✅ | Comparativa en tarjetas en móvil, tabla en escritorio |
| `/ventanas/a70-abisagrada/` | ✅ | ✅ | |
| `/ventanas/a84-abisagrada/` | ✅ | ✅ | Muestra de la Fase 1 |
| `/ventanas/a84-ho-abisagrada/` | ✅ | ✅ | |
| `/ventanas/c70-corredera/` | ✅ | ✅ | |
| `/ventanas/e170-elevadora/` | ✅ | ✅ | |
| `/paneles-y-accesorios/` | ✅ | ✅ | 13 PDF comprobados |
| `/acabados/` | ✅ | ✅ | |
| `/acabados/pvc-blanco/` | ✅ | ✅ | |
| `/acabados/pvc-foliado/` | ✅ | ✅ | Carta Cortizo: 48 muestras en 4 familias |
| `/acabados/vidrios/` | ✅ | ✅ | Índice lateral fijo en escritorio |
| `/profesionales/` | ✅ | ✅ | Contiene 1 marcador de foto pendiente |
| `/distribuidores/` | ✅ | ✅ | |
| `/empresa/` | ✅ | ✅ | Contiene 1 marcador de foto pendiente |
| `/contacto/` | ✅ | ✅ | Formulario con `action` PENDIENTE (envío provisional por correo) |
| `/aviso-legal/` | ✅ | ✅ | Texto pendiente de la asesoría (aviso visible) |
| `/privacidad/` | ✅ | ✅ | |
| `/cookies/` | ✅ | ✅ | Corregido un desborde en móvil causado por la tabla de cookies |
| `/proteccion-de-datos/` | ✅ | ✅ | |
| `404.html` | ✅ | ✅ | |
| `estilo.html` | ✅ | ✅ | Guía de estilo interna, `noindex` y excluida en robots.txt |

## Enlaces y recursos
- [x] 0 enlaces internos rotos y 0 anclas inexistentes (22 páginas).
- [x] 0 recursos con error de carga (imágenes, CSS, JS, fuentes, PDF) y 0 errores de consola.
- [x] Los 18 PDF de `web/docs/` están enlazados y abren (5 fichas técnicas + 13 catálogos).
- [x] Enlaces `tel:`, `mailto:`, WhatsApp (`wa.me/34623146934`), Instagram y Facebook correctos.
- [x] Menú, pie y botón de WhatsApp idénticos en todas las páginas (`herramientas/comunes.py`).
- [x] Los botones de presupuesto de cada ficha preseleccionan el sistema en el formulario; los de profesionales y distribuidores, el perfil.

## Imágenes
- [x] Todas en WebP (salvo los dos logos PNG con transparencia y la imagen para redes en JPG).
- [x] Fotos con `srcset` a 640/1024/1600 px y `sizes`; `loading="lazy"` en todo salvo la imagen principal de cada página (`fetchpriority="high"`).
- [x] Todas con `width` y `height` (sin saltos de maquetación) y con texto alternativo; `alt=""` solo en la foto puramente decorativa de las fichas.
- [x] Solo imágenes de `recursos/imagenes/` y `recursos/marca/`. Ninguna de stock ni de `descartadas/`.
- [x] Peso total de `web/img/`: 2,6 MB (54 archivos).
- [x] 2 marcadores visibles de «Foto pendiente» (empresa y profesionales), anotados en PREGUNTAS.md.

## Títulos y SEO
- [x] `title` y `meta description` propios y únicos en las 22 páginas (descriptions de 50–170 caracteres).
- [x] Un único `h1` por página y jerarquía de encabezados ordenada.
- [x] `link rel="canonical"` y metadatos Open Graph en todas las páginas indexables.
- [x] Datos estructurados `LocalBusiness` en la portada (JSON-LD válido: nombre, dirección, teléfonos, email, año de fundación, redes). Sin horario ni coordenadas: no constan en el material.
- [x] `sitemap.xml` (20 URL) y `robots.txt`.
- [x] URLs limpias: cada página es una carpeta con su `index.html`. Rutas en español.
- [x] `REDIRECCIONES.md` completo y reglas 301 equivalentes en `web/.htaccess`.

## Accesibilidad
- [x] Contraste AA: texto `#4A5257` sobre blanco 8,0:1; texto auxiliar `#6B7378` 4,8:1; botón rojo `#C9121A` con blanco 5,9:1; gris `#ABAFB5` sobre tinta 7,0:1. El rojo corporativo `#EC1C24` (4,4:1) solo se usa en detalles gráficos.
- [x] Navegable con teclado: enlace «Saltar al contenido» como primer foco, foco visible, desplegables del menú accesibles con tabulador, menú móvil con `aria-expanded` y cierre con Escape, acordeones con `<details>` nativo.
- [x] Formulario con `label` en todos los campos, `fieldset/legend` en el grupo de opciones, `autocomplete` y campos obligatorios marcados.
- [x] `lang="es"`, `nav` con etiquetas, migas de pan con `aria-current`, tablas con `scope`.
- [x] Respeta `prefers-reduced-motion`. Sin sliders, sin animaciones automáticas.
- [x] Objetivos táctiles del pie ampliados tras la revisión en móvil.

## Privacidad y técnica
- [x] **0 peticiones a terceros** (comprobado con Playwright): fuentes en `web/fonts/`, sin Google Fonts, sin analítica, sin mapas ni vídeos incrustados. La web no instala cookies.
- [x] Instagram: solo enlace al perfil.
- [x] HTML + CSS + JS sin frameworks ni compilación. JS: 1 archivo de 1 KB (menú) más el script del formulario.
- [x] Diseño mobile first; sin desborde horizontal en ninguna página a 390 px.
- [x] `antigua/` no se ha modificado.

## Corregido durante la revisión
- El desenfoque de la cabecera convertía la cabecera en contenedor del menú móvil (el menú no ocupaba la pantalla): movido a un pseudo-elemento.
- Imagen `atico-anochecer-1600.webp` inexistente (el original mide 1599 px): corregido el script de imágenes.
- Desborde horizontal en `/cookies/` a 390 px por la tabla: tabla con desplazamiento propio.
- Dos `h1` en `estilo.html`.
- Enlaces legales del pie pegados entre sí por una regla de espaciado.
- Tarjetas de sistema demasiado altas en móvil: pasan a formato horizontal compacto.
- Etiquetas de las cifras destacadas reordenadas para que se lean bien («Transmitancia Uw desde · 0,71 W/m²K»).

## No comprobado (requiere el entorno real)
- [ ] Envío real del formulario (servicio pendiente).
- [ ] Redirecciones 301 en el servidor definitivo.
- [ ] Navegadores reales distintos de Chromium (Safari iOS, Firefox) y lector de pantalla.
- [ ] Rendimiento con Lighthouse sobre el alojamiento definitivo.
