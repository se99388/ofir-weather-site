export enum ActionType{
getCity,
getCurrentWeather,
getAllFavoriteCities,
addFavoriteCity,
deleteFavoriteCity
}

export interface Action{
    type: ActionType,
    payload?:any
}
