import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
 createIngredient, deleteIngredient, getAllIngredients, updateIngredient
} from './ingredientApi';
import IngredientsState from './types/IngredientsState';
import IngredientDTO from './types/IngredientDTO';

export const loadIngredients = createAsyncThunk('ingredients/fetchAll', async () => {
  const response = await getAllIngredients();
  if (!response) {
    throw new Error('Failed to fetch ingredients');
  }
  return response;
});

export const addIngredient = createAsyncThunk('ingredients/add', async (ingredient: IngredientDTO) => {
  const response = await createIngredient(ingredient);
  if (!response) {
    throw new Error('Failed to add ingredient');
  }
  return response;
});

export const editIngredient = createAsyncThunk('ingredients/edit', async (ingredient: IngredientDTO) => {
  const response = await updateIngredient(ingredient);
  if (!response) {
    throw new Error('Failed to edit ingredient');
  }
  return response;
});

export const removeIngredient = createAsyncThunk('ingredients/delete', async (id: number) => {
  const response = await deleteIngredient(id);
  if (!response) {
    throw new Error('Failed to delete ingredient');
  }
  return response;
});
const initialState: IngredientsState = {
  ingredients: [],
  status: 'idle',
  error: ''
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadIngredients.pending, (state) => {
        state.status = 'loading';
      })
    .addCase(loadIngredients.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.ingredients = action.payload;
    })
    .addCase(loadIngredients.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    })
   .addCase(addIngredient.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(addIngredient.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.ingredients.push(action.payload);
    })
    .addCase(addIngredient.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    })
    .addCase(editIngredient.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(editIngredient.fulfilled, (state, action) => {
      state.status = 'succeeded';
      const index = state.ingredients.findIndex((ing) => ing.id === action.payload.id);
      if (index !== -1) {
        state.ingredients[index] = action.payload;
      }
    })
    .addCase(editIngredient.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    })
    .addCase(removeIngredient.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(removeIngredient.fulfilled, (state, action) => {
      state.ingredients = state.ingredients.filter((ing) =>
      ing.id !== action.payload.id);
    })
    .addCase(removeIngredient.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  },
});

export default ingredientsSlice.reducer;
