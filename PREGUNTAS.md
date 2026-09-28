# Preguntas, decisiones tomadas y pendientes (documento INTERNO)

> Las preguntas que debe responder el cliente están, en lenguaje sencillo, en
> `PREGUNTAS_CLIENTE.md`. Aquí quedan las notas técnicas y las decisiones tomadas.

Cada punto indica **qué se decidió** para no bloquear el trabajo. Lo marcado con
⚠️ necesita una respuesta o un material por parte del responsable.

## A. Pendiente por parte del responsable (resumen)

| # | Qué falta | Dónde afecta |
|---|---|---|
| 1 | ⚠️ **Servicio del formulario de contacto** | `web/contacto/index.html`, atributo `action` del `<form id="formulario-contacto">` (único sitio) |
| 2 | ⚠️ **Texto del aviso legal** (la web antigua no tenía uno real) | `/aviso-legal/` |
| 3 | ⚠️ **Cookies**: desde el 25/09/2026 la portada vuelve a incrustar el vídeo de YouTube (decisión del cliente: replicar la web anterior), así que las cookies de Google/YouTube que describe la política SÍ se instalan. Hace falta un **aviso/banner de cookies** (la web no lo tiene) y que la asesoría revise el texto | `/` y `/cookies/` |
| 4 | ⚠️ **Fotos de la fábrica / equipo** | `/empresa/` (marcador visible) |
| 5 | ⚠️ **Foto de ventanas embaladas / transporte** | `/profesionales/` (marcador visible) |
| 6 | ⚠️ Confirmar con Cortizo la **licencia de las fotos de ambiente** | todas las fotos de `obras/` |
| 7 | ⚠️ **Logos vectoriales** (Marchante y partners) | cabecera, pie, franja de marcas |
| 8 | ⚠️ Confirmar los **datos técnicos** marcados en el apartado C (A84 Uw, C70, E170, versión Passivhaus) | fichas |
| 9 | ✅ PDFs de **«Posibilidades de apertura»**: recibidos el 25/09/2026 y publicados en las 5 fichas y en `/documentacion/` | las 5 fichas |
| 10 | ✅ Carta de colores: las cartas oficiales en PDF recibidas el 25/09/2026 contienen exactamente los 40 colores de la web (3+2 estándar, 35 especiales). Pendiente solo el permiso de uso (3.4 del cliente) | `/acabados/pvc-foliado/` |
| 11 | Horario de atención y coordenadas, si se quieren añadir | contacto y datos estructurados |
| 12 | ⚠️ Incluir `despliegue/redirecciones.nginx.conf` en el bloque server de nginx (requiere root) | servidor |
| 13 | ⚠️ `sudo .venv/bin/playwright install-deps webkit` para poder probar con WebKit (Safari) | revisión móvil |
| 14 | Validar con el cliente la demo del portal y sus propuestas (apartado J) | `/area-clientes/` |

## B. Decisiones del responsable ya aplicadas

- **Cortizo** es el proveedor de perfiles y los cinco sistemas son suyos: añadido a
  partners (primer logo de la franja de marcas) y mencionado en portada, fichas,
  empresa y distribuidores. No se ha añadido ningún dato sobre Cortizo que no estuviera
  en los textos o fichas.
- **Fotos de obra**: se usan de forma provisional como fotos de ambiente, sin
  presentarlas como obras propias. Licencia por confirmar con Cortizo (⚠️ 6).
- **Logos**: se usan los PNG. El de Marchante mide 352×149 px: se ve correcto al
  tamaño de cabecera, pero no da para más. Pendiente el vectorial (⚠️ 7).
- **Descartadas**: mapamundi, foto de reunión y foto de la acería (Unsplash), movidas a
  `recursos/imagenes/descartadas/`. No hay ninguna imagen de stock en la web.
- **Puerta elevadora de otro fabricante** (imagen suelta de la web antigua): fuera de
  la web; la imagen está en `recursos/imagenes/descartadas/`.
- **Imagen principal de portada**: `obras/corredera-elevadora-comedor-vistas-valle.jpeg`.

## C. Datos técnicos: fuente elegida para cada dato

Regla (permanente, en CLAUDE.md): ante una contradicción manda la **web oficial de
Cortizo** (páginas enlazadas en `referencia/cortizo.md`, consultadas el 21/09/2026). De
Cortizo solo se toman datos; los textos son de redacción propia.

