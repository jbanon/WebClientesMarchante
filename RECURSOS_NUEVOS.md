# Recursos nuevos (antigua/WEB-antigua) — estudio y plan de integración

> **Estado (25/09/2026): IMPLEMENTADO.** Decisiones tomadas al implementar, distintas de lo
> propuesto abajo: se publica el catálogo de accesorios nuevo (el cliente lo envió como
> vigente); el catálogo general se redujo con ghostscript a 18,7 MB (y el de aperturas
> A84 HO a 0,3 MB); el esquema «Formulación» se descartó (ilegible a 390 px); en
> `/documentacion/` las cartas y el folleto van juntos en un apartado «Cortizo PVC»; la
> rejilla `.documentos` usa borde por tarjeta (no `gap` con fondo) para no dejar celdas
> vacías; el folleto de 2019 y sus extractos no se publican. Uw del A84: la web oficial
> de Cortizo sigue en 1,0, así que no se toca.

Fecha del estudio: 2026-09-25. Material recibido en `antigua/WEB-antigua/` (29 archivos:
15 PDF, 13 JPG y 1 PNG). Este documento es el resultado de la **primera tarea** (estudiar
y asignar) y sirve de guion para la **segunda tarea** (implementar). Reglas del brief que
mandan aquí: mismo aspecto elegante (mucho blanco, poca decoración, rojo solo de acento),
móvil primero, cero peticiones a terceros, no inventar datos.

---

## 1. Resumen: qué es cada cosa y a dónde va

