import { act, render, screen } from "@testing-library/react";
import { store } from "../app/store";
import { Provider } from "react-redux";
import { RegisterPage } from "./RegisterPage";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("RegisterPage tests", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <RegisterPage />
        </BrowserRouter>
      </Provider>
    );
  });

  test("should render RegisterPage", () => {
    //screen.debug();
    //it contains a title Login
    expect(screen.getByRole("heading")).toHaveTextContent("Create account");
    //it contains a form
    expect(screen.getByRole("form")).toBeInTheDocument();
    //it contains two textbox (fullName and email)
    expect(screen.getAllByRole("textbox").length).toBe(2);
    //it contains a login button
    expect(screen.getByRole("button")).toHaveTextContent("Register");
  });

  test("should update the input values", async () => {
    //gets the email input
    const emailInput = screen.getByLabelText("Email");
    //types 'jose@react.com' on the email input
    await act(async () => {
      userEvent.type(emailInput, "jose@react.com");
    });
    //email now displays jose@react.com
    expect(emailInput).toHaveValue("jose@react.com");

    //gets the full name input
    const fullNameInput = screen.getByLabelText("Full Name");
    //types Allan into the full name input
    await act(async () => {
      userEvent.type(fullNameInput, "Allan");
    });
    //full name now displays Allan
    expect(fullNameInput).toHaveValue("Allan");

    //gets the password input
    const passwordInput = screen.getByLabelText("Password");
    //clears and types React2022 into the password input
    await act(async () => {
      userEvent.clear(passwordInput);
      userEvent.type(passwordInput, "React2022");
    });
    //passwordInput now displays React2022
    expect(passwordInput).toHaveValue("React2022");

    //gets the confirm password input
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");
    //clears and types React2022 on the confirm password input
    await act(async () => {
      userEvent.clear(confirmPasswordInput);
      userEvent.type(confirmPasswordInput, "React2022");
    });
    //confirmPasswordInput now displays React2022
    expect(confirmPasswordInput).toHaveValue("React2022");

    //screen.debug()
  });
});
