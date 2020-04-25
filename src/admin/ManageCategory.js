import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { getAllCategory, deleteCategory } from "./helper/adminapicall";

const ManageCategory = () => {
  const [categories, setCategories] = useState([]);

  const { user, token } = isAuthenticated();

  const preload = () => {
    getAllCategory().then((data) => {
      //console.log(data);
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisCategory = (categoryId) => {
    console.log(categoryId);
    deleteCategory(categoryId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  return (
    <Base>
      <Link className="btn btn-warning rounded m-5" to={`/admin/dashboard`}>
        <span className="lead text-light">Admin Home</span>
      </Link>
      <Link className="btn btn-success rounded m-5" to="/create/category">
        <span className="lead text-light">Add Category</span>
      </Link>

      <h2 className="mb-2 text-info mb-3">All Categories</h2>
      <div className="row">
        <div className="col md-4">
          {categories.map((category, index) => {
            return (
              <div key={index} className="row text-center mb-2 ">
                <div className="col-4">
                  <h3 className="text-left">{category.name}</h3>
                </div>
                <div className="col-2">
                  <button
                    onClick={() => {
                      deleteThisCategory(category._id);
                    }}
                    className="btn btn-block btn-danger rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
};

export default ManageCategory;
