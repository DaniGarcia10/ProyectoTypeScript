import IPais from "./interface/IPais";
export default class Pais implements IPais {
   id: string;
    nombre: string;
    capital: string;
    region: string;
    constructor(id:string, nombre: string, capital: string, region: string) {
        this.id = id;
        this.nombre = nombre;
        this.capital = capital;
        this.region = region;
    }

    //Getters

    getId(): string {
        return this.id;
    }

    getNombre(): string {
        return this.nombre;
    }

    getCapital(): string {
        return this.capital;
    }

    getRegion(): string {
        return this.region;
    }

    getJSON() {
        return JSON.stringify(this);
    }

}