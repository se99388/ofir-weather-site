import { CurrentWeatherDetails } from '../models/currentWeatherDetails';

export class Store{
    public cityId: string;
    public currentWeatherDetails:CurrentWeatherDetails;
    public allFavoriteCities: CurrentWeatherDetails[]=[];
}
