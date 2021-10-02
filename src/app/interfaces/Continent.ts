import { Country } from "./index";

export class Continent {
    constructor(
        public code: string,
        public name: string,
        public countries: Country[],
    ) { }
}