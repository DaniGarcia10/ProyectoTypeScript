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
// Variables para controlar la navegación
let indexActual = 0;
// Array de paises para listar
let paises = [];
// Referencias a los elementos HTML
let btnsearch = document.getElementById('btn-search');
let inputsearch = document.getElementById('input-search');
let card = document.getElementById('card');
let cardTitle = document.getElementById('card-title');
let liData1 = document.getElementById("li-data1");
let liData2 = document.getElementById("li-data2");
let spanErrores = document.getElementById("span-errores");
let previousBtn = document.getElementById("previous-element");
let nextBtn = document.getElementById("next-element");
let container = document.getElementById('container');
// Función asíncrona para obtener los datos de la API https://restcountries.com/v3.1/all
function buscarPais() {
    return __awaiter(this, void 0, void 0, function* () {
        let query = inputsearch.value.trim();
        // Si el campo de búsqueda está vacío, muestra un mensaje de error
        if (!query) {
            spanErrores.textContent = "Por favor, introduce un término de búsqueda.";
            return;
        }
        else {
            // Si hay texto en el campo, borra el mensaje de error
            spanErrores.textContent = "";
        }
        // Llama a la función que busca países en la API
        paises = yield obtenerPaises(query);
        // Si existe algún país...
        if (paises.length > 0) {
            // Limpio primero
            let paisesCompletos = [];
            // Luego obtengo detalles completos de cada país
            for (let p of paises) {
                let paisCompleto = yield obtenerDetallesPais(p.getId());
                if (paisCompleto) {
                    paisesCompletos.push(paisCompleto);
                }
            }
            paises = paisesCompletos;
            // Muestro el primer país si hay elementos
            if (paises.length > 0) {
                indexActual = 0; // Restablezco el índice de inicio
                mostrarPais(); // Muestra el primer país
                displayData(paises); // Muestra los resultados en el contenedor container
            }
            else {
                spanErrores.textContent = "No se pudieron cargar los detalles de los países.";
            }
        }
        else {
            spanErrores.textContent = "No se encontraron resultados para esta búsqueda.";
        }
    });
}
// Función para mostrar los datos de un país en la tarjeta (card)
function mostrarPais() {
    let pais = paises[indexActual];
    // Usamos indexActual para obtener el país actual
    if (pais) {
        cardTitle.textContent = pais.getNombre();
        // Verifico que los elementos existen
        if (liData1) {
            liData1.textContent = `Capital: ${pais.getCapital() || 'Desconocida'}`;
        }
        else {
            console.warn("Elemento li-data1 no encontrado");
        }
        if (liData2) {
            liData2.textContent = ` Región: ${pais.getRegion() || 'Desconocida'}`;
        }
        else {
            console.warn("Elemento li-data2 no encontrado");
        }
    }
}
// Función para mostrar los datos en el contenedor container
function displayData(data) {
    if (!container) {
        console.error('Contenedor de datos no encontrado');
        return;
    }
    container.innerHTML = '';
    data.forEach((pais) => {
        const div = document.createElement('div');
        div.className = 'col-12 col-md-6 col-lg-4';
        div.innerHTML = `
            <div class="card mt-3">
                <div class="card-body">
                    <h5 class="card-title">${pais.getNombre()}</h5>
                    <p class="card-text">Capital: ${pais.getCapital()}</p>
                    <p class="card-text">Región: ${pais.getRegion()}</p>
                </div>
            </div>
        `;
        container.appendChild(div);
    });
}
// Función para obtener los países de la API
function obtenerPaises(query) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Llamo a la API
            let response = yield fetch(`https://restcountries.com/v3.1/name/${query}`);
            let data = yield response.json();
            if (!data || data.status === 404) {
                return [];
            }
            // Convierto los datos en objetos Pais
            return data.map((item) => new Pais_1.default(item.cca3, item.name.common, item.capital ? item.capital[0] : 'Desconocida', item.region));
        }
        catch (error) {
            console.error("Error al obtener los datos de los países", error);
            return [];
        }
    });
}
// Función para obtener los detalles de un país
function obtenerDetallesPais(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let response = yield fetch(`https://restcountries.com/v3.1/alpha/${id}`);
            let data = yield response.json();
            if (!data) {
                return null;
            }
            let item = data[0];
            return new Pais_1.default(item.cca3, item.name.common, item.capital ? item.capital[0] : 'Desconocida', item.region);
        }
        catch (error) {
            console.error("Error al obtener los datos del país", error);
            return null;
        }
    });
}
// Evento de clic en el botón de búsqueda
btnsearch.addEventListener('click', buscarPais);


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