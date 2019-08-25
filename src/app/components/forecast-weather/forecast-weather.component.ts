import { Component, OnInit, OnDestroy } from '@angular/core';
import { ForecastWeatherService } from '../../services/forecast-weather.service';
import { ForecastDetails } from '../../models/forecastDetails';
import { CurrentWeatherService } from '../../services/current-weather.service';
import { CurrentWeatherDetails } from '../../models/currentWeatherDetails';
import { NgRedux } from 'ng2-redux';
import { Store } from '../../redux/store';
import { Unsubscribe } from 'redux';
import { FavoritesService } from '../../services/favorites.service';
import { Error } from '../../models/err';
import { ErrMessageService } from '../../services/err-message.service';
import { FavCity } from '../../models/favCity';

@Component({
    selector: 'app-forecast-weather',
    templateUrl: './forecast-weather.component.html',
    styleUrls: ['./forecast-weather.component.css']
})
export class ForecastWeatherComponent implements OnInit, OnDestroy {
    public forecastDetails: ForecastDetails[];
    public currentWeatherDetails = new CurrentWeatherDetails();
    public unsubscribe: Unsubscribe;
    public existInFavorites: boolean = false;
    public allFavoriteCities: CurrentWeatherDetails[];
    public errMessage = new Error()
    // public favCity = new CurrentWeatherDetails()

    constructor(private forecastWeatherService: ForecastWeatherService, private favoritesService: FavoritesService, private redux:NgRedux<Store>, private errMessageService:ErrMessageService) { }

    ngOnInit() {
        //for the first time
        
        this.unsubscribe = this.redux.subscribe(()=>{
         this.reduxState();
         if(this.redux.getState().allFavoriteCities){
            this.reduxStateIsExistInFavorites();
        }
        });
        //for routing between pages
        if(this.redux.getState().currentWeatherDetails){
            this.reduxState();
        }
        if(this.redux.getState().allFavoriteCities){
            this.reduxStateIsExistInFavorites();
        }

    }

    public reduxState(){
        this.currentWeatherDetails = this.redux.getState().currentWeatherDetails;
        this.forecastDetails = this.redux.getState().forecastDetails;
        // this.forecastWeatherService.getForecast(this.currentWeatherDetails.id).subscribe(defualtWeatherRes => {
        //     this.forecastDetails = defualtWeatherRes.DailyForecasts;
        // },err=>{
        //     this.errMessage.text = err.statusText;
        //     this.errMessage.message = err.message;
        //    this.errMessageService.openModal(this.errMessage);
        // });  
    }

    public reduxStateIsExistInFavorites(){     
        this.allFavoriteCities = this.redux.getState().allFavoriteCities;
        this.isIdExist(this.allFavoriteCities)
    }

    public isIdExist(allFavoriteCities){
        console.log("checking", this.existInFavorites, this.currentWeatherDetails.id, this.allFavoriteCities);
        for (let i=0; i<allFavoriteCities.length; i++){
            if (this.allFavoriteCities[i].id === this.currentWeatherDetails.id){         
                return this.existInFavorites = true;
            }
        }   
        return this.existInFavorites = false; 
         
    }
    public addToFavorites(){
    //    this.favCity.id = this.currentWeatherDetails.id;
    //    this.favCity.name = this.currentWeatherDetails.name;
        this.favoritesService.addCityToFavorites( this.currentWeatherDetails);
    }
    public RemoveFromFavorites(){
        // this.favCity.id = this.currentWeatherDetails.id;
        // this.favCity.name = this.currentWeatherDetails.name;
        this.favoritesService.removeCityFromFavorites(this.currentWeatherDetails);
    }

    ngOnDestroy(): void {
        this.unsubscribe();
    }
}
