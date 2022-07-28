import { render, screen } from "@testing-library/react";
import { ExpensesPage } from "./ExpensesPage";

test("renders ExpensesPage with button and table", () => {
  render(<ExpensesPage />);
  //screen.debug();
  //table
  expect(screen.getByRole("table")).toBeInTheDocument();
  //when the component loads, the form won't appear
  //expect(screen.getByRole("form")).toBeInTheDocument();
  //add button
  expect(screen.getByRole("button")).toBeInTheDocument();
  expect(screen.getByText("Add")).toBeTruthy();
});
