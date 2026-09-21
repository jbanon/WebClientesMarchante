/* ==========================================================================
   Marchante PVC — DEMO del área de clientes (datos ficticios, sin servidor).

   Estructura pensada para el día en que los datos vengan del sistema de gestión
   de la fábrica a través de una API:
     · `api` es la única capa que sabe de dónde salen los datos. Hoy lee los JSON
       de /area-clientes/datos/ (con la misma forma que tendría la respuesta de
       cada endpoint) y guarda los cambios de la demo en sessionStorage.
       Mañana basta con cambiar API_BASE y quitar la capa de sesión.
     · Las pantallas solo llaman a `api.*` y pintan.
   ========================================================================== */
(function () {
  'use strict';

  var BASE = '/area-clientes/';
  var API_BASE = BASE + 'datos/';            // futuro: '/api/v1/'
  var CLAVE_SESION = 'mpvc-demo-sesion';
  var CLAVE_CAMBIOS = 'mpvc-demo-cambios';

  /* ---------------- almacenamiento tolerante (modo privado, etc.) ---------------- */
  var memoria = {};
  function leer(k) { try { return sessionStorage.getItem(k) || localStorage.getItem(k); } catch (e) { return memoria[k] || null; } }
  function guardar(k, v) { memoria[k] = v; try { sessionStorage.setItem(k, v); } catch (e) { /* sin almacenamiento */ } }
  function borrar(k) { delete memoria[k]; try { sessionStorage.removeItem(k); localStorage.removeItem(k); } catch (e) { /* nada */ } }
  function cambios() { try { return JSON.parse(leer(CLAVE_CAMBIOS) || '{}'); } catch (e) { return {}; } }
  function guardarCambios(c) { guardar(CLAVE_CAMBIOS, JSON.stringify(c)); }

  /* ---------------- capa de datos (futura API) ---------------- */
  var cache = {};
  function pedir(recurso) {
    if (!cache[recurso]) {
      cache[recurso] = fetch(API_BASE + recurso + '.json').then(function (r) {
        if (!r.ok) throw new Error('No se pudo cargar ' + recurso);
        return r.json();
      }).then(function (j) { return j.datos; });
    }
    return cache[recurso];
  }
  var api = {
    cliente: function () { return pedir('cliente'); },
    presupuestos: function () {
      return pedir('presupuestos').then(function (l) {
        var c = cambios().presupuestos || {};
        return l.map(function (p) { return c[p.id] ? Object.assign({}, p, c[p.id]) : p; });
      });
    },
    presupuesto: function (id) { return api.presupuestos().then(function (l) { return l.filter(function (p) { return p.id === id; })[0]; }); },
    aceptarPresupuesto: function (id) {           // futuro: POST /presupuestos/{id}/aceptar
      var c = cambios(); c.presupuestos = c.presupuestos || {};
      c.presupuestos[id] = { estado: 'aceptado', aceptadoEnDemo: true }; guardarCambios(c);
      return Promise.resolve(true);
    },
    pedidos: function () { return pedir('pedidos'); },
    pedido: function (id) { return pedir('pedidos').then(function (l) { return l.filter(function (p) { return p.id === id; })[0]; }); },
    facturas: function () { return pedir('facturas'); },
    albaranes: function () { return pedir('albaranes'); },
    incidencias: function () {
      return pedir('incidencias').then(function (l) { return (cambios().incidencias || []).concat(l); });
    },
    incidencia: function (id) { return api.incidencias().then(function (l) { return l.filter(function (i) { return i.id === id; })[0]; }); },
    crearIncidencia: function (d) {               // futuro: POST /incidencias (multipart con las fotos)
      var c = cambios(); c.incidencias = c.incidencias || [];
      var n = { id: 'IN-2026-' + ('00' + (32 + c.incidencias.length)).slice(-4), fechaApertura: hoy(), pedidoId: d.pedidoId, tipo: d.tipo, asunto: d.asunto,
        descripcion: d.descripcion, estado: 'abierta', fotos: d.fotos, creadaEnDemo: true,
        historial: [{ fecha: hoy(), autor: 'Usuario Demo', texto: 'Incidencia abierta desde el portal' + (d.fotos ? ' con ' + d.fotos + ' foto(s).' : '.') }] };
      c.incidencias.unshift(n); guardarCambios(c); return Promise.resolve(n);
    },
    documentos: function () { return pedir('documentos'); }
  };

  /* ---------------- utilidades ---------------- */
  function hoy() { return '2026-09-21'; }          // fecha fija de la demo, coherente con los datos
  function esc(t) { return String(t == null ? '' : t).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function fecha(iso) { if (!iso) return '—'; var p = iso.split('-'); return p[2] + '/' + p[1] + '/' + p[0]; }
  var MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  function fechaCorta(iso) { if (!iso) return ''; var p = iso.split('-'); return parseInt(p[2], 10) + ' ' + MESES[parseInt(p[1], 10) - 1]; }
  function euros(n) {                               // 12.709,45 € (es-ES no agrupa los millares de 4 cifras: se hace a mano)
    var p = Number(n).toFixed(2).split('.');
    return p[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ',' + p[1] + ' €';
  }
  function param(n) { return new URLSearchParams(location.search).get(n); }
  function dias(a, b) { return Math.round((new Date(b) - new Date(a)) / 864e5); }
  function slug(t) { return t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }

  var ESTADOS = {
    pendiente: ['Pendiente de aceptar', 'aviso'], en_revision: ['En revisión', 'curso'], aceptado: ['Aceptado', 'ok'], caducado: ['Caducado', 'neutro'], rechazado: ['Rechazado', 'neutro'],
    en_fabricacion: ['En fabricación', 'curso'], fabricado: ['Fabricado', 'curso'], entregado: ['Entregado', 'ok'],
    pagada: ['Pagada', 'ok'], vencida: ['Vencida', 'alerta'], en_reparto: ['En reparto', 'curso'],
    abierta: ['Abierta', 'aviso'], en_curso: ['En curso', 'curso'], resuelta: ['Resuelta', 'ok']
  };
  function pastilla(estado, contexto) {
    var e = ESTADOS[estado] || [estado, 'neutro'];
    var txt = (contexto === 'factura' && estado === 'pendiente') ? 'Pendiente de pago' : (contexto === 'pedido' && estado === 'aceptado') ? 'Aceptado' : e[0];
    return '<span class="pastilla pastilla--' + e[1] + '">' + esc(txt) + '</span>';
  }
  var FASES = [['aceptado', 'Aceptado'], ['en_fabricacion', 'En fabricación'], ['fabricado', 'Fabricado'], ['entregado', 'Entregado']];
  function fases(p, grande) {
    var actual = FASES.map(function (f) { return f[0]; }).indexOf(p.estado);
    return '<ol class="fases' + (grande ? ' fases--grande' : '') + '" aria-label="Fase del pedido: ' + esc(FASES[actual][1]) + ' (paso ' + (actual + 1) + ' de 4)">' +
      FASES.map(function (f, i) {
        var fe = p.fases[i] && p.fases[i].fecha;
        return '<li class="' + (i < actual ? 'hecha' : i === actual ? 'actual' : '') + '">' + f[1] + (grande ? '<small>' + (fe ? fecha(fe) : (i === 3 ? 'Prevista ' + fecha(p.fechaPrevistaEntrega) : 'Pendiente')) + '</small>' : '') + '</li>';
      }).join('') + '</ol>';
  }
  function muestraColor(nombre) {
    // Las muestras son las de la carta de foliados Cortizo de la web pública
    var familias = { 'Blanco': 'estandar-2-caras', 'Roble Dorado': 'estandar-2-caras', 'Nogal': 'estandar-2-caras', 'Negro Ultramate': 'ultra-performance' };
    var fam = familias[nombre] || 'especiales';
    return '<span class="p-linea__color"><img src="/img/colores/' + fam + '--' + slug(nombre) + '.webp" width="28" height="18" alt="" loading="lazy">' + esc(nombre) + '</span>';
  }

  /* ---------------- marco común: franja, cabecera, navegación, pie ---------------- */
  var ICONOS = {
    inicio: '<path d="M4 11 12 4l8 7v9h-5v-6H9v6H4z"/>', presupuestos: '<path d="M6 3h9l4 4v14H6z"/><path d="M9 12h7M9 16h7M9 8h3"/>',
    pedidos: '<path d="M3 8l9-5 9 5v9l-9 5-9-5z"/><path d="M3 8l9 5 9-5M12 13v9"/>', facturas: '<path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6"/>',
    incidencias: '<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16.5v.5"/>', documentacion: '<path d="M4 5h6l2 2h8v12H4z"/>', cuenta: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.400 3.600-7 8-7s8 2.600 8 7"/>'
  };
  var NAV = [['inicio', 'Inicio'], ['presupuestos', 'Presupuestos'], ['pedidos', 'Pedidos'], ['facturas', 'Facturas'], ['incidencias', 'Incidencias'], ['documentacion', 'Documentación', true], ['cuenta', 'Cuenta', true]];

  function franja() { return '<div class="franja-demo" role="note">Demo · Datos ficticios</div>'; }
  function montarMarco(seccion, cliente) {
    var nav = NAV.map(function (n) {
      return '<li' + (n[2] ? ' class="p-nav__secundario"' : '') + '><a href="' + BASE + n[0] + '/"' + (n[0] === seccion ? ' aria-current="page"' : '') + '><svg viewBox="0 0 24 24" aria-hidden="true">' + ICONOS[n[0]] + '</svg><span>' + n[1] + '</span></a></li>';
    }).join('');
    var cab = franja() +
      '<header class="p-cabecera"><div class="contenedor p-cabecera__barra">' +
      '<a class="p-cabecera__logo" href="' + BASE + 'inicio/" aria-label="Área de clientes, inicio"><img src="/img/marca/logo-marchante.png" alt="Marchante, sistemas de ventanas" width="352" height="149"><span>Área de<br>clientes</span></a>' +
      '<div class="p-usuario"><span class="p-usuario__nombre">' + esc(cliente.usuarios[0].nombre) + ' · ' + esc(cliente.codigo) + '</span>' +
      '<a href="' + BASE + 'documentacion/">Docs</a><a href="' + BASE + 'cuenta/">Cuenta</a><button type="button" id="salir">Salir</button></div>' +
      '</div></header>' +
      '<nav class="p-nav" aria-label="Secciones del área de clientes"><div class="contenedor"><ul>' + nav + '</ul></div></nav>';
    var pie = '<footer class="p-pie"><div class="contenedor"><span>© Marchante PVC · Demo del área de clientes con datos ficticios</span>' +
      '<nav aria-label="Enlaces"><a href="' + BASE + 'documentacion/">Documentación técnica</a><a href="/">Volver a la web</a><a href="/contacto/">Contacto</a></nav></div></footer>';
    document.body.insertAdjacentHTML('afterbegin', cab);
    document.body.insertAdjacentHTML('beforeend', pie);
    document.body.classList.add('portal--sesion');
    document.getElementById('salir').addEventListener('click', function () { borrar(CLAVE_SESION); location.href = BASE; });
  }
  function pintar(html) { var m = document.getElementById('app'); m.innerHTML = html; m.removeAttribute('aria-busy'); return m; }
  function titulo(h1, texto, extra, volver) {
    return (volver ? '<a class="p-volver" href="' + volver[0] + '">' + volver[1] + '</a>' : '') +
      '<div class="p-titulo"><div><h1>' + h1 + '</h1>' + (texto ? '<p>' + texto + '</p>' : '') + '</div>' + (extra || '') + '</div>';
  }

  /* ---------------- componentes de listado ---------------- */
  function itemPresupuesto(p) {
    var caduca = p.estado === 'pendiente' ? dias(hoy(), p.validoHasta) : null;
    return '<li><a class="p-item" href="' + BASE + 'presupuestos/detalle/?id=' + p.id + '">' +
      '<div class="p-item__cab"><span class="p-item__id">' + p.id + '</span>' + pastilla(p.estado) + '</div>' +
      '<div class="p-item__titulo">' + esc(p.obra.nombre) + '</div>' +
      '<div class="p-item__meta"><span>Fecha <b>' + fecha(p.fecha) + '</b></span><span>Ref. <b>' + esc(p.referenciaCliente) + '</b></span><span><b>' + p.unidades + '</b> uds.</span>' +
      (caduca !== null ? '<span>Válido hasta <b>' + fecha(p.validoHasta) + '</b>' + (caduca <= 20 ? ' (quedan ' + caduca + ' días)' : '') + '</span>' : '') + '</div>' +
      '<div class="p-item__pie"><span class="p-item__importe">' + euros(p.importes.total) + ' <small style="font-weight:400;color:var(--gris-medio)">IVA incl.</small></span><span class="tarjeta__mas" style="min-height:0">Ver detalle</span></div></a></li>';
  }
  function itemPedido(p) {
    return '<li><a class="p-item" href="' + BASE + 'pedidos/detalle/?id=' + p.id + '">' +
      '<div class="p-item__cab"><span class="p-item__id">' + p.id + '</span>' + pastilla(p.estado, 'pedido') + '</div>' +
      '<div class="p-item__titulo">' + esc(p.obra.nombre) + '</div>' + fases(p) +
      '<div class="p-item__meta"><span>' + (p.estado === 'entregado' ? 'Entregado el <b>' + fecha(p.fases[3].fecha) + '</b>' : 'Entrega prevista <b>' + fecha(p.fechaPrevistaEntrega) + '</b>') + '</span><span><b>' + p.unidades + '</b> uds.</span><span>Ref. <b>' + esc(p.referenciaCliente) + '</b></span></div></a></li>';
  }
  function itemFactura(f) {
    return '<li class="p-item"><div class="p-item__cab"><span class="p-item__id">' + f.id + '</span>' + pastilla(f.estado, 'factura') + '</div>' +
      '<div class="p-item__meta"><span>' + esc(f.obra.nombre) + (f.concepto ? ' · ' + esc(f.concepto) : '') + '</span></div>' +
      '<div class="p-item__meta"><span>Fecha <b>' + fecha(f.fecha) + '</b></span><span>Vence <b>' + fecha(f.vencimiento) + '</b></span><span>Pedido <b>' + f.pedidoId + '</b></span></div>' +
      '<div class="p-item__pie"><span class="p-item__importe">' + euros(f.total) + '</span><a class="p-boton p-boton--pdf" href="' + f.pdf + '" download="' + f.id + '-demo.pdf">Descargar<span class="solo-lectores"> factura ' + f.id + '</span></a></div></li>';
  }
  function itemAlbaran(a) {
    return '<li class="p-item"><div class="p-item__cab"><span class="p-item__id">' + a.id + '</span>' + pastilla(a.estado) + '</div>' +
      '<div class="p-item__meta"><span>' + esc(a.obra.nombre) + '</span></div>' +
      '<div class="p-item__meta"><span>Fecha <b>' + fecha(a.fecha) + '</b></span><span><b>' + a.bultos + '</b> bultos · <b>' + a.unidades + '</b> uds.</span><span>Recibido por <b>' + esc(a.recibidoPor) + '</b></span></div>' +
      '<div class="p-item__pie"><span>Pedido <b>' + a.pedidoId + '</b></span><a class="p-boton p-boton--pdf" href="' + a.pdf + '" download="' + a.id + '-demo.pdf">Descargar<span class="solo-lectores"> albarán ' + a.id + '</span></a></div></li>';
  }
  function itemIncidencia(i) {
    return '<li><a class="p-item" href="' + BASE + 'incidencias/detalle/?id=' + i.id + '">' +
      '<div class="p-item__cab"><span class="p-item__id">' + i.id + '</span>' + pastilla(i.estado) + '</div>' +
      '<div class="p-item__titulo">' + esc(i.asunto) + '</div>' +
      '<div class="p-item__meta"><span>Abierta el <b>' + fecha(i.fechaApertura) + '</b></span><span>Pedido <b>' + esc(i.pedidoId) + '</b></span><span>' + esc(i.tipo) + '</span></div></a></li>';
  }
  function filtros(opciones, alCambiar) {
    var html = '<div class="p-filtros" role="group" aria-label="Filtrar por estado">' + opciones.map(function (o, i) { return '<button type="button" data-f="' + o[0] + '" aria-pressed="' + (i === 0) + '">' + o[1] + '</button>'; }).join('') + '</div>';
    setTimeout(function () {
      document.querySelectorAll('.p-filtros button').forEach(function (b) {
        b.addEventListener('click', function () {
          document.querySelectorAll('.p-filtros button').forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
          alCambiar(b.getAttribute('data-f'));
        });
      });
    });
    return html;
  }

  /* ---------------- pantallas ---------------- */
  var pantallas = {
    inicio: function (cl) {
      return Promise.all([api.presupuestos(), api.pedidos(), api.facturas(), api.incidencias()]).then(function (r) {
        var pend = r[0].filter(function (p) { return p.estado === 'pendiente'; });
        var curso = r[1].filter(function (p) { return p.estado !== 'entregado'; });
        var porPagar = r[2].filter(function (f) { return f.estado !== 'pagada'; });
        var abiertas = r[3].filter(function (i) { return i.estado !== 'resuelta'; });
        pintar(titulo('Hola, <em>' + esc(cl.usuarios[0].nombre) + '</em>', esc(cl.razonSocial)) +
          '<div class="p-resumen">' +
          '<a href="' + BASE + 'presupuestos/"><span>Presupuestos por aceptar</span><strong>' + pend.length + '</strong><em>' + (pend.length ? 'El primero caduca el ' + fecha(pend.map(function (p) { return p.validoHasta; }).sort()[0]) : 'Todo al día') + '</em></a>' +
          '<a href="' + BASE + 'pedidos/"><span>Pedidos en curso</span><strong>' + curso.length + '</strong><em>' + (curso.length ? 'Próxima entrega: ' + fechaCorta(curso.map(function (p) { return p.fechaPrevistaEntrega; }).sort()[0]) : 'Sin pedidos abiertos') + '</em></a>' +
          '<a href="' + BASE + 'facturas/"><span>Facturas pendientes</span><strong>' + porPagar.length + '</strong><em>' + euros(porPagar.reduce(function (s, f) { return s + f.total; }, 0)) + '</em></a>' +
          '<a href="' + BASE + 'incidencias/"><span>Incidencias abiertas</span><strong>' + abiertas.length + '</strong><em>' + (abiertas.length ? 'Última novedad: ' + fechaCorta(abiertas[0].historial[abiertas[0].historial.length - 1].fecha) : 'Ninguna') + '</em></a></div>' +
          '<section class="p-seccion"><div class="p-seccion__cab"><h2>Pedidos en curso</h2><a href="' + BASE + 'pedidos/">Ver todos</a></div><ul class="p-lista">' + (curso.map(itemPedido).join('') || '<li class="p-vacio">No tienes pedidos en curso.</li>') + '</ul></section>' +
          '<section class="p-seccion"><div class="p-seccion__cab"><h2>Presupuestos por aceptar</h2><a href="' + BASE + 'presupuestos/">Ver todos</a></div><ul class="p-lista">' + (pend.map(itemPresupuesto).join('') || '<li class="p-vacio">No hay presupuestos pendientes.</li>') + '</ul></section>' +
          '<section class="p-seccion p-rejilla p-rejilla--2">' +
          '<div class="p-panel"><h2>¿Necesitas un presupuesto nuevo?</h2><p>Envíanos mediciones o planos y te lo preparamos. Tu comercial: <strong>' + esc(cl.comercial.nombre) + '</strong>.</p><div class="p-acciones" style="margin-top:1rem"><a class="p-boton p-boton--primario" href="/contacto/?perfil=profesional#presupuesto">Pedir presupuesto</a><a class="p-boton" href="tel:+34967095320">Llamar</a></div></div>' +
          '<div class="p-panel"><h2>Documentación técnica</h2><p>Fichas técnicas de los sistemas, catálogos de paneles y accesorios, y guías de instalación y mantenimiento.</p><div class="p-acciones" style="margin-top:1rem"><a class="p-boton" href="' + BASE + 'documentacion/">Ver documentación</a></div></div></section>');
      });
    },

    presupuestos: function () {
      return api.presupuestos().then(function (lista) {
        function pinta(f) {
          var l = lista.filter(function (p) { return f === 'todos' || p.estado === f || (f === 'pendiente' && p.estado === 'en_revision'); });
          document.getElementById('lista').innerHTML = l.map(itemPresupuesto).join('') || '<li class="p-vacio">No hay presupuestos con ese estado.</li>';
        }
        pintar(titulo('Presupuestos', 'Consulta el detalle, descarga el PDF y acepta los que quieras pasar a pedido.') +
          filtros([['todos', 'Todos'], ['pendiente', 'Pendientes'], ['aceptado', 'Aceptados'], ['caducado', 'Caducados']], pinta) + '<ul class="p-lista" id="lista"></ul>');
        pinta('todos');
      });
    },

    'presupuestos/detalle': function () {
      return api.presupuesto(param('id')).then(function (p) {
        if (!p) return noEncontrado('presupuestos', 'presupuesto');
        var i = p.importes, aceptable = p.estado === 'pendiente';
        var m = pintar(titulo('Presupuesto <em>' + p.id + '</em>', esc(p.obra.nombre) + ' · ' + esc(p.obra.localidad), pastilla(p.estado), [BASE + 'presupuestos/', 'Presupuestos']) +
          (p.aceptadoEnDemo ? '<div class="p-aviso" role="status">Presupuesto aceptado. En el portal real se generaría el pedido y recibirías la confirmación por correo.</div>' : '') +
          '<div class="p-rejilla p-rejilla--detalle"><div>' +
          '<div class="p-panel"><h2>Partidas (' + p.unidades + ' unidades)</h2><ol class="p-lineas">' + p.lineas.map(function (l) {
            return '<li class="p-linea"><span class="p-linea__pos">' + ('0' + l.posicion).slice(-2) + '</span><div><h3>' + esc(l.descripcion) + '</h3>' +
              '<p>' + esc(l.sistema) + ' · ' + esc(l.apertura) + '</p><p>' + l.anchoMm + ' × ' + l.altoMm + ' mm · Vidrio ' + esc(l.vidrio) + '</p>' +
              '<p class="p-linea__colores"><span>Exterior ' + muestraColor(l.color.exterior) + '</span><span>Interior ' + muestraColor(l.color.interior) + '</span></p></div>' +
              '<div class="p-linea__importe"><span>' + l.unidades + ' × ' + euros(l.precioUnitario) + '</span><b>' + euros(l.importe) + '</b></div></li>';
          }).join('') + '</ol></div>' +
          (p.observaciones ? '<div class="p-panel"><h2>Observaciones</h2><p>' + esc(p.observaciones) + '</p></div>' : '') +
          '</div><aside><div class="p-panel"><h2>Resumen</h2><dl class="p-datos">' +
          '<div><dt>Fecha</dt><dd>' + fecha(p.fecha) + '</dd></div><div><dt>Válido hasta</dt><dd>' + fecha(p.validoHasta) + '</dd></div><div><dt>Tu referencia</dt><dd>' + esc(p.referenciaCliente) + '</dd></div>' +
          '<div><dt>Plazo estimado</dt><dd>' + p.plazoEstimadoDias + ' días</dd></div><div><dt>Importe bruto</dt><dd>' + euros(i.bruto) + '</dd></div><div><dt>Descuento ' + i.descuentoPct + ' %</dt><dd>−' + euros(i.descuento) + '</dd></div>' +
          '<div><dt>Base imponible</dt><dd>' + euros(i.baseImponible) + '</dd></div><div><dt>IVA ' + i.ivaPct + ' %</dt><dd>' + euros(i.iva) + '</dd></div><div class="total"><dt>Total</dt><dd>' + euros(i.total) + '</dd></div></dl>' +
          '<div class="p-acciones" style="margin-top:1.25rem">' + (aceptable ? '<button class="p-boton p-boton--primario" type="button" id="aceptar">Aceptar presupuesto</button>' : '') +
          '<a class="p-boton p-boton--pdf" href="' + p.pdf + '" download="' + p.id + '-demo.pdf">Descargar</a>' +
          (p.pedidoId ? '<a class="p-boton" href="' + BASE + 'pedidos/detalle/?id=' + p.pedidoId + '">Ver pedido ' + p.pedidoId + '</a>' : '') + '</div>' +
          (aceptable ? '<p class="p-propuesta">al aceptar se pediría confirmar la dirección de entrega y se registraría quién acepta y cuándo.</p>' : '') +
          '</div><div class="p-panel"><h2>¿Dudas o cambios?</h2><p>Si necesitas modificar medidas, color o vidrio, coméntalo con tu comercial antes de aceptar.</p><div class="p-acciones" style="margin-top:1rem"><a class="p-boton" href="tel:+34967095320">Llamar</a><a class="p-boton" href="https://wa.me/34623146934" rel="noopener">WhatsApp</a></div></div></aside></div>');
        var b = m.querySelector('#aceptar');
        if (b) b.addEventListener('click', function () {
          if (!confirm('¿Aceptar el presupuesto ' + p.id + ' por ' + euros(i.total) + '?\n\n(Demo: no se envía nada.)')) return;
          api.aceptarPresupuesto(p.id).then(function () { location.reload(); });
        });
      });
    },

    pedidos: function () {
      return api.pedidos().then(function (lista) {
        function pinta(f) {
          var l = lista.filter(function (p) { return f === 'todos' || (f === 'curso' ? p.estado !== 'entregado' : p.estado === 'entregado'); });
          document.getElementById('lista').innerHTML = l.map(itemPedido).join('') || '<li class="p-vacio">No hay pedidos.</li>';
        }
        pintar(titulo('Pedidos', 'Sigue cada pedido por sus fases: aceptado, en fabricación, fabricado y entregado, con la fecha prevista de entrega.') +
          filtros([['todos', 'Todos'], ['curso', 'En curso'], ['entregado', 'Entregados']], pinta) + '<ul class="p-lista" id="lista"></ul>');
        pinta('todos');
      });
    },

    'pedidos/detalle': function () {
      return Promise.all([api.pedido(param('id')), api.facturas(), api.albaranes()]).then(function (r) {
        var p = r[0]; if (!p) return noEncontrado('pedidos', 'pedido');
        var fs = r[1].filter(function (f) { return f.pedidoId === p.id; }), as = r[2].filter(function (a) { return a.pedidoId === p.id; });
        pintar(titulo('Pedido <em>' + p.id + '</em>', esc(p.obra.nombre) + ' · ' + esc(p.obra.localidad), pastilla(p.estado, 'pedido'), [BASE + 'pedidos/', 'Pedidos']) +
          '<div class="p-panel"><h2>Seguimiento</h2>' + fases(p, true) +
          '<p style="margin-top:1.25rem">' + (p.estado === 'entregado' ? 'Pedido entregado el <strong>' + fecha(p.fases[3].fecha) + '</strong>.' : 'Fecha prevista de entrega: <strong>' + fecha(p.fechaPrevistaEntrega) + '</strong>. Te avisaremos si cambia.') + '</p></div>' +
          '<div class="p-rejilla p-rejilla--detalle" style="margin-top:1rem"><div><div class="p-panel"><h2>Contenido (' + p.unidades + ' unidades)</h2><ol class="p-lineas">' + p.lineas.map(function (l) {
            return '<li class="p-linea"><span class="p-linea__pos">' + ('0' + l.posicion).slice(-2) + '</span><div><h3>' + esc(l.descripcion) + '</h3><p>' + esc(l.sistema) + ' · ' + l.anchoMm + ' × ' + l.altoMm + ' mm</p><p class="p-linea__colores"><span>Exterior ' + muestraColor(l.color.exterior) + '</span><span>Interior ' + muestraColor(l.color.interior) + '</span></p></div><div class="p-linea__importe"><span>Unidades</span><b>' + l.unidades + '</b></div></li>';
          }).join('') + '</ol></div></div>' +
          '<aside><div class="p-panel"><h2>Entrega</h2><dl class="p-datos"><div><dt>Tipo</dt><dd>' + esc(p.entrega.tipo) + '</dd></div><div><dt>Dirección</dt><dd>' + esc(p.entrega.direccion) + '</dd></div><div><dt>Contacto</dt><dd>' + esc(p.entrega.contacto) + '</dd></div><div><dt>Tu referencia</dt><dd>' + esc(p.referenciaCliente) + '</dd></div><div class="total"><dt>Total</dt><dd>' + euros(p.importes.total) + '</dd></div></dl></div>' +
          '<div class="p-panel"><h2>Documentos del pedido</h2><div class="p-acciones"><a class="p-boton" href="' + BASE + 'presupuestos/detalle/?id=' + p.presupuestoId + '">Presupuesto ' + p.presupuestoId + '</a>' +
          as.map(function (a) { return '<a class="p-boton p-boton--pdf" href="' + a.pdf + '" download="' + a.id + '-demo.pdf">Albarán ' + a.id + '</a>'; }).join('') +
          fs.map(function (f) { return '<a class="p-boton p-boton--pdf" href="' + f.pdf + '" download="' + f.id + '-demo.pdf">Factura ' + f.id + '</a>'; }).join('') + '</div>' +
          '<p class="p-propuesta">aquí podrían descargarse también el marcado CE y la declaración de prestaciones de cada pedido.</p></div>' +
          '<div class="p-panel"><h2>¿Algún problema con este pedido?</h2><div class="p-acciones"><a class="p-boton" href="' + BASE + 'incidencias/nueva/?pedido=' + p.id + '">Abrir incidencia</a></div></div></aside></div>');
      });
    },

    facturas: function () {
      return Promise.all([api.facturas(), api.albaranes()]).then(function (r) {
        function pinta(f) { document.getElementById('lista').innerHTML = f === 'albaranes' ? r[1].map(itemAlbaran).join('') : r[0].map(itemFactura).join(''); }
        var pte = r[0].filter(function (f) { return f.estado !== 'pagada'; });
        pintar(titulo('Facturas y albaranes', 'Descarga tus facturas y albaranes en PDF.') +
          (pte.length ? '<div class="p-aviso p-aviso--info" role="status">Tienes ' + pte.length + ' factura pendiente de pago por ' + euros(pte.reduce(function (s, f) { return s + f.total; }, 0)) + '. Próximo vencimiento: ' + fecha(pte[0].vencimiento) + '.</div>' : '') +
          filtros([['facturas', 'Facturas (' + r[0].length + ')'], ['albaranes', 'Albaranes (' + r[1].length + ')']], pinta) + '<ul class="p-lista" id="lista"></ul>' +
          '<p class="p-propuesta">descarga de varias facturas a la vez (por trimestre) y extracto de vencimientos para contabilidad.</p>');
        pinta('facturas');
      });
    },

    incidencias: function () {
      return api.incidencias().then(function (l) {
        pintar(titulo('Incidencias y posventa', 'Abre una incidencia con descripción y fotos, y sigue su estado.', '<a class="p-boton p-boton--primario" href="' + BASE + 'incidencias/nueva/">Abrir incidencia</a>') +
          '<ul class="p-lista">' + l.map(itemIncidencia).join('') + '</ul>');
      });
    },

    'incidencias/detalle': function () {
      return api.incidencia(param('id')).then(function (i) {
        if (!i) return noEncontrado('incidencias', 'incidencia');
        var fotos = ''; for (var k = 0; k < (i.fotos || 0); k++) fotos += '<div class="p-fotos__marcador">Foto ' + (k + 1) + '<br>(demo)</div>';
        pintar(titulo('Incidencia <em>' + i.id + '</em>', esc(i.asunto), pastilla(i.estado), [BASE + 'incidencias/', 'Incidencias']) +
          (i.creadaEnDemo ? '<div class="p-aviso" role="status">Incidencia registrada. En el portal real llegaría a posventa y recibirías un correo de confirmación.</div>' : '') +
          '<div class="p-rejilla p-rejilla--detalle"><div><div class="p-panel"><h2>Descripción</h2><p>' + esc(i.descripcion) + '</p>' + (fotos ? '<div class="p-fotos">' + fotos + '</div>' : '') + '</div>' +
          '<div class="p-panel"><h2>Seguimiento</h2><ol class="p-historial">' + i.historial.map(function (h) { return '<li><time datetime="' + h.fecha + '">' + fecha(h.fecha) + '</time><b>' + esc(h.autor) + '</b><br>' + esc(h.texto) + '</li>'; }).join('') + '</ol></div></div>' +
          '<aside><div class="p-panel"><h2>Datos</h2><dl class="p-datos"><div><dt>Abierta el</dt><dd>' + fecha(i.fechaApertura) + '</dd></div><div><dt>Tipo</dt><dd>' + esc(i.tipo) + '</dd></div><div><dt>Pedido</dt><dd>' + (i.pedidoId ? '<a href="' + BASE + 'pedidos/detalle/?id=' + esc(i.pedidoId) + '">' + esc(i.pedidoId) + '</a>' : '—') + '</dd></div></dl></div></aside></div>');
      });
    },

    'incidencias/nueva': function () {
      return api.pedidos().then(function (peds) {
        var sel = param('pedido');
        var m = pintar(titulo('Abrir <em>incidencia</em>', 'Cuéntanos qué ha pasado. Cuantos más detalles y fotos, antes podremos resolverlo.', '', [BASE + 'incidencias/', 'Incidencias']) +
          '<form class="formulario p-panel" id="f-incidencia" style="max-width:44rem" novalidate>' +
          '<div class="campo--doble"><div class="campo"><label for="pedido">Pedido afectado</label><select id="pedido" name="pedidoId" required><option value="">Elige un pedido</option>' +
          peds.map(function (p) { return '<option value="' + p.id + '"' + (p.id === sel ? ' selected' : '') + '>' + p.id + ' · ' + esc(p.obra.nombre) + '</option>'; }).join('') + '</select></div>' +
          '<div class="campo"><label for="tipo">Tipo de incidencia</label><select id="tipo" name="tipo" required><option>Vidrio</option><option>Herraje</option><option>Perfil o acabado</option><option>Medidas</option><option>Transporte o entrega</option><option>Falta material</option><option>Otro</option></select></div></div>' +
          '<div class="campo"><label for="asunto">Asunto</label><input id="asunto" name="asunto" type="text" required maxlength="90" placeholder="Ej.: vidrio rayado en la balconera del salón"></div>' +
          '<div class="campo"><label for="descripcion">Descripción</label><textarea id="descripcion" name="descripcion" required placeholder="Qué ocurre, en qué posición del pedido y desde cuándo"></textarea></div>' +
          '<div class="campo"><span id="l-fotos" style="font-size:0.875rem;font-weight:500;color:var(--tinta)">Fotos <span class="opcional">(opcional, hasta 6)</span></span>' +
          '<label class="p-subir" style="position:relative"><input type="file" id="fotos" accept="image/*" multiple aria-labelledby="l-fotos"><span>Hacer o elegir fotos</span></label><div class="p-fotos" id="previas" aria-live="polite"></div></div>' +
          '<p class="formulario__nota">Demo: las fotos se previsualizan en tu dispositivo y no se envían a ningún sitio.</p>' +
          '<div class="p-acciones"><button class="p-boton p-boton--primario" type="submit">Enviar incidencia</button><a class="p-boton" href="' + BASE + 'incidencias/">Cancelar</a></div></form>');
        var nFotos = 0, inp = m.querySelector('#fotos'), prev = m.querySelector('#previas');
        inp.addEventListener('change', function () {
          prev.innerHTML = ''; nFotos = Math.min(inp.files.length, 6);
          for (var k = 0; k < nFotos; k++) { var im = document.createElement('img'); im.alt = 'Foto ' + (k + 1) + ' adjunta'; im.src = URL.createObjectURL(inp.files[k]); prev.appendChild(im); }
        });
        m.querySelector('#f-incidencia').addEventListener('submit', function (e) {
          e.preventDefault(); var f = e.target;
          if (!f.checkValidity()) { f.reportValidity(); return; }
          api.crearIncidencia({ pedidoId: f.pedidoId.value, tipo: f.tipo.value, asunto: f.asunto.value, descripcion: f.descripcion.value, fotos: nFotos })
            .then(function (n) { location.href = BASE + 'incidencias/detalle/?id=' + n.id; });
        });
      });
    },

    documentacion: function () {
      return api.documentos().then(function (docs) {
        function grupo(cat, tit, texto) {
          var l = docs.filter(function (d) { return d.categoria === cat; });
          return '<section class="p-seccion"><div class="p-seccion__cab"><h2>' + tit + '</h2></div>' + (texto ? '<p style="margin-bottom:1rem">' + texto + '</p>' : '') + '<ul class="descargas descargas--3">' + l.map(function (d) {
            var pdf = /\.pdf$/.test(d.url);
            return '<li><a class="descarga' + (pdf ? '' : ' descarga--web') + '" style="background:var(--papel)" href="' + d.url + '"><span class="descarga__tipo" aria-hidden="true">' + (pdf ? 'PDF' : 'WEB') + '</span><span class="descarga__texto"><strong>' + esc(d.titulo) + '</strong><span>' + (pdf ? 'PDF · ' + String(d.pesoMB).replace('.', ',') + ' MB' : 'Guía en la web') + '</span></span></a></li>';
          }).join('') + '</ul></section>';
        }
        pintar(titulo('Documentación técnica', 'Todo el material técnico, siempre en su última versión.') +
          grupo('ficha_tecnica', 'Fichas técnicas de los sistemas') + grupo('guia', 'Guías') + grupo('catalogo', 'Catálogos de paneles y accesorios') +
          '<p class="p-propuesta">documentación reservada a clientes: tarifas, despieces, manuales de montaje o certificados, si la fábrica quiere compartirlos aquí.</p>');
      });
    },

    cuenta: function (cl) {
      var d = cl.direccionFiscal;
      pintar(titulo('Datos de <em>la cuenta</em>', 'Para cambiar datos fiscales o condiciones, habla con tu comercial.') +
        '<div class="p-rejilla p-rejilla--2"><div class="p-panel"><h2>Empresa</h2><dl class="p-datos"><div><dt>Razón social</dt><dd>' + esc(cl.razonSocial) + '</dd></div><div><dt>NIF</dt><dd>' + esc(cl.nif) + '</dd></div><div><dt>Código de cliente</dt><dd>' + esc(cl.codigo) + '</dd></div><div><dt>Tipo</dt><dd>' + esc(cl.tipo) + '</dd></div><div><dt>Dirección fiscal</dt><dd>' + esc(d.linea) + '<br>' + esc(d.cp) + ' ' + esc(d.localidad) + '</dd></div></dl></div>' +
        '<div class="p-panel"><h2>Condiciones comerciales</h2><dl class="p-datos"><div><dt>Forma de pago</dt><dd>' + esc(cl.condiciones.formaPago) + '</dd></div><div><dt>Tarifa</dt><dd>' + esc(cl.condiciones.tarifa) + '</dd></div><div><dt>Descuento habitual</dt><dd>' + cl.condiciones.descuentoHabitualPct + ' %</dd></div></dl>' +
        '<h2 style="margin-top:1.5rem">Tu comercial</h2><p><strong>' + esc(cl.comercial.nombre) + '</strong></p><div class="p-acciones" style="margin-top:0.75rem"><a class="p-boton" href="tel:+34967095320">' + esc(cl.comercial.telefono) + '</a><a class="p-boton" href="mailto:' + esc(cl.comercial.email) + '">Correo</a></div></div>' +
        '<div class="p-panel"><h2>Direcciones de entrega</h2><dl class="p-datos">' + cl.direccionesEntrega.map(function (x) { return '<div><dt>' + esc(x.alias) + '</dt><dd>' + esc(x.linea) + '<br><span style="font-weight:400">' + esc(x.horario) + '</span></dd></div>'; }).join('') + '</dl><p class="p-propuesta">que el cliente pueda dar de alta direcciones de obra desde aquí.</p></div>' +
        '<div class="p-panel"><h2>Usuarios con acceso</h2><dl class="p-datos">' + cl.usuarios.map(function (u) { return '<div><dt>' + esc(u.nombre) + '<br><span style="font-size:0.875rem">' + esc(u.email) + '</span></dt><dd>' + esc(u.rol) + '</dd></div>'; }).join('') + '</dl><p class="p-propuesta">varios usuarios por cliente, con permisos distintos (por ejemplo, que administración vea facturas y obra solo pedidos).</p></div>' +
        '<div class="p-panel"><h2>Avisos por correo</h2><ul class="p-interruptores">' + [['pedidoCambiaDeFase', 'Cuando un pedido cambia de fase'], ['presupuestoPorCaducar', 'Cuando un presupuesto está a punto de caducar'], ['facturaNueva', 'Cuando hay una factura nueva'], ['incidenciaActualizada', 'Cuando hay novedades en una incidencia']].map(function (a) {
          return '<li><label>' + a[1] + '<input type="checkbox"' + (cl.avisos[a[0]] ? ' checked' : '') + '></label></li>';
        }).join('') + '</ul><p class="p-propuesta">avisos automáticos por correo (y quizá por WhatsApp) configurables por el cliente.</p></div>' +
        '<div class="p-panel"><h2>Contraseña</h2><p>En el portal real podrías cambiar tu contraseña desde aquí.</p><div class="p-acciones" style="margin-top:0.75rem"><button class="p-boton" type="button" disabled style="opacity:.55;cursor:not-allowed">Cambiar contraseña</button></div></div></div>');
      return Promise.resolve();
    }
  };

  function noEncontrado(seccion, que) {
    pintar(titulo('No encontrado', 'No existe ese ' + que + ' en los datos de la demo.') + '<a class="p-boton" href="' + BASE + seccion + '/">Volver al listado</a>');
  }

  /* ---------------- acceso (login simulado) ---------------- */
  function acceso() {
    document.body.insertAdjacentHTML('afterbegin', franja());
    var f = document.getElementById('f-acceso');
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      guardar(CLAVE_SESION, '1');               // cualquier usuario y contraseña entra
      location.href = BASE + 'inicio/';
    });
  }

  /* ---------------- arranque ---------------- */
  document.addEventListener('DOMContentLoaded', function () {
    var pagina = document.body.getAttribute('data-pagina');
    if (pagina === 'acceso') { acceso(); return; }
    if (!leer(CLAVE_SESION)) { location.replace(BASE); return; }
    api.cliente().then(function (cl) {
      montarMarco(pagina.split('/')[0], cl);
      return pantallas[pagina](cl);
    }).catch(function (err) {
      pintar('<div class="p-vacio"><p>No se han podido cargar los datos de la demo.</p><p class="formulario__nota">' + esc(err.message) + '</p></div>');
    });
  });
})();
