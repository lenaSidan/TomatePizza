import { RootState } from '../../../app/store';
import Pizza from './Pizza';

export const selectPizzas = (state: RootState): Pizza[] => state.pizzas.pizzas;
export const selectError = (state: RootState): string | undefined => state.pizzas.error;
