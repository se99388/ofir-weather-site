export class CurrentWeatherDetails {
    constructor(
        public id?: number,
        public name?: string,
        public date?: string,
        public temperture?: number,
        public weatherText?: string,
        public icon?: string,
        public tempUnit?: string
    ){}
    

}