# Datos de la demo del área de clientes

**Todo es ficticio.** Los genera `herramientas/datos_demo.py`; no editar a mano.

Cada fichero tiene la forma `{ "meta": {…}, "datos": … }` e imita la respuesta del
endpoint que algún día servirá el sistema de gestión de la fábrica:

| Fichero | Futuro endpoint (propuesta) | Contenido |
|---|---|---|
| `cliente.json` | `GET /api/v1/cliente` | Empresa, direcciones de entrega, usuarios, comercial, condiciones, avisos |
| `presupuestos.json` | `GET /api/v1/presupuestos` · `GET …/{id}` · `POST …/{id}/aceptar` | Cabecera, obra, líneas (sistema, medidas, color Cortizo, vidrio), importes, estado, PDF |
| `pedidos.json` | `GET /api/v1/pedidos` · `GET …/{id}` | Fases con fecha (aceptado, en_fabricacion, fabricado, entregado), fecha prevista, entrega, líneas |
| `facturas.json` | `GET /api/v1/facturas` | Importes, vencimiento, estado de pago, PDF |
| `albaranes.json` | `GET /api/v1/albaranes` | Bultos, unidades, receptor, PDF |
| `incidencias.json` | `GET /api/v1/incidencias` · `POST /api/v1/incidencias` | Tipo, asunto, descripción, fotos, historial |
| `documentos.json` | `GET /api/v1/documentos` | Fichas, catálogos y guías (PDF reales de `/docs/`) |

Convenciones: fechas ISO `AAAA-MM-DD`, importes numéricos en euros, identificadores de
texto (`PR-`, `PE-`, `FV-`, `AL-`, `IN-`), estados como claves en minúsculas (el texto
visible lo pone el portal). En `portal.js`, la capa `api` es la única que conoce el origen
de los datos: para conectar la API real se cambia `API_BASE` y se elimina la capa de sesión.
