import { PizzaType } from './types/PizzaType';
import { PizzaTypeDTO } from './types/PizzaTypeDTO';

// GET
export async function getAll(): Promise<PizzaType[]> {
  const res = await fetch('http://localhost:8080/type/all');
  return res.json();
}

// DELETE
export async function deletePizza(id: number): Promise<PizzaType> {
  const res = await fetch(`http://localhost:8080/type/delete/${id}`, {
    method: 'DELETE',
  });
  return res.json();
}

// POST
export async function createPizza(pizzaType: PizzaTypeDTO): Promise<PizzaType> {
  const res = await fetch('http://localhost:8080/type/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pizzaType),
  });

  if (!res.ok) {
     throw new Error('PizzaType konnte nicht erstellt werden');
  }

  return res.json();
}

// PUT
export async function updatePizza(pizzaType: PizzaType): Promise<PizzaType> {
  const response = await fetch('http://localhost:8080/type/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pizzaType)
  });

  if (response.ok) {
    return response.json();
  }
    throw new Error('Failed to update pizza type');
}
