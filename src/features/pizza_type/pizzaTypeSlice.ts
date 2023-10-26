import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
 getAll, deletePizza, createPizza, updatePizza
} from './PizzaTypeApi';
import { PizzaType } from './types/PizzaType';
import { PizzaTypeDTO } from './types/PizzaTypeDTO';

export const fetchAllPizzaTypes = createAsyncThunk('pizzaTypes/fetchAll', async () => {
  const response = await getAll();
  return response;
});

export const deletePizzaType = createAsyncThunk('pizzaTypes/delete', async (id: number) => {
  const response = await deletePizza(id);
  return response;
});

export const createPizzaType = createAsyncThunk('pizzaTypes/create', async (pizzaType: PizzaTypeDTO) => {
  const response = await createPizza(pizzaType);
  return response;
});

export const updatePizzaType = createAsyncThunk('pizzaTypes/update', async (pizzaType: PizzaType) => {
  const response = await updatePizza(pizzaType);
  return response;
});

const initialState: { pizzaTypes: PizzaType[]; status: string; error: string } = {
  pizzaTypes: [],
  status: 'idle',
  error: '',
};

const pizzaTypeSlice = createSlice({
  name: 'pizzaTypes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPizzaTypes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllPizzaTypes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.pizzaTypes = action.payload;
      })
      .addCase(fetchAllPizzaTypes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'An error occurred';
      })
      .addCase(deletePizzaType.fulfilled, (state, action) => {
        state.pizzaTypes = state.pizzaTypes.filter((pizzaType) =>
        pizzaType.id !== action.payload.id);
      })
      .addCase(createPizzaType.fulfilled, (state, action) => {
        state.pizzaTypes.push(action.payload);
      })
      .addCase(updatePizzaType.fulfilled, (state, action) => {
       const index = state.pizzaTypes.findIndex((pizzaType) => pizzaType.id === action.payload.id);
        if (index !== -1) {
          state.pizzaTypes[index] = action.payload;
        }
      });
  },
});

export default pizzaTypeSlice.reducer;
