import { PizzaType } from './PizzaType';

export default interface PizzaTypeState {
  pizzaTypes: PizzaType[];
  error?: string;
}
