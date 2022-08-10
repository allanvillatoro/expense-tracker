import { act, render, screen, waitFor } from "@testing-library/react";
import { AddExpenseForm } from "./AddExpenseForm";
import { categoriesListStub } from "../categories/categoriesListStub";
import { Provider } from "react-redux";
import { store } from "../app/store";
import userEvent from "@testing-library/user-event";

describe("AddExpenseForm", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <AddExpenseForm
          categoriesList={categoriesListStub.map((category) => category.name)}
        />
      </Provider>
    );
  });

  test("should render AddExpenseForm with form controls", () => {
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
    expect(screen.getByRole("combobox")).toHaveDisplayValue(
      "Select a category"
    );
    //save button
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("should update the select and input values", async () => {
    //gets the select
    const select = screen.getByRole("combobox");
    const option = screen.getByRole("option", { name: "drinks" });

    //selects the drinks option
    await act( async () => {
      userEvent.selectOptions(select, option);
    })
    
    //should now displays the drinks option
    expect(screen.getByRole("combobox")).toHaveValue("drinks");

    //in order to make this work, html input element has to contain aria-label="description"
    //const selectDescription = screen.getByRole("textbox",{name: "description"})

    //gets the description input
    const descriptionInput = screen.getByPlaceholderText(
      "Type a description with at least 1 character"
    );

    //types 'coffee' on the description input
    await act( async () => {
      userEvent.type(descriptionInput, "coffee");
    })
    
    //description now displays coffee
    expect(descriptionInput).toHaveValue("coffee");

    //gets the amount input
    const amountInput = screen.getByRole("spinbutton");
    //types 4 into the amount input
    await act( async () => {
      userEvent.type(amountInput, "4");
    })
    //amount now displays 4
    expect(amountInput).toHaveValue(4);
  });
});
