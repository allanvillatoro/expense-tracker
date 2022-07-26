import { act, render, screen } from "@testing-library/react";
import { store } from "../app/store";
import { Provider } from "react-redux";
import { LoginPage } from "./LoginPage";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("LoginPage tests", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );
  });

  test("should render LoginPage", () => {
    //screen.debug();
    //it contains a title Login
    expect(screen.getByRole("heading")).toHaveTextContent("Login");
    //it contains a form
    expect(screen.getByRole("form")).toBeInTheDocument();
    //it contains two textbox (email)
    expect(screen.getAllByRole("textbox").length).toBe(1);
    //it contains a login button
    expect(screen.getByRole("button")).toHaveTextContent("Login");
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

    //gets the password input
    const passwordInput = screen.getByLabelText("Password");
    //clears and types React2022 on the password input
    await act(async () => {
      userEvent.clear(passwordInput);
      userEvent.type(passwordInput, "React2022");
    });
    //passwordInput now displays React2022
    expect(passwordInput).toHaveValue("React2022");

    //screen.debug()
  });
});
