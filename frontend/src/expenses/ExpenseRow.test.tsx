import { render, screen } from "@testing-library/react";
import { ExpenseRow } from "./ExpenseRow";
import { expenseStub } from "./expenseStub";

test("should render ExpenseRow component with 4 cells", () => {
  render(
    <table>
      <tbody>
        <ExpenseRow expense={expenseStub} />
      </tbody>
    </table>
  );
  //screen.debug();
  //it contains 4 cells
  expect(screen.getAllByRole("cell").length).toBe(4);
  //it contains the word pizza
  expect(screen.getByText("Pizza")).toBeInTheDocument();
});
