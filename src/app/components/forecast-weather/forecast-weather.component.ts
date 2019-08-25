import { Component, OnInit, OnDestroy } from '@angular/core';
import { ForecastDetails } from '../../models/forecastDetails';
import { CurrentWeatherDetails } from '../../models/currentWeatherDetails';
import { NgRedux } from 'ng2-redux';
import { Store } from '../../redux/store';
import { Unsubscribe } from 'redux';
import { FavoritesService } from '../../services/favorites.service';
import { Error } from '../../models/err';
import { ErrMessageService } from '../../services/err-message.service';


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


    constructor(private favoritesService: FavoritesService, private redux:NgRedux<Store>, private errMessageService:ErrMessageService) { }

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
    }

    public reduxStateIsExistInFavorites(){     
        this.allFavoriteCities = this.redux.getState().allFavoriteCities;
        this.isIdExist(this.allFavoriteCities)
    }

    public isIdExist(allFavoriteCities){
        for (let i=0; i<allFavoriteCities.length; i++){
            if (this.allFavoriteCities[i].id === this.currentWeatherDetails.id){         
                return this.existInFavorites = true;
            }
        }   
        return this.existInFavorites = false; 
         
    }
    public addToFavorites(){
        this.favoritesService.addCityToFavorites( this.currentWeatherDetails);
    }
    public RemoveFromFavorites(){
        this.favoritesService.removeCityFromFavorites(this.currentWeatherDetails);
    }

    ngOnDestroy(): void {
        this.unsubscribe();
    }
}
