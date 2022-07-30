import { Category } from "../interfaces/Category";
import { CategoryPost } from "../interfaces/CategoryPost";
import { apiConnection } from "./apiConnection";

export const categoriesApi = {
  getCategoriesByUser: async (userId: string) => {
    const url = `/categories/${userId}`;
    const response = await apiConnection.get<Category[]>(url);
    return response;
  },
  postCategory: async (category: CategoryPost) => {
    const url = `/categories`;
    const response = await apiConnection.post<Category>(url, category);
    return response;
  }
};
