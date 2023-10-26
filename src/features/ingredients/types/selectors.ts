import { RootState } from '../../../app/store';
import { Ingredient } from './Ingredient';

export const selectIngredients = (state: RootState): Ingredient[] => state.ingredients.ingredients;
export const selectError = (state: RootState): string | undefined => state.ingredients.error;
