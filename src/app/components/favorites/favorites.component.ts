import { Component, OnInit } from '@angular/core';
import { CurrentWeatherDetails } from '../../models/currentWeatherDetails';
import { NgRedux } from 'ng2-redux';
import { Store } from '../../redux/store';
import { Unsubscribe } from 'redux';
import { CurrentWeatherService } from '../../services/current-weather.service';
import { Router } from '@angular/router';
import { FavoritesService } from '../../services/favorites.service';

@Component({
    selector: 'app-favorites',
    templateUrl: './favorites.component.html',
    styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
    public array = new Array();
    public cityDetails: CurrentWeatherDetails[] = new Array();
    public currentWeatherDetails = new CurrentWeatherDetails();
    public allFavCities: CurrentWeatherDetails[];
    public unsubscribe: Unsubscribe;
    constructor(private redux: NgRedux<Store>, private favoritesService: FavoritesService, private router: Router, private currentWeatherService: CurrentWeatherService) { }

    ngOnInit() {
        if (this.redux.getState().allFavoriteCities) {
            this.allFavCities = this.redux.getState().allFavoriteCities;
            this.createCityDetails(this.allFavCities);
        }
    }

    public createCityDetails(allFavCities) {

        for (let i = 0; i < allFavCities.length; i++) {
            this.favoritesService.getCurrentWeatherOfFavCity(allFavCities[i].id).subscribe((resFavCityWeather) => {
                this.currentWeatherDetails = this.currentWeatherService.currentWeatherPlacement(resFavCityWeather, allFavCities[i].id, allFavCities[i].name);

                this.cityDetails.push(this.currentWeatherDetails);

            });

        }
    }
    public getForecastWeather(cityId, cityName) {
        this.currentWeatherService.addCurrentWeatherByCityId(cityId, cityName);
        this.router.navigate(['../forecast-weather']);

    }

}

