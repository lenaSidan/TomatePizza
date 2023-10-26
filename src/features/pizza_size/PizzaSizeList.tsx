import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectPizzaSizes } from './types/selector';
import {
  createPizzaSizeAsync,
  deletePizzaSizeAsync,
  fetchAllPizzaSizes,
  updatePizzaSizeAsync,
} from './pizzaSizeSlice';
import styles from './PizzaSizeList.module.css';
import { PizzaSize } from './types/PizzaSize';

export default function PizzaSizeList(): JSX.Element {
  const dispatch = useAppDispatch();
  const pizzaSizes = useAppSelector(selectPizzaSizes);
  const [newPizzaSize, setNewPizzaSize] = useState({
    name: '',
    size: '',
  });
  const [editingPizzaSize, setEditingPizzaSize] = useState<PizzaSize | null>(null);

  useEffect(() => {
    dispatch(fetchAllPizzaSizes());
  }, [dispatch]);

  const startEditing = (pizzaSize: PizzaSize): void => {
    setEditingPizzaSize(pizzaSize);
  };

  const handleCreatePizzaSize = (): void => {
    dispatch(createPizzaSizeAsync(newPizzaSize));
    setNewPizzaSize({
      name: '',
      size: '',
    });
  };

  const handleDeletePizzaSize = (id: number): void => {
    dispatch(deletePizzaSizeAsync(id));
  };

  const handleUpdatePizzaSize = (): void => {
    if (editingPizzaSize) {
      dispatch(updatePizzaSizeAsync(editingPizzaSize)).then(() => {
        setEditingPizzaSize(null);
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2>New size of Pizza</h2>
        <input
          type="text"
          placeholder="Name"
          value={newPizzaSize.name}
          onChange={(e) => setNewPizzaSize({ ...newPizzaSize, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Size"
          value={newPizzaSize.size}
          onChange={(e) => setNewPizzaSize({ ...newPizzaSize, size: e.target.value })}
        />
        <div className={styles.buttonsContainer}>
          <button type="button" onClick={handleCreatePizzaSize} className={`${styles.createButton} ${styles.button}`}>
            Create
          </button>
        </div>
      </div>

      <ul className={styles.list}>
        {pizzaSizes.map((pizzaSize) => (
          <li key={pizzaSize.id} className={styles.listItem}>
            <div className={styles.itemContent}>
              {editingPizzaSize && editingPizzaSize.id === pizzaSize.id ? (
                <div>
                  <input
                    type="text"
                    placeholder="Name"
                    value={editingPizzaSize.name}
                    onChange={(e) =>
                      setEditingPizzaSize({ ...editingPizzaSize, name: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Size"
                    value={editingPizzaSize.size}
                    onChange={(e) =>
                      setEditingPizzaSize({ ...editingPizzaSize, size: e.target.value })}
                  />
                  <div className={styles.buttonsContainer}>
                    <button
                      type="button"
                      onClick={handleUpdatePizzaSize}
                      className={`${styles.saveButton} ${styles.button}`}
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div className={styles.displayContainer}>
                  <span className={styles.textContainer}>
                    {pizzaSize.name} - {pizzaSize.size}
                  </span>
                  <div className={styles.buttonsContainer}>
                      <button
                        type="button"
                        onClick={() => startEditing(pizzaSize)}
                        className={`${styles.editButton} ${styles.button}`}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeletePizzaSize(pizzaSize.id)}
                        className={`${styles.deleteButton} ${styles.button}`}
                      >
                        Delete
                      </button>
                  </div>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
