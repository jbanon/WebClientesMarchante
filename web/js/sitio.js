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
