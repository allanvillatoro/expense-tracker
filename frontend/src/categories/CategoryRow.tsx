import React from "react";
import { Category } from "../interfaces/Category";

interface CategoryRowProps {
  category: Category;
}

export const CategoryRow = ({ category }: CategoryRowProps) => {
  return (
    <tr>
      <td>{category.name}</td>
      <td>${category.budget}</td>
      <td>{category.alarmThreshold}%</td>
    </tr>
  );
};