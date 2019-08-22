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
    public debounce: any;
    constructor(private searchService: SearchService, private currentWeatherService: CurrentWeatherService) { }

    ngOnInit() {
        this.debounce = this.debounceFn();
    }

    public search() {
       if (this.searchValue){
        this.debounce(this.getApiSearch);
       }     
    }
    
    public debounceFn = () =>{
        let idSetTimeout;
        return function (getApi){
            clearTimeout(idSetTimeout);
            idSetTimeout = setTimeout(getApi,1000);
        }
    }  

    public getApiSearch = ()=> {
        console.log("this.searchValue",this.searchValue);
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
    // public search() {
    //     console.log("this.searchValue",this.searchValue);
    //     this.searchService.getSearchByCity(this.searchValue).subscribe(res => {
    //         this.filteredOptions = res.map((item) => {
    //             return {
    //                 name: item.LocalizedName + ", " + item.Country.LocalizedName,
    //                 id: item.Key
    //             };

    //         });
    //         console.log(this.filteredOptions);
    //     });
    // }

    public Selected(cityId: number, cityName: string): void {
        console.log(cityId, cityName)
        this.currentWeatherService.addCurrentWeatherByCityId(cityId, cityName);

    }
}

