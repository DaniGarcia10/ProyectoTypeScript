import IPais from "./interface/IPais";
export default class Pais implements IPais {
   id: string;
    nombre: string;
    capital: string;
    region: string;
    diaComienzoSemana: string;

    constructor(id:string, nombre: string, capital: string, region: string, diaComienzoSemana: string) {
        this.id = id;
        this.nombre = nombre;
        this.capital = capital;
        this.region = region;
        this.diaComienzoSemana = diaComienzoSemana;
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

    getDiaComienzoSemana(): string {
        return this.diaComienzoSemana
    }

}