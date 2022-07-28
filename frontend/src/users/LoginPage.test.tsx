import { render, screen } from "@testing-library/react";
import { LoginPage } from "./LoginPage";

test("should render LoginPage", () => {
  render(<LoginPage />);
  //screen.debug();
  //it contains a title Login
  expect(screen.getByRole("heading")).toHaveTextContent('Login')
  //it contains a form
  expect(screen.getByRole("form")).toBeInTheDocument();
  //it contains two textbox (email and password)
  expect(screen.getAllByRole("textbox").length).toBe(1);
  //it contains a login button
  expect(screen.getByRole("button")).toHaveTextContent('Login')
});
