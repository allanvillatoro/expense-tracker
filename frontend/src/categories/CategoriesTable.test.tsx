import { render, screen } from "@testing-library/react";
import { categoriesListStub } from './categoriesListStub';
import { CategoriesTable } from "./CategoriesTable";

test("renders CategoriesTable component with 3 rows", () => {
  render(<CategoriesTable categories={categoriesListStub} />);
  //screen.debug();
  //it contains 3 rows + 1 head row
  expect(screen.getAllByRole("row").length).toBe(categoriesListStub.length + 1);
  //it contains the word pizza
  expect(screen.getByText("food")).toBeTruthy();
  expect(screen.getByText("drinks")).toBeTruthy();
  expect(screen.getByText("gas")).toBeTruthy();
});