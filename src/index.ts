import Pais from "./models/Pais";

//Elementoos del menu
let menuItems = document.querySelectorAll('.nav-link');

// Divisores
let divisorBusqueda = document.getElementById('div-search') as HTMLElement;
let divisorFavoritos = document.getElementById('div-data-storage') as HTMLElement;

//Funcion click
function handleMenuClick(event: Event): void {
    //Elimina active de todos los elementos
    menuItems.forEach(item => item.classList.remove('active'));

    //Añadir active al elemento clicado
    const target = event.target as HTMLElement;
    target.classList.add('active');

    // Controlar la visibilidad de los divisores
    if (target.id === 'a-search') {
        divisorBusqueda.classList.remove('d-none');
        divisorFavoritos.classList.add('d-none');
    } else if (target.id === 'a-data-storage') {
        divisorBusqueda.classList.add('d-none');
        divisorFavoritos.classList.remove('d-none');
    }


}

//Añadir el evento de clic a todos los elemento del menu
menuItems.forEach(item => {
    item.addEventListener('click', handleMenuClick);
});

