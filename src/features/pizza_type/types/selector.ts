import { RootState } from '../../../app/store';
import { PizzaType } from './PizzaType';

export const selectPizzaTypes = (state: RootState): PizzaType[] => state.pizzaTypes.pizzaTypes;

export const selectPizzaTypeError = (state: RootState):
 string | null => state.pizzaTypes.error;