| # | Recurso (origen) | Qué es | Destino en la web | Cómo |
|---|---|---|---|---|
| 1 | `POSIBILIDADES APERTURA A70.pdf` (5 p., 2,2 MB) | Configuraciones y aperturas posibles del sistema, con esquemas (Cortizo) | `/ventanas/a70-abisagrada/` | 2.º `.descarga` en «Documentación» |
| 2 | `POSIBILIDADES APERTURA A84.pdf` (4 p., 1,2 MB) | Ídem A84 | `/ventanas/a84-abisagrada/` | Ídem |
| 3 | `POSIBILIDADES APERTURA A84 HO.pdf` (3 p., 9,8 MB) | Ídem A84 Hoja Oculta (portada con foto, pesa mucho) | `/ventanas/a84-ho-abisagrada/` | Ídem (indicar el peso) |
| 4 | `POSIBILIDADES APERTURA C70.pdf` (2 p., 1,8 MB) | Ídem C70 | `/ventanas/c70-corredera/` | Ídem |
| 5 | `POSIBILIDADES APERTURA E170.pdf` (3 p., 1,9 MB) | Ídem E170 | `/ventanas/e170-elevadora/` | Ídem |
| 6 | `FOLIADOS ESTANDAR.pdf` (1 p., 0,5 MB) | Carta oficial Cortizo: estándar 2 caras (3) y 1 cara (2) | `/acabados/pvc-foliado/` | Sección nueva «La carta oficial, en PDF» con tarjeta `.documento` |
| 7 | `FOLIADOS ESPECIAL 1.pdf` (2 p., 2,1 MB) | Carta oficial Cortizo: 35 colores especiales | `/acabados/pvc-foliado/` | Ídem (segunda tarjeta) |
| 8 | `02 12.11.24/FOLLETO_CALIDAD_PVC_ES_WEB.pdf` (29 p., 4,3 MB) | Folleto «Calidad Cortizo PVC»: clases A/S/II, formulación, extrusión y 22 ensayos. **Versión de 12-11-2024: es la que se publica** | `/ventanas/` (sección nueva «Calidad») y `/acabados/pvc-blanco/` | Bloque de datos `.datos` (Clase A / S / II / 22 ensayos) + `.descarga` del folleto |
| 9 | `FOLLETO_CALIDAD_PVC_ES_WEB.pdf` (30 p., 2019) | Versión antigua del mismo folleto | — | **No se publica** (duplicado, anterior) |
| 10 | `01FOLLETO_CALIDAD_PVC_ES_WEB.pdf - Cortizo Drive.pdf` (1 p.) | Solo la página «Formulación» del folleto, apaisada | — | No se publica: es un extracto del n.º 8 |
| 11 | `formulacion 1.jpg` (1267×495) y `formulacion 2.jpg` (1254×222) | Recortes en baja resolución de las páginas «Formulación» y «Extrusión» del folleto | `/acabados/pvc-blanco/` (opcional) | No usar los JPG (muy pequeños). Si se quiere el esquema, rasterizar la página 4 del PDF (vector) a 1600 px |
| 12 | `CARACTERISTICAS PERFILES PVC Cortizo®.pdf` (1 p., 0,1 MB) | Lámina bilingüe: render A84 + Clase A (paredes 3 mm), Clase S (zonas climáticas), Clase II (impacto) | `/ventanas/` y `/acabados/pvc-blanco/` | **Se convierte en bloque web** (mismo `.datos` del n.º 8). No hace falta enlazar el PDF |
| 13 | `a70/1403-1024 (1).jpg`, `A84/1514-1024 (1).jpg`, `a84 ho/1514-1024.jpg`, `c70/1514-1024.jpg`, `E170/1464-1024.jpg` | **Los mismos renders de perfil que ya usa la web, pero en su tamaño original y sin comprimir** (1514×1024 y ~90 KB frente a 1340×701 y 13–21 KB) | Portada, `/ventanas/`, las 5 fichas, `/acabados/pvc-blanco/` | Sustituir los originales en `recursos/imagenes/productos/` y regenerar con `imagenes.py`. Cierra la petición 3.4 de PREGUNTAS_CLIENTE (renders en alta) |
| 14 | `FOTOS/` (7 fotos de ambiente Cortizo) | Fotos de ventanas instaladas; una por sistema (ver §3) | Foto ancha de cada ficha de sistema; una en `/acabados/pvc-blanco/` | Añadir a `recursos/imagenes/obras/` y al diccionario `FOTOS` de `imagenes.py` |
| 15 | `INDUPANEL/CATALOGO PANELESS.pdf` (140 p., **37,5 MB**) | Catálogo general de paneles de puerta Indupanel (todas las colecciones) | `/paneles-y-accesorios/` | Primera tarjeta `.documento` de «Catálogos generales». Peso muy alto: ver §6 |
| 16 | `INDUPANEL/MINIATURAS INDUPANEL PANELES.pdf` (5 p., 7,3 MB) | Versión nueva (2025, con portada y 4 páginas) del catálogo de miniaturas | `/paneles-y-accesorios/` | **Sustituye** a `web/docs/pdf-paneles-miniaturas.pdf` (2 p. de 2022), manteniendo el nombre |
| 17 | `INDUPANEL/ACCESORIOS.pdf` (8 p., 10,9 MB) | Catálogo de accesorios, **otra edición** que la publicada (páginas 277-291 frente a 303-317; la publicada incluye además una página «Vidrios») | `/paneles-y-accesorios/` | **Se mantiene el actual** hasta que el cliente confirme cuál es la edición vigente (pregunta §8) |
| 18 | `INDUPANEL/PLAFONES PF.pdf` (1 p. A3, 0,8 MB, mayo 2025) | Lámina de plafones PF 11-20 (molduras para panel) | `/paneles-y-accesorios/` | Tarjeta `.documento` nueva en «Catálogos generales» |

Comprobaciones hechas:

- Ninguno de los 15 PDF coincide (hash) con los 18 ya publicados en `web/docs/`.
- Las cartas de foliados en PDF (n.º 6 y 7) contienen **exactamente los mismos colores y
  nombres** que la carta de la web (3 + 2 estándar, 35 especiales). Se puede dar por
  cerrada la duda 10 de PREGUNTAS.md: la selección de la web es la carta oficial que
  usa Marchante.
- Los 5 PDF de aperturas resuelven la duda 9 de PREGUNTAS.md y la 4.6 de
  PREGUNTAS_CLIENTE.md. Sus textos coinciden con lo que ya dicen las fichas (A84 HO:
  practicable, oscilobatiente y abatible; E170: 1, 2 y 4 hojas…).
