import { Store } from './store';
import { ActionType, Action } from './action';

export class Reducer {
    public static reduce(oldStore: Store, action: Action): Store {
        const newStore = { ...oldStore };
        switch (action.type) {
            case ActionType.getCity:
                newStore.cityId = action.payload;
                break;
            case ActionType.getCurrentWeather:
                newStore.currentWeatherDetails = action.payload;
                break;
            case ActionType.getForecastDetails:
                newStore.forecastDetails = action.payload;
                break;
            case ActionType.addFavoriteCity:
                newStore.allFavoriteCities = [...newStore.allFavoriteCities, action.payload];
                // newStore.allFavoriteCities.push(action.payload);
                // console.log("store-addFavoriteCity:", newStore.allFavoriteCities)
                break;
            case ActionType.deleteFavoriteCity:
                for (let i = 0; i < newStore.allFavoriteCities.length; i++) {
                    if (newStore.allFavoriteCities[i].id === action.payload.id) {
                        newStore.allFavoriteCities.splice(i, 1);
                    }
                }
                break;
            case ActionType.addAllFavoriteCities:
                newStore.allFavoriteCities = action.payload;
                break;
            case ActionType.getAllFavoriteCities:
                newStore.allFavoriteCities = action.payload;
                break;
            case ActionType.convertCelsiusToFahrenheit:
                newStore.isCelsius = action.payload;
                // newStore.currentWeatherDetails.temperture = newStore.currentWeatherDetails.temperture * 1.8 + 32;
                // newStore.currentWeatherDetails.tempUnit = "F";
                // for (let i = 0; i < newStore.allFavoriteCities.length; i++) {
                //     newStore.allFavoriteCities[i].temperture = newStore.allFavoriteCities[i].temperture * 1.8 + 32;
                //     newStore.allFavoriteCities[i].tempUnit = "F";
                // }
                break;
            case ActionType.convertFahrenheitToCelsius:
                newStore.isCelsius = action.payload;
                // newStore.currentWeatherDetails.temperture = (newStore.currentWeatherDetails.temperture - 32) / 1.8;
                // newStore.currentWeatherDetails.tempUnit = "C";
                // for (let i = 0; i < newStore.allFavoriteCities.length; i++) {
                //     newStore.allFavoriteCities[i].temperture = (newStore.allFavoriteCities[i].temperture - 32) / 1.8;
                //     newStore.allFavoriteCities[i].tempUnit = "C";
                // }
                break;
        }
        return newStore;
    }
}
