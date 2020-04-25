import React from "react";
import { Link } from "react-router-dom";

import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";

const AdminDashBoard = () => {
  const {
    user: { name, email },
  } = isAuthenticated();

  const adminLeftSide = () => {
    return (
      <div className="card">
        <h4 className="card-header bg-dark text-white">Admin Panel</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/create/category" className="nav-link text-info">
              Create Category
            </Link>
          </li>
          <li className="list-group-item">
            <Link
              to="/manage/category"
              className="nav-link nav-block text-info"
            >
              Manage Category
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/add/product" className="nav-link text-info">
              Create Product
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/manage/products" className="nav-link text-info">
              Manage Product
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/orders" className="nav-link text-info">
              Manage Orders
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminRightSide = () => {
    return (
      <div className="cart mb-4">
        <h4 className="card-header">Admin Information</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Name:</span>
            {name}
          </li>
          <li className="list-group-item">
            <span className="badge badge-success mr-2">E-mail:</span>
            {email}
          </li>
          <li className="list-group-item">
            <span className="badge badge-danger">Admin Area</span>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Base>
      <div className="row">
        <div className="col sm-2 md-3 col-xl-3">{adminLeftSide()}</div>
        <div className="col sm-10 md-9 col-xl-9">{adminRightSide()}</div>
      </div>
    </Base>
  );
};

export default AdminDashBoard;
