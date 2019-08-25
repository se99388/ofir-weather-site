import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgRedux } from 'ng2-redux';
import { Store } from '../redux/store';
import { ForecastDetails } from '../models/forecastDetails';
import { ActionType } from '../redux/action';
import { ErrMessageService } from './err-message.service';
import { Error } from '../models/err';

@Injectable({
    providedIn: 'root'
})
export class ForecastWeatherService {
    public forecastDetails: ForecastDetails[];
    public errMessage = new Error()
    constructor(private httpClient: HttpClient, private redux: NgRedux<Store>, private errMessageService: ErrMessageService) { }

    // public getForecast(cityId: number): Observable<any> {
    //     //lizet
    //     // return this.httpClient.get<any>("http://dataservice.accuweather.com/forecasts/v1/daily/5day/"+ cityId +"?apikey=uchRUwleT0NqUwf1HeNnke3AJKWALprI&metric=true")
    //     //ofir
    //     //   return this.httpClient.get<any>("http://dataservice.accuweather.com/forecasts/v1/daily/5day/"+ cityId +"?apikey=jeZErwCeBnkCeg2VqhYTMOchhcFIDnVp&metric=true")


    //     // if (this.redux.getState().isCelsius){
    //     //     return this.httpClient.get<any>("http://dataservice.accuweather.com/forecasts/v1/daily/5day/"+ cityId +"?apikey=jeZErwCeBnkCeg2VqhYTMOchhcFIDnVp&metric=true");
    //     // }
    //     // return this.httpClient.get<any>("http://dataservice.accuweather.com/forecasts/v1/daily/5day/"+ cityId +"?apikey=jeZErwCeBnkCeg2VqhYTMOchhcFIDnVp&metric=false");
    //     return this.httpClient.get<any>("../../assets/forecast.json");
    // }

    public getForecastWeatherByCityId(cityId: number, isCelsius): void {

        //lizet
        //   this.httpClient.get<any>("http://dataservice.accuweather.com/forecasts/v1/daily/5day/" + cityId + "?apikey=uchRUwleT0NqUwf1HeNnke3AJKWALprI&metric="+isCelsius).subscribe((defualtWeatherRes)=>{
        //ofir
        //  this.httpClient.get<any>("http://dataservice.accuweather.com/forecasts/v1/daily/5day/" + cityId + "?apikey=jeZErwCeBnkCeg2VqhYTMOchhcFIDnVp&metric="+isCelsius).subscribe((defualtWeatherRes)=>{

        this.httpClient.get<any>("../../assets/forecast.json").subscribe((defualtWeatherRes) => {
            this.forecastDetails = defualtWeatherRes.DailyForecasts;

            const action = {
                type: ActionType.getForecastDetails,
                payload: this.forecastDetails
            }
            this.redux.dispatch(action);
        }, err => {
            this.errMessage.text = err.statusText;
            this.errMessage.message = err.message;
            this.errMessageService.openModal(this.errMessage);
        });


    }
}
// this.currentWeatherDetails = this.redux.getState().currentWeatherDetails;
// this.forecastWeatherService.getForecast(this.currentWeatherDetails.id).subscribe(defualtWeatherRes => {
//     this.forecastDetails = defualtWeatherRes.DailyForecasts;
// }, err => {
//     this.errMessage.text = err.statusText;
//     this.errMessage.message = err.message;
//     this.errMessageService.openModal(this.errMessage);
// });


