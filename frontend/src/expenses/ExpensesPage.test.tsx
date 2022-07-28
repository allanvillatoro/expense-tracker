import { render, screen } from "@testing-library/react";
import { ExpensesPage } from "./ExpensesPage";

test("renders ExpensesPage with button and table", () => {
  render(<ExpensesPage />);
  screen.debug();
  expect(screen.getByRole("table")).toBeInTheDocument();
  expect(screen.getByRole("button")).toBeInTheDocument();
  expect(screen.getByText("Add")).toBeTruthy();
});
