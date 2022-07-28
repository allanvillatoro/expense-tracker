import { render, screen } from "@testing-library/react";
import { MonthlyReportPage } from "./MonthlyReportPage";

test("should render MonthlyReportPage", () => {
  render(<MonthlyReportPage />);
  //screen.debug();
  expect(screen.getByText("MonthlyReportPage")).toBeTruthy();
});
