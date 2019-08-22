import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from '../components/layout/layout.component';
import { TitleComponent } from '../components/title/title.component';
import { NavigationComponent } from '../components/navigation/navigation.component';

import { HttpClientModule } from '@angular/common/http';
import { ForecastWeatherComponent } from '../components/forecast-weather/forecast-weather.component';
import { FavoritesComponent } from '../components/favorites/favorites.component';
import { Page404Component } from '../components/page404/page404.component';
import { DisplayWeatherComponent } from '../components/display-weather/display-weather.component';
import { SearchComponent } from '../components/search/search.component';

import { NgReduxModule, NgRedux} from "ng2-redux";
import { FormsModule} from '@angular/forms';

//material
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import { MatInputModule, MatButtonModule, MatCheckboxModule, MatSelectModule, MatFormFieldModule, MatIconModule,MatAutocompleteModule } from "@angular/material";
import { Store } from '../redux/store';
import { Reducer } from '../redux/reducer';
import { CurrentWeatherService } from '../services/current-weather.service';
import { FavoriteCityComponent } from '../components/favorite-city/favorite-city.component';

@NgModule({
  declarations: [
    LayoutComponent,
    TitleComponent,
    NavigationComponent,
    ForecastWeatherComponent,
    FavoritesComponent,
    Page404Component,
    DisplayWeatherComponent,
    SearchComponent,
    FavoriteCityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    MatAutocompleteModule,
    NgReduxModule
  ],
  providers: [],
  bootstrap: [LayoutComponent]
})
export class AppModule {

    public constructor(private redux: NgRedux<Store>, private currentWeatherService:CurrentWeatherService){

     redux.configureStore(Reducer.reduce, new Store());
     this.currentWeatherService.addCurrentWeatherByCityId(215854,"Tel Aviv, Israel");
    }
    
 }
