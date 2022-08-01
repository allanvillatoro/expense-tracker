import { render, screen } from "@testing-library/react";
import { store } from "../app/store";
import { Provider } from "react-redux";
import { MonthlyReportPage } from "./MonthlyReportPage";

test("should render MonthlyReportPage", () => {
  render(
    <Provider store={store}>
      <MonthlyReportPage />
    </Provider>
  );
  //screen.debug();
  //expect(screen.getByText("MonthlyReportPage")).toBeTruthy();
});
