import { render, screen } from "@testing-library/react";
import { CategoriesPage } from "./CategoriesPage";

test("should render CategoriesPage", () => {
  render(<CategoriesPage />);
  //screen.debug();
  //table
  expect(screen.getByRole("table")).toBeInTheDocument();
  //Add button
  expect(screen.getByRole("button")).toBeInTheDocument();
  expect(screen.getByText("Add")).toBeTruthy();
});
