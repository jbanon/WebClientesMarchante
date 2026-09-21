#!/usr/bin/env python3
"""Genera los datos FICTICIOS de la demo del portal (web/area-clientes/datos/*.json).

Cada fichero imita la respuesta de un futuro endpoint de la API del sistema de gestión
de la fábrica (ver web/area-clientes/datos/LEEME.md). Todos los nombres son inventados.
Uso: .venv/bin/python herramientas/datos_demo.py
"""
import json
from pathlib import Path

D = Path(__file__).resolve().parent.parent / "web/area-clientes/datos"
IVA = 0.21


def linea(pos, sistema, desc, apertura, ancho, alto, uds, color_ext, color_int, vidrio, precio):
    return {"posicion": pos, "sistema": sistema, "descripcion": desc, "apertura": apertura, "anchoMm": ancho, "altoMm": alto,
            "unidades": uds, "color": {"exterior": color_ext, "interior": color_int}, "vidrio": vidrio,
            "precioUnitario": precio, "importe": round(precio * uds, 2)}


def totales(lineas, dto=0):
    bruto = round(sum(l["importe"] for l in lineas), 2); d = round(bruto * dto / 100, 2)
    base = round(bruto - d, 2); iva = round(base * IVA, 2)
    return {"bruto": bruto, "descuentoPct": dto, "descuento": d, "baseImponible": base, "ivaPct": 21, "iva": iva, "total": round(base + iva, 2)}


OBRAS = {
    "almendros": {"nombre": "Residencial Los Almendros (obra ficticia)", "localidad": "Villaejemplo"},
    "reforma": {"nombre": "Reforma vivienda C/ Inventada, 12", "localidad": "Pueblo Demo"},
    "nave": {"nombre": "Oficinas Nave Imaginaria", "localidad": "Polígono Ficticio"},
    "atico": {"nombre": "Ático Mirador de Prueba", "localidad": "Villaejemplo"},
    "adosados": {"nombre": "8 adosados Camino del Ejemplo", "localidad": "Aldea Simulada"},
}

L1 = [linea(1, "A84 Abisagrada", "Ventana 2 hojas oscilobatiente", "Oscilobatiente + practicable", 1400, 1200, 6, "Gris Antracita", "Blanco", "4/16/4 bajo emisivo", 412.50),
      linea(2, "A84 Abisagrada", "Balconera 1 hoja oscilobatiente", "Oscilobatiente", 900, 2150, 3, "Gris Antracita", "Blanco", "3+3/14/4 bajo emisivo", 468.00),
      linea(3, "E170 Corredera Elevable", "Corredera elevable 2 hojas", "1 hoja móvil + 1 fijo", 3200, 2300, 1, "Gris Antracita", "Blanco", "4+4/16/6 control solar", 2890.00)]
L2 = [linea(1, "A70 Abisagrada", "Ventana 1 hoja oscilobatiente", "Oscilobatiente", 800, 1100, 4, "Blanco", "Blanco", "4/16/4", 228.00),
      linea(2, "C70 Corredera", "Corredera 2 hojas", "Corredera", 1600, 1200, 2, "Blanco", "Blanco", "4/12/4", 295.00)]
L3 = [linea(1, "A84 Hoja Oculta", "Ventana 2 hojas, hoja oculta", "Oscilobatiente + practicable", 1800, 1400, 10, "Negro Ultramate", "Negro Ultramate", "4/18/4/18/4 bajo emisivo", 698.00),
      linea(2, "A84 Hoja Oculta", "Fijo lateral", "Fijo", 600, 1400, 10, "Negro Ultramate", "Negro Ultramate", "4/18/4/18/4 bajo emisivo", 214.00)]
L4 = [linea(1, "A70 Abisagrada", "Ventana 2 hojas oscilobatiente", "Oscilobatiente + practicable", 1200, 1200, 16, "Roble Dorado", "Blanco", "4/16/4 bajo emisivo", 356.00),
      linea(2, "A70 Abisagrada", "Balconera 2 hojas", "Practicable", 1500, 2100, 8, "Roble Dorado", "Blanco", "3+3/14/4 bajo emisivo", 512.00),
      linea(3, "C70 Corredera", "Corredera 2 hojas cocina", "Corredera", 1400, 1000, 8, "Roble Dorado", "Blanco", "4/12/4", 268.00)]
L5 = [linea(1, "E170 Corredera Elevable", "Corredera elevable 4 hojas", "2 hojas móviles + 2 fijos", 5600, 2400, 1, "Blanco", "Blanco", "4+4/16/6 control solar", 5240.00)]
L6 = [linea(1, "A84 Abisagrada", "Ventana 1 hoja + fijo inferior", "Oscilobatiente", 1000, 1600, 5, "Nogal", "Nogal", "4/16/4 bajo emisivo", 445.00)]