| Sistema | Dato | Web antigua Marchante | Ficha PDF | Web oficial Cortizo | **Publicado** |
|---|---|---|---|---|---|
| A70 | Acristalamiento máx. | 42 mm | 40 mm | 42 mm (mín. 4) | **42 mm** · Cortizo |
| A70 | Aperturas | sin «plegable» | con «plegable» | — | **sin «plegable»** · web antigua |
| A70 | Uw / Rw / aire / agua / viento | 0,9 · 46 dB · 4 · E1800 · C5 | igual | igual | sin cambios |
| A84 | **Uw desde** | 0,79 | 0,79 | **1,0** | **1,0 W/m²K** · Cortizo ⚠️ (el folleto de calidad de nov. 2024 también dice 0,79; la web oficial, consultada de nuevo el 25/09/2026, sigue en 1,0) |
| A84 | Acristalamiento | 54 mm | 54 mm | 24–54 mm | **24–54 mm** |
| A84 | Rw / aire / agua / viento | 46 dB · 4 · E1500 · C5 | igual | igual | sin cambios |
| A84 Hoja Oculta | Uw desde | 0,71 / 0,74 (y «1.0») | 0,71 / 0,74 | **0,74** | **0,74 W/m²K** · Cortizo |
| A84 Hoja Oculta | Estanqueidad | E1650 y E2250 | E1650 | **Clase 2250** | **E2250** · Cortizo |
| A84 Hoja Oculta | Acústica | 50 dB y 46 dB | 50 dB | **Rw hasta 46 dB** | **46 dB** · Cortizo |
| A84 Hoja Oculta | Acristalamiento | — | — | 32–46,5 mm | **32–46,5 mm** · Cortizo |
| C70 | Acristalamiento máx. | 24 mm | 24 mm | **28 mm** (mín. 4) | **28 mm** · Cortizo ⚠️ |
| C70 | Uw / Rw / aire / agua / viento | 1,3 · 38 dB · 4 · 7A · C5 | igual | igual | sin cambios |
| E170 | Medida máx. de hoja | 3 × 2,75 m | 3 × 2,75 m | L 3300 · H 2800 mm (dimensiones máx.) | **3 × 2,75 m** · web antigua ⚠️ |
| E170 | Uw / Rw / aire / agua / peso | 0,9 · 42 dB · 4 · 7A · 300 kg | igual | igual (acrist. 18–40 mm) | sin cambios |

Notas:
- ⚠️ **A84, Uw**: la ficha PDF que se descarga desde la propia página sigue diciendo 0,79.
  Se publica el valor actual de Cortizo (1,0), que es el prudente. Convendría pedir a
  Cortizo la ficha actualizada. Va a PREGUNTAS_CLIENTE.md.
- ⚠️ **C70** (28 mm) y **E170** (la cifra de Cortizo no está claro que se refiera a la
  hoja, así que se mantiene la de Marchante): a confirmar.
- **A84 Hoja Oculta / Passivhaus**: el texto antiguo de Marchante describía dos
  versiones. En Cortizo, «A 84 Hoja Oculta Passivhaus» es un sistema aparte que no está
  en la web de Marchante. La ficha se centra ahora en la A 84 Hoja Oculta (datos
  oficiales) y deja una nota breve sobre la versión Passivhaus (Uw 0,71, dato del texto
  y la ficha de Marchante) con «consúltanos disponibilidad». A confirmar con el cliente.
- Las cifras destacadas de la portada pasan a: Uw desde 0,74 (A 84 Hoja Oculta), hasta
  46 dB, Clase 4 y C5.
- Denominación: se usa «A84 Hoja Oculta» y «E170 Corredera Elevable» en títulos, menú y
  formulario; en cada ficha el sobretítulo lleva el nombre Cortizo («Cortizo PVC® ·
  A 84 Hoja Oculta»). Las URLs no cambian (`/ventanas/a84-ho-abisagrada/`,
  `/ventanas/e170-elevadora/`).
- Añadida a cada ficha la fila «Acristalamiento (mín.–máx.)» con el dato de Cortizo. No
  se han añadido pesos ni dimensiones de hoja de Cortizo (dependen de tipología).

### Carta de colores
- La web antigua mostraba 18 colores de la carta de **otro fabricante de perfiles**.
  Retirados (a `descartadas/`). Ahora: carta oficial de Cortizo, 48 muestras en 4
  familias, descargadas a `recursos/imagenes/colores-cortizo/` y servidas en local.
