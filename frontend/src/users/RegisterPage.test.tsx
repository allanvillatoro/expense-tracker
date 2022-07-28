import { render, screen } from "@testing-library/react";
import { RegisterPage } from "./RegisterPage";

test("should render RegisterPage", () => {
  render(<RegisterPage />);
  //screen.debug();
  expect(screen.getByText("RegisterPage")).toBeTruthy();
});
