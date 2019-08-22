import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ForecastDetails } from '../models/forecastDetails';

@Injectable({
  providedIn: 'root'
})
export class ForecastWeatherService {

  constructor(private httpClient: HttpClient) { }

  public getForecast(cityId:number):Observable<any>{
//lizet
    // return this.httpClient.get<any>("http://dataservice.accuweather.com/forecasts/v1/daily/5day/"+ cityId +"?apikey=uchRUwleT0NqUwf1HeNnke3AJKWALprI&metric=true")
    //ofir
    //   return this.httpClient.get<any>("http://dataservice.accuweather.com/forecasts/v1/daily/5day/"+ cityId +"?apikey=jeZErwCeBnkCeg2VqhYTMOchhcFIDnVp&metric=true")
    
    return this.httpClient.get<any>("../../assets/forecast.json")
  }
}
