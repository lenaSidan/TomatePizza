import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import PizzasState from './types/PizzasState';
import * as api from './api';
import { PizzaDTO } from './types/PizzaDTO';

const initialState: PizzasState = {
  pizzas: [],
};

export const loadPizzas = createAsyncThunk('pizzas/loadPizzas',
  () => api.getAllPizzas(),
);

export const deletePizza = createAsyncThunk('pizzas/deletePizza',
  (id:number) => api.deletePizza(id),
);

export const createPizza = createAsyncThunk('pizzas/createPizza',
  async (newPizza: PizzaDTO) => {
    const createdPizza = await api.createPizza(newPizza);
    return createdPizza;
  },
);

const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadPizzas.fulfilled, (state, action) => {
        state.pizzas = action.payload;
      })
      .addCase(deletePizza.fulfilled, (state, action) => {
        state.pizzas = state.pizzas.filter((pizza) => pizza.id !== action.payload.id);
      })
      .addCase(createPizza.fulfilled, (state, action) => {
        state.pizzas.push(action.payload);
      });
  },
});

export default pizzasSlice.reducer;
