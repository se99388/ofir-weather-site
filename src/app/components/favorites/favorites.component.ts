import { Pipe, Component, OnInit } from '@angular/core';
import { CurrentWeatherDetails } from '../../models/currentWeatherDetails';
import { NgRedux } from 'ng2-redux';
import { Store } from '../../redux/store';
import { Unsubscribe } from 'redux';
import { CurrentWeatherService } from '../../services/current-weather.service';
import { Router } from '@angular/router';
import { FavoritesService } from '../../services/favorites.service';
import { FavCity } from '../../models/favCity';
import { take } from 'rxjs/operators';

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
        //for the first time
        // if (localStorage.getItem("MyFavoritesCities")) {
        //     const allFavCities = JSON.parse(localStorage.getItem("MyFavoritesCities"));
        //     this.allFavCities = allFavCities;
        //     this.createCityDetails(this.allFavCities);
        // }
        // this.redux.subscribe(() => {
        //     console.log("this.redux.getState().allFavoriteCities", this.redux.getState().allFavoriteCities)
        //     this.allFavCities = this.redux.getState().allFavoriteCities;
        //     this.createCityDetails(this.allFavCities);
        // });
        //for routing between pages
        if (this.redux.getState().allFavoriteCities) {
            this.allFavCities = this.redux.getState().allFavoriteCities;
            this.createCityDetails(this.allFavCities);
        }
    }

    public createCityDetails(allFavCities) {
        // this.favoritesService.getCurrentWeatherOfFavCities(this.allFavCities)
        let count = 0;
        console.log(count++)
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

    ngOnDestroy(): void {

    }
}

