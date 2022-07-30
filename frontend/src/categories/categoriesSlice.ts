import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Category } from "../interfaces/Category";
import { categoriesApi } from "../api/categoriesApi";
import { CategoryPost } from "../interfaces/CategoryPost";

export interface CategoryState {
  categories: Category[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | undefined;
  errorOnCreating: string | undefined;
}

const initialState: CategoryState = {
  categories: [],
  status: "idle",
  error: undefined,
  errorOnCreating: undefined
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<Category>) => {
      state.categories = [action.payload, ...state.categories];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategoriesByUser.pending, (state, action) => {
        state.status = "loading";
        state.error = undefined;
      })
      .addCase(getCategoriesByUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = undefined;
        state.categories = action.payload;
      })
      .addCase(getCategoriesByUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(postCategory.pending, (state, action) => {
        state.errorOnCreating = undefined;
      })
      .addCase(postCategory.fulfilled, (state, action) => {
        state.categories = [action.payload, ...state.categories];
        state.errorOnCreating = undefined;
      })
      .addCase(postCategory.rejected, (state, action) => {
        state.errorOnCreating = 'Error. Please check out that category does not already exist.';
      })
  },
});

// Action creators are generated for each case reducer function
export const { addCategory } = categoriesSlice.actions;

export default categoriesSlice.reducer;

export const getCategoriesByUser = createAsyncThunk(
  "categories/getCategoriesByUser",
  async (userId: string) => {
    const response = await categoriesApi.getCategoriesByUser(userId);
    return response.data as Category[];
  }
);

export const postCategory = createAsyncThunk(
  "categories/postCategory",
  async (category: CategoryPost) => {
    const response = await categoriesApi.postCategory(category);
    return response.data as Category;
  }
);
