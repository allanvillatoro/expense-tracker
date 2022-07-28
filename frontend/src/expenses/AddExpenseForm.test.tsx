import { render, screen } from "@testing-library/react";
import { AddExpenseForm } from "./AddExpenseForm";
import { categoriesListStub } from "../categories/categoriesListStub";

test("renders AddExpenseForm with form controls", () => {
  render(
    <AddExpenseForm
      categories={categoriesListStub.map((category) => category.name)}
    />
  );
  //screen.debug();
  //form
  expect(screen.getByRole("form")).toBeInTheDocument();
  //description and date
  expect(screen.getAllByRole("textbox").length).toBe(2);
  //amount
  expect(screen.getByRole("spinbutton")).toBeTruthy();
  //category
  expect(screen.getByRole("combobox")).toBeTruthy();
  //save button
  expect(screen.getByRole("button")).toBeTruthy();
});
