import { Injectable } from '@angular/core';
import { NgRedux } from '../../../node_modules/ng2-redux';
import { Store } from '../redux/store';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(private redux:NgRedux<Store>) { }

  public updateLocalStorage(){

    localStorage.setItem("MyFavoritesCities", JSON.stringify(this.redux.getState().allFavoriteCities));
  }

}
