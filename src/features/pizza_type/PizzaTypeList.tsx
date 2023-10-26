import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  createPizzaType,
  updatePizzaType,
  deletePizzaType,
  fetchAllPizzaTypes,
} from './pizzaTypeSlice';
import { PizzaType } from './types/PizzaType';

import { selectPizzaTypes } from './types/selector';

import styles from './PizzaTypeList.module.css';

export default function PizzaTypeList(): JSX.Element {
  const dispatch = useAppDispatch();
  const pizzaTypes = useAppSelector(selectPizzaTypes);
  const [newPizzaType, setNewPizzaType] = useState({
    name: '',
    description: '',
    pathImage: '',
  });
  const [editingPizzaType, setEditingPizzaType] = useState<PizzaType | null>(null);

  useEffect(() => {
    dispatch(fetchAllPizzaTypes());
  }, [dispatch]);

  const startEditing = (pizzaType: PizzaType): void => {
    setEditingPizzaType(pizzaType);
  };

  const handleCreatePizzaType = (): void => {
    dispatch(createPizzaType(newPizzaType));
    setNewPizzaType({
      name: '',
      description: '',
      pathImage: '',
    });
  };

  const handleUpdatePizzaType = (): void => {
    if (editingPizzaType) {
      dispatch(updatePizzaType(editingPizzaType));
      setEditingPizzaType(null);
    }
  };

  const handleDeletePizzaType = (id: number): void => {
    dispatch(deletePizzaType(id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2>New type of Pizza</h2>
        <input
          type="text"
          placeholder="Name"
          value={newPizzaType.name}
          onChange={(e) =>
            setNewPizzaType({ ...newPizzaType, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newPizzaType.description}
          onChange={(e) =>
            setNewPizzaType({ ...newPizzaType, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="pathImage"
          value={newPizzaType.pathImage}
          onChange={(e) =>
            setNewPizzaType({ ...newPizzaType, pathImage: e.target.value })}
        />
        <button
          type="button"
          onClick={handleCreatePizzaType}
          className={`${styles.createButton} ${styles.button}`}
        >
          create
        </button>
      </div>

      <ul className={styles.list}>
        {pizzaTypes.map((pizzaType) => (
          <li key={pizzaType.id} className={styles.listItem}>
            <div className={styles.itemContent}>
              {editingPizzaType && editingPizzaType.id === pizzaType.id ? (
                <div className={styles.editingContainer}>
                  <input
                    type="text"
                    placeholder="Name"
                    value={editingPizzaType.name}
                    onChange={(e) =>
                      setEditingPizzaType({ ...editingPizzaType, name: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Description"
                    value={editingPizzaType.description}
                    onChange={(e) =>
                      setEditingPizzaType({ ...editingPizzaType, description: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="pathImage"
                    value={editingPizzaType.pathImage}
                    onChange={(e) =>
                      setEditingPizzaType({ ...editingPizzaType, pathImage: e.target.value })}
                  />
                  <button
                    type="button"
                    onClick={handleUpdatePizzaType}
                    className={`${styles.saveButton} ${styles.button}`}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className={styles.displayContainer}>
                  <span>
                    {pizzaType.name} - {pizzaType.description}
                  </span>
                  <div className={styles.buttonsContainer}>
                    <button
                      type="button"
                      className={styles.editButton}
                      onClick={() => startEditing(pizzaType)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className={styles.deleteButton}
                      onClick={() => handleDeletePizzaType(pizzaType.id)}
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
