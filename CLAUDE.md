# Web corporativa Marchante PVC — Brief para el agente

## Contexto
Marchante PVC es un fabricante de ventanas de PVC. Hay que rediseñar su web
(marchantepvc.com, actualmente un WordPress con la plantilla Industrium y Elementor).
Se mantiene el contenido; el objetivo es un aspecto mucho más elegante y profesional.

Público:
- Particulares que reforman su vivienda
- Profesionales: constructoras, arquitectos, instaladores y distribuidores

Objetivo principal de la web: que el visitante pida presupuesto o contacte.

## Material disponible
- `antigua/marchantepvc.com/` — copia espejo de la web actual. SOLO LECTURA, no modificar.
- `contenido/paginas/*.md` — texto extraído de cada página. Cada fichero lista las
  imágenes y PDFs que usaba esa página.
- `recursos/marca/` — logo propio, logos de marcas colaboradoras (partners/) y colores.md
- `recursos/imagenes/colores-cortizo/` — carta oficial de foliados de Cortizo (48 muestras
  descargadas de su web + `colores.json` con familia, nombre y origen)
- `referencia/cortizo.md` — carta de colores y páginas oficiales de los sistemas (solo DATOS)
- `recursos/imagenes/sin-clasificar/` — resto de imágenes (ver Fase 0)
- `recursos/imagenes/descartadas/` — imágenes de demo de la plantilla. NO usar.
- `recursos/documentos/fichas-tecnicas/` — fichas técnicas de cada sistema de ventana
- `recursos/documentos/catalogos/` — catálogos de paneles y accesorios

## Advertencias sobre el material
- Los textos extraídos pueden contener restos del menú, del pie de página o del
  formulario. Ignóralos.
- Las URLs antiguas usan `/services/...` (resto de la plantilla). En la web nueva
  se usan rutas en español.
- Las páginas `/team/` de la web antigua son contenido de demostración de la
  plantilla. No existen para nosotros.
- En el material había una imagen de un sistema de puerta elevadora de OTRO fabricante de
  perfiles. Está en descartadas/ y no se usa.
- La foto de stock de Unsplash (una acería) está en descartadas/. No se usa.

## Mapa del sitio nuevo
- `/` Inicio
- `/empresa/` (de quienes-somos.md)
- `/ventanas/` Portada de sistemas, con una subpágina por sistema:
  - `/ventanas/a70-abisagrada/`
  - `/ventanas/a84-abisagrada/`
  - `/ventanas/a84-ho-abisagrada/`
  - `/ventanas/c70-corredera/`
  - `/ventanas/e170-elevadora/`
  Cada sistema enlaza su ficha técnica en PDF.
- `/acabados/` con:
  - `/acabados/pvc-blanco/`
  - `/acabados/pvc-foliado/` (carta de foliados Cortizo por familias, con recursos/imagenes/colores-cortizo)
  - `/acabados/vidrios/` (fusiona tipo-de-vidrios y v-vis-v-vinilos-y-vidrios)
- `/profesionales/` Guías técnicas: instalación, mantenimiento, almacenaje y transporte
- `/distribuidores/`
- `/contacto/`
- Legales: `/aviso-legal/`, `/privacidad/`, `/cookies/`, `/proteccion-de-datos/`

Si al revisar el material ves que la estructura no encaja (por ejemplo, los catálogos
de paneles necesitan su propia sección), propón el cambio en PREGUNTAS.md y sigue
con tu mejor criterio.

## Dirección visual: qué significa "elegante"
- Mucho espacio en blanco, fotografía grande, muy poca decoración
- Paleta corta basada en recursos/marca/colores.md: el rojo solo como acento
  (botones, detalles), nunca como fondo de grandes superficies
- Máximo 2 familias tipográficas. Tienes libertad para proponer otras distintas de
  Roboto. Deben servirse desde web/fonts/ (NO cargar Google Fonts desde Google, por RGPD)
- Nada de sliders automáticos, animaciones llamativas ni iconos de relleno
- Transmitir: fabricante serio, calidad técnica, cercanía
- Referencias visuales en referencia/inspiracion/ si las hay

## Técnica
- Web estática: HTML + CSS + JavaScript sin frameworks ni paso de compilación
- URLs limpias: cada página es una carpeta con su index.html
- Responsive, diseñada primero para móvil
- Imágenes convertidas a WebP con tamaños adecuados y lazy loading. Puedes usar
  Python con Pillow en el entorno .venv del proyecto (.venv/bin/pip install pillow)
- Accesibilidad: contraste suficiente, textos alternativos en todas las imágenes,
  navegable con teclado
- SEO: title y meta description propios en cada página, datos estructurados
  LocalBusiness en la portada, sitemap.xml y robots.txt
