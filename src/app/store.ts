import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import pizzaSizesReducer from '../features/pizza_size/pizzaSizeSlice';
import pizzaTypesReducer from '../features/pizza_type/pizzaTypeSlice';
import pizzasReducer from '../features/pizzas/pizzasSlice';
import ingredientsReducer from '../features/ingredients/ingredientsSlice';

export const store = configureStore({
  reducer: {
    pizzas: pizzasReducer,
    pizzaTypes: pizzaTypesReducer,
    pizzaSizes: pizzaSizesReducer,
    ingredients: ingredientsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
