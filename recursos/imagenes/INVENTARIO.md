# Inventario de imágenes

Fase 0. Clasificación de las 18 imágenes que había en `sin-clasificar/`.
La correspondencia render → sistema se ha comprobado con la página de la web antigua
que usaba cada archivo (`contenido/paginas/*.md`).

Calidad: **buena** (sirve a gran tamaño) · **aceptable** (sirve a tamaño medio o con
cuidado) · **baja** (no usar, o solo en miniatura).

## productos/

| Nombre nuevo | Nombre original | Qué muestra | Tamaño | Calidad | Uso sugerido |
|---|---|---|---|---|---|
| `perfil-a70-abisagrada-seccion.webp` | `1403-1024-1-1-1340x701-1.webp` | Render 3D en esquina del perfil A70 abisagrada, blanco, triple vidrio, refuerzos de acero, fondo blanco | 1340×701 | aceptable | Página `/ventanas/a70-abisagrada/` y tarjeta en portada de sistemas |
| `perfil-a84-abisagrada-seccion.webp` | `1514-1024-1-1340x701-1.webp` | Render 3D en esquina del perfil A84 abisagrada, blanco, triple vidrio, fondo blanco | 1340×701 | aceptable | Página `/ventanas/a84-abisagrada/` (muestra de Fase 1) y tarjeta |
| `perfil-a84-ho-abisagrada-seccion.webp` | `1514-1024-3-1340x701-1.webp` | Render 3D en esquina del perfil A84 HO (hoja oculta), blanco, triple vidrio, fondo blanco | 1340×701 | aceptable | Página `/ventanas/a84-ho-abisagrada/` y tarjeta |
| `perfil-c70-corredera-seccion.webp` | `1514-1024-1340x701-1.webp` | Render 3D en esquina del perfil C70 corredera, blanco, doble vidrio, fondo blanco | 1340×701 | aceptable | Página `/ventanas/c70-corredera/` y tarjeta |
| `perfil-e170-elevadora-seccion.webp` | `1464-1024-1340x701-1.webp` | Render 3D del perfil E170 elevadora con umbral de aluminio, blanco, triple vidrio, fondo blanco | 1340×701 | aceptable | Página `/ventanas/e170-elevadora/` y tarjeta |
| `perfil-premidoor76-elevadora-seccion.png` | `Sistema-PremiDoor76.png` | Render de la sección de una puerta elevadora-corredera PremiDoor 76 (dos hojas, triple vidrio), fondo transparente | 323×360 | baja | No usar de momento: sistema sin página propia (ver PREGUNTAS.md). Si se crea página, pedir imagen a mayor resolución |

Notas sobre los renders de perfiles:
- Los cinco comparten encuadre, luz y fondo blanco puro: funcionan muy bien como serie
  (rejilla de sistemas) sobre fondo blanco o gris muy claro.
- Están muy comprimidos (13–21 KB). A 1340 px aguantan, pero no admiten ampliación ni
  recorte agresivo. El sujeto ocupa el tercio central: se pueden recortar a formato
  vertical/cuadrado para móvil.
- Si existen los originales en PNG/alta resolución, conviene pedirlos.

## obras/

| Nombre nuevo | Nombre original | Qué muestra | Tamaño | Calidad | Uso sugerido |
|---|---|---|---|---|---|
| `corredera-elevadora-comedor-vistas-valle.jpeg` | `WhatsApp-Image-2023-10-27-at-14.55.02.jpeg` | Interior de comedor con gran corredera/elevadora blanca abierta a una terraza con vistas a un valle verde | 1600×1066 | buena | **Candidata a imagen principal de portada.** También E170 elevadora y C70 corredera |
| `corredera-elevadora-comedor-vistas-valle-oscurecida.jpg` | `Diseno-sin-titulo-1-scaled.jpg` | La misma foto anterior, recortada a 2:1, con velo oscuro azulado (era fondo de cabecera con texto encima) | 2560×1280 | aceptable | Mayor resolución que la original, pero con el oscurecido "quemado" en la imagen. Usar solo si hace falta un hero panorámico con texto encima; es preferible la versión limpia + velo por CSS |
| `vivienda-unifamiliar-moderna-blanca-ventanas-oscuras.jpeg` | `WhatsApp-Image-2023-10-27-at-14.55.01-2.jpeg` | Exterior de vivienda unifamiliar moderna, fachada blanca, carpinterías oscuras, muro de gaviones, montañas al fondo | 1600×1062 | buena | Portada (bloque particulares), `/empresa/`, `/acabados/pvc-foliado/` (carpintería en color) |
| `fachada-edificio-ventanas-antracita-contrapicado.jpeg` | `WhatsApp-Image-2023-10-27-at-14.55.01-1.jpeg` | Fachada de edificio residencial en contrapicado, grandes ventanales antracita con barandillas | 1600×1063 | buena | `/profesionales/`, `/distribuidores/`, bloque para constructoras y arquitectos; `/acabados/pvc-foliado/` |
| `sala-reuniones-ventanas-oscilobatientes-bicolor.jpeg` | `WhatsApp-Image-2023-10-27-at-14.55.02-2.jpeg` | Sala de reuniones con ventanal de hojas oscilobatientes, marco oscuro y hoja clara, una hoja abierta en abatible | 1600×1066 | buena | Sistemas abisagrados (A70/A84), `/profesionales/` (obra terciaria). Las ventanas están a contraluz: no recortar demasiado |
| `atico-terraza-piscina-correderas-anochecer.jpeg` | `WhatsApp-Image-2023-10-27-at-14.55.01.jpeg` | Ático con terraza y piscina al anochecer, grandes correderas de suelo a techo iluminadas desde dentro | 1600×1066 | aceptable | Ambiente para C70/E170 o `/acabados/vidrios/`. La carpintería apenas se distingue y el tono cálido choca con el resto: uso secundario |
| `nino-junto-a-corredera-salon-interior.jpeg` | `WhatsApp-Image-2023-10-27-at-14.55.02-1.jpeg` | Niño de rodillas en suelo de madera mirando por una corredera de vidrio hasta el suelo; cocina blanca al fondo | 1600×1066 | buena | Bloque "cercanía"/confort en portada, `/profesionales/` (mantenimiento), contacto. Foto emocional, la única con personas |

