import { Ingredient } from './Ingredient';

export default interface IngredientsState {
  ingredients: Ingredient[],
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string
}