- «Turner Oak Toffee»: se usa la grafía de `referencia/cortizo.md`.
- Explicación de «1 cara / 2 caras» redactada por nosotros (acabado en una cara del
  perfil y la otra en blanco / mismo acabado en ambas). A confirmar qué cara.
- Referencias al otro fabricante eliminadas de web/, documentos y herramientas
  (`herramientas/comprobar_nombres.sh` lo verifica). En `contenido/paginas/` se han
  sustituido por notas. Quedan, inevitablemente, en `antigua/` (solo lectura) y en el
  historial de git anterior a este cambio.
- ⚠️ El producto de limpieza «PREVent» aparece en el texto de mantenimiento de la web
  antigua atribuido a Cortizo PVC®. No lo he podido verificar en la web de Cortizo.
  Se mantiene tal cual; a confirmar con el cliente.
- ⚠️ Las 6 fotos de ambiente probablemente proceden del banco de imágenes de ese otro
  fabricante, no de Cortizo: la licencia no la puede dar Cortizo.

## D. Contenido de la web antigua que NO se ha trasladado (y por qué)

1. **Barras de porcentaje** de «Quiénes somos» (Calidad de servicio 98 %, Materiales
   94 %, Profesionalidad 100 %): relleno de la plantilla, cifras sin base.
2. **«Más de 13 años en el sector» / «más de 10 años»**: cifras que caducan y se
   contradicen. Se usa «Desde 2010», que es el dato estable.
3. **Cronología 2023**: el original decía «liderando la sostenibilidad con prácticas y
   certificaciones medioambientales». No consta ninguna certificación concreta, así que
   se ha dejado en «con la sostenibilidad como prioridad». ⚠️ Si existen
   certificaciones, indicadlas y se añaden.
4. **Tercera opinión de Google** (J. Carlos Ramírez): es un texto tipo ficha de
   directorio («El taller de aluminios no está mal en líneas generales…»), no aporta.
   Se mantienen las otras dos, literales. ⚠️ Conviene comprobar que siguen publicadas
   en Google y, si hay más recientes, sustituirlas.
5. **Contador «+0 Clientes satisfechos»** de distribuidores: venía vacío.
6. **Bloque «Sistemas practicables / deslizantes / de persiana / Puertas de entrada /
   Curiosidades / Vídeos informativos»** de la portada: eran títulos sin contenido
   (uno, «Gas and oil industry», resto de la plantilla).
7. ~~**Vídeos de YouTube**~~ (25/09/2026: el cliente pidió replicar la web anterior; el vídeo
   `tyro2m9wbl0` vuelve a estar de fondo en el héroe de la portada, vía `youtube-nocookie.com`,
   en bucle completo, silenciado y sin subtítulos, con los textos, botones y teléfono encima;
   la foto del comedor queda como imagen de reserva y con «reducir movimiento»). Texto original:
   incrustar YouTube
   instala cookies de terceros y obligaría a un banner de consentimiento. ⚠️ Si se
   quieren recuperar, propongo un enlace o una miniatura que cargue el vídeo solo al
   pulsar (`youtube-nocookie`).
8. **Equipo** («Creative team», John Maxwell, etc.): demo de la plantilla.
9. **Frases de relleno** en fichas («Awesome services», etc.).

## E. Estructura: cambios respecto al mapa del sitio

1. **Página nueva `/paneles-y-accesorios/`**: el menú antiguo enlazaba 13 PDF
   (11 colecciones de paneles de puerta de Indupanel, el catálogo de miniaturas y el
   de accesorios). No encajaban en ninguna página del mapa, así que tienen página
   propia, enlazada desde el menú «Ventanas», la portada de sistemas y el pie.
   ⚠️ No hay ningún texto sobre puertas/paneles: la página solo presenta los catálogos.
2. **`/profesionales/`** reúne las tres guías en una sola página con índice y anclas
   (`#instalacion`, `#mantenimiento`, `#transporte`) y enlaza a vidrios. Los textos son
   cortos y no justificaban tres subpáginas.
3. **Página nueva `/documentacion/`** (25/09/2026): reúne los 5 PDF de fichas técnicas,
   los 5 de configuraciones y aperturas, las 2 cartas de foliados y el folleto de calidad,
   y enlaza a `/paneles-y-accesorios/`. Entra por el submenú «Ventanas», el pie y el
   botón de `/profesionales/`. Componente nuevo `.documento` (tarjeta con portada del
   PDF, generada con `herramientas/portadas.py`); el esquema «Formulación» del folleto
   se descartó porque a 390 px no se lee. Detalle en `RECURSOS_NUEVOS.md`.
