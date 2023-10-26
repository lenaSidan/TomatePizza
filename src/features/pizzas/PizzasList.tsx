import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectPizzas } from './types/selectors';
import { loadPizzas, createPizza, deletePizza } from './pizzasSlice';
import styles from './PizzaList.module.css';
import { PizzaDTO } from './types/PizzaDTO';
import { PizzaType } from '../pizza_type/types/PizzaType';
import { selectPizzaTypes } from '../pizza_type/types/selector';
import { selectPizzaSizes } from '../pizza_size/types/selector';
import { PizzaSize } from '../pizza_size/types/PizzaSize';

export default function PizzasList(): JSX.Element {
  const [selectedPizzaType, setSelectedPizzaType] = useState<PizzaType | null>(null);
  const [selectedPizzaSize, setSelectedPizzaSize] = useState<PizzaSize | null>(null);
  const pizzaTypes = useAppSelector(selectPizzaTypes);
  const pizzaSizes = useAppSelector(selectPizzaSizes);
  const pizzas = useAppSelector(selectPizzas);
  const dispatch = useAppDispatch();
  const [newPizza, setNewPizza] = useState<PizzaDTO>({
    name: '',
    size: '',
    description: '',
    price: 0,
    delete: false,
    pizzaType: { id: 0 },
    pizzaSize: { id: 0 },
    ordered: false,
    deleted: false,
  });

  useEffect(() => {
    dispatch(loadPizzas());
  }, [dispatch]);

  const handleCreatePizza = (): void => {
    if (selectedPizzaType !== null && selectedPizzaSize !== null) {
      const newPizzaData: PizzaDTO = {
        ...newPizza,
        pizzaType: selectedPizzaType,
        pizzaSize: selectedPizzaSize,
      };

      dispatch(createPizza(newPizzaData));

      setNewPizza({
        name: '',
        size: '',
        description: '',
        price: 0,
        delete: false,
        pizzaType: { id: 0 },
        pizzaSize: { id: 0 },
        ordered: false,
        deleted: false,
      });
    }
  };

  const handleDeletePizza = (id: number | undefined): void => {
    if (id !== undefined) {
      dispatch(deletePizza(id));
    }
  };

  return (
    <div className={styles.container}>
      <h1>Pizza</h1>
      <div className={styles['table-container']}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Size</th>
              <th>Description</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pizzas.map((pizza) => (
              <tr key={pizza.id}>
                <td>{pizza.name}</td>
                <td>{pizza.size}</td>
                <td>{pizza.description}</td>
                <td>{pizza.price}<span className={styles.currencySymbol}> €</span></td>
                <td>
                  <button
                    type="button"
                    onClick={() => handleDeletePizza(pizza.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2>Create New Pizza</h2>
<div className={styles['new-pizza-container']}>
  <div className={styles['select-container']}>
    <select
      value={selectedPizzaSize ? selectedPizzaSize.id : ''}
      onChange={(e) => {
        const selectedSize = pizzaSizes.find(
          (size) => size.id === Number(e.target.value)
        );
        setSelectedPizzaSize(selectedSize || null);
      }}
    >
      <option value="">Choose pizza size</option>
      {pizzaSizes.map((size) => (
        <option key={size.id} value={size.id}>
          {size.name}
        </option>
      ))}
    </select>
    <select
      value={selectedPizzaType ? selectedPizzaType.id : ''}
      onChange={(e) => {
        const selectedType = pizzaTypes.find(
          (type) => type.id === Number(e.target.value)
        );
        setSelectedPizzaType(selectedType || null);
      }}
    >
      <option value="">Choose pizza type</option>
      {pizzaTypes.map((type) => (
        <option key={type.id} value={type.id}>
          {type.name}
        </option>
      ))}
    </select>
    <input
      type="number"
      placeholder="Price"
      value={newPizza.price}
      onChange={(e) => setNewPizza({ ...newPizza, price: Number(e.target.value) })}
      step="0.01"
    />
    <button type="button" onClick={handleCreatePizza}>
    Create
    </button>
  </div>

</div>
    </div>
  );
}
