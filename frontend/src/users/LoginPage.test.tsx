import { render, screen } from "@testing-library/react";
import { LoginPage } from "./LoginPage";

test("should render LoginPage", () => {
  render(<LoginPage />);
  //screen.debug();
  expect(screen.getByText("LoginPage")).toBeTruthy();
});