def presupuesto(id_, fecha, valido, estado, obra, ref, lineas, dto, plazo, obs="", pedido=None):
    return {"id": id_, "fecha": fecha, "validoHasta": valido, "estado": estado, "obra": OBRAS[obra], "referenciaCliente": ref,
            "lineas": lineas, "unidades": sum(l["unidades"] for l in lineas), "importes": totales(lineas, dto),
            "plazoEstimadoDias": plazo, "observaciones": obs, "pedidoId": pedido,
            "pdf": "/area-clientes/docs-demo/presupuesto-demo.pdf"}


PRESUPUESTOS = [
    presupuesto("PR-2026-0214", "2026-09-15", "2026-10-15", "pendiente", "adosados", "ADOSADOS-F1", L4, 12, 25, "Precios con vidrio incluido. Transporte a obra incluido."),
    presupuesto("PR-2026-0209", "2026-09-09", "2026-10-09", "pendiente", "atico", "ATICO-MIRADOR", L5, 8, 30, "Requiere medición definitiva en obra antes de fabricar."),
    presupuesto("PR-2026-0198", "2026-08-28", "2026-09-27", "en_revision", "nave", "NAVE-OFIC", L6, 8, 20, "Pendiente de confirmar el color interior."),
    presupuesto("PR-2026-0187", "2026-08-04", "2026-09-03", "aceptado", "almendros", "ALM-BLOQUE-A", L1, 10, 25, pedido="PE-2026-0321"),
    presupuesto("PR-2026-0171", "2026-07-14", "2026-08-13", "aceptado", "nave", "NAVE-FACHADA", L3, 10, 30, pedido="PE-2026-0298"),
    presupuesto("PR-2026-0156", "2026-06-22", "2026-07-22", "aceptado", "reforma", "REF-INV-12", L2, 8, 15, pedido="PE-2026-0274"),
    presupuesto("PR-2026-0139", "2026-06-02", "2026-07-02", "caducado", "reforma", "REF-INV-12-B", L2, 5, 15),
    presupuesto("PR-2026-0102", "2026-04-20", "2026-05-20", "aceptado", "almendros", "ALM-PILOTO", L6, 8, 20, pedido="PE-2026-0203"),
]
PR = {p["id"]: p for p in PRESUPUESTOS}

FASES = ["aceptado", "en_fabricacion", "fabricado", "entregado"]


def pedido(id_, pr, fecha, estado, fechas, prevista, entrega, albaranes=(), facturas=()):
    p = PR[pr]
    return {"id": id_, "presupuestoId": pr, "fechaPedido": fecha, "estado": estado, "obra": p["obra"], "referenciaCliente": p["referenciaCliente"],
            "fases": [{"clave": f, "fecha": fechas[i] if i < len(fechas) else None} for i, f in enumerate(FASES)],
            "fechaPrevistaEntrega": prevista, "entrega": entrega, "unidades": p["unidades"], "importes": p["importes"],
            "lineas": p["lineas"], "albaranIds": list(albaranes), "facturaIds": list(facturas)}


ENT_OBRA = {"tipo": "Entrega en obra", "direccion": "C/ de la Muestra, s/n · Villaejemplo", "contacto": "Encargado Demo · 600 000 001"}
ENT_TALLER = {"tipo": "Entrega en taller del cliente", "direccion": "Pol. Ind. Ficticio, nave 7 · Pueblo Demo", "contacto": "Almacén Demo · 600 000 002"}
PEDIDOS = [
    pedido("PE-2026-0321", "PR-2026-0187", "2026-08-11", "en_fabricacion", ["2026-08-11", "2026-09-08"], "2026-10-02", ENT_OBRA),
    pedido("PE-2026-0298", "PR-2026-0171", "2026-07-20", "fabricado", ["2026-07-20", "2026-08-25", "2026-09-17"], "2026-09-24", ENT_OBRA),
    pedido("PE-2026-0274", "PR-2026-0156", "2026-06-29", "entregado", ["2026-06-29", "2026-07-06", "2026-07-17", "2026-07-21"], "2026-07-22", ENT_TALLER, ["AL-2026-0402"], ["FV-2026-0388"]),
    pedido("PE-2026-0203", "PR-2026-0102", "2026-04-27", "entregado", ["2026-04-27", "2026-05-04", "2026-05-19", "2026-05-22"], "2026-05-25", ENT_TALLER, ["AL-2026-0297"], ["FV-2026-0281"]),
]
PE = {p["id"]: p for p in PEDIDOS}


