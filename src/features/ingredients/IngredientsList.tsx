import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import styles from './IngredientsList.module.css';

import { Ingredient } from './types/Ingredient';
import { selectIngredients } from './types/selectors';
import {
  addIngredient,
  removeIngredient,
  editIngredient,
  loadIngredients,
} from './ingredientsSlice';
import IngredientDTO from './types/IngredientDTO';
import { selectPizzaSizes } from '../pizza_size/types/selector';
import { PizzaSize } from '../pizza_size/types/PizzaSize';

export default function IngredientsList(): JSX.Element {
  const dispatch = useAppDispatch();
  const ingredients = useAppSelector(selectIngredients);
  const pizzaSizes = useAppSelector(selectPizzaSizes);

  const [selectedPizzaSize, setSelectedPizzaSize] = useState<PizzaSize | null>(
    null,
  );
  const [newIngredient, setNewIngredient] = useState<IngredientDTO>({
    name: '',
    pizzaSizeId: 0,
    pizzaSize: '',
    description: '',
    price: 0,
  });
  const [editingIngredient, setEditingIngredient] = useState<Ingredient | null>(
    null,
  );

  useEffect(() => {
    dispatch(loadIngredients());
  }, [dispatch]);

  const startEditing = (ingredient: Ingredient): void => {
    setEditingIngredient(ingredient);
  };

  const handleCreateIngredient = (): void => {
    if (selectedPizzaSize) {
      dispatch(
        addIngredient({
          ...newIngredient,
          pizzaSizeId: selectedPizzaSize.id,
          pizzaSize: selectedPizzaSize.name,
        }),
      );
      setNewIngredient({
        name: '',
        pizzaSizeId: 0,
        pizzaSize: '',
        description: '',
        price: 0,
      });
    }
  };

  const handleDeleteIngredient = (id: number): void => {
    dispatch(removeIngredient(id));
  };

  const handleUpdateIngredient = useCallback((): void => {
    if (editingIngredient) {
      dispatch(editIngredient(editingIngredient));
      setEditingIngredient(null);
    }
  }, [dispatch, editingIngredient]);

  const handleCancelEdit = (): void => {
    setEditingIngredient(null);
  };

  return (
    <div className={styles.container}>
      <h1>Ingredients</h1>
      <div className={styles['table-container']}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Pizza size</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {ingredients.map((ingredient) => (
              <tr key={ingredient.id}>
                {editingIngredient && editingIngredient.id === ingredient.id ? (
                  <>
                    <td>
                      <input
                        type="text"
                        placeholder="Name"
                        value={editingIngredient.name}
                        onChange={(e) =>
                          setEditingIngredient({
                            ...editingIngredient,
                            name: e.target.value,
                          })}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        placeholder="Description"
                        value={editingIngredient.description}
                        onChange={(e) =>
                          setEditingIngredient({
                            ...editingIngredient,
                            description: e.target.value,
                          })}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        placeholder="Pizza Size"
                        value={editingIngredient.pizzaSize}
                        onChange={(e) =>
                          setEditingIngredient({
                            ...editingIngredient,
                            pizzaSize: e.target.value,
                          })}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        placeholder="Price"
                        value={editingIngredient.price}
                        onChange={(e) =>
                          setEditingIngredient({
                            ...editingIngredient,
                            price: parseFloat(e.target.value),
                          })}
                      />
                    </td>
                    <td>
                      <button type="button" onClick={handleUpdateIngredient}>
                        Save
                      </button>
                      <button type="button" onClick={handleCancelEdit}>
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{ingredient.name}</td>
                    <td>{ingredient.description}</td>
                    <td>{ingredient.pizzaSize}</td>
                    <td>{ingredient.price} €</td>
                    <td>
                      <button
                        type="button"
                        onClick={() => startEditing(ingredient)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          ingredient.id && handleDeleteIngredient(ingredient.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Add new ingredient</h2>
      <select
        value={selectedPizzaSize ? selectedPizzaSize.id : 0}
        onChange={(e) => {
          const selectedSize = pizzaSizes.find(
            (size) => size.id === Number(e.target.value),
          );
          setSelectedPizzaSize(selectedSize || null);
        }}
      >
        <option value="0">Choose pizza size</option>
        {pizzaSizes.map((size) => (
          <option key={size.id} value={size.id}>
            {size.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Name"
        value={newIngredient.name}
        onChange={(e) =>
          setNewIngredient({ ...newIngredient, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={newIngredient.description}
        onChange={(e) =>
          setNewIngredient({ ...newIngredient, description: e.target.value })}
      />
      <input
        type="number"
        placeholder="Price"
        value={newIngredient.price}
        onChange={(e) =>
          setNewIngredient({
            ...newIngredient,
            price: parseFloat(e.target.value),
          })}
      />
      <button type="button" onClick={handleCreateIngredient}>
        Add Ingredient
      </button>
    </div>
  );
}
