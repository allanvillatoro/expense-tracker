import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { AddCategoryForm } from "./AddCategoryForm";

test("renders AddCategoryForm with form controls", () => {

  render(
    <Provider store={store}>
      <AddCategoryForm />
    </Provider>
  );
  
  //screen.debug();
  //form
  expect(screen.getByRole("form")).toBeInTheDocument();
  //description
  expect(screen.getAllByRole("textbox").length).toBe(1);
  //budget and alarmThreshold
  expect(screen.getAllByRole("spinbutton").length).toBe(2);
  //save button
  expect(screen.getByRole("button")).toBeTruthy();
});