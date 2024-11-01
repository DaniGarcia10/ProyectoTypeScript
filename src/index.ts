import Pais from "./models/Pais";

//Elementoos del menu
let menuItems = document.querySelectorAll('.nav-link');

//Funcion click
function handleMenuClick(event: Event): void {
    //Elimina active de todos los elementos
    menuItems.forEach(item => item.classList.remove('active'));

    //Añadir active al elemento clicado
    const target = event.target as HTMLElement;
    target.classList.add('active');
}

//Añadir el evento de clic a todos los elemento del menu
menuItems.forEach(item => {
    item.addEventListener('click', handleMenuClick);
});