- El folleto de calidad (p. 3) da un **Uw desde 0,79 W/m²K para A84 Abisagrada**; la
  web dice 1,0 (duda 8). Según la regla del brief manda la web oficial de Cortizo: la
  segunda tarea debe cotejarlo allí antes de tocar la cifra. Los demás valores del
  folleto coinciden con la web (A70 0,9 · A84 HO 0,74 · C70 1,3 · E170 0,9).
- El folleto menciona variantes que no están en la web de Marchante (A84 Passivhaus,
  A70 triple junta). Regla del brief: **no se añaden sistemas**; solo se anotan en
  PREGUNTAS_CLIENTE.md si procede.

---

## 2. Diseño: cómo se presentan los documentos sin romper la web

La web ya tiene un componente de descarga, `.descarga` (fila con caja «PDF», título,
«PDF · 2,5 MB» y flecha roja), documentado en `web/estilo.html` y usado en las fichas y
en `/paneles-y-accesorios/`. Se conserva como pieza básica y se añade **una sola pieza
nueva**, la tarjeta con portada, para los documentos «de escaparate». Con dos piezas
se cubre todo y el sitio sigue leyéndose como un único sistema.

### 2.1 `.descarga` (existente): fila compacta

Se usa donde el documento acompaña a un contenido (fichas de sistema, folleto junto a
un bloque de datos). Sin cambios de CSS. Único detalle: cuando hay dos o más seguidos
dentro de una columna estrecha (`.ficha__cuerpo`), van **apilados**, no en rejilla:
basta con poner dos `<a class="descarga">` consecutivos (ya llevan `margin-top: 1rem`).

```html
<h2>Documentación</h2>
<a class="descarga" href="/docs/ficha-tecnica-a84-abisagrada.pdf">
  <span class="descarga__tipo" aria-hidden="true">PDF</span>
  <span class="descarga__texto"><strong>Ficha técnica A84 Abisagrada</strong><span>PDF · 2,5 MB</span></span>
</a>
<a class="descarga" href="/docs/aperturas-a84-abisagrada.pdf">
  <span class="descarga__tipo" aria-hidden="true">PDF</span>
  <span class="descarga__texto"><strong>Configuraciones y aperturas posibles</strong><span>PDF · 4 páginas · 1,2 MB</span></span>
</a>
```

### 2.2 `.documento` (nuevo): tarjeta con portada

Para catálogos y cartas, donde la portada aporta (puertas de Indupanel, rejillas de
muestras de color, folleto de calidad). Cada tarjeta es un único enlace al PDF.

Aspecto, en la línea del resto de la web (bordes de 1 px, sin sombras, sin radios,
serif en el título, flecha roja como único acento):

- **Escritorio (≥ 48 em):** rejilla `.documentos` de 2, 3 o 4 columnas (`--2`, `--3`,
  `--4`), separada por líneas de 1 px como `.sistemas` (rejilla con `gap: 1px` y fondo
  `var(--linea)`), o con `gap` normal y borde por tarjeta; elegir la primera para
  parecerse a la rejilla de sistemas. Dentro: portada arriba (caja con `aspect-ratio: 3 / 4`,
  fondo `var(--papel-2)`, la imagen centrada con `object-fit: contain` para que
  quepan portadas A4, A3 apaisadas y cuadradas sin recortar), debajo el tipo en
  versalitas grises (`Cortizo PVC · Carta de colores`), el título en serif
  (~1.35 rem) y la línea de metadatos («PDF · 2 páginas · 2,1 MB») en gris. Al pasar el
  ratón: borde a `var(--tinta)`, título a `var(--rojo-ui)` y la portada con
  `transform: scale(1.02)` como en `.tarjeta`.
- **Móvil (< 48 em):** una columna; la tarjeta pasa a **horizontal**: portada a la
  izquierda de 5,5 rem de ancho (misma solución que `.sistema` en móvil) y textos a la
  derecha. Toda la tarjeta es zona táctil (muy por encima de 44 px). Nunca hay scroll
  horizontal porque la rejilla es de una columna y las imágenes tienen `max-width: 100%`.