4. **Vídeos de sistema** (27/09/2026): el canal de YouTube de Marchante tiene un vídeo por
   sistema. En las fichas A70, A84, A84 HO y C70 el bloque de foto de ambiente se ha
   sustituido por un bloque «Vídeo · m:ss» (`.video`): portada servida en local con botón
   de reproducir; YouTube (`youtube-nocookie`) solo se carga al pulsar (`sitio.js`). La
   cabecera de cada ficha enlaza al bloque. Portadas: fotograma del vídeo (A84, A84 HO,
   C70) y foto de ambiente (A70, porque el fotograma era un render con texto).
   ⚠️ E170: hay vídeo en el canal pero no se ha recibido el enlace; conserva la foto.
   ⚠️ A78: hay vídeo, pero el sistema no está en la web (PREGUNTAS_CLIENTE 4.2).
   Las fotos de ambiente de A84, A84 HO y C70 quedan sin uso (reserva).
5. **Menú reorganizado (28/09/2026, a petición del responsable):** «Sistemas PVC Cortizo»
   (`/ventanas/`, sin cambiar URL) · «Acabados» (PVC blanco, PVC foliado, Paneles y
   accesorios) · «Guías técnicas» (`/profesionales/`, con anclas y Documentación técnica) ·
   «Contenido de interés» (página nueva `/contenido-de-interes/`: `/lo-sabias/` nueva,
   «El rincón del distribuidor» = `/distribuidores/`, Vidrios = `/acabados/vidrios/` y los
   vídeos de los sistemas) · Empresa · Contacto. Ninguna URL cambia. `/lo-sabias/` son
   ocho curiosidades redactadas solo con datos ya publicados (folleto de calidad, fichas y
   guías); el cliente debe validarlas. `/paneles-y-accesorios/` tiene ahora un texto sobre
   la puerta de entrada (datos del catálogo de Indupanel: núcleos Thermipanel/Thermiplus/
   Thermimax, caras de aluminio lacado/anodizado/RAL, vitrorresina e inox).
   Menú de escritorio compactado entre 68 y 80 em (seis entradas largas en una línea;
   «Área clientes» solo icono; teléfono visible desde 96 em).
6. **`/acabados/vidrios/`** fusiona «Tipo de vidrios» y «V vis V: vinilos y vidrios».
   El apartado «Rotura en vidrio por vinilo» de la web antigua repetía un párrafo del
   de estrés térmico; se ha dejado una sola vez.
4. **`/aviso-legal/`** ⚠️: en la web antigua esa URL mostraba en realidad el
   «Compromiso de protección de datos» (versión a nombre de MARCHANTE SISTEMAS DE
   VENTANAS, S.L.). No existía un aviso legal. *Decidido:* `/aviso-legal/` muestra los
   datos identificativos del titular (razón social, NIF, domicilio, teléfono, email:
   todos sacados de la política de privacidad) y un aviso visible de «texto
   pendiente»; el compromiso va en `/proteccion-de-datos/`.
5. **`/proteccion-de-datos/`**: había dos versiones del compromiso; la de
   `/compromiso-proteccion-datos-personales/` está a nombre de una persona física
   (versión anterior). *Decidido:* se publica la versión a nombre de la S.L., que es
   coherente con privacidad y cookies. ⚠️ Confirmar.
6. **Página 404** (`web/404.html`) y `web/.htaccess` con las redirecciones: añadidos.

## F. Legales

- Privacidad, cookies y protección de datos están **copiados literalmente**; solo se
  ha dado formato (títulos, listas, tabla).
- ⚠️ La **política de cookies** habla de un panel de configuración, botones
  ACEPTAR/RECHAZAR y cookies de Google/YouTube. La web nueva **no instala ninguna
  cookie** ni hace peticiones a terceros (comprobado: 0 peticiones externas; fuentes
  en local; sin analítica, sin mapas ni vídeos incrustados). Por eso no lleva banner.
  El texto debería actualizarlo la asesoría. Si se añade analítica o YouTube, hará
  falta banner de consentimiento.
- En la política de cookies se han perdido en la extracción los enlaces a las
  instrucciones de cada navegador (quedan los nombres sin enlace).
- El email de la política de privacidad es `administracion@marchantepvc.com`; el de
  contacto comercial, `info@marchantepvc.com`. Se han respetado ambos.

## G. Formulario de contacto ⚠️

- Servicio por decidir. El `action` está en **un único sitio**:
  `web/contacto/index.html` → `<form id="formulario-contacto" action="…">`, con un
  comentario HTML justo encima.
- *Provisional:* mientras el `action` contenga la palabra `PENDIENTE`, un pequeño
  script intercepta el envío y abre el programa de correo del visitante con la
  solicitud ya redactada a `info@marchantepvc.com`. Al poner el `action` real deja de
  actuar solo.
- Campos: perfil (particular / profesional / distribuidor), nombre, empresa, email,
  teléfono, localidad, sistema, mensaje, aceptación de privacidad y un campo trampa
  antispam (`web`, oculto). Los botones «Pedir presupuesto» de cada ficha preseleccionan
  el sistema (`/contacto/?sistema=…`), y los de profesionales/distribuidores, el perfil.
- Opciones razonables para una web estática: un script PHP propio en el alojamiento,
  o un servicio europeo de formularios. Evitar servicios que obliguen a cookies.

## H. Diseño: decisiones

- **Tipografías**: Instrument Serif (titulares) + Instrument Sans (texto), ambas con
  licencia OFL y servidas desde `web/fonts/` (sin Google Fonts).
- **Rojo**: el corporativo `#EC1C24` se usa solo en filetes y detalles. Para botones y
  enlaces se usa `#C9121A`, porque el corporativo no alcanza contraste AA con texto
  blanco (4,4:1). ⚠️ Confirmar el rojo exacto cuando llegue el logo vectorial.
- **WhatsApp**: en móvil y tableta (< 1280 px) NO hay botón flotante, porque cualquier
  botón flotante acaba tapando contenido: hay una **barra de contacto inferior** fija
  (Llamar · WhatsApp · Presupuesto) y la página reserva su altura. En escritorio ancho
  el botón de WhatsApp (623 146 934) vive en el margen derecho, fuera de la columna de
  contenido. La barra se oculta con el menú móvil abierto.
- **Facebook**: además de Instagram, se enlaza `facebook.com/marchantepvc` (estaba en la
  web antigua). La web antigua enlazaba también un perfil «Aluminios Marchante»; no se
  ha incluido. ⚠️ Confirmar cuál es el vigente.
- **Mapa**: no se incrusta Google Maps (cookies); hay un enlace «Cómo llegar».
- **Dominio**: canónicas, sitemap y datos estructurados usan `https://marchantepvc.com`.
- Las rutas de CSS, imágenes y enlaces son absolutas desde la raíz (`/css/…`): la web
  debe publicarse en la raíz del dominio (con `python3 -m http.server` funciona igual).

## I. Imágenes

- ✅ Renders de perfil: el 25/09/2026 llegaron los originales (1514×1024, ~90 KB) y
  sustituyen a los recortes comprimidos de 1340×701. Están en
  `recursos/imagenes/productos/perfil-*-seccion.jpg`; `imagenes.py` recorta el cuadrado
  centrado sin desplazamiento.
- ✅ Fotos de ambiente por sistema (7 de Cortizo, 25/09/2026): cada ficha tiene ya su
  foto ancha propia y PVC blanco un bloque con foto. Asignación por lo que se ve en cada
  foto; pendiente de confirmar por el cliente (PREGUNTAS_CLIENTE 3.7).
- No hay fotos de detalle (herrajes, manillas, foliados instalados), de vidrios ni de
  instalación. La web funciona sin ellas, pero mejorarían fichas y guías.
- Los colores foliados en pantalla son orientativos (se avisa en la página).

## J. Demo del área de clientes (`/area-clientes/`)

Decisiones (todo a validar con el cliente; ver PREGUNTAS_CLIENTE.md, tema 5):
- **Qué es**: maqueta estática. Login simulado (cualquier usuario/contraseña), franja
  «Demo · Datos ficticios» fija en todas las pantallas, `noindex, nofollow` en todas sus
  páginas y fuera del sitemap. No se bloquea en robots.txt a propósito: si se bloquea,
  los buscadores no llegan a leer el `noindex`.
- **Pantallas**: acceso, inicio (resumen + pedidos en curso + presupuestos por aceptar),
  presupuestos (listado con filtros, detalle con partidas, PDF y botón de aceptar),
  pedidos (listado y detalle con seguimiento por 4 fases y fecha prevista), facturas y
  albaranes, incidencias (listado, detalle con historial, alta con fotos), documentación
  técnica (PDF reales de `web/docs/` + guías de la web) y datos de la cuenta.