- Botón flotante de WhatsApp (la web antigua lo tenía). Número: el de contacto.md
- Instagram: solo enlace al perfil, sin incrustar el feed
- Formulario de contacto: [PENDIENTE] servicio por decidir. Maquétalo con el atributo
  action en un único sitio fácil de cambiar y anótalo en PREGUNTAS.md
- Los PDFs se copian a web/docs/

## Reglas
- NO inventar especificaciones técnicas, cifras, certificaciones, años de
  experiencia, testimonios ni clientes. Los datos técnicos salen solo de los .md
  y de las fichas técnicas PDF
- Se puede mejorar la redacción y el tono de los textos, pero no cambiar los datos
- Los textos legales se copian literalmente; solo se les da formato
- Usar solo imágenes de recursos/imagenes/. Si una página necesita una foto que no
  existe, poner un marcador visible con la descripción de la foto necesaria y
  anotarlo en PREGUNTAS.md
- Ante una duda que no bloquee: decidir, seguir y anotarla en PREGUNTAS.md
- Nunca modificar antigua/

## Proveedor de perfiles: Cortizo (regla permanente)
Marchante trabaja SOLO con perfiles Cortizo PVC®. Fuente de datos: `referencia/cortizo.md`
y las páginas oficiales que enlaza.
- De Cortizo se toman DATOS (cifras, clases de ensayo, nombres de color); nunca sus textos
  literales. Se redacta con palabras propias.
- Ante una contradicción entre la web antigua, las fichas PDF y la web oficial de
  Cortizo: manda la web oficial. Anotar en PREGUNTAS.md el dato elegido y la fuente.
- Denominación Cortizo donde ayude («A 84 Hoja Oculta», «E 170 Corredera Elevable»),
  manteniendo las URLs actuales.
- Carta de colores: la de Cortizo, por sus familias (estándar 2 caras, estándar 1 cara,
  especiales, Ultra Performance), con el aviso de colores orientativos. Las muestras se
  sirven desde la propia web. En la demo del portal, los colores son de esta carta.
- No añadir sistemas de Cortizo que no estén ya en la web de Marchante: van a
  PREGUNTAS_CLIENTE.md.
- La web antigua mezclaba material de OTRO fabricante de perfiles (colores foliados y una
  imagen de puerta elevadora). No debe aparecer ninguna referencia a ese fabricante ni a
  sus nombres comerciales en web/, documentos ni herramientas. (antigua/ y
  contenido/paginas/ son material de origen de solo lectura y llevan aviso.)

## Publicación
- La web está publicada sin contraseña en https://clientesmarchante.winsoft.es (nginx).
- Publicar con `herramientas/publicar.sh` al terminar cada bloque de trabajo.
- `despliegue/redirecciones.nginx.conf`: traducción a nginx de `web/.htaccess` (para
  incluir en el bloque server). Mantener los dos a la par con REDIRECCIONES.md.
- **Cero peticiones a terceros**: fuentes, imágenes y scripts se sirven siempre desde web/.

## Móvil: requisito prioritario
La web debe verse perfectamente en el móvil. Revisar SIEMPRE en 360, 390 y 414 px de
ancho y en horizontal (844 × 390), con Chromium y con WebKit (motor de Safari en iPhone):
- Nunca scroll horizontal
- Textos legibles sin zoom; campos de formulario con fuente ≥ 16 px
- Botones y enlaces con zona táctil ≥ 44 × 44 px
- Menú cómodo con una mano, con «Área clientes»
- Las tablas se adaptan al móvil (tarjetas o similar), nunca una tabla diminuta
- El botón de WhatsApp no tapa contenido ni botones
`herramientas/movil.py` automatiza estas comprobaciones.

## Área clientes (demo del portal) — web/area-clientes/
Demo navegable del portal de clientes de una FÁBRICA DE VENTANAS DE PVC. No es una
aplicación real.
- Estática: datos ficticios en JSON/JS, sin servidor ni base de datos. La estructura de
  datos se diseña como si viniera de una API del sistema de gestión de la fábrica.
- Login simulado (cualquier usuario y contraseña entra; se indica en pantalla).
- Franja visible en todas sus pantallas: «Demo · Datos ficticios». Meta robots noindex.
- Mismo estilo visual que la web pública y mismos criterios de móvil.
- Nombres de clientes, obras y personas claramente inventados. Nunca empresas reales.
- Enlace «Área clientes» en cabecera (escritorio y móvil) y pie → /area-clientes/.
- Todo lo que sea propuesta propia se anota como tal para validarlo con el cliente.
- Existe una base de referencia externa (portal de otra empresa, sin relación con
  Marchante) que SOLO se puede leer para estructura y funcionalidad: no se modifica, no se
  copia nada de ella y su nombre no puede aparecer en ningún sitio de este proyecto
  (código, comentarios, nombres de fichero, commits, documentos). Marchante no fabrica
  persianas: no presentarlas como producto suyo. Antes de cada commit se ejecuta la
  comprobación por grep indicada por el responsable y debe salir vacía.

