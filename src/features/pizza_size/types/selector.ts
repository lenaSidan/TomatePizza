import { RootState } from '../../../app/store';
import { PizzaSize } from './PizzaSize';

export const selectPizzaSizes = (state: RootState): PizzaSize[] =>
state.pizzaSizes.pizzaSizes;

export const selectPizzaSizeError = (state: RootState):
 string | null => state.pizzaSizes.error;
