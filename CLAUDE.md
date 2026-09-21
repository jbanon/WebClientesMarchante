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
- `recursos/imagenes/colores-foliado/` — muestras de los colores del PVC foliado
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
- Hay una imagen `Sistema-PremiDoor76.png` que sugiere un sistema de puerta que no
  tiene página propia. Anótalo en PREGUNTAS.md.
- `ant-rozetsky-*-unsplash.jpg` es una foto de stock. Si la usas, anótalo en
  INVENTARIO.md como stock.

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
  - `/acabados/pvc-foliado/` (galería de colores con recursos/imagenes/colores-foliado)
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

## Forma de trabajo
### Fase 0 — Inventario de imágenes
Abre cada imagen de recursos/imagenes/sin-clasificar/. Ponle un nombre descriptivo
en minúsculas con guiones (ej: ventana-corredera-salon-obra.jpg) y muévela a
productos/, obras/, fabrica/ u otras/. Crea recursos/imagenes/INVENTARIO.md con una
tabla: nombre nuevo, nombre original, qué muestra, calidad (buena / aceptable / baja),
uso sugerido. Haz commit y PARA para revisión.

### Fase 1 — Dirección visual
Construye la portada y una página de sistema (ventanas/a84-abisagrada) como muestra,
más web/estilo.html con la paleta, las tipografías y los componentes. Haz commit y
PARA para revisión.

### Fase 2 — Construcción completa
Tras aprobar la Fase 1, construye el resto de páginas del mapa del sitio.
Crea REDIRECCIONES.md con la correspondencia URL antigua → URL nueva.
Haz commit al terminar cada bloque de páginas.

### Fase 3 — Revisión
Revisa todas las páginas en ancho de móvil y de escritorio: enlaces rotos, imágenes,
textos alternativos, títulos. Rellena CHECKLIST.md con lo comprobado. Commit final.

## Cómo revisa el responsable
`python3 -m http.server 8080 --bind 0.0.0.0 --directory web`
y abre http://<ip-del-servidor>:8080
