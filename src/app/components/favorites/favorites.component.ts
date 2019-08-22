import { Component, OnInit } from '@angular/core';
import { CurrentWeatherDetails } from '../../models/currentWeatherDetails';
import { NgRedux } from '../../../../node_modules/ng2-redux';
import { Store } from '../../redux/store';
import { Unsubscribe } from '../../../../node_modules/redux';
import { CurrentWeatherService } from '../../services/current-weather.service';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

    public cityDetails:CurrentWeatherDetails[] = new Array();
    public unsubscribe: Unsubscribe;
    constructor(private redux:NgRedux<Store>, private currentWeatherService:CurrentWeatherService, private router: Router) { }

    ngOnInit() {
        //for the first time
        this.unsubscribe = this.redux.subscribe(()=>{
         this.reduxState();
        });
        //for routing between pages
        if(this.redux.getState().allFavoriteCities){
            this.reduxState();
        }
        console.log("cityDetails", this.cityDetails)
    }

    public reduxState(){
        this.cityDetails = this.redux.getState().allFavoriteCities;
    }

    public getForecastWeather(cityId, cityName){
        console.log(cityId);
        this.currentWeatherService.addCurrentWeatherByCityId(cityId, cityName);
        this.router.navigate(['../forecast-weather']);

    }

    ngOnDestroy(): void {
        this.unsubscribe();
    }

}
