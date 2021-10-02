import { Continent, Language, State } from "./index";

export class Country {
    constructor(
        public code: string,
        public name: string,
        public languages: Language[],
        public states: State[],
        public continent: Continent
    ) { }
}