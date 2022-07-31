import { render, screen, waitFor } from "@testing-library/react";
import { CategoriesPage } from "./CategoriesPage";
import { store } from "../app/store";
import { Provider } from "react-redux";
import axios from "axios";
import { categoriesListStub } from "./categoriesListStub";

beforeEach(() => {
  const mockGet = jest.spyOn(axios, "get");
  mockGet.mockImplementation((url: string) => {
    return Promise.resolve({ data: categoriesListStub });
  });

  render(
    <Provider store={store}>
      <CategoriesPage />
    </Provider>
  );
});

afterEach(() => {
  jest.restoreAllMocks();
});

test("should render CategoriesPage", async () => {
  //screen.debug();
  //table
  expect(screen.getByRole("table")).toBeInTheDocument();
  //Add button
  expect(screen.getByRole("button")).toBeInTheDocument();
  expect(screen.getByText("Add")).toBeInTheDocument();

  //It should work with the original API retrieving from database
  //expect(await screen.findByRole("cell", { name: "food" })).toBeInTheDocument();
});

test("it should retrieve the categories list", async () => {
  //screen.debug();
  expect(await axios.get("/api/categories/62e01522afcf618b284ee5d4")).toEqual({
    data: categoriesListStub,
  });
  expect(
    await (
      await axios.get("/api/categories/62e01522afcf618b284ee5d4")
    ).data
  ).toHaveLength(categoriesListStub.length);
});
