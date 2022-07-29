import { render, screen } from "@testing-library/react";
import { RegisterPage } from "./RegisterPage";

test("should render RegisterPage", () => {
  render(<RegisterPage />);
  //screen.debug();
  //it contains a title Login
  expect(screen.getByRole("heading")).toHaveTextContent('Create account')
  //it contains a form
  expect(screen.getByRole("form")).toBeInTheDocument();
  //it contains two textbox (fullName and email)
  expect(screen.getAllByRole("textbox").length).toBe(2);
  //it contains a login button
  expect(screen.getByRole("button")).toHaveTextContent('Register');
});
