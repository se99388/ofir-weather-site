import { Component, OnInit } from '@angular/core';
import { CurrentWeatherDetails } from '../../models/currentWeatherDetails';
import { UnitTempertureChangeService } from '../../services/unit-temperture-change.service';
import { CurrentWeatherService } from '../../services/current-weather.service';
import { NgRedux } from '../../../../node_modules/ng2-redux';
import { Store } from '../../redux/store';

@Component({
  selector: 'app-temp-unit-change',
  templateUrl: './temp-unit-change.component.html',
  styleUrls: ['./temp-unit-change.component.css']
})
export class TempUnitChangeComponent implements OnInit {

    public isCelsius: boolean = true;
    public currentWeatherDetails: CurrentWeatherDetails;
    constructor(private unitTempertureChangeService: UnitTempertureChangeService, public redux:NgRedux<Store>, private currentWeatherService:CurrentWeatherService) { }

  ngOnInit() {
  }
  public changeToCelcius() {
    this.unitTempertureChangeService.changeToCelsius();
    this.isCelsius = true;
    this.getWeatherByRedux()
}
public changeToFahrenheit() {
    this.unitTempertureChangeService.changeToFahrenheit();
    this.isCelsius = false;
    this.getWeatherByRedux()
}

public getWeatherByRedux(){
    this.currentWeatherDetails = this.redux.getState().currentWeatherDetails
    this.currentWeatherService.addCurrentWeatherByCityId(this.currentWeatherDetails.id,this.currentWeatherDetails.name);
    
    
}
}
