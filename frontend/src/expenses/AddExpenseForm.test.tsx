import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AddExpenseForm } from "./AddExpenseForm";
import { categoriesListStub } from "../categories/categoriesListStub";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { expenseStub } from './expenseStub';
import { expensesApi } from "../api/expensesApi";

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

  test("should change the select and input values", async () => {
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
      userEvent.clear(descriptionInput)
      userEvent.type(descriptionInput, "coffee");
    })
    
    //description now displays coffee
    expect(descriptionInput).toHaveValue("coffee");

    //gets the amount input
    const amountInput = screen.getByRole("spinbutton");
    //types 4 into the amount input
    await act( async () => {
      userEvent.clear(amountInput)
      userEvent.type(amountInput, "4.34");
    })
    //amount now displays 4
    expect(amountInput).toHaveValue(4.34);

    //gets the date input
    const dateInput = screen.getByLabelText(
      "Date"
    );

    //types 'August 10, 2022' on the description input
    await act( async () => {
      userEvent.clear(dateInput)
      userEvent.type(dateInput, "August 10, 2022");
    })
    
    //dateInput now displays August 10, 2022
    expect(dateInput).toHaveValue("August 10, 2022");
  });

  test("should save the expense clicking on Save button", async () => {
    //mocks the postExpense function on expensesApi
    const mock = jest.spyOn(expensesApi, "postExpense").mockResolvedValue({
      data: expenseStub,
      status: 201,
      statusText: "OK",
      headers: {},
      config: {},
    });

    //gets the Save button
    const saveButton = screen.getByText("Save");
    //click on Save button
    await act( async () => {
      userEvent.click(saveButton);
    })

    //wait until the Saved messaged appears
    await act( async () => {
      expect(screen.queryByText(/Saved/)).toBeTruthy();
    })
  })

});
