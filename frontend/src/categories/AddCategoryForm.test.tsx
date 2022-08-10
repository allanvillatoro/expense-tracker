import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { AddCategoryForm } from "./AddCategoryForm";


describe("AddCategoryForm", () => {

  beforeEach(() => {
    render(
      <Provider store={store}>
        <AddCategoryForm />
      </Provider>
    );
  })

  test("should render AddCategoryForm with form controls", () => {
    //form
    expect(screen.getByRole("form")).toBeInTheDocument();
    //description
    expect(screen.getAllByRole("textbox").length).toBe(1);
    //budget and alarmThreshold
    expect(screen.getAllByRole("spinbutton").length).toBe(2);
    //save button
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("should update the select and input values", async () => {
    //gets the categoryName input
    const categoryNameInput = screen.getByPlaceholderText(
      "Type a category with at least 1 character"
    );
    //types 'drinks' on the description input
    await act( async () => {
      userEvent.clear(categoryNameInput)
      userEvent.type(categoryNameInput, "drinks");
    })
    //description now displays drinks
    expect(categoryNameInput).toHaveValue("drinks");

    //gets the budget input
    const budgetInput = screen.getByLabelText(/Budget/)
    //types 400 into the budget input
    await act( async () => {
      userEvent.clear(budgetInput)
      userEvent.type(budgetInput, "400");
    })
    //budget now displays 4
    expect(budgetInput).toHaveValue(400);

    //gets the alarm input
    const alarmInput = screen.getByLabelText(/Alarm/)
    //clears and types 400 into the budget input
    await act( async () => {
      userEvent.clear(alarmInput)
      userEvent.type(alarmInput, "65");
    })
    //budget now displays 4
    expect(alarmInput).toHaveValue(65);
  })

})

