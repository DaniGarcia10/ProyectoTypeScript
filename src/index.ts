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

//evento de clic a todos los elemento del menu
menuItems.forEach(item => {
    item.addEventListener('click', handleMenuClick);
});

// Referencias a los elementos HTML
let botonBuscar = document.getElementById('btn-search') as HTMLButtonElement;
let card = document.getElementById('card') as HTMLElement;
let elementoTitulo = document.getElementById('card-title') as HTMLElement;
let elemento1 = document.getElementById("li-data1") as HTMLElement | null;
let elemento2 = document.getElementById("li-data2") as HTMLElement | null;

// Funcion asincrona para buscar pais en el array de paises
async function buscarPais(): Promise<void> {
    // Llamada a funcion que busca paises en la API
    let paises = await obtenerPaises();
    mostrarPais(paises[0]);
}

// Funcion mostrar datos de pais en card
async function mostrarPais(pais: Pais): Promise<void> {
    //Compruebo que el pais existe
    if (pais) {
        card.classList.remove('d-none');
        elementoTitulo.textContent = pais.getNombre();
        //compruebo que los elementos existen
        if (elemento1) {
            elemento1.textContent = `Capital: ${pais.getCapital() || 'Desconocida'}`;
        } else {
            console.warn("Elemento li-data1 no encontrado");
        }
        if (elemento2) {
            elemento2.textContent = `Región: ${pais.getRegion() || 'Desconocida'}`;
        } else {
            console.warn("Elemento li-data2 no encontrado");
        }

    }
}

// funcion obtener todos paises de la API
async function obtenerPaises(): Promise<Pais[]> {
    try {
        let response = await fetch(`https://restcountries.com/v3.1/all`);
        // Compruebo si la respuesta es correcta
        let arrayPaises: [] = await response.json();
        //Paso del json a objetos Pais
        return arrayPaises.map((item: any) => new Pais(item.cca3, item.name.common, item.capital, item.region));
    } catch (error) {
        console.error("Error al obtener los datos de los países", error);
        return [];
    }
}

//Evento clic en el boton buscar
botonBuscar.addEventListener('click', buscarPais);