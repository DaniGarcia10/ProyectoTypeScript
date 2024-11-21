import Pais from "./models/Pais";

//Elementoos del menu
let menuItems = document.querySelectorAll('.nav-link');

// Divisores
let divisorBusqueda = document.getElementById('div-search') as HTMLElement;
let divisorFavoritos = document.getElementById('div-data-storage') as HTMLElement;
let tablaFavoritos = document.getElementById('table-favs') as HTMLTableElement;
let tablaPapelera = document.getElementById('table-deleted') as HTMLTableElement;
let divisorPapelera = document.getElementById('div-data-deleted') as HTMLElement;

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
        divisorPapelera.classList.add('d-none');
    }
    if (target.id === 'a-data-storage') {
        divisorBusqueda.classList.add('d-none');
        divisorFavoritos.classList.remove('d-none');
        divisorPapelera.classList.add('d-none');
        mostrarFavoritos();
    } 
    if (target.id === 'a-data-deleted') {
        divisorBusqueda.classList.add('d-none');
        divisorFavoritos.classList.add('d-none');
        divisorPapelera.classList.remove('d-none');
        mostrarPapelera();
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
let elemento3 = document.getElementById("li-data3") as HTMLElement | null;


// Variables navegacion
let indiceActual = 0;
let paises: Pais[] = [];
let favoritos: Pais[] = JSON.parse(localStorage.getItem('favoritos') || '[]');
let papelera: Pais[] = JSON.parse(localStorage.getItem('papelera') || '[]');

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
        if (elemento2) {
            elemento2.textContent = `Dia que comienza la semana: ${pais.getDiaComienzoSemana() || 'Desconocida'}`;
        } else {
            console.warn("Elemento li-data2 no encontrado");
        }
        // Actualizar el estado de la estrella de favorito

        if (papelera.some(pap => pap.id === pais.id)) {
            estrellaFavorito.classList.add('');
        } else {
            if (favoritos.some(fav => fav.id === pais.id)) {
                estrellaFavorito.classList.remove('bi-star');
                estrellaFavorito.classList.add('bi-star-fill');
            } else {
                estrellaFavorito.classList.remove('bi-star-fill');
                estrellaFavorito.classList.add('bi-star');
            }
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

// funcion obtener paises de la API
async function obtenerPaises(query: string): Promise<Pais[]> {
    try {
        let response = await fetch(`https://restcountries.com/v3.1/name/${query}`);
        // Compruebo si la respuesta es correcta
        let arrayPaises: [] = await response.json();
        //Paso del json a objetos Pais
        return arrayPaises.map((item: any) => new Pais(item.ccn3, item.name.common, item.capital, item.region, item.startOfWeek));
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
// estrellaFavorito.addEventListener('mouseover', () => {
//         estrellaFavorito.classList.remove('bi-star');
//         estrellaFavorito.classList.add('bi-star-fill');
// });

// estrellaFavorito.addEventListener('mouseout', () => {
//         estrellaFavorito.classList.remove('bi-star-fill');
//         estrellaFavorito.classList.add('bi-star');
// });

// Evento clic favorito
estrellaFavorito.addEventListener('click', () => {
    let paisActual = paises[indiceActual];
    // Comprruebo si esta en favoritos
    let index = favoritos.findIndex(fav => fav.id === paisActual.id);
    // Si no esta en favoritos, lo añado
    if (index === -1) {
        // Añadir
        favoritos.push(paisActual);
        estrellaFavorito.classList.remove('bi-star');
        estrellaFavorito.classList.add('bi-star-fill');
    } else {
        // Quitar
        favoritos.splice(index, 1);
        estrellaFavorito.classList.remove('bi-star-fill');
        estrellaFavorito.classList.add('bi-star');
    }
    // Almacenar en localStorage
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
});

// Funcion mostrar favoritos
function mostrarFavoritos(): void {
    let tbody = tablaFavoritos.querySelector('tbody');
    if (tbody) {
        //Vaciar tabla
        tbody.innerHTML = '';
        favoritos.forEach(pais => {
            let row = document.createElement('tr');
            row.innerHTML = `
                <td>${pais.id}</td>
                <td>${pais.nombre}</td>
                <td>${pais.capital}</td>
                <td>${pais.region}</td>
                <td>${pais.diaComienzoSemana}</td>
                <td><i class="bi bi-trash"></i></td>
            `;
            //Añade las filas
            tbody.appendChild(row);

            //Eventos mouseover y mouseout papelera
            let papeleraIcono = row.querySelector('.bi-trash') as HTMLElement;
            papeleraIcono.addEventListener('mouseover', () => {
                papeleraIcono.classList.remove('bi-trash');
                papeleraIcono.classList.add('bi-trash-fill');
            });
            papeleraIcono.addEventListener('mouseout', () => {
                papeleraIcono.classList.remove('bi-trash-fill');
                papeleraIcono.classList.add('bi-trash');
            });

            // Evento clic para eliminar el favorito
            papeleraIcono.addEventListener('click', () => {
                let index = parseInt(papeleraIcono.getAttribute('data-index') || '0');
                favoritos.splice(index, 1);
                // Almacenar en localStorage
                localStorage.setItem('favoritos', JSON.stringify(favoritos));
                // Actualizar la tabla
                mostrarFavoritos();

                let paisActual = paises[indiceActual];
                // Comprruebo si esta en favoritos
                index = papelera.findIndex(pap => pap.id === paisActual.id);
                // Si no esta en papelera, lo añado
                if (index === -1) {
                    // Añadir
                    papelera.push(paisActual);
                } else {
                    // Quitar
                    favoritos.splice(index, 1);
                }
                // Almacenar en localStorage
                localStorage.setItem('favoritos', JSON.stringify(favoritos));
            });
        });
    }
}

// Funcion mostrar papelera
function mostrarPapelera(): void {
    console.log('Dentro de mostrar');
    let tbody = tablaPapelera.querySelector('tbody');
    if (tbody) {
        //Vaciar tabla
        tbody.innerHTML = '';
        papelera.forEach((pais, index) => {
            let row = document.createElement('tr');
            row.innerHTML = `
                <td>${pais.id}</td>
                <td>${pais.nombre}</td>
                <td>${pais.capital}</td>
                <td>${pais.region}</td>
                <td>${pais.diaComienzoSemana}</td>
                <td><i class="bi bi-arrow-return-left" data-index="${index}"></i></td>
            `;
            //Añade las filas
            tbody.appendChild(row);

            //Eventos mouseover y mouseout papelera
            let icono = row.querySelector('.bi-arrow-return-left') as HTMLElement;
                icono.addEventListener('mouseover', () => {
                icono.classList.remove('bi-arrow-return-left');
                icono.classList.add('bi-arrow-return-left-fill');
            });

            icono.addEventListener('mouseout', () => {
                icono.classList.remove('bi-arrow-return-left-fill');
                icono.classList.add('bi-arrow-return-left');
            });

            // Evento clic para eliminar de la papelera
            icono.addEventListener('click', () => {
                let index = parseInt(icono.getAttribute('data-index') || '0');
                papelera.splice(index, 1);
                // Almacenar en localStorage
                localStorage.setItem('papelera', JSON.stringify(papelera));
                // Actualizar la tabla
                mostrarPapelera();
            });
        });
    }
}