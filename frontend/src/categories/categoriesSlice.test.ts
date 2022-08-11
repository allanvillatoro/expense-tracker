import { store } from "../app/store";
import { categoriesApi } from "../api/categoriesApi";
import { categoriesListStub } from "./categoriesListStub";
import { clearCategories, getCategoriesByUser, postCategory } from "./categoriesSlice";
import { Category } from "../interfaces/Category";
import { categoryStub } from "./categoryStub";
import categoriesReducer from './categoriesSlice';

const userId = "fakeId";

describe("categories redux state tests", () => {
  
  test("should initially set categories to an empty array", () => {
    const state = store.getState().categories;
    expect(state.categories).toEqual([]);
  });

  test("should be able to fetch the categories list for a specific user", async () => {
    //mocks the getCategoriesByUser on categoriesApi to return categoriesListStub
    const mock = jest
      .spyOn(categoriesApi, "getCategoriesByUser")
      .mockResolvedValue({
        data: categoriesListStub,
        status: 200,
        statusText: "OK",
        headers: {},
        config: {},
      });

    //calls the mock function
    const result = await store.dispatch(getCategoriesByUser(userId));

    const categories: Category[] = result.payload as Category[];
    expect(result.type).toBe("categories/getCategoriesByUser/fulfilled");
    //should return the categories list
    expect(categories).toEqual(categoriesListStub);

    //should update the store with the categories
    const state = store.getState().categories;
    expect(state).toEqual({
      categories,
      status: "succeeded",
      error: undefined,
      errorOnCreating: undefined,
    });
  });

  test("should be able to post a category for a specific user", async () => {
    //mocks the postCategory function on categoriesApi
    const mock = jest.spyOn(categoriesApi, "postCategory").mockResolvedValue({
      data: categoryStub,
      status: 201,
      statusText: "OK",
      headers: {},
      config: {},
    });

    //calls the mock function
    const result = await store.dispatch(postCategory(categoryStub));

    const newCategory: Category = result.payload as Category;
    expect(result.type).toBe("categories/postCategory/fulfilled");

    //should return the new category
    expect(newCategory).toEqual(categoryStub);

    const state = store.getState().categories;
    //store should have 4 categories (3 + 1 new) since redux calls implicitly calls get for the 3 previous categories
    expect(state.categories.length).toBe(categoriesListStub.length+1);
  });

  test("should be able to clear the categories array", () => {
    //gets the current state
    const state = store.getState().categories;
    //current state.categories should not be empty
    expect(state.categories.length).toBeGreaterThan(0);
    //get the actual state
    const actual = categoriesReducer(state,clearCategories());
    //actual state.categories should be empty
    expect(actual.categories.length).toBe(0);
  });
});
