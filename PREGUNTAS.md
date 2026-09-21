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
| 8 | ⚠️ Confirmar 4 **datos técnicos contradictorios** entre la web antigua y las fichas PDF (apartado C) | fichas A70 y A84 HO |
| 9 | ⚠️ PDFs de **«Posibilidades de apertura»** de cada sistema (no estaban en la copia) | las 5 fichas |
| 10 | ⚠️ PDFs de **cartas de colores foliados** estándar y especial (no estaban en la copia) | `/acabados/pvc-foliado/` |
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
- **PremiDoor 76**: fuera de la web. La imagen sigue en
  `recursos/imagenes/productos/perfil-premidoor76-elevadora-seccion.png` por si en el
  futuro se añade el sistema (haría falta texto, ficha y una imagen mayor que 323×360).
- **Imagen principal de portada**: `obras/corredera-elevadora-comedor-vistas-valle.jpeg`.

## C. Datos técnicos: contradicciones encontradas ⚠️

Regla aplicada: no inventar. Cuando el texto de la web antigua y la ficha PDF no
coinciden se ha elegido una fuente y se anota aquí para confirmar.

1. **A70 · acristalamiento máximo**: la web antigua dice **42 mm**; la ficha PDF dice
   **40 mm**. *Decidido:* 42 mm (texto de la web, que es el contenido a mantener).
2. **A70 · aperturas**: la web dice «practicable, oscilo-batiente, oscilo-paralela y
   abatible»; la ficha PDF menciona también «plegable». *Decidido:* texto de la web.
3. **A84 HO · estanqueidad**: en la web antigua el párrafo dice **E1650** y la tabla
   **E2250**; la ficha PDF dice **E1650**. *Decidido:* E1650.
4. **A84 HO · acústica y transmitancia**: la web mezcla «hasta 50 dB» con «Rw hasta
   46 dB», y «transmitancia desde 1.0» con 0,71/0,74. *Decidido:* hasta 50 dB (ficha
   PDF) y Uw 0,71 (HO Passivhaus) / 0,74 (HO); se ha omitido la cifra «1.0», que
   contradice al resto. En el párrafo de estanqueidad la fuente tenía el caudal de agua
   en blanco («…»), así que no se indica.
5. **A84 HO · acristalamiento máximo**: no figura en ninguna fuente; en la tabla
   comparativa aparece «—».
6. **Portada · cifras destacadas** (Uw 0,71 · 50 dB · Clase 4 · C5): son los mejores
   valores de la gama, tomados del A84 HO, con nota aclaratoria debajo.
7. **Códigos de color foliado**: el texto dice «US-Negro ulti-mate» y «WS-Blanco
   efecto madera»; los archivos de imagen se llaman «UD-NEGRO» y «WX-BLANCO».
   *Decidido:* códigos del texto (US y WS). Confirmar con la carta de Cortizo.

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