- **Peso visible siempre** («PDF · 140 páginas · 37,5 MB») para que en el móvil se sepa
  qué se descarga.
- **Accesibilidad:** la portada lleva `alt=""` (decorativa: el título ya describe el
  documento); el `<a>` contiene el título, así que el enlace tiene nombre accesible.

Marcado propuesto:

```html
<ul class="documentos documentos--3" role="list">
  <li><a class="documento" href="/docs/carta-foliados-especiales.pdf">
    <span class="documento__portada"><img src="/img/docs/carta-foliados-especiales-300.webp" srcset="/img/docs/carta-foliados-especiales-300.webp 300w, /img/docs/carta-foliados-especiales-600.webp 600w" sizes="(min-width: 48em) 18rem, 5.5rem" width="300" height="400" loading="lazy" alt=""></span>
    <span class="documento__texto">
      <span class="documento__tipo">Cortizo PVC · Carta de colores</span>
      <strong>Colores especiales</strong>
      <span class="documento__meta">PDF · 2 páginas · 2,1 MB</span>
    </span>
  </a></li>
</ul>
```

CSS propuesto (a añadir en `estilo.css` junto a «Descarga de documento» y a
documentar en `estilo.html` bajo «Tabla técnica, lista y descarga»):

```css
/* Tarjeta de documento con portada */
.documentos { list-style: none; margin: 0; padding: 0; display: grid; gap: 1px; background: var(--linea); border: 1px solid var(--linea); }
.documento { display: grid; grid-template-columns: 5.5rem 1fr; gap: 1.25rem; align-items: center; height: 100%; padding: 1.25rem; background: var(--papel); color: inherit; text-decoration: none; }
.documento__portada { display: grid; place-items: center; aspect-ratio: 3 / 4; padding: 0.5rem; background: var(--papel-2); overflow: hidden; }
.documento__portada img { max-width: 100%; max-height: 100%; width: auto; height: auto; border: 1px solid rgba(23, 38, 47, 0.14); transition: transform 0.6s cubic-bezier(0.2, 0.7, 0.2, 1); }
.documento__texto { display: grid; gap: 0.3rem; }
.documento__tipo { font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--gris-medio); }
.documento strong { font-family: var(--serif); font-weight: 400; font-size: 1.35rem; line-height: 1.15; color: var(--tinta); transition: color 0.2s; }
.documento__meta { font-size: 0.875rem; color: var(--gris-medio); }
.documento__meta::after { content: " ↓"; color: var(--rojo-ui); }
.documento:hover strong, .documento:focus-visible strong { color: var(--rojo-ui); }
.documento:hover .documento__portada img { transform: scale(1.02); }
@media (min-width: 48em) {
  .documento { grid-template-columns: 1fr; align-content: start; padding: 1.5rem; }
  .documento__portada { padding: 1.25rem; }
  .documentos--2 { grid-template-columns: repeat(2, 1fr); }
  .documentos--3, .documentos--4 { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 68em) {
  .documentos--3 { grid-template-columns: repeat(3, 1fr); }
  .documentos--4 { grid-template-columns: repeat(4, 1fr); }
}
```

Portadas: se generan a partir de la primera página de cada PDF con `pdftoppm`
(instalado) y Pillow, a 300 y 600 px de ancho, en `web/img/docs/`. Conviene un script
`herramientas/portadas.py` (lista de PDF → webp) para poder regenerarlas; no se guardan
en `recursos/` porque son derivadas.

### 2.3 Bloque «Calidad Cortizo PVC» (reutiliza `.datos`)

La lámina de características (n.º 12) y la página 3 del folleto (n.º 8) dicen lo mismo:
tres clases del perfil. En la web se presenta con el componente `.datos` (los
«datos clave» de las fichas: etiqueta pequeña en versalitas y valor grande en serif),
con cuatro casillas. No hace falta CSS nuevo y encaja con las fichas:

