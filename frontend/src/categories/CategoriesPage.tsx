import React from "react";
import { AddCategoryForm } from "./AddCategoryForm";
import { categoriesListStub } from "./categoriesListStub";
import { CategoriesTable } from "./CategoriesTable";

export const CategoriesPage = () => {
  return (
    <div className="col-12 col-lg-10 offset-lg-1 pageContainer">
      <h2>Categories</h2>
      {/* Button trigger modal */}
      <div style={{ alignSelf: "end" }}>
        <button
          type="button"
          className="btn btn-dark"
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
      <CategoriesTable categories={categoriesListStub} />
    </div>
  );
};
