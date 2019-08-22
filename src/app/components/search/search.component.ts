import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchService } from '../../services/search.service';
import { City } from '../../models/city';
import { CurrentWeatherService } from '../../services/current-weather.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

    public searchValue: string;
    myControl = new FormControl();
    filteredOptions: City[];
    constructor(private searchService: SearchService, private currentWeatherService:CurrentWeatherService) { }

    ngOnInit() {
    }

    public search() {
       
        this.searchService.getSearchByCity(this.searchValue).subscribe(res => {
            this.filteredOptions = res.map((item) => {
                return {
                    name: item.LocalizedName + ", " + item.Country.LocalizedName,
                    id: item.Key
                };

            });
            console.log(this.filteredOptions);
        });
    }

    public Selected(cityId:number,cityName:string):void {
        console.log(cityId, cityName)
        this.currentWeatherService.addCurrentWeatherByCityId(cityId, cityName);

    }
}

