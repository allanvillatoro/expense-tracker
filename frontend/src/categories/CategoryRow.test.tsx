import { render, screen } from "@testing-library/react";
import { CategoryRow } from './CategoryRow';
import { categoryStub } from './categoryStub';

test("renders CategoryRow component with 3 cells", () => {
  render(
    <table>
      <tbody>
        <CategoryRow category={categoryStub} />
      </tbody>
    </table>
  );
  //screen.debug();
  //it contains 3 cells
  expect(screen.getAllByRole("cell").length).toBe(3);
  //it contains the word pizza
  expect(screen.getByText("food")).toBeInTheDocument();
});
