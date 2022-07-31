import { render, screen } from "@testing-library/react";
import { AboutPage } from "./AboutPage";

test("should render MonthlyReportPage", () => {
  render(
      <AboutPage />
  );
  //screen.debug();
  expect(screen.getByText("About")).toBeTruthy();
  expect(screen.getByRole("img")).toBeInTheDocument();
});
