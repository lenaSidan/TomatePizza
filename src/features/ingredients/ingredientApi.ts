import { Ingredient } from './types/Ingredient';
import IngredientDTO from './types/IngredientDTO';

export async function getAllIngredients(): Promise<Ingredient[]> {
    const res = await fetch('http://localhost:8080/ingredient/all',
    { method: 'GET' });
    if (!res.ok) {
      throw new Error('Failed to fetch ingredients');
    }
    return res.json();
  }

  // POST
export async function createIngredient(ingredient: IngredientDTO): Promise<IngredientDTO> {
  const ingredientData = {
    id: ingredient.id,
    name: ingredient.name,
    pizzaSizeId: ingredient.pizzaSizeId,
    pizzaSize: ingredient.pizzaSize,
    description: ingredient.description,
    price: ingredient.price

  };
  const res = await fetch('http://localhost:8080/ingredient/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(ingredientData)
  });

    if (!res.ok) {
      throw new Error('Failed to create ingredient');
    }

    return res.json();
}

// PUT
export async function updateIngredient(ingredient: Ingredient): Promise<Ingredient> {
  const res = await fetch('http://localhost:8080/ingredient/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(ingredient)
  });

  const data = await res.json();
  if (!res.ok) {
   throw new Error('Failed to update ingredient');
  }

  return data;
}

// DELETE
export async function deleteIngredient(id: number): Promise<Ingredient> {
    const res = await fetch(`http://localhost:8080/ingredient/delete/${id}`, {
      method: 'DELETE'
    });

    if (!res.ok) {
      throw new Error('Could not remove ingredient');
    }

  return res.json();
  }
