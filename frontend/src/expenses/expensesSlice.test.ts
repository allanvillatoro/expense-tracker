import { expensesApi } from "../api/expensesApi";
import { store } from "../app/store";
import { Expense } from "../interfaces/Expense";
import { expensesListStub } from "./expensesListStub";
import { clearExpenses, getExpensesByUser, postExpense } from "./expensesSlice";
import { expenseStub } from "./expenseStub";
import expensesReducer from './expensesSlice';

const userId = "fakeId";

describe("expenses redux state tests", () => {
  
  test("should initially set expenses to an empty array", () => {
    const state = store.getState().expenses;
    expect(state.expenses).toEqual([]);
  });

  test("should be able to fetch the expenses list for a specific user", async () => {
    //mocks the getExpensesByUser on expensesApi to return expensesListStub
    const mock = jest
      .spyOn(expensesApi, "getExpensesByUser")
      .mockResolvedValue({
        data: expensesListStub,
        status: 200,
        statusText: "OK",
        headers: {},
        config: {},
      });

    //calls the mock function
    const result = await store.dispatch(getExpensesByUser(userId));

    const expenses: Expense[] = result.payload as Expense[];
    expect(result.type).toBe("expenses/getExpensesByUser/fulfilled");
    //should return the expenses list
    expect(expenses).toEqual(expensesListStub);

    //should update the store with the expenses
    const state = store.getState().expenses;
    expect(state).toEqual({
      expenses,
      status: "succeeded",
      error: undefined,
      errorOnCreating: undefined,
    });
  });

  test("should be able to post a expense for a specific user", async () => {
    //mocks the postExpense function on expensesApi
    const mock = jest.spyOn(expensesApi, "postExpense").mockResolvedValue({
      data: expenseStub,
      status: 201,
      statusText: "OK",
      headers: {},
      config: {},
    });

    //calls the mock function
    const result = await store.dispatch(postExpense(expenseStub));

    const newExpense: Expense = result.payload as Expense;
    expect(result.type).toBe("expenses/postExpense/fulfilled");

    //should return the new expense
    expect(newExpense).toEqual(expenseStub);

    const state = store.getState().expenses;
    //store should have 4 expenses (3 + 1 new) since redux calls implicitly calls get for the 3 previous expenses
    expect(state.expenses.length).toBe(expensesListStub.length+1);
  });

  test("should be able to clear the expenses array", () => {
    //gets the current state
    const state = store.getState().expenses;
    //current state should be logged in
    expect(state.expenses.length).toBeGreaterThan(0);
    //get the actual state
    const actual = expensesReducer(state,clearExpenses());
    //actual should not be logged in
    expect(actual.expenses.length).toBe(0);
  });
});