## Documentos de preguntas
- `PREGUNTAS_CLIENTE.md`: para entregar al cliente. Lenguaje sencillo, por temas (web
  pública, textos legales, fotos y materiales, datos técnicos, portal de clientes). Cada
  pregunta: contexto en 1–2 frases, la pregunta y, si las hay, opciones con recomendación.
- `PREGUNTAS.md`: interno, con notas técnicas y decisiones tomadas.
- Ante una duda nueva: decidir, seguir y anotarla en el documento que corresponda.

## Forma de trabajo
Trabajo **autónomo hasta terminar la web completa, sin parar entre fases**. Ante una
duda: decidir con el mejor criterio, seguir y anotarla en PREGUNTAS.md junto con lo
decidido, para revisarla al final. Solo se interrumpe para pedir algo imprescindible
(por ejemplo, sudo para instalar dependencias).

### Fase 0 — Inventario de imágenes (HECHA)
Imágenes clasificadas en productos/, obras/, fabrica/ y otras/, con
recursos/imagenes/INVENTARIO.md.

### Fase 1 — Dirección visual
Portada y una página de sistema (ventanas/a84-abisagrada) como muestra, más
web/estilo.html con la paleta, las tipografías y los componentes. Commit y seguir.

### Fase 2 — Construcción completa
Resto de páginas del mapa del sitio. Crear REDIRECCIONES.md con la correspondencia
URL antigua → URL nueva. Commit al terminar cada bloque de páginas.

### Fase 3 — Revisión
Revisar todas las páginas en ancho de móvil y de escritorio: enlaces rotos, imágenes,
textos alternativos, títulos. Rellenar CHECKLIST.md con lo comprobado. Commit final.

### Revisión visual con capturas
`herramientas/capturas.py` (Playwright + Chromium en .venv) genera capturas de las
páginas de web/ a 390 px (móvil) y 1440 px (escritorio) en referencia/capturas/.
Tras cada bloque de páginas: hacer capturas, revisarlas y corregir lo que no esté a la
altura del brief antes del commit.

### Otras herramientas de autoría (herramientas/)
Las páginas de web/ son HTML completo y son la fuente de verdad (no hay compilación).
- `comunes.py`: copia cabecera y pie (herramientas/comunes/*.html) a todas las páginas,
  entre los marcadores `<!-- cabecera -->` y `<!-- pie -->`. Ejecutar tras tocar el menú
  o el pie, o al crear una página nueva.
- `imagenes.py`: regenera web/img/ (WebP) desde recursos/.
- `enlaces.py`: enlaces rotos, alt, title/description, h1.
- `captura_menu.py` y `trozo.py`: capturas del menú y recortes para revisar.
- `movil.py`: auditoría de móvil (360/390/414 y 844×390; `--motor webkit`, `--capturas`).
- `datos_demo.py` y `pdf_demo.py`: generan los datos ficticios y los PDF de muestra de la
  demo del portal. `comunes.py` ignora web/area-clientes/ (su marco lo pinta portal.js).
- `comprobar_nombres.sh`: obligatorio antes de cada commit (nombres prohibidos en ficheros
  y en mensajes de commit). `publicar.sh`: publica web/ en el servidor.

### Decisiones ya tomadas por el responsable
- Cortizo es el proveedor de perfiles; los sistemas A70, A84, A84 HO, C70 y E170 son
  suyos. Figura entre los partners y se menciona en los textos, sin inventar datos.
- Las fotos de obra se usan de forma provisional (licencia por confirmar con Cortizo).
- Logos: de momento los PNG; los vectoriales se pedirán.
- Descartadas: mapamundi, foto de reunión y foto de la acería.
- El sistema de puerta elevadora de otro fabricante queda fuera de la web.
- Imagen principal de portada: obras/corredera-elevadora-comedor-vistas-valle.jpeg

### Meta final
- Todas las páginas del mapa del sitio construidas en web/
- REDIRECCIONES.md completo
- CHECKLIST.md rellenado tras revisar todas las páginas en móvil y escritorio
- PREGUNTAS.md con las decisiones tomadas y lo que falta (fotos, logos, formulario)
- Resumen final de lo hecho y de lo pendiente por parte del responsable

## Cómo revisa el responsable
`python3 -m http.server 8080 --bind 0.0.0.0 --directory web`
y abre http://<ip-del-servidor>:8080
