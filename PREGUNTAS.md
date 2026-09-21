# Preguntas y decisiones pendientes

## Fase 0 — Inventario de imágenes

1. **Sistema PremiDoor 76 sin página propia.** Existe la imagen
   `productos/perfil-premidoor76-elevadora-seccion.png` (antes `Sistema-PremiDoor76.png`),
   usada en la portada antigua y en la página de vinilos y vidrios, pero el sistema no
   tiene página ni ficha en el mapa del sitio. ¿Se comercializa? ¿Debe tener página en
   `/ventanas/`? La imagen es muy pequeña (323×360); haría falta una mejor.
   *Decisión provisional:* no se usa.
2. **Procedencia y licencia de las fotos de obra.** Las 6 fotos de `obras/` parecen
   imágenes de banco del fabricante de perfiles (arquitectura y paisaje centroeuropeos),
   no obras de Marchante. ¿Hay permiso para usarlas? ¿Existen fotos de obras reales propias?
   *Decisión provisional:* se usan como fotos de ambiente, sin presentarlas como obras propias.
3. **No hay fotos de fábrica, equipo ni instalaciones.** `fabrica/` queda vacía. Para
   `/empresa/` y la portada se pondrán marcadores visibles con la foto necesaria.
4. **Logo.** Solo hay versiones PNG pequeñas (la de texto blanco mide 352×150).
   ¿Existe el logo en vectorial (SVG/AI/PDF)?
5. **Logo de Cortizo** (`otras/logo-cortizo-negro.png`): aparecía junto a las marcas
   colaboradoras pero no estaba en `recursos/marca/partners/`. ¿Sigue siendo
   colaborador y debe mostrarse? Propongo moverlo a `partners/`.
6. **Imágenes que propongo descartar** (restos de la plantilla, ninguna página las
   referencia): `otras/mapamundi-puntos-gris.png`,
   `otras/reunion-equipo-desenfocada-cabecera.jpg` y
   `otras/stock-acereria-fundicion-unsplash.jpg` (stock de Unsplash, una acería).
   *Decisión provisional:* no se usan.
7. **Renders de perfiles muy comprimidos** (13–21 KB a 1340 px). ¿Se pueden conseguir
   los originales en alta resolución?
