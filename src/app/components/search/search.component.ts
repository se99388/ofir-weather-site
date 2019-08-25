import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchService } from '../../services/search.service';
import { City } from '../../models/city';
import { CurrentWeatherService } from '../../services/current-weather.service';
import { ErrMessageService } from '../../services/err-message.service';
import { Error } from '../../models/err';

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
    public errMessage = new Error();
    constructor(private searchService: SearchService, private currentWeatherService: CurrentWeatherService, private errMessageService: ErrMessageService) { }

    ngOnInit() {
        this.debounce = this.debounceFn();
    }

    public search() {
        if (this.searchValue) {
            this.debounce(this.getApiSearch);
        }
    }

    public debounceFn = () => {
        let idSetTimeout;
        return function (getApi) {
            if (this.searchValue) {
                clearTimeout(idSetTimeout);
                idSetTimeout = setTimeout(getApi, 1000);
            }
        }
    }

    public getApiSearch = () => {
        this.searchService.getSearchByCity(this.searchValue).subscribe(res => {
            if (res) {
                this.filteredOptions = res.map((item) => {
                    return {
                        name: item.LocalizedName + ", " + item.Country.LocalizedName,
                        id: item.Key
                    };
                });
            }
            else {
                this.filteredOptions = null;
            }

        }, err => {
            this.errMessage.text = err.statusText;
            this.errMessage.message = err.message;
            this.errMessageService.openModal(this.errMessage);
        });
    }


    public Selected(cityId: number, cityName: string): void {
        this.currentWeatherService.addCurrentWeatherByCityId(cityId, cityName);

    }
}

