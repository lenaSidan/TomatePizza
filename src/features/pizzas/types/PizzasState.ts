import Pizza from './Pizza';

export default interface PizzasState {
  pizzas: Pizza[]
  error?: string
}
