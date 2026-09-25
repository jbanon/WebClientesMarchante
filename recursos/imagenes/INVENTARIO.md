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

Vacía tras la revisión de la Fase 0 (ver «Movimientos posteriores»).

## Movimientos posteriores a la revisión de la Fase 0

| Archivo | Nombre original | Destino | Motivo |
|---|---|---|---|
| `logo-marchante-texto-blanco.png` | `Diseno-sin-titulo-copia-2.png` | `recursos/marca/` | Logo para fondos oscuros (352×150, calidad baja; se usa en el pie). Pendiente vectorial |
| `logo-cortizo-negro.png` | `images.png` | `recursos/marca/partners/` | Cortizo es el proveedor de perfiles: primer logo de la franja de marcas |
| `mapamundi-puntos-gris.png` | `map.png` | `descartadas/` | Decoración de la plantilla Industrium |
| `reunion-equipo-desenfocada-cabecera.jpg` | `Diseno-sin-titulo-3.jpg` | `descartadas/` | Stock genérico de la plantilla |
| `stock-acereria-fundicion-unsplash.jpg` | `ant-rozetsky-_qWeqqmpBpU-unsplash.jpg` | `descartadas/` | **STOCK (Unsplash, Ant Rozetsky)**: una acería. No se usa |

**No se usa ninguna imagen de stock en la web.**

## colores-cortizo/ (añadida en septiembre de 2026)

Carta oficial de foliados de Cortizo: **48 muestras** PNG de 496×238 px descargadas de
https://ventanascortizo.com/es/productos/acabados/foliados/ y servidas desde la propia web
(`web/img/colores/*.webp`). Calidad: aceptable (son las de la web de Cortizo; suficientes
para una carta en pantalla). Nombre de archivo: `<familia>--<color>.png`.
`colores.json` guarda familia, nombre y URL de origen de cada muestra.

| Familia | Muestras |
|---|---|
| Estándar 2 caras (3) | Blanco, Roble Dorado, Nogal |
| Estándar 1 cara (2) | Roble Dorado, Nogal |
| Especiales (35) | Azul Acero, Marrón Claro/Oscuro/Mate, Verde Mate, Gris Mate, Negro Mate, Pino Veteado, Roble Claro/Oscuro/Rústico, Abeto, Caoba, Sapelly, Walnuss Nogal, Roble Newcastle, Antracita y Ocre Metalizado, Plata Aluminio, Gris Liso/Antracita/Ágata/Claro/Plata, Blanco Foliado, Blanco Crema, Bronce, Oro, Rojo Vino, Verde Pino, Verde Musgo, Azul Brillante, Sheffield Claro/Oscuro, Roble Malta |
| Ultra Performance (8) | Roble Malta Woodec, Kitami Oscuro, Turner Oak Toffee, Blanco/Cuarzo/Marrón/Gris Antracita/Negro Ultramate |

Pendiente: confirmación de Cortizo para usar sus imágenes (PREGUNTAS_CLIENTE.md).

## Material de otro fabricante de perfiles → descartadas/

La web antigua mezclaba material de OTRO fabricante de perfiles, que no corresponde a
Marchante (solo trabaja con Cortizo). Movido a `descartadas/` y fuera de la web:

| Archivo en descartadas/ | Qué era |
|---|---|
| `colores-foliado-otro-fabricante/` (18 JPG) | Las muestras de foliado que mostraba la web antigua: carta de otro fabricante |
| `perfil-puerta-elevadora-otro-fabricante.png` | Render (323×360) de una puerta elevadora de otro fabricante, sin página en la web |

Ojo: es probable que las 6 fotos de `obras/` procedan también del banco de imágenes de
ese otro fabricante y no de Cortizo (ver PREGUNTAS_CLIENTE.md).

## Material recibido el 25/09/2026 (antigua/WEB-antigua)

Estudio completo en `RECURSOS_NUEVOS.md` (raíz del proyecto).

