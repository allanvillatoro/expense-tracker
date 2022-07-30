import { render, screen } from "@testing-library/react";
import { store } from "../app/store";
import { Provider } from "react-redux";
import { RegisterPage } from "./RegisterPage";
import { BrowserRouter } from "react-router-dom";

test("should render RegisterPage", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <RegisterPage />
      </BrowserRouter>
    </Provider>
  );
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
