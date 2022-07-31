import { render, screen } from "@testing-library/react";
import { AddExpenseForm } from "./AddExpenseForm";
import { categoriesListStub } from "../categories/categoriesListStub";
import { Provider } from "react-redux";
import { store } from "../app/store";
import userEvent from "@testing-library/user-event";

test("renders AddExpenseForm with form controls", () => {
  render(
    <Provider store={store}>
      <AddExpenseForm
        categories={categoriesListStub.map((category) => category.name)}
      />
    </Provider>
  );
  //screen.debug();
  //form
  expect(screen.getByRole("form")).toBeInTheDocument();
  //description and date
  expect(screen.getAllByRole("textbox").length).toBe(2);
  //amount
  expect(screen.getByRole("spinbutton")).toBeInTheDocument();
  //category
  expect(screen.getByRole("combobox")).toBeInTheDocument();

  //it contains the options for the combobox
  expect(screen.getAllByRole("option").length).toBe(
    categoriesListStub.length + 1
  );
  expect(screen.getByRole("combobox")).toHaveDisplayValue("Select a category");
  //save button
  expect(screen.getByRole("button")).toBeInTheDocument();
});
