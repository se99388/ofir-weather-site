import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '../redux/store';
import { ActionType } from '../redux/action';
import { CurrentWeatherDetails } from '../models/currentWeatherDetails';
import { NgRedux } from 'ng2-redux';
import { ErrMessageService } from './err-message.service';
import { Error } from '../models/err';
import { ForecastWeatherService } from './forecast-weather.service';

@Injectable({
    providedIn: 'root'
})
export class CurrentWeatherService {
    public currentWeatherDetails = new CurrentWeatherDetails();
    public obj = new CurrentWeatherDetails();
    public errMessage = new Error();
    public url:string;
    constructor(private httpClient: HttpClient, private redux: NgRedux<Store>, private errMessageService: ErrMessageService, private forecastWeatherService:ForecastWeatherService) { }


    public addCurrentWeatherByCityId(cityId: number, cityName: string): void {

        //lizet
            // if (this.redux.getState().isCelsius){
            //     this.url = "http://dataservice.accuweather.com/currentconditions/v1/" + cityId + "?apikey=uchRUwleT0NqUwf1HeNnke3AJKWALprI&metric=true"
            // }
            // else{
            //     this.url = "http://dataservice.accuweather.com/currentconditions/v1/" + cityId + "?apikey=uchRUwleT0NqUwf1HeNnke3AJKWALprI&metric=false"
            // }
        //ofir
        if (this.redux.getState().isCelsius){
            this.url = "http://dataservice.accuweather.com/currentconditions/v1/" + cityId + "?apikey=jeZErwCeBnkCeg2VqhYTMOchhcFIDnVp&metric=true"
        }
        else{
            this.url = "http://dataservice.accuweather.com/currentconditions/v1/" + cityId + "?apikey=jeZErwCeBnkCeg2VqhYTMOchhcFIDnVp&metric=false"
        }

        this.httpClient.get<any>(this.url).subscribe((response) => {
        // this.httpClient.get<any>("../../assets/jerusalem.json").subscribe((response) => {
            this.currentWeatherDetails =  this.currentWeatherPlacement(response, cityId, cityName);

            const action = {
                type: ActionType.getCurrentWeather,
                payload: this.currentWeatherDetails
            }
            this.redux.dispatch(action);
            this.forecastWeatherService.getForecastWeatherByCityId(this.currentWeatherDetails.id, this.redux.getState().isCelsius);
        }, err => {
            console.log(err)
            this.errMessage.text = err.statusText;
            this.errMessage.message = err.message;
            this.errMessageService.openModal(this.errMessage);
        });

    }

    public currentWeatherPlacement(response, cityId: number, cityName: string): CurrentWeatherDetails {
        let obj = new CurrentWeatherDetails();
        obj.date = response[0].LocalObservationDateTime;

        obj.weatherText = response[0].WeatherText;
        obj.icon = response[0].WeatherIcon;
        obj.name = cityName;
        obj.id = cityId;


        if (this.redux.getState().isCelsius) {
            obj.temperture = response[0].Temperature.Metric.Value;
            obj.tempUnit = response[0].Temperature.Metric.Unit;
        }
        else {
            obj.temperture = response[0].Temperature.Imperial.Value;
            obj.tempUnit = response[0].Temperature.Imperial.Unit;
        }
        return obj;
    }
}
