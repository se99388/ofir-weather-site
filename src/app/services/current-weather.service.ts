import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Store } from '../redux/store';
import { ActionType } from '../redux/action';
import { CurrentWeatherDetails } from '../models/currentWeatherDetails';
import { NgRedux } from 'ng2-redux';

@Injectable({
  providedIn: 'root'
})
export class CurrentWeatherService {
public currentWeatherDetails = new CurrentWeatherDetails();
    constructor(private httpClient: HttpClient, private redux:NgRedux<Store>) { }

  public getCurrentWeather():Observable<any>{
    //   return this.httpClient.get<any>("http://dataservice.accuweather.com/currentconditions/v1/215854?apikey=jeZErwCeBnkCeg2VqhYTMOchhcFIDnVp")
    return this.httpClient.get<any>("../../assets/defualt.json")
  }

  public addCurrentWeatherByCityId(cityId: number,cityName:string):void{
      //lizet
    //   this.httpClient.get<any>("http://dataservice.accuweather.com/currentconditions/v1/" + cityId + "?apikey=uchRUwleT0NqUwf1HeNnke3AJKWALprI").subscribe((response)=>{
         this.httpClient.get<any>("../../assets/jerusalem.json").subscribe((response)=>{
            this.currentWeatherDetails.date = response[0].LocalObservationDateTime;
            this.currentWeatherDetails.temperture = response[0].Temperature.Metric.Value;
            this.currentWeatherDetails.weatherText = response[0].WeatherText;
            this.currentWeatherDetails.icon = response[0].WeatherIcon;
            this.currentWeatherDetails.name = cityName;
            this.currentWeatherDetails.id = cityId;
            const action = {
                type: ActionType.getCurrentWeather,
                payload: this.currentWeatherDetails
            }
            this.redux.dispatch(action);
         });

    
}
}
