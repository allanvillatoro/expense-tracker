import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { CategoriesPage } from "./CategoriesPage";
import { store } from "../app/store";

beforeEach(async () => {
  render(
    <Provider store={store}>
      <CategoriesPage />
    </Provider>
  );
});

test("should render CategoriesPage", async () => {
  //screen.debug();
  //table
  expect(screen.getByRole("table")).toBeInTheDocument();
  //Add button
  expect(screen.getByRole("button")).toBeInTheDocument();
  expect(screen.getByText("Add")).toBeInTheDocument();

  expect(screen.getByText("Add Category")).toBeInTheDocument();

  //It should work with the original API retrieving from database
  //expect(await screen.findByRole("cell", { name: "food" })).toBeInTheDocument();
});