```html
<dl class="datos">
  <div><dt>Espesor de paredes principales</dt><dd>Clase A <small>3 mm</small></dd></div>
  <div><dt>Zonas climáticas</dt><dd>Clase S <small>máxima resistencia solar</small></dd></div>
  <div><dt>Resistencia al impacto</dt><dd>Clase II <small>dureza máxima</small></dd></div>
  <div><dt>Ensayos de laboratorio</dt><dd>22</dd></div>
</dl>
```

Los datos salen del folleto (Cortizo: se toman datos, se redacta con palabras propias).
Bajo el bloque, la fila `.descarga` del folleto.

---

## 3. Fotos de ambiente (`FOTOS/`): asignación propuesta

Las siete fotos son de catálogo de Cortizo (misma procedencia y estilo que las seis de
`obras/`). Hoy las cinco fichas repiten las mismas fotos de `obras/`; con estas, cada
sistema tiene la suya. La asignación es por lo que se ve en la foto; **el cliente debe
confirmarla** (pregunta en §8).

| Archivo | Qué muestra | Tamaño | Destino propuesto | Nombre en `recursos/imagenes/obras/` |
|---|---|---|---|---|
| `1536-1024.jpg` | Salón con sofá y ventana de dos hojas en antracita (oscilobatiente) | 1536×1024 | Foto ancha de `/ventanas/a70-abisagrada/` | `salon-ventana-dos-hojas-antracita.jpg` |
| `1403-1024.jpg` | Salón blanco con balconera de dos hojas en nogal abierta al jardín | 1403×1024 | Foto ancha de `/ventanas/a84-abisagrada/` (además muestra un foliado madera) | `salon-balconera-nogal-jardin.jpg` |
| `1533-1024.jpg` | Muro de hormigón con ventana cuadrada de marco negro muy fino | 1533×1024 | Foto ancha de `/ventanas/a84-ho-abisagrada/` (estética de hoja oculta) | `hormigon-ventana-cuadrada-negra.jpg` |
| `1200-841-max.png` | Interior con corredera de dos hojas en madera hacia un patio | 1200×841 | Foto ancha de `/ventanas/c70-corredera/` (solo hasta 1200 px: aceptable, se sirve 640/1024 y la de 1200 como máxima) | `interior-corredera-madera-patio.png` |
| `1535-1024.jpg` | Vivienda moderna al anochecer con grandes correderas iluminadas | 1535×1024 | Foto ancha de `/ventanas/e170-elevadora/` | `vivienda-moderna-anochecer-correderas.jpg` |
| `683-1024 (1).jpg` | Dormitorio-estudio blanco con ventana blanca (vertical) | 683×1024 | `/acabados/pvc-blanco/`: nuevo bloque `partido` (la foto vertical encaja en el 4:5 de escritorio) | `dormitorio-ventana-blanca.jpg` |
| `683-1024.jpg` | Casa de piedra con balconera oscura y terraza con flores (vertical) | 683×1024 | Reserva. Candidata a un bloque `partido` vertical en `/distribuidores/` o `/contacto/` si se quiere romper texto | `casa-piedra-balconera-oscura-terraza.jpg` |

Notas:

- Las dos verticales tienen 683 px de ancho: bien a 1×, justas en pantallas retina.
  Se generan solo los tamaños 640 (y el script ya limita a `min(w, ancho)`).
- No hay ninguna foto de embalaje/transporte ni de fábrica: los marcadores de
  `/profesionales/` (transporte) siguen pendientes.
- Licencia: misma situación que `obras/` (duda 6 de PREGUNTAS.md). Al venir del cliente
  ahora, anotar en PREGUNTAS_CLIENTE que se entienden facilitadas por Cortizo.
- La portada del PDF de aperturas del A84 HO tiene una buena foto de fachada, pero no
  se extrae: es parte del documento de Cortizo.

---

## 4. Cambios página por página

### 4.1 Las cinco fichas de sistema (`/ventanas/<sistema>/`)

