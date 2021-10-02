import { Country } from ".";

export class State {
    constructor(
        public code: string,
        public name: string,
        public country: Country,
    ) { }

}