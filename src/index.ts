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
let inputBusqueda = document.getElementById('input-search') as HTMLInputElement;
let spanErrores = document.getElementById('span-errores') as HTMLElement;
let card = document.getElementById('card') as HTMLElement;
let elementoTitulo = document.getElementById('card-title') as HTMLElement;
let elemento1 = document.getElementById("li-data1") as HTMLElement | null;
let elemento2 = document.getElementById("li-data2") as HTMLElement | null;
let botonSiguiente = document.getElementById('next-element') as HTMLButtonElement;
let botonAnterior = document.getElementById('previous-element') as HTMLButtonElement;
let estrellaFavorito = document.getElementById('star-fav') as HTMLElement;


// Variables navegacion
let indiceActual = 0;
let paises: Pais[] = [];

// Funcion asincrona para buscar pais en el array de paises
async function buscarPais(): Promise<void> {
    let query = inputBusqueda.value.trim();
    // si no hay texto en el input, muestra error
    if (!query) {
        spanErrores.textContent = "Por favor, introduce un término de búsqueda.";
        return;
    } else {
        //Si hay texto en el input, quita el error
        spanErrores.textContent = "";
    }
    // Llamada funcion que obtine paises en la API
    paises = await obtenerPaises(query);
    // Si existe algun pais
    if (paises.length > 0) {
        //Almacena datos en sessionStorage
        sessionStorage.setItem('StoragePaises', JSON.stringify(paises));
        console.log(sessionStorage);
        //Muestra el primer pais
        indiceActual = 0;
        mostrarPais(paises[indiceActual]);
    } else {
        spanErrores.textContent = "No se encontraron resultados para esta búsqueda.";
    }
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

//Funcion mostrar siguiente pais
function mostrarSiguientePais(): void {
    if (indiceActual < paises.length -1) {
        indiceActual++;
        mostrarPais(paises[indiceActual]);
    }
}

//Funcion mostrar pais anterior
function mostrarAnteriorPais(): void {
    if (indiceActual > 0) {
        indiceActual--;
        mostrarPais(paises[indiceActual]);
    }
}

// funcion obtener todos paises de la API
async function obtenerPaises(query: string): Promise<Pais[]> {
    try {
        let response = await fetch(`https://restcountries.com/v3.1/name/${query}`);
        // Compruebo si la respuesta es correcta
        let arrayPaises: [] = await response.json();
        //Paso del json a objetos Pais
        return arrayPaises.map((item: any) => new Pais(item.ccn3, item.name.common, item.capital, item.region));
    } catch (error) {
        console.error("Error al obtener los datos de los países", error);
        return [];
    }
}

//Evento clic boton buscar
botonBuscar.addEventListener('click', buscarPais);

// Evento clic boton siguiente
botonSiguiente.addEventListener('click', mostrarSiguientePais);

// Evento clic boton anterior
botonAnterior.addEventListener('click', mostrarAnteriorPais);

//Eventos mouseover y mouseout para la estrella de favorito
estrellaFavorito.addEventListener('mouseover', () => {
    estrellaFavorito.classList.remove('bi-star');
    estrellaFavorito.classList.add('bi-star-fill');
});
estrellaFavorito.addEventListener('mouseout', () => {
    estrellaFavorito.classList.remove('bi-star-fill');
    estrellaFavorito.classList.add('bi-star');
});