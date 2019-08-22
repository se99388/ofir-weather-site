import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-display-weather',
  templateUrl: './display-weather.component.html',
  styleUrls: ['./display-weather.component.css']
})
export class DisplayWeatherComponent implements OnInit {

@Input()
imageSource: string;

@Input()
dayName: string;

@Input()
min: number;

@Input()
max: number;

@Input()
id: string;
  constructor() { }

  ngOnInit() {
  }

}
