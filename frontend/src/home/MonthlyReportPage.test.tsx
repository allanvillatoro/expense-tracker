import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { categoriesApi } from "../api/categoriesApi";
import { store } from "../app/store";
import { MonthlyReportPage } from "./MonthlyReportPage";
import { categoriesListStub } from "../categories/categoriesListStub";
import { expensesApi } from "../api/expensesApi";
import { expensesListStub } from "../expenses/expensesListStub";
import { getCategoriesByUser } from "../categories/categoriesSlice";
import { getExpensesByUser } from "../expenses/expensesSlice";

jest.mock("react-chartjs-2", () => ({
  Bar: () => null,
}));

describe("MonthlyReportPage tests", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <MonthlyReportPage />
      </Provider>
    );
  });

  test("should render MonthlyReportPage", async () => {
    expect(screen.getByRole("combobox")).toHaveDisplayValue("Select a month");
    expect(screen.getAllByRole("option").length).toBe(2); //Select month and empty
  });

  test("should render the months list on the combobox", async () => {
    //mocks the postCategory function on categoriesApi
    jest.spyOn(categoriesApi, "getCategoriesByUser").mockResolvedValue({
      data: categoriesListStub,
      status: 200,
      statusText: "OK",
      headers: {},
      config: {},
    });

    //mocks the getExpensesByUser function on expensesApi
    jest.spyOn(expensesApi, "getExpensesByUser").mockResolvedValue({
      data: expensesListStub,
      status: 200,
      statusText: "OK",
      headers: {},
      config: {},
    });

    //updates the categories and expenses on the component
    await act(async () => {
      await store.dispatch(getCategoriesByUser("fakeId"));
      await store.dispatch(getExpensesByUser("fakeId"));
    });

    //should render the months on the combobox
    await act(async () => {
      const options = await screen.findAllByRole("option");
      expect(options.length).toBe(2); //Select month and 2022 - Jul
      expect(options[1]).toHaveTextContent("2022 - Jul")
    });

    //gets the select
    const select = screen.getByRole("combobox");
    const option = screen.getByRole("option", { name: "2022 - Jul" });

    //selects the drinks option
    await waitFor(() => {
      userEvent.selectOptions(select, option);
    })

    //select should now have the selected month
    expect(select).toHaveValue("2022 - Jul");
  });
});
