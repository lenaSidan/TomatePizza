import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PizzaSizeDTO } from './types/PizzaSizeDTO';
import {
 createPizzaSize, deletePizzaSize, getAllSizes, updatePizzaSize
} from './PizzaSizeApi';

import PizzaSizeState from './types/PizzaSizeState';
import { PizzaSize } from './types/PizzaSize';

export const fetchAllPizzaSizes = createAsyncThunk('pizzaSizes/fetchAll', async () => {
  const response = await getAllSizes();
  if (!response) {
    throw new Error('Failed to fetch size');
  }
  return response;
});

export const createPizzaSizeAsync = createAsyncThunk('pizzaSizes/create', async (pizzaSize: PizzaSizeDTO) => {
  const response = await createPizzaSize(pizzaSize);
  return response;
});

export const deletePizzaSizeAsync = createAsyncThunk('pizzaSizes/delete', async (id: number) => {
  try {
    await deletePizzaSize(id);
    return { id };
  } catch (error) {
    throw new Error('Failed to delete ingredient');
  }
});

export const updatePizzaSizeAsync = createAsyncThunk('pizzaSizes/update', async (pizzaSize: PizzaSizeDTO) => {
  // Check if id is present
  if (pizzaSize.id === undefined) {
    throw new Error('Pizza size ID is missing');
  }

  // Since you've done the check, you can now safely cast pizzaSize to PizzaSize type
  const response = await updatePizzaSize(pizzaSize as PizzaSize);
  if (!response) {
    throw new Error('Failed to edit size');
  }
  return response;
});

const initialState: PizzaSizeState = {
  pizzaSizes: [],
  status: 'idle',
  error: '',
};

const pizzaSizesSlice = createSlice({
  name: 'pizzaSizes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPizzaSizes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllPizzaSizes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.pizzaSizes = action.payload;
      })
      .addCase(fetchAllPizzaSizes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createPizzaSizeAsync.fulfilled, (state, action) => {
        state.pizzaSizes.push(action.payload);
      })
      .addCase(deletePizzaSizeAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deletePizzaSizeAsync.fulfilled, (state, action) => {
        state.pizzaSizes = state.pizzaSizes.filter((pz) =>
        pz.id !== action.payload.id);
      })
      .addCase(deletePizzaSizeAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updatePizzaSizeAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updatePizzaSizeAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.pizzaSizes.findIndex((pz) => pz.id === action.payload.id);
        if (index !== -1) {
          state.pizzaSizes[index] = action.payload;
        }
      })
      .addCase(updatePizzaSizeAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default pizzaSizesSlice.reducer;
