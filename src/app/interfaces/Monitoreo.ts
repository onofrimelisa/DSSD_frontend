import { Continent, Country } from ".";

export class CountryConCount {
    constructor(
        public count: number,
        public pais: Country
    ) { }
}

export class Monitoreo {
    constructor(
        public paisesMaxExportaciones: CountryConCount[],
        public continentesMaxExportaciones: Continent[],
        public continentesConExportaciones: Continent[],
        public statusMap: Record<string, number>,
        public tiempoPromedioProcesos: number,
    ) { }
}