import { render, screen } from "@testing-library/react";
import { ExpensesTable } from "./ExpensesTable";
import { expensesListStub } from "./expensesListStub";

test("renders ExpensesTable component with 3 row", () => {
  render(<ExpensesTable expenses={expensesListStub} />);
  //screen.debug();
  //it contains 3 rows + 1 head row
  expect(screen.getAllByRole("row").length).toBe(expensesListStub.length+1);
  //it contains the word pizza
  expect(screen.getByText("Pizza")).toBeTruthy();
  expect(screen.getByText("Donuts")).toBeTruthy();
  expect(screen.getByText("Salad")).toBeTruthy();
});