def factura(id_, fecha, pedido_id, venc, estado):
    i = PE[pedido_id]["importes"]
    return {"id": id_, "fecha": fecha, "pedidoId": pedido_id, "obra": PE[pedido_id]["obra"], "baseImponible": i["baseImponible"], "iva": i["iva"], "total": i["total"],
            "vencimiento": venc, "formaPago": "Transferencia 30 días", "estado": estado, "pdf": "/area-clientes/docs-demo/factura-demo.pdf"}


FACTURAS = [factura("FV-2026-0388", "2026-07-21", "PE-2026-0274", "2026-08-20", "pagada"),
            factura("FV-2026-0281", "2026-05-22", "PE-2026-0203", "2026-06-21", "pagada")]
# Anticipo del pedido en fabricación: factura pendiente (propuesta: mostrar vencimientos)
FACTURAS.insert(0, {"id": "FV-2026-0455", "fecha": "2026-09-08", "pedidoId": "PE-2026-0321", "obra": PE["PE-2026-0321"]["obra"], "concepto": "Anticipo 40 %",
                    "baseImponible": round(PE["PE-2026-0321"]["importes"]["baseImponible"] * .4, 2), "iva": round(PE["PE-2026-0321"]["importes"]["iva"] * .4, 2),
                    "total": round(PE["PE-2026-0321"]["importes"]["total"] * .4, 2), "vencimiento": "2026-10-08", "formaPago": "Transferencia 30 días",
                    "estado": "pendiente", "pdf": "/area-clientes/docs-demo/factura-demo.pdf"})
PE["PE-2026-0321"]["facturaIds"].append("FV-2026-0455")

ALBARANES = [
    {"id": "AL-2026-0402", "fecha": "2026-07-21", "pedidoId": "PE-2026-0274", "obra": PE["PE-2026-0274"]["obra"], "bultos": 3, "unidades": 6, "estado": "entregado", "recibidoPor": "Almacén Demo", "pdf": "/area-clientes/docs-demo/albaran-demo.pdf"},
    {"id": "AL-2026-0297", "fecha": "2026-05-22", "pedidoId": "PE-2026-0203", "obra": PE["PE-2026-0203"]["obra"], "bultos": 2, "unidades": 5, "estado": "entregado", "recibidoPor": "Almacén Demo", "pdf": "/area-clientes/docs-demo/albaran-demo.pdf"},
]

INCIDENCIAS = [
    {"id": "IN-2026-0031", "fechaApertura": "2026-07-24", "pedidoId": "PE-2026-0274", "tipo": "Vidrio", "asunto": "Vidrio rayado en corredera de cocina",
     "descripcion": "Al retirar el film hemos visto un arañazo de unos 10 cm en el vidrio exterior de la corredera (posición 2).", "estado": "en_curso", "fotos": 2,
     "historial": [{"fecha": "2026-07-24", "autor": "Usuario Demo", "texto": "Incidencia abierta desde el portal con 2 fotos."},
                   {"fecha": "2026-07-25", "autor": "Posventa Marchante (ficticio)", "texto": "Recibido. Pedimos el vidrio de reposición al proveedor."},
                   {"fecha": "2026-09-16", "autor": "Posventa Marchante (ficticio)", "texto": "Vidrio recibido en fábrica. Os llamamos para acordar la sustitución."}]},
    {"id": "IN-2026-0019", "fechaApertura": "2026-05-28", "pedidoId": "PE-2026-0203", "tipo": "Herraje", "asunto": "Manilla con holgura en ventana del salón",
     "descripcion": "La manilla de una de las ventanas tiene holgura y no queda firme en posición de cierre.", "estado": "resuelta", "fotos": 1,
     "historial": [{"fecha": "2026-05-28", "autor": "Usuario Demo", "texto": "Incidencia abierta desde el portal."},
                   {"fecha": "2026-05-29", "autor": "Posventa Marchante (ficticio)", "texto": "Enviamos manilla de reposición con el siguiente reparto."},
                   {"fecha": "2026-06-04", "autor": "Posventa Marchante (ficticio)", "texto": "Manilla sustituida. Incidencia resuelta."}]},
]

