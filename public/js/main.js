
// Evento para abrir menu
document.querySelector('.menu-a').addEventListener('click', function(e) {
    e.preventDefault();
    document.body.classList.toggle('menu-open');
});

// Evento para cerrar menu
document.querySelector('.close-menu').addEventListener('click', function(e) {
    e.preventDefault();
    document.body.classList.remove('menu-open');
});

module.exports = main