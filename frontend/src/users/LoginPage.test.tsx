import { render, screen } from "@testing-library/react";
import { store } from "../app/store";
import { Provider } from "react-redux";
import { LoginPage } from "./LoginPage";
import { BrowserRouter } from "react-router-dom";

test("should render LoginPage", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    </Provider>
  );
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
