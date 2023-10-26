export interface PizzaDTO {
  id?: number;
  name: string;
  size: string;
  description: string;
  price: number;
  delete: boolean;
  pizzaType: { id: number };
  pizzaSize: { id: number };
  ordered: boolean;
  deleted: boolean;
}
