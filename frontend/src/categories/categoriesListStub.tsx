import { Category } from "../interfaces/Category";
import { categoryStub } from "./categoryStub";

const categoryStub2: Category = {
  _id: "62e01522afcf618b284ee6d1",
  name: "drinks",
  budget: 2000,
  alarmThreshold: 65,
  userId: "62e01522afcf618b284ee5d4",
};

const categoryStub3: Category = {
  _id: "62e01522afcf618b284ee6d2",
  name: "gas",
  budget: 2500,
  alarmThreshold: 75,
  userId: "62e01522afcf618b284ee5d4",
};

export const categoriesListStub: Category[] = [
  categoryStub,
  categoryStub2,
  categoryStub3,
];
