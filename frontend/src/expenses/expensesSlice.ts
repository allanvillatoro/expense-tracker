import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Expense } from "../interfaces/Expense";
import { expensesApi } from "../api/expensesApi";
import { ExpensePost } from "../interfaces/ExpensePost";

export interface ExpenseState {
  expenses: Expense[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | undefined;
  errorOnCreating: string | undefined;
}

const initialState: ExpenseState = {
  expenses: [],
  status: "idle",
  error: undefined,
  errorOnCreating: undefined,
};

export const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<Expense>) => {
      state.expenses = [action.payload, ...state.expenses];
    },
    clearExpenses: (state) => {
      state.expenses = [];
      state.status = "idle";
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getExpensesByUser.pending, (state, action) => {
        state.status = "loading";
        state.error = undefined;
      })
      .addCase(getExpensesByUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = undefined;
        state.expenses = action.payload;
      })
      .addCase(getExpensesByUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(postExpense.pending, (state, action) => {
        state.errorOnCreating = undefined;
      })
      .addCase(postExpense.fulfilled, (state, action) => {
        state.expenses = [action.payload, ...state.expenses];
        state.errorOnCreating = undefined;
      })
      .addCase(postExpense.rejected, (state, action) => {
        state.errorOnCreating = "Error. Please check out your input data.";
      });
  },
});

// Action creators are generated for each case reducer function
export const { addExpense, clearExpenses } = expensesSlice.actions;

export default expensesSlice.reducer;

export const getExpensesByUser = createAsyncThunk(
  "expenses/getExpensesByUser",
  async (userId: string) => {
    const response = await expensesApi.getExpensesByUser(userId);
    return response.data as Expense[];
  }
);

export const postExpense = createAsyncThunk(
  "expenses/postExpense",
  async (expense: ExpensePost) => {
    const response = await expensesApi.postExpense(expense);
    return response.data as Expense;
  }
);
