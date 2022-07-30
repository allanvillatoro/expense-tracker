import { User } from "../interfaces/User";
import { UserLoginForm, UserPost } from "../interfaces/UserPost";
import { apiConnection } from "./apiConnection";

interface RegisterUserResponse {
  email: string;
  fullName: string;
}

export const usersApi = {
  login: async (userLoginForm: UserLoginForm) => {
    const url = `/users/login`;
    const response = await apiConnection.post<User>(url, userLoginForm);
    return response;
  },
  register: async (userPost: UserPost) => {
    const url = `/users/register`;
    const response = await apiConnection.post<RegisterUserResponse>(
      url,
      userPost
    );
    return response;
  },
};
