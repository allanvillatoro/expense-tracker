import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { ExpensesPage } from "./ExpensesPage";

test("renders ExpensesPage with button and table", async () => {
  render(
    <Provider store={store}>
      <ExpensesPage />
    </Provider>
  );
  //screen.debug();
  //table
  expect(screen.getByRole("table")).toBeInTheDocument();
  //add button
  expect(screen.getByRole("button")).toBeInTheDocument();
  expect(screen.getByText("Add")).toBeInTheDocument();
  //when the component loads, the form will be in the modal
  //the form has the content 'Add Expense'
  expect(screen.getByText("Add Expense")).toBeInTheDocument();

  //It should be used with mock data, and it should be logged in
  expect(
    await screen.findByRole("cell", { name: "lunch" })
  ).toBeInTheDocument();
});