1. **Documentación:** añadir el segundo `.descarga` «Configuraciones y aperturas
   posibles» bajo la ficha técnica (marcado en §2.1). Textos de metadatos:
   A70 «PDF · 5 páginas · 2,2 MB»; A84 «4 páginas · 1,2 MB»; A84 HO «3 páginas ·
   9,8 MB»; C70 «2 páginas · 1,8 MB»; E170 «3 páginas · 1,9 MB».
2. **Foto ancha:** cambiar la imagen de la `section.foto-ancha` por la del sistema (§3),
   con `srcset` 640/1024/1600 (1200 en el caso del C70) y `alt=""` porque la sección
   lleva `aria-hidden`.
3. **Render:** nada que tocar en el HTML; al sustituir los originales y regenerar
   `productos/perfil-*-400/700.webp` mejoran solos. El recorte cuadrado de
   `imagenes.py` (`x0 = (ancho - alto)//2 - 20`) estaba ajustado a los recortes
   1340×701: con los originales 1514×1024 hay que **revisar el encuadre en las
   capturas** y ajustar el desplazamiento si el perfil no queda centrado.

### 4.2 Portada de sistemas (`/ventanas/`)

Sección nueva **«Calidad Cortizo PVC»** entre «Por qué PVC» y «Paneles de puerta»:
`encabezado` (sobretítulo «Calidad certificada», título «Perfiles de clase A, S y II» y
un párrafo propio sobre los controles de laboratorio) + `.datos` de §2.3 + `.descarga`
del folleto («Folleto Calidad Cortizo PVC · PDF · 29 páginas · 4,3 MB»). Fondo
`seccion--suave` si la anterior es blanca (alternar como en el resto de la página).

### 4.3 `/acabados/pvc-blanco/`

- En «La fórmula Cortizo»: añadir una `lista-limpia` con tres datos de la formulación
  del folleto (7 silos de materia prima, 2 plantas de aditivos, líneas de extrusión con
  coextrusora) y, debajo, el `.descarga` del folleto (mismo archivo que en `/ventanas/`).
- Bloque nuevo `partido partido--inverso` con la foto vertical del dormitorio
  (`dormitorio-ventana-blanca`) y un texto corto sobre el blanco masa, o bien sustituir
  el `bloque-blanco` actual por la foto y mover el render al bloque nuevo. Decidir con
  la captura: lo importante es que la página deje de tener una sola imagen.
- Opcional: figura a ancho completo con el esquema «Formulación» rasterizado de la
  página 4 del PDF (vector, sale nítido a 1600 px; es un dibujo de línea gris sobre
  blanco, muy en el tono de la web). Solo si en la captura se lee bien a 390 px; si no,
  descartar. Los JPG `formulacion 1/2` no se usan (baja resolución).

### 4.4 `/acabados/pvc-foliado/`

- Sección nueva `seccion--carta` con `id="carta-pdf"` antes de la `foto-ancha`:
  `encabezado` («La carta oficial, en PDF» / «Para imprimir o compartir con tu
  instalador») + `.documentos documentos--2` con las dos tarjetas (portadas de las
  rejillas de muestras). Metadatos: «PDF · 1 página · 0,5 MB» y «PDF · 2 páginas ·
  2,1 MB».
- Añadir el salto «Carta en PDF» al `nav.saltos` de la cabecera de la página.
- Mantener el aviso de colores orientativos (los PDF lo repiten).

### 4.5 `/paneles-y-accesorios/`

- «Catálogos generales» pasa de `.descargas` a `.documentos documentos--4` con
  portada: Catálogo general (140 p., 37,5 MB), Todos los modelos en miniatura (nuevo,
  7,3 MB), Accesorios (el actual, 6,8 MB) y Plafones PF (0,8 MB).
- «Once colecciones»: recomendado pasar también a `.documentos documentos--4` con
  portada (las portadas son fotos de puertas: la página gana mucho). Si se prefiere
  contener el cambio, dejar `.descargas--3` como está.
- Entradilla: mencionar el catálogo general y los plafones.

### 4.6 `/profesionales/`

