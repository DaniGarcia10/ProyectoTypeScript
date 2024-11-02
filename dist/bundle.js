/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const Pais_1 = __importDefault(__webpack_require__(/*! ./models/Pais */ "./src/models/Pais.ts"));
//Elementoos del menu
let menuItems = document.querySelectorAll('.nav-link');
// Divisores
let divisorBusqueda = document.getElementById('div-search');
let divisorFavoritos = document.getElementById('div-data-storage');
//Funcion click
function handleMenuClick(event) {
    //Elimina active de todos los elementos
    menuItems.forEach(item => item.classList.remove('active'));
    //Añadir active al elemento clicado
    const target = event.target;
    target.classList.add('active');
    // Controlar la visibilidad de los divisores
    if (target.id === 'a-search') {
        divisorBusqueda.classList.remove('d-none');
        divisorFavoritos.classList.add('d-none');
    }
    else if (target.id === 'a-data-storage') {
        divisorBusqueda.classList.add('d-none');
        divisorFavoritos.classList.remove('d-none');
    }
}
//evento de clic a todos los elemento del menu
menuItems.forEach(item => {
    item.addEventListener('click', handleMenuClick);
});
// Referencias a los elementos HTML
let botonBuscar = document.getElementById('btn-search');
let inputBusqueda = document.getElementById('input-search');
let spanErrores = document.getElementById('span-errores');
let card = document.getElementById('card');
let elementoTitulo = document.getElementById('card-title');
let elemento1 = document.getElementById("li-data1");
let elemento2 = document.getElementById("li-data2");
let botonSiguiente = document.getElementById('next-element');
let botonAnterior = document.getElementById('previous-element');
let estrellaFavorito = document.getElementById('favorite-star');
// Variables navegacion
let indiceActual = 0;
let paises = [];
// Funcion asincrona para buscar pais en el array de paises
function buscarPais() {
    return __awaiter(this, void 0, void 0, function* () {
        let query = inputBusqueda.value.trim();
        // si no hay texto en el input, muestra error
        if (!query) {
            spanErrores.textContent = "Por favor, introduce un término de búsqueda.";
            return;
        }
        else {
            //Si hay texto en el input, quita el error
            spanErrores.textContent = "";
        }
        // Llamada funcion que obtine paises en la API
        paises = yield obtenerPaises(query);
        // Si existe algun pais
        if (paises.length > 0) {
            //Almacena datos en sessionStorage
            sessionStorage.setItem('StoragePaises', JSON.stringify(paises));
            console.log(sessionStorage);
            //Muestra el primer pais
            indiceActual = 0;
            mostrarPais(paises[indiceActual]);
        }
        else {
            spanErrores.textContent = "No se encontraron resultados para esta búsqueda.";
        }
    });
}
// Funcion mostrar datos de pais en card
function mostrarPais(pais) {
    return __awaiter(this, void 0, void 0, function* () {
        //Compruebo que el pais existe
        if (pais) {
            card.classList.remove('d-none');
            elementoTitulo.textContent = pais.getNombre();
            //compruebo que los elementos existen
            if (elemento1) {
                elemento1.textContent = `Capital: ${pais.getCapital() || 'Desconocida'}`;
            }
            else {
                console.warn("Elemento li-data1 no encontrado");
            }
            if (elemento2) {
                elemento2.textContent = `Región: ${pais.getRegion() || 'Desconocida'}`;
            }
            else {
                console.warn("Elemento li-data2 no encontrado");
            }
        }
    });
}
//Funcion mostrar siguiente pais
function mostrarSiguientePais() {
    if (indiceActual < paises.length - 1) {
        indiceActual++;
        mostrarPais(paises[indiceActual]);
    }
}
//Funcion mostrar pais anterior
function mostrarAnteriorPais() {
    if (indiceActual > 0) {
        indiceActual--;
        mostrarPais(paises[indiceActual]);
    }
}
// funcion obtener todos paises de la API
function obtenerPaises(query) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let response = yield fetch(`https://restcountries.com/v3.1/name/${query}`);
            // Compruebo si la respuesta es correcta
            let arrayPaises = yield response.json();
            //Paso del json a objetos Pais
            return arrayPaises.map((item) => new Pais_1.default(item.ccn3, item.name.common, item.capital, item.region));
        }
        catch (error) {
            console.error("Error al obtener los datos de los países", error);
            return [];
        }
    });
}
//Evento clic boton buscar
botonBuscar.addEventListener('click', buscarPais);
// Evento clic boton siguiente
botonSiguiente.addEventListener('click', mostrarSiguientePais);
// Evento clic boton anterior
botonAnterior.addEventListener('click', mostrarAnteriorPais);
// Evento mouseover y mouseout para la estrella de favorito
estrellaFavorito.addEventListener('mouseover', () => {
    estrellaFavorito.classList.add('filled');
});
estrellaFavorito.addEventListener('mouseout', () => {
    estrellaFavorito.classList.remove('filled');
});


/***/ }),

/***/ "./src/models/Pais.ts":
/*!****************************!*\
  !*** ./src/models/Pais.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class Pais {
    constructor(id, nombre, capital, region) {
        this.id = id;
        this.nombre = nombre;
        this.capital = capital;
        this.region = region;
    }
    //Getters
    getId() {
        return this.id;
    }
    getNombre() {
        return this.nombre;
    }
    getCapital() {
        return this.capital;
    }
    getRegion() {
        return this.region;
    }
    getJSON() {
        return JSON.stringify(this);
    }
}
exports["default"] = Pais;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle.js.map