- **Propuestas propias** (marcadas en pantalla con la etiqueta «Propuesta»): avisos por
  correo configurables, vencimientos y descarga múltiple de facturas, marcado CE y
  declaración de prestaciones por pedido, alta de direcciones de obra, varios usuarios
  con permisos, comercial asignado, documentación reservada, confirmación de dirección
  al aceptar. También son propuesta: la factura de anticipo del 40 %, los tipos de
  incidencia y las condiciones comerciales visibles.
- **Datos**: `web/area-clientes/datos/*.json`, generados por `herramientas/datos_demo.py`
  con forma de respuesta de API (`{meta, datos}`), documentados en `datos/LEEME.md` con
  el endpoint futuro de cada uno. En `portal.js` solo la capa `api` conoce el origen de
  los datos; los cambios de la demo (aceptar, nueva incidencia) viven en sessionStorage
  y se pierden al cerrar la pestaña. Fecha «de hoy» de la demo fija: 21/09/2026.
- **Nombres**: todos inventados y con marca de ficticio (Carpintería Ejemplo Demo, S.L.,
  Villaejemplo, Residencial Los Almendros (obra ficticia)…). NIF B00000000, IBAN de
  ceros, correos `@cliente-demo.example`. El teléfono y correo del «comercial» son los
  generales de Marchante.
- **Colores** de presupuestos y pedidos: de la carta Cortizo (Blanco, Gris Antracita,
  Roble Dorado, Nogal, Negro Ultramate), con su muestra.
- **PDF de muestra** (`docs-demo/`): presupuesto, factura y albarán ficticios generados
  con `herramientas/pdf_demo.py`, con banda «Documento de muestra · Sin validez». Todos
  los presupuestos/facturas de la demo descargan el mismo PDF de muestra.
- **Móvil**: navegación inferior fija de 5 secciones (al alcance del pulgar); Documentación
  y Cuenta quedan en la cabecera y el pie. En la web pública esa posición la ocupa la
  barra de contacto; en el portal no hay barra de contacto.
- **Base de referencia externa**: consultada solo para la estructura general (resumen,
  pedidos con progreso por fases, presupuesto pendiente, documentos). No se ha tomado
  ningún texto, dato, color ni recurso. Descartado por no encajar: catálogo por familias
  de producto y novedades comerciales. `herramientas/comprobar_nombres.sh` se ejecuta
  antes de cada commit.
- El marco del portal (cabecera, navegación, pie) lo pinta `portal.js`; por eso
  `herramientas/comunes.py` ignora `web/area-clientes/`.

## K. Servidor y publicación

- Publicación: `herramientas/publicar.sh` (rsync a `/var/www/clientesmarchante/`, excluye
  `.htaccess`). URL: https://clientesmarchante.winsoft.es
- ⏸️ **Web de pruebas PARADA desde el 25/09/2026, hasta nuevo aviso del responsable.** En
  `/var/www/clientesmarchante/` solo hay una página «Web en preparación» (`noindex`,
  `robots.txt` con `Disallow: /`); el resto de rutas devuelven 404. Para volver a
  publicarla basta ejecutar `herramientas/publicar.sh` (repone todo el contenido de `web/`).
- ⚠️ **Por instalar (root)**: las redirecciones. Añadir dentro del bloque `server { … }`:
  `include /home/dev/proyectos/GestionMarchante/webClientes/despliegue/redirecciones.nginx.conf;`
  (o copiar el fichero a `/etc/nginx/snippets/`), luego `sudo nginx -t && sudo systemctl
  reload nginx`. El fichero incluye también `error_page 404 /404.html;` y cabeceras de
  caché. Validado con `nginx -t` y con peticiones reales en un nginx temporal local.
  Si el bloque server ya define `error_page 404` o `location` iguales, quitar los duplicados.
- Mientras el sitio esté en un dominio de pruebas conviene que no lo indexe Google: ahora
  mismo la web pública es indexable y sus canónicas apuntan a `marchantepvc.com`.
  Propuesta: añadir en nginx `add_header X-Robots-Tag "noindex" always;` hasta el lanzamiento.
- ⚠️ **WebKit**: descargado, pero faltan librerías del sistema (libgtk-4, gstreamer…).
  Hace falta `sudo .venv/bin/playwright install-deps webkit`. Después:
  `.venv/bin/python herramientas/movil.py --motor webkit`. Hasta entonces la auditoría
  móvil se ha pasado solo con Chromium (emulación táctil).
