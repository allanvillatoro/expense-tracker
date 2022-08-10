import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { MonthlyReportPage } from "./MonthlyReportPage";

jest.mock("react-chartjs-2", () => ({
  Bar: () => null,
}));

test("should render MonthlyReportPage", () => {
  render(
    <Provider store={store}>
      <MonthlyReportPage />
    </Provider>
  );
  //screen.debug();
  expect(screen.getByRole("combobox")).toHaveDisplayValue("Select a month");
  expect(screen.getAllByRole("option").length).toBe(2);
});
