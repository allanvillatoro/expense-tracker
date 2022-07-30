import { render, screen, waitFor } from "@testing-library/react";
import { CategoriesPage } from "./CategoriesPage";
import { store } from "../app/store";
import { Provider } from "react-redux";

test("should render CategoriesPage", async () => {
  render(
    <Provider store={store}>
      <CategoriesPage />
    </Provider>
  );
  //screen.debug();
  //table
  expect(screen.getByRole("table")).toBeInTheDocument();
  //Add button
  expect(screen.getByRole("button")).toBeInTheDocument();
  expect(screen.getByText("Add")).toBeTruthy();

  //it should contain a cell with value "gas" from the mock
  expect(await screen.findByRole("cell", { name: "gas" })).toBeInTheDocument();
});
