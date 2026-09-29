/* Marchante PVC — comportamiento mínimo: menú móvil y año del pie */
(function () {
  var boton = document.querySelector('.menu-boton');
  var nav = document.getElementById('nav');
  if (boton && nav) {
    var cerrar = function () {
      nav.classList.remove('abierta');
      document.body.classList.remove('menu-abierto');
      boton.setAttribute('aria-expanded', 'false');
      boton.querySelector('.menu-boton__texto').textContent = 'Menú';
    };
    boton.addEventListener('click', function () {
      if (nav.classList.contains('abierta')) { cerrar(); return; }
      nav.classList.add('abierta');
      document.body.classList.add('menu-abierto');
      boton.setAttribute('aria-expanded', 'true');
      boton.querySelector('.menu-boton__texto').textContent = 'Cerrar';
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('abierta')) { cerrar(); boton.focus(); }
    });
    window.matchMedia('(min-width: 68em)').addEventListener('change', cerrar);
  }
})();

/* Cookies: solo YouTube. Sin consentimiento no se carga nada de Google (localStorage, sin cookie propia) */
var cookiesMarchante = (function () {
  var CLAVE = 'cookies-youtube';
  var banner = document.getElementById('cookies');
  function estado() { try { return localStorage.getItem(CLAVE); } catch (e) { return null; } }
  function guardar(v) { try { localStorage.setItem(CLAVE, v); } catch (e) {} }
  var ESPERA_VIDEO = 10000, inicio = Date.now();
  function fondos() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-video-fondo]'), function (f) {
      if (f.querySelector('iframe') || f.dataset.programado || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      f.dataset.programado = '1';
      setTimeout(function () {
        var id = f.getAttribute('data-video-fondo');
        var i = document.createElement('iframe');
        i.className = 'heroe__video';
        i.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&mute=1&loop=1&playlist=' + id + '&controls=0&playsinline=1&rel=0&disablekb=1&iv_load_policy=3';
        i.title = 'Vídeo de presentación de Marchante PVC';
        i.allow = 'autoplay; encrypted-media';
        i.tabIndex = -1;
        i.addEventListener('load', function () { setTimeout(function () { i.classList.add('heroe__video--visible'); }, 1500); });
        f.appendChild(i);
      }, Math.max(0, ESPERA_VIDEO - (Date.now() - inicio)));
    });
  }
  function mostrar() { if (banner) { banner.hidden = false; banner.querySelector('[data-acepta]').focus(); } }
  function ocultar() { if (banner) banner.hidden = true; }
  function aceptar() { guardar('si'); ocultar(); fondos(); }
  function rechazar() { guardar('no'); ocultar(); }
  if (banner) {
    banner.querySelector('[data-acepta]').addEventListener('click', aceptar);
    banner.querySelector('[data-rechaza]').addEventListener('click', rechazar);
    Array.prototype.forEach.call(document.querySelectorAll('.cookies__abrir'), function (b) { b.addEventListener('click', mostrar); });
    if (estado() === 'si') fondos(); else if (estado() !== 'no') banner.hidden = false;
  }
  return { estado: estado, aceptar: aceptar };
})();

/* Vídeo de sistema: YouTube solo se carga al pulsar y con las cookies aceptadas */
(function () {
  function reproducir(marco, titulo) {
    var iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube-nocookie.com/embed/' + marco.getAttribute('data-video') + '?autoplay=1&rel=0&playsinline=1';
    iframe.title = titulo;
    iframe.allow = 'autoplay; encrypted-media; fullscreen; picture-in-picture';
    iframe.setAttribute('allowfullscreen', '');
    marco.innerHTML = '';
    marco.appendChild(iframe);
    iframe.focus();
  }
  Array.prototype.forEach.call(document.querySelectorAll('.video__marco[data-video]'), function (marco) {
    var boton = marco.querySelector('.video__boton');
    if (!boton) return;
    var titulo = boton.getAttribute('aria-label') || 'Vídeo';
    boton.addEventListener('click', function () {
      if (cookiesMarchante.estado() === 'si') { reproducir(marco, titulo); return; }
      var aviso = document.createElement('div');
      aviso.className = 'video__aviso';
      aviso.innerHTML = '<p>Este vídeo se reproduce desde YouTube, que instala cookies de Google. Para verlo hay que aceptarlas.</p>' +
        '<div class="botones"><button type="button" class="boton" data-ver>Aceptar cookies y ver el vídeo</button> <a href="/cookies/">Política de cookies</a></div>';
      marco.appendChild(aviso);
      aviso.querySelector('[data-ver]').addEventListener('click', function () { cookiesMarchante.aceptar(); reproducir(marco, titulo); });
      aviso.querySelector('[data-ver]').focus();
    });
  });
})();