El botón «Fichas técnicas de los sistemas» (hoy → `/ventanas/`) apunta a la página de
documentación de §5 si se hace; si no, se deja.

### 4.7 Portada (`/`)

Sin cambios obligatorios. Opcional: en «Marcas con las que trabajamos» un `.enlace`
«Calidad certificada de los perfiles» hacia `/ventanas/#calidad`.

---

## 5. Página nueva recomendada: `/documentacion/`

Con 30 PDF repartidos por el sitio, a constructoras, arquitectos e instaladores les
falta un sitio único. Propuesta (segunda fase de la implementación, tras lo anterior):

- URL `/documentacion/`, título «Documentación técnica», `portadilla` + secciones con
  `encabezado`: **Fichas técnicas** (5, `.descargas--3`), **Configuraciones y
  aperturas** (5, `.descargas--3`), **Acabados** (2 cartas, `.documentos--2`),
  **Calidad** (folleto, `.documentos--2` o `.descarga`), **Puertas** (enlace a
  `/paneles-y-accesorios/`, sin repetir los 15).
- Enlaces de entrada: submenú «Ventanas» (tras «Paneles y accesorios»), pie (columna
  de enlaces), botón de `/profesionales/`. Tras tocar cabecera o pie: ejecutar
  `herramientas/comunes.py`.
- `sitemap.xml` (+1 URL) y `REDIRECCIONES.md` sin cambios (no existía en la web antigua).

---

## 6. Archivos: nombres y pipeline

### 6.1 Originales → `recursos/` (fuente de verdad)

```
recursos/documentos/cortizo/
  aperturas-a70-abisagrada.pdf          ← ↘ Click aquí para ver POSIBILIDADES APERTURA A70.pdf
  aperturas-a84-abisagrada.pdf          ← … A84.pdf
  aperturas-a84-ho.pdf                  ← … A84 HO.pdf
  aperturas-c70-corredera.pdf           ← … C70.pdf
  aperturas-e170-corredera-elevable.pdf ← … E170.pdf
  carta-foliados-estandar.pdf           ← … FOLIADOS ESTANDAR.pdf
  carta-foliados-especiales.pdf         ← … FOLIADOS ESPECIAL 1.pdf
  folleto-calidad-cortizo-pvc-2024.pdf  ← 02 12.11.24/FOLLETO_CALIDAD_PVC_ES_WEB.pdf
  caracteristicas-perfiles-cortizo.pdf  ← CARACTERISTICAS PERFILES PVC Cortizo®.pdf (referencia; no se publica)
recursos/documentos/catalogos/
  CATALOGO-INDUPANEL-PANELES.pdf        ← INDUPANEL/CATALOGO PANELESS.pdf
  PDF-PANELES-MINIATURAS-2025.pdf       ← INDUPANEL/MINIATURAS INDUPANEL PANELES.pdf
  PDF-ACCESORIOS-EDICION-277.pdf        ← INDUPANEL/ACCESORIOS.pdf (pendiente de decidir)
  PLAFONES-PF.pdf                       ← INDUPANEL/PLAFONES PF.pdf
recursos/imagenes/productos/
  perfil-<sistema>-seccion.jpg          ← los 5 renders (sustituyen a los .webp de 1340×701;
                                           cambiar la extensión en imagenes.py)
recursos/imagenes/obras/
  (7 fotos con los nombres de §3)
```

`antigua/` no se modifica (solo lectura): se copia, no se mueve. Actualizar
`recursos/imagenes/INVENTARIO.md` con las 12 imágenes nuevas.

### 6.2 Publicados → `web/docs/` y `web/img/`

