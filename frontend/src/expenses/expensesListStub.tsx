import { Expense } from "../interfaces/Expense";
import { expenseStub } from "./expenseStub";

const expenseStub2: Expense = {
  _id: "62e0153bafcf618b284ee5de",
  description: "Salad",
  categoryName: "food",
  amount: 150,
  date: new Date(2022, 6, 27),
  userId: "62e01522afcf618b284ee5d4",
};

const expenseStub3: Expense = {
  _id: "62e0153bafcf618b284ee5df",
  description: "Donuts",
  categoryName: "food",
  amount: 40,
  date: new Date(2022, 6, 27),
  userId: "62e01522afcf618b284ee5d4",
};

export const expensesListStub: Expense[] = [
  expenseStub,
  expenseStub2,
  expenseStub3,
];
