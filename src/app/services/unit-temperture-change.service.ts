import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { Store } from '../redux/store';
import { ActionType } from '../redux/action';

@Injectable({
    providedIn: 'root'
})
export class UnitTempertureChangeService {

    constructor(private redux: NgRedux<Store>) { }

    public changeToFahrenheit() {
        const action = {
            type: ActionType.convertCelsiusToFahrenheit,
            payload: false
        }
        this.redux.dispatch(action);
    }

    public changeToCelsius() {
        const action = {
            type: ActionType.convertFahrenheitToCelsius,
            payload: true
        }
        this.redux.dispatch(action);
    }
}