```
web/docs/aperturas-a70-abisagrada.pdf            2,2 MB
web/docs/aperturas-a84-abisagrada.pdf            1,2 MB
web/docs/aperturas-a84-ho.pdf                    9,8 MB
web/docs/aperturas-c70-corredera.pdf             1,8 MB
web/docs/aperturas-e170-corredera-elevable.pdf   1,9 MB
web/docs/carta-foliados-estandar.pdf             0,5 MB
web/docs/carta-foliados-especiales.pdf           2,1 MB
web/docs/folleto-calidad-cortizo-pvc.pdf         4,3 MB
web/docs/catalogo-indupanel-paneles.pdf         37,5 MB  (ver abajo)
web/docs/plafones-pf-indupanel.pdf               0,8 MB
web/docs/pdf-paneles-miniaturas.pdf              7,3 MB  (contenido sustituido, mismo nombre)
web/img/docs/<nombre>-300.webp y -600.webp       portadas (pdftoppm + Pillow)
web/img/obras/<nombre>-640/1024/1600.webp         fotos nuevas (imagenes.py)
web/img/productos/perfil-*-400/700.webp           regenerados (imagenes.py)
```

**Catálogo de 37,5 MB.** Publicarlo tal cual funciona, pero es mucho para móvil. En esta
máquina no hay `ghostscript` ni `qpdf`; con `gs -sDEVICE=pdfwrite -dPDFSETTINGS=/ebook`
suele quedar en menos de 10 MB con calidad de pantalla. Requiere `sudo apt install
ghostscript` (punto en el que hay que pedir permiso). Alternativa: pedir a Indupanel la
versión web. Mientras tanto: publicar el original con el peso bien visible.

**A84 HO (9,8 MB):** mismo caso, menor prioridad; el peso viene de la foto de portada.

---

## 7. Comprobaciones de la segunda tarea (antes del commit)

1. `herramientas/comprobar_nombres.sh` (obligatorio).
2. `herramientas/enlaces.py`: enlaces a `/docs/*.pdf` existentes, `alt`, títulos.
3. `herramientas/capturas.py` de las páginas tocadas (5 fichas, `/ventanas/`,
   `/acabados/pvc-blanco/`, `/acabados/pvc-foliado/`, `/paneles-y-accesorios/`,
   `/documentacion/` si se hace) a 390 y 1440 px, y revisarlas: encuadre de los renders
   nuevos, tarjetas `.documento` en móvil (horizontal, sin desbordar) y en escritorio.
4. `herramientas/movil.py` (360/390/414 y 844×390): sin scroll horizontal, zonas táctiles.
5. `web/estilo.html`: añadir el ejemplo de `.documento` y del bloque `.datos` de calidad.
6. `sitemap.xml`: `lastmod` de las páginas tocadas (y la URL nueva si procede).
7. `PREGUNTAS.md`: cerrar 9 (aperturas recibidas) y 10 (la carta coincide con la
   oficial); anotar en 8 el dato del folleto (A84 0,79) y qué se decidió; apartado I:
   renders en alta recibidos. `PREGUNTAS_CLIENTE.md`: cerrar 4.6 y actualizar 3.4;
   añadir las preguntas de §8.
8. `CHECKLIST.md`: filas de las páginas modificadas.
9. Publicar con `herramientas/publicar.sh`.

---

## 8. Preguntas para el cliente (a pasar a PREGUNTAS_CLIENTE.md)

1. **Fotos de ambiente:** ¿es correcta la asignación de cada foto a su sistema (§3)? Si
   alguna es de otro sistema, se cambia en un minuto.
2. **Catálogo de accesorios Indupanel:** el que tenemos publicado (páginas 303-317, con
   una página de vidrios) y el que nos habéis pasado ahora (páginas 277-291) son
   ediciones distintas. ¿Cuál es la vigente?
3. **Catálogo general de paneles (37 MB):** ¿tiene Indupanel una versión ligera para web?
   Si no, la reducimos nosotros.
4. **Uw del A84 Abisagrada:** el folleto de calidad de Cortizo (nov. 2024) indica
   «desde 0,79 W/m²K»; en la web figura 1,0. Confirmar cuál se pone.
5. **Variantes que no están en la web** (A84 Passivhaus, A70 triple junta): ¿las
   fabricáis? De momento no se añaden.
6. **Licencia:** entendemos que las fotos y documentos nuevos os los ha facilitado
   Cortizo e Indupanel para vuestra web. Confirmar.
