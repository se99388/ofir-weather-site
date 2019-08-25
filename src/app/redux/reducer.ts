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
                break;
                
            case ActionType.convertFahrenheitToCelsius:
                newStore.isCelsius = action.payload;
                break;
        }
        return newStore;
    }
}
