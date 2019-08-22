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
            case ActionType.addFavoriteCity:
            // newStore.allFavoriteCities = [...newStore.allFavoriteCities, action.payload];
                newStore.allFavoriteCities.push(action.payload);
                // console.log("store-addFavoriteCity:", newStore.allFavoriteCities)
                break;
            case ActionType.deleteFavoriteCity:
                for (let i = 0; i < newStore.allFavoriteCities.length; i++) {
                    if (newStore.allFavoriteCities[i].id === action.payload.id) {
                        newStore.allFavoriteCities.splice(i, 1);
                    }
                }
                break;
        }
        return newStore;
    }
}
