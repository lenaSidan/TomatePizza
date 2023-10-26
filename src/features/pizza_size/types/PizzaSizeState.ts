import { PizzaSize } from './PizzaSize';

export default interface PizzaSizeState {
  pizzaSizes: PizzaSize[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string;
}
