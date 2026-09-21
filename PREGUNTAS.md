# Preguntas, decisiones tomadas y pendientes

Cada punto indica **qué se decidió** para no bloquear el trabajo. Lo marcado con
⚠️ necesita una respuesta o un material por parte del responsable.

## A. Pendiente por parte del responsable (resumen)

| # | Qué falta | Dónde afecta |
|---|---|---|
| 1 | ⚠️ **Servicio del formulario de contacto** | `web/contacto/index.html`, atributo `action` del `<form id="formulario-contacto">` (único sitio) |
| 2 | ⚠️ **Texto del aviso legal** (la web antigua no tenía uno real) | `/aviso-legal/` |
| 3 | ⚠️ **Revisar la política de cookies**: describe un banner y cookies de Google/YouTube que la web nueva ya no usa | `/cookies/` |
| 4 | ⚠️ **Fotos de la fábrica / equipo** | `/empresa/` (marcador visible) |
| 5 | ⚠️ **Foto de ventanas embaladas / transporte** | `/profesionales/` (marcador visible) |
| 6 | ⚠️ Confirmar con Cortizo la **licencia de las fotos de ambiente** | todas las fotos de `obras/` |
| 7 | ⚠️ **Logos vectoriales** (Marchante y partners) | cabecera, pie, franja de marcas |
| 8 | ⚠️ Confirmar los **datos técnicos** marcados en el apartado C (A84 Uw, C70, E170, versión Passivhaus) | fichas |
| 9 | ⚠️ PDFs de **«Posibilidades de apertura»** de cada sistema (no estaban en la copia) | las 5 fichas |
| 10 | ⚠️ Carta de colores: ¿completa de Cortizo o una selección? Permiso de uso de imágenes de Cortizo | `/acabados/pvc-foliado/` |
| 11 | Horario de atención y coordenadas, si se quieren añadir | contacto y datos estructurados |
| 12 | Tipo de servidor del alojamiento (Apache/Nginx) para las redirecciones | `web/.htaccess`, REDIRECCIONES.md |

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
| A84 | **Uw desde** | 0,79 | 0,79 | **1,0** | **1,0 W/m²K** · Cortizo ⚠️ |
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
7. **Vídeos de YouTube** de la portada (fondo y «¿Quiénes somos?»): incrustar YouTube
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
3. **`/acabados/vidrios/`** fusiona «Tipo de vidrios» y «V vis V: vinilos y vidrios».
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
- **WhatsApp**: botón flotante al 623 146 934 (el móvil de contacto.md), en color
  tinta para no competir con el rojo; pasa a verde al pasar el ratón.
- **Facebook**: además de Instagram, se enlaza `facebook.com/marchantepvc` (estaba en la
  web antigua). La web antigua enlazaba también un perfil «Aluminios Marchante»; no se
  ha incluido. ⚠️ Confirmar cuál es el vigente.
- **Mapa**: no se incrusta Google Maps (cookies); hay un enlace «Cómo llegar».
- **Dominio**: canónicas, sitemap y datos estructurados usan `https://marchantepvc.com`.
- Las rutas de CSS, imágenes y enlaces son absolutas desde la raíz (`/css/…`): la web
  debe publicarse en la raíz del dominio (con `python3 -m http.server` funciona igual).

## I. Imágenes

- Renders de perfil muy comprimidos en origen (13–21 KB). ⚠️ Si Cortizo facilita los
  originales, basta sustituirlos en `recursos/imagenes/productos/` y ejecutar
  `herramientas/imagenes.py`.
- No hay fotos de detalle (herrajes, manillas, foliados instalados), de vidrios ni de
  instalación. La web funciona sin ellas, pero mejorarían fichas y guías.
- Los colores foliados en pantalla son orientativos (se avisa en la página).
