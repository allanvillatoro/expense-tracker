import { render, screen } from "@testing-library/react";
import { CategoriesPage } from "./CategoriesPage";

test("should render CategoriesPage", () => {
  render(<CategoriesPage />);
  //screen.debug();
  expect(screen.getByText("CategoriesPage")).toBeTruthy();
});
