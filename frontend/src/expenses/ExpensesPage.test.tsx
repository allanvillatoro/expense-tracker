import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { ExpensesPage } from "./ExpensesPage";

beforeEach(() => {
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