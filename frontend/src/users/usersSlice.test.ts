import { usersApi } from "../api/usersApi";
import { store } from "../app/store";
import { UserLoginForm, UserPost } from "../interfaces/UserPost";
import { login, logout, register } from "./usersSlice";
import { User } from "../interfaces/User";
import usersReducer from "./usersSlice";

const fakeUser: UserPost = {
  email: "tom@react.com",
  password: "reactRedux2022",
  fullName: "Tom Johnson",
};

const fakeLoggedUser: User = {
  _id: "fakeId",
  email: "tom@react.com",
  fullName: "Tom Johnson",
};

describe("users redux state tests", () => {

  test("should initially set users to blank user and not logged in", () => {
    const state = store.getState().users;
    expect(state.user.email).toBe("");
    expect(state.isLoggedIn).toBeFalsy();
  });

  test("should be able to register a user", async () => {
    //mocks the register function on usersApi
    const mock = jest.spyOn(usersApi, "register").mockResolvedValue({
      data: { ...fakeUser },
      status: 201,
      statusText: "OK",
      headers: {},
      config: {},
    });

    //calls the mock function
    const result = await store.dispatch(register(fakeUser));

    const newUser: UserLoginForm = result.payload as UserLoginForm;
    expect(result.type).toBe("users/register/fulfilled");

    //should return the new user
    expect(newUser.email).toBe(fakeUser.email);
  });

  test("should be able to login user", async () => {
    //mocks the login function on usersApi
    const mock = jest.spyOn(usersApi, "login").mockResolvedValue({
      data: { ...fakeLoggedUser },
      status: 201,
      statusText: "OK",
      headers: {},
      config: {},
    });

    const newLogin: UserLoginForm = {
      email: "tom@react.com",
      password: "reactRedux2022",
    };
    //calls the mock function
    const result = await store.dispatch(login(newLogin));

    const loggedUser: User = result.payload as User;

    expect(result.type).toBe("users/login/fulfilled");

    //should return the logged user with its id
    expect(loggedUser.email).toBe(newLogin.email);
    const state = store.getState().users;

    //should be logged in
    expect(state.isLoggedIn).toBeTruthy();
  });

  test("should be able to logout", () => {
    //gets the current state
    const state = store.getState().users;
    //current state should be logged in
    expect(state.isLoggedIn).toBeTruthy();
    //get the actual state
    const actual = usersReducer(state, logout());
    //actual should not be logged in
    expect(actual.isLoggedIn).toBeFalsy();
  });
});
