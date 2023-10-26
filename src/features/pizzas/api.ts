import Pizza from './types/Pizza';
import { PizzaDTO } from './types/PizzaDTO';

// GET
export async function getAllPizzas(): Promise<Pizza[]> {
  const res = await fetch('http://localhost:8080/pizza/all',
  { method: 'GET' });

  if (!res.ok) {
    throw new Error('An error occurred while executing the request');
  }

  return res.json();
}

// DELETE
export async function deletePizza(id: number): Promise<Pizza> {
  const res = await fetch(`http://localhost:8080/pizza/delete/${id}`, { method: 'DELETE' });

  if (!res.ok) {
    throw new Error('An error occurred while executing the request');
  }

  return res.json();
}

// POST
export async function createPizza(pizza: PizzaDTO): Promise<PizzaDTO> {
  const pizzaData = {
    id: pizza.id,
    pizzaTypeId: pizza.pizzaType.id,
    pizzaSizeId: pizza.pizzaSize.id,
    price: pizza.price
  };

  const res = await fetch('http://localhost:8080/pizza/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pizzaData),
  });

  if (!res.ok) {
    throw new Error('An error occurred while executing the request');
  }

  return res.json();
}

// PUT
export async function updatePizza(pizza: Pizza): Promise<Pizza> {
  const res = await fetch(`http://localhost:8080/pizza/update/${pizza.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pizza),
  });

  if (!res.ok) {
    throw new Error('An error occurred while executing the request');
  }

  return res.json();
}
