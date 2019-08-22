import { Injectable } from '@angular/core';
import { CurrentWeatherDetails } from '../models/currentWeatherDetails';
import { NgRedux } from '../../../node_modules/ng2-redux';
import { Store } from '../redux/store';
import { ActionType } from '../redux/action';

@Injectable({
    providedIn: 'root'
})
export class FavoritesService {

    constructor(private redux: NgRedux<Store>) { }

    public addCityToFavorites(cityDetails: CurrentWeatherDetails): void {
        console.log("cityDetails", cityDetails)
        const action = {
            type: ActionType.addFavoriteCity,
            payload: { ...cityDetails }
        }
        this.redux.dispatch(action);
    }

    public removeCityFromFavorites(cityDetails: CurrentWeatherDetails): void {
        console.log("cityDetails", cityDetails)
        const action = {
            type: ActionType.deleteFavoriteCity,
            payload: {...cityDetails}
        }
        this.redux.dispatch(action);
    }
}
