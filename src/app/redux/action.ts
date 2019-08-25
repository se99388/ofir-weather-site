export enum ActionType{
getCity,
getCurrentWeather,
getForecastDetails,
getAllFavoriteCities,
addAllFavoriteCities,
addFavoriteCity,
deleteFavoriteCity,
convertCelsiusToFahrenheit,
convertFahrenheitToCelsius
}

export interface Action{
    type: ActionType,
    payload?:any
}
