import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { ExpensesPage } from "./ExpensesPage";

test("renders ExpensesPage with button and table", () => {
  render(
    <Provider store={store}>
      <ExpensesPage />
    </Provider>
  );

  //screen.debug();
  //table
  expect(screen.getByRole("table")).toBeInTheDocument();
  //when the component loads, the form won't appear
  //expect(screen.getByRole("form")).toBeInTheDocument();
  //add button
  expect(screen.getByRole("button")).toBeInTheDocument();
  expect(screen.getByText("Add")).toBeTruthy();
});