Notas sobre las fotos de obra:
- Todas pasaron por WhatsApp (1600 px, JPEG recomprimido). Dan para hero a ancho
  completo en pantallas normales, justas en pantallas grandes/retina.
- **Procedencia dudosa:** por arquitectura y paisaje (centroeuropeos) y el acabado
  profesional, parecen fotos de banco de imágenes del fabricante de perfiles, no obras
  propias de Marchante. Anotado en PREGUNTAS.md (licencia y si hay fotos de obras reales).

## fabrica/

Vacía. **No hay ninguna foto de la fábrica, maquinaria, equipo ni instalaciones.**
Para transmitir "fabricante serio" en `/empresa/` y portada harían falta. Anotado en
PREGUNTAS.md; mientras tanto se pondrán marcadores visibles.

## otras/

| Nombre nuevo | Nombre original | Qué muestra | Tamaño | Calidad | Uso sugerido |
|---|---|---|---|---|---|
| `logo-marchante-texto-blanco.png` | `Diseno-sin-titulo-copia-2.png` | Logo Marchante "Sistemas de ventanas" con texto blanco y marco rojo, fondo transparente (versión para fondos oscuros) | 352×150 | baja | Pie de página oscuro, solo a tamaño pequeño. Pedir logo vectorial (SVG/AI). Propuesta: moverlo a `recursos/marca/` |
| `logo-cortizo-negro.png` | `images.png` | Logo de Cortizo en negro sobre blanco | 800×200 | aceptable | Franja de marcas colaboradoras (aparecía en inicio, empresa, distribuidores y contacto). Propuesta: moverlo a `recursos/marca/partners/` |
| `mapamundi-puntos-gris.png` | `map.png` | Mapamundi de puntos gris muy claro, fondo transparente. Decoración de la plantilla Industrium | 1340×670 | aceptable | No usar: es relleno decorativo de la plantilla y no lo referencia ninguna página. Candidata a `descartadas/` |
| `reunion-equipo-desenfocada-cabecera.jpg` | `Diseno-sin-titulo-3.jpg` | Foto de stock desenfocada y velada: personas de espaldas en una mesa de reunión, tablero de madera en primer plano | 1297×595 | baja | No usar: stock genérico, sin relación con el producto, no la referencia ninguna página. Candidata a `descartadas/` |
| `stock-acereria-fundicion-unsplash.jpg` | `ant-rozetsky-_qWeqqmpBpU-unsplash.jpg` | **STOCK (Unsplash, Ant Rozetsky).** Interior de una acería con cuchara de colada y metal fundido | 1920×1276 | buena (técnica) | No usar: industria pesada del acero, nada que ver con ventanas de PVC, y tono oscuro/naranja opuesto a la dirección visual. No la referencia ninguna página |

## Resumen para el diseño

- **Material aprovechable:** 5 renders de perfil coherentes entre sí + 6 fotos de
  ambiente (5 buenas). Suficiente para portada y páginas de sistema.
- **Tono cromático del material:** blancos, grises antracita, madera clara y verdes
  naturales. Encaja con una paleta sobria (blanco, oscuro `#17262F`, grises) y el rojo
  solo como acento.
- **Carencias:** fábrica/equipo, fotos de detalle (herrajes, manillas, acabados
  foliados instalados), vidrios, instalación/transporte para las guías de
  profesionales, logo vectorial.
- Las muestras de `colores-foliado/` no se han tocado (ya estaban clasificadas).
