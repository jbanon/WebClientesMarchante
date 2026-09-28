# Redirecciones: URL antigua → URL nueva

Todas deben ser redirecciones **301 (permanentes)**. Están escritas para **nginx** en
`despliegue/redirecciones.nginx.conf` (para incluir dentro del bloque `server`; validado
con `nginx -t`) y para Apache en `web/.htaccess`. Hay que mantener los dos a la par con
esta tabla, que es la referencia. Las URLs antiguas funcionan con y sin barra final.

## Páginas

| URL antigua | URL nueva | Notas |
|---|---|---|
| `/` | `/` | Sin cambio |
| `/quienes-somos/` | `/empresa/` | |
| `/contacto/` | `/contacto/` | Sin cambio |
| `/distribuidores/` | `/distribuidores/` | Sin cambio |
| `/services/` | `/ventanas/` | Índice de la plantilla |
| `/services/sistema-a70-abisagrada/` | `/ventanas/a70-abisagrada/` | |
| `/services/sistema-a84-abisagrada/` | `/ventanas/a84-abisagrada/` | |
| `/services/sistema-a84-ho-abisagrada/` | `/ventanas/a84-ho-abisagrada/` | |
| `/services/sistema-c70-corredera/` | `/ventanas/c70-corredera/` | |
| `/services/sistema-e170-elevadora/` | `/ventanas/e170-elevadora/` | |
| `/services/pvc-blanco/` | `/acabados/pvc-blanco/` | |
| `/services/pvc-foliado/` | `/acabados/pvc-foliado/` | |
| `/services/tipo-de-vidrios/` | `/contenido-de-interes/#vidrios` | Fusionada en «Contenido de interés» (antes `/acabados/vidrios/`, que ahora salta a la nueva) |
| `/services/v-vis-v-vinilos-y-vidrios/` | `/contenido-de-interes/#vinilos` | Fusionada (sección `#vinilos`) |
| `/services/requisitos-y-tecnicas-de-instalacion/` | `/profesionales/` | Sección `#instalacion` |
| `/services/mantenimiento-de-ventanas/` | `/profesionales/` | Sección `#mantenimiento` |
| `/services/almacenaje-y-transporte/` | `/profesionales/` | Sección `#transporte` |
| `/aviso-legal/` | `/aviso-legal/` | Sin cambio de URL. Ojo: la antigua mostraba el compromiso de protección de datos, que ahora está en `/proteccion-de-datos/` |
| `/politica-de-privacidad/` | `/privacidad/` | |
| `/politica-de-cookies/` | `/cookies/` | |
| `/compromiso-proteccion-datos-personales/` | `/proteccion-de-datos/` | |
| `/team/` y `/team/*` (5 fichas de demo) | `/empresa/` | Contenido de demostración de la plantilla; también valdría un 410 |

Un servidor no puede redirigir a un ancla (`#…`) según el contenido, pero sí se puede
incluir el ancla en el destino de la regla si se prefiere (p. ej. `/profesionales/#mantenimiento`).

## Documentos PDF

Los PDF estaban en `/wp-content/uploads/AAAA/MM/` y pasan a `/docs/` con el nombre en minúsculas.

| PDF antiguo (en `/wp-content/uploads/AAAA/MM/`) | PDF nuevo |
|---|---|
| `FICHA-TECNICA-A70_ABISAGRADA.pdf` | `/docs/ficha-tecnica-a70-abisagrada.pdf` |
| `FICHA-TECNICA-A84_ABISAGRADA.pdf` | `/docs/ficha-tecnica-a84-abisagrada.pdf` |
| `FICHA-TECNICA-A84_HO.pdf` | `/docs/ficha-tecnica-a84-ho.pdf` |
| `FICHA-TECNICA-C70_CORREDERA.pdf` | `/docs/ficha-tecnica-c70-corredera.pdf` |
| `FICHA-TECNICA-E170_CORREDERA_ELEVABLE.pdf` | `/docs/ficha-tecnica-e170-corredera-elevable.pdf` |
| `01-avant.pdf` … `09-clasica2.pdf`, `11-ip.pdf` | `/docs/` con el mismo nombre |
| `10-TEMPO.pdf` | `/docs/10-tempo.pdf` |
| `PDF-ACCESORIOS.pdf` | `/docs/pdf-accesorios.pdf` |
| `PDF-PANELES-MINIATURAS.pdf` | `/docs/pdf-paneles-miniaturas.pdf` |
| Cualquier otro PDF de `/wp-content/uploads/` | `/ventanas/` |

Los PDF «POSIBILIDADES APERTURA A70/A84/A84 HO/C70/E170» que enlazaba la web antigua no
estaban en la copia; si aparecen, añadirlos a `/docs/` y a cada ficha (ver PREGUNTAS.md).

## Restos de WordPress

| URL antigua | Destino |
|---|---|
| `/wp-admin/`, `/wp-login.php`, `/wp-content/*`, `/wp-includes/*`, `/feed/`, `/comments/` | `/` |
| `/?p=NNN` (enlaces cortos de WordPress) | `/` — son parámetros de consulta: la portada los ignora sin necesidad de regla |

## Página nueva sin equivalente antiguo

- `/ventanas/` (portada de sistemas), `/acabados/` (portada de acabados)
- `/paneles-y-accesorios/` — reúne los catálogos PDF que antes colgaban del menú
