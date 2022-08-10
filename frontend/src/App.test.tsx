import { act, render, screen } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { UserLoginForm } from "./interfaces/UserPost";
import { login } from "./users/usersSlice";
import { User } from "./interfaces/User";
import { usersApi } from "./api/usersApi";
import userEvent from "@testing-library/user-event";

const fakeLoggedUser: User = {
  _id: "fakeId",
  email: "tom@react.com",
  fullName: "Tom Johnson",
};

test("should render App component", async () => {
  //renders the app component
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  //mocks the login function on usersApi
  const mock = jest.spyOn(usersApi, "login").mockResolvedValue({
    data: { ...fakeLoggedUser },
    status: 201,
    statusText: "OK",
    headers: {},
    config: {},
  });

  //fake login user
  const newLogin: UserLoginForm = {
    email: "tom@react.com",
    password: "reactRedux2022",
  };

  //login user
  await act(async () => {
    //calls the mock function
    const result = await store.dispatch(login(newLogin));
    const loggedUser: User = result.payload as User;
    expect(result.type).toBe("users/login/fulfilled");
    //should be logged in
    const state = store.getState().users;
    expect(state.isLoggedIn).toBeTruthy();
  });

  //it will work only if it's logged in
  //displays the nav bar
  await act(async () => {
    expect(screen.getByRole("navigation")).toBeInTheDocument();

    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Expenses" })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Categories" })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "About" })).toBeInTheDocument();

    //clicks on About link to render About page
    userEvent.click(screen.getByText(/About/i));
  });

  //it will work only if it's logged in
  //it should render 5 links (home, expenses, categories, about and the ExpenseTracker brand)
  //App is now rendering the About component 
  await act(async () => {
    //screen.debug()
    expect(screen.getAllByRole("link").length).toBe(5);
  });
});
