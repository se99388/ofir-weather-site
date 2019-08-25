import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-favorite-city',
  templateUrl: './favorite-city.component.html',
  styleUrls: ['./favorite-city.component.css']
})
export class FavoriteCityComponent {
    @Input()
    imageSource: string;
    
    @Input()
    cityName: string;

    @Input()
    dayName: string;
    
    @Input()
    temperture: number;
    
    @Input()
    tempUnit: number;

    @Input()
    weatherText: string;
    

}
