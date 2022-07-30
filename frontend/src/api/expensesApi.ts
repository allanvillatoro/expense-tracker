import { Expense } from "../interfaces/Expense";
import { ExpensePost } from "../interfaces/ExpensePost";
import { apiConnection } from "./apiConnection";

export const expensesApi = {
  getExpensesByUser: async (userId: string) => {
    const url = `/expenses/${userId}`;
    const response = await apiConnection.get<Expense[]>(url);
    return response;
  },
  postExpense: async (expense: ExpensePost) => {
    const url = `/expenses`;
    const response = await apiConnection.post<Expense>(url, expense);
    return response;
  }
};
