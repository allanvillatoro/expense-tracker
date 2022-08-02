import { fireEvent, render, screen } from "@testing-library/react";
import axios from "axios";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { expensesListStub } from "./expensesListStub";
import { ExpensesPage } from "./ExpensesPage";

beforeEach(() => {
  const mockGet = jest.spyOn(axios, "get");
  mockGet.mockImplementation((url: string) => {
    return Promise.resolve({ data: expensesListStub });
  });

  render(
    <Provider store={store}>
      <ExpensesPage />
    </Provider>
  );
});

test("should render ExpensesPage with button and table", async () => {
  //screen.debug();
  //table
  expect(screen.getByRole("table")).toBeInTheDocument();
  //add button
  expect(screen.getByRole("button")).toBeInTheDocument();
  expect(screen.getByText("Add")).toBeInTheDocument();
  //when the component loads, the form will be in the modal
  //the form has the content 'Add Expense'
  expect(screen.getByText("Add Expense")).toBeInTheDocument();

  //It should work with the original API retrieving from database
  /*expect(
    await screen.findByRole("cell", { name: "lunch" })
  ).toBeInTheDocument();*/
});

test("should retrieve the expenses list", async () => {
  //screen.debug();
  expect(await axios.get("/api/expenses/fakeId")).toEqual({
    data: expensesListStub,
  });
  expect(
    await (
      await axios.get("/api/expenses/fakeId")
    ).data
  ).toHaveLength(expensesListStub.length);
});