- **productos/**: los cinco renders de perfil en su tamaño original (1514×1024 y ~90 KB,
  frente a los recortes 1340×701 de 13–21 KB que había). Sustituyen a los `.webp`
  anteriores como `perfil-<sistema>-seccion.jpg`.
- **obras/** (siete fotos de ambiente de Cortizo, misma procedencia que las seis
  anteriores; licencia pendiente igual que aquellas):

| Archivo | Qué muestra | Tamaño | Uso |
|---|---|---|---|
| `salon-ventana-dos-hojas-antracita.jpg` | Salón con ventana de dos hojas en antracita | 1536×1024 | Foto ancha de `/ventanas/a70-abisagrada/` |
| `salon-balconera-nogal-jardin.jpg` | Salón blanco con balconera en nogal abierta al jardín | 1403×1024 | Foto ancha de `/ventanas/a84-abisagrada/` |
| `hormigon-ventana-cuadrada-negra.jpg` | Ventana cuadrada de marco negro en muro de hormigón | 1533×1024 | Foto ancha de `/ventanas/a84-ho-abisagrada/` |
| `interior-corredera-madera-patio.png` | Interior con corredera de madera hacia un patio | 1200×841 | Foto ancha de `/ventanas/c70-corredera/` (máx. 1024) |
| `vivienda-moderna-anochecer-correderas.jpg` | Vivienda moderna al anochecer, grandes correderas | 1535×1024 | Foto ancha de `/ventanas/e170-elevadora/` |
| `dormitorio-ventana-blanca.jpg` | Dormitorio-estudio con ventana blanca (vertical) | 683×1024 | Bloque «Luz y sencillez» de `/acabados/pvc-blanco/` |
| `casa-piedra-balconera-oscura-terraza.jpg` | Casa de piedra con balconera oscura y terraza (vertical) | 683×1024 | Reserva (generada a 640) |

Las portadas de los PDF (`web/img/docs/`) no son imágenes de origen: las genera
`herramientas/portadas.py` a partir de `web/docs/`.

## Uso real en la web (Fase 2)

| Imagen | Páginas |
|---|---|
| `obras/corredera-elevadora-comedor-vistas-valle.jpeg` | Portada (imagen principal), ficha E170, imagen para compartir en redes (`web/img/compartir.jpg`) |
| `obras/vivienda-unifamiliar-…jpeg` | Portada (bloque empresa), `/empresa/`, `/acabados/`, ficha A84 HO |
| `obras/fachada-edificio-…jpeg` | `/profesionales/`, `/empresa/`, `/acabados/pvc-foliado/`, ficha A70 |
| `obras/sala-reuniones-…jpeg` | `/ventanas/`, `/distribuidores/`, ficha A84 |
| `obras/atico-terraza-…jpeg` | Portada (tarjeta vidrios), `/acabados/vidrios/` |
| `obras/nino-junto-a-corredera-…jpeg` | `/profesionales/` (mantenimiento), ficha C70 |
| `obras/…-oscurecida.jpg` | No se usa (se prefiere la versión limpia) |
| `productos/perfil-*-seccion.webp` (5) | Portada, `/ventanas/`, cada ficha, `/acabados/pvc-blanco/` |
| `colores-cortizo/*` (48) | `/acabados/pvc-foliado/` (carta completa), portada, `/acabados/`, fichas y demo del portal |

Las versiones WebP para la web se generan con `herramientas/imagenes.py` en `web/img/`
(fotos a 640/1024/1600 px, renders recortados a cuadrado a 400/700 px, muestras de color a 496×238 px).

## Resumen para el diseño

- **Material aprovechable:** 5 renders de perfil coherentes entre sí + 6 fotos de
  ambiente (5 buenas). Suficiente para portada y páginas de sistema.
- **Tono cromático del material:** blancos, grises antracita, madera clara y verdes
  naturales. Encaja con una paleta sobria (blanco, oscuro `#17262F`, grises) y el rojo
  solo como acento.
- **Carencias:** fábrica/equipo, fotos de detalle (herrajes, manillas, acabados
  foliados instalados), vidrios, instalación/transporte para las guías de
  profesionales, logo vectorial.

