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

/* Vídeo de sistema: YouTube solo se carga al pulsar (sin peticiones a terceros hasta entonces) */
(function () {
  var marcos = document.querySelectorAll('.video__marco[data-video]');
  Array.prototype.forEach.call(marcos, function (marco) {
    var boton = marco.querySelector('.video__boton');
    if (!boton) return;
    boton.addEventListener('click', function () {
      var iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube-nocookie.com/embed/' + marco.getAttribute('data-video') + '?autoplay=1&rel=0&playsinline=1';
      iframe.title = boton.getAttribute('aria-label') || 'Vídeo';
      iframe.allow = 'autoplay; encrypted-media; fullscreen; picture-in-picture';
      iframe.setAttribute('allowfullscreen', '');
      marco.innerHTML = '';
      marco.appendChild(iframe);
      iframe.focus();
    });
  });
})();
