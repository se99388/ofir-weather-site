import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForecastWeatherComponent } from '../components/forecast-weather/forecast-weather.component';
import { FavoritesComponent } from '../components/favorites/favorites.component';
import { Page404Component } from '../components/page404/page404.component';

const routes: Routes = [
    {path:"forecast-weather", component:ForecastWeatherComponent},
    {path:"favorites", component:FavoritesComponent},
    { path: "", pathMatch: "full", redirectTo: "forecast-weather" },
    { path: "**", component: Page404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