DOCS = [("ficha_tecnica", "Ficha técnica A70 Abisagrada", "A70", "ficha-tecnica-a70-abisagrada.pdf", 1.5),
        ("ficha_tecnica", "Ficha técnica A84 Abisagrada", "A84", "ficha-tecnica-a84-abisagrada.pdf", 2.5),
        ("ficha_tecnica", "Ficha técnica A84 Hoja Oculta", "A84 Hoja Oculta", "ficha-tecnica-a84-ho.pdf", 1.9),
        ("ficha_tecnica", "Ficha técnica C70 Corredera", "C70", "ficha-tecnica-c70-corredera.pdf", 2.7),
        ("ficha_tecnica", "Ficha técnica E170 Corredera Elevable", "E170", "ficha-tecnica-e170-corredera-elevable.pdf", 2.1),
        ("catalogo", "Paneles de puerta: todos los modelos", None, "pdf-paneles-miniaturas.pdf", 4.4),
        ("catalogo", "Catálogo de accesorios", None, "pdf-accesorios.pdf", 6.8)]
DOCS += [("catalogo", f"Paneles · Colección {n}", None, f, mb) for n, f, mb in [("Avant", "01-avant.pdf", 3.4), ("Lido", "02-lido.pdf", 1.1), ("Natura", "03-natura.pdf", 1.2),
         ("Avplus", "04-avplus.pdf", 1.2), ("Innova", "05-innova.pdf", 0.8), ("Taracea", "06-taracea.pdf", 0.7), ("Básica", "07-basica.pdf", 0.8), ("Rústica", "08-rustica.pdf", 1.8),
         ("Clásica", "09-clasica2.pdf", 1.5), ("Tempo", "10-tempo.pdf", 8.4), ("Ipstamp", "11-ip.pdf", 3.3)]]
DOCUMENTOS = [{"id": f"DOC-{i + 1:03d}", "categoria": c, "titulo": t, "sistema": s, "url": f"/docs/{f}", "pesoMB": mb} for i, (c, t, s, f, mb) in enumerate(DOCS)]
DOCUMENTOS += [{"id": "GUIA-1", "categoria": "guia", "titulo": "Requisitos y técnicas de instalación", "sistema": None, "url": "/profesionales/#instalacion", "pesoMB": None},
               {"id": "GUIA-2", "categoria": "guia", "titulo": "Mantenimiento de ventanas", "sistema": None, "url": "/profesionales/#mantenimiento", "pesoMB": None},
               {"id": "GUIA-3", "categoria": "guia", "titulo": "Almacenaje y transporte", "sistema": None, "url": "/profesionales/#transporte", "pesoMB": None},
               {"id": "GUIA-4", "categoria": "guia", "titulo": "Carta de colores foliados", "sistema": None, "url": "/acabados/pvc-foliado/", "pesoMB": None}]

CLIENTE = {
    "id": 1042, "codigo": "C-01042", "razonSocial": "Carpintería Ejemplo Demo, S.L. (cliente ficticio)", "nif": "B00000000", "tipo": "Instalador / taller",
    "direccionFiscal": {"linea": "Pol. Ind. Ficticio, nave 7", "cp": "00000", "localidad": "Pueblo Demo", "provincia": "Provincia Inventada"},
    "direccionesEntrega": [{"alias": "Taller", "linea": "Pol. Ind. Ficticio, nave 7 · 00000 Pueblo Demo", "horario": "L–V 8:00–14:00"},
                           {"alias": "Obra Los Almendros", "linea": "C/ de la Muestra, s/n · Villaejemplo", "horario": "Avisar 24 h antes"}],
    "usuarios": [{"nombre": "Usuario Demo", "email": "usuario@cliente-demo.example", "rol": "Administrador", "ultimoAcceso": "2026-09-21"},
                 {"nombre": "Oficina Técnica Demo", "email": "tecnica@cliente-demo.example", "rol": "Solo consulta", "ultimoAcceso": "2026-09-18"}],
    "comercial": {"nombre": "Comercial Demo (persona ficticia)", "telefono": "967 095 320", "email": "info@marchantepvc.com"},
    "condiciones": {"formaPago": "Transferencia 30 días", "tarifa": "Profesional", "descuentoHabitualPct": 10},
    "avisos": {"pedidoCambiaDeFase": True, "presupuestoPorCaducar": True, "facturaNueva": True, "incidenciaActualizada": True},
}


def main():
    D.mkdir(parents=True, exist_ok=True)
    for nombre, datos in [("cliente", CLIENTE), ("presupuestos", PRESUPUESTOS), ("pedidos", PEDIDOS), ("facturas", FACTURAS),
                          ("albaranes", ALBARANES), ("incidencias", INCIDENCIAS), ("documentos", DOCUMENTOS)]:
        cuerpo = {"meta": {"demo": True, "aviso": "Datos ficticios", "generado": "2026-09-21"}, "datos": datos}
        (D / f"{nombre}.json").write_text(json.dumps(cuerpo, ensure_ascii=False, indent=1), encoding="utf-8")
    print("datos de la demo generados en", D)


if __name__ == "__main__":
    main()
