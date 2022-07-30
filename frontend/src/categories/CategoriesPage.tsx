import React, { useEffect } from "react";
import { AddCategoryForm } from "./AddCategoryForm";
import { categoriesListStub } from "./categoriesListStub";
import { CategoriesTable } from "./CategoriesTable";
import { getCategoriesByUser } from "./categoriesSlice";
import { categoryStub } from "./categoryStub";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";

export const CategoriesPage = () => {
  const categories = useAppSelector((state) => state.categories.categories);
  const categoriesStatus = useAppSelector((state) => state.categories.status);
  const dispatch = useAppDispatch();

  useEffect(() => {
    //update this (temporary)
    const userId = "62e01522afcf618b284ee5d4";
    if (categoriesStatus === "idle") {
      dispatch(getCategoriesByUser(userId));
    }
  }, [categoriesStatus, dispatch]);

  return (
    <div className="col-12 col-lg-8 offset-lg-2 pageContainer">
      <h2>Categories</h2>
      {/* Button trigger modal */}
      <div style={{ alignSelf: "end" }}>
        <button
          type="button"
          className="btn btn-danger"
          data-bs-toggle="modal"
          data-bs-target="#AddCategoryFormModal"
          style={{ width: 100 }}
        >
          Add
        </button>
      </div>
      <br />

      {/* Modal */}
      <div
        className="modal fade"
        id="AddCategoryFormModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add Category
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <AddCategoryForm />
            </div>
          </div>
        </div>
      </div>
      <CategoriesTable categories={categories} />
    </div>
  );
};
