import { PizzaSize } from './types/PizzaSize';
import { PizzaSizeDTO } from './types/PizzaSizeDTO';

// GET
export async function getAllSizes(): Promise<PizzaSize[]> {
  const res = await fetch('http://localhost:8080/size/all');
  return res.json();
}

// POST
export async function createPizzaSize(pizzaSize: PizzaSizeDTO): Promise<PizzaSize> {
  const res = await fetch('http://localhost:8080/size/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pizzaSize),
  });

  if (!res.ok) {
    throw new Error('Pizza size could not be created');
  }
  return res.json();
}

// PUT
export async function updatePizzaSize(pizzaSize: PizzaSize): Promise<PizzaSize> {
  const res = await fetch('http://localhost:8080/size/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pizzaSize),
  });

  if (!res.ok) {
    throw new Error('Pizza size could not be updated');
  }
  return res.json();
}

// DELETE
export async function deletePizzaSize(id: number): Promise<void> {
  const res = await fetch(`http://localhost:8080/size/delete/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error('Pizza size could not be deleted');
  }
}
