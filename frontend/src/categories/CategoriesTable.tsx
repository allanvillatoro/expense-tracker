import React from "react";
import { Category } from "../interfaces/Category";
import { CategoryRow } from "./CategoryRow";

interface CategoriesTableProps {
  categories: Category[];
}

export const CategoriesTable = ({ categories }: CategoriesTableProps) => {
  return (
    <table className="table table-striped">
      <thead className="table-primary">
        <tr>
          <th>Category</th>
          <th>Budget</th>
          <th>Alarm Threshold</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category) => (
          <CategoryRow category={category} key={category._id} />
        ))}
      </tbody>
    </table>
  );
};
