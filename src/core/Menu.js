import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { logout, isAuthenticated } from "../auth/helper/index";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#2ecc72" };
  } else {
    return { color: "#FFFFFF" };
  }
};

const Menu = ({ history }) => {
  return (
    <nav
      style={currentTab(history, "/")}
      className="navbar  navbar-expand-sm navbar-dark bg-dark"
    >
      <div className="container text-uppercase p-2">
        <Link className="nav-link navbar-brand" to="/">
          Rk Furniture
        </Link>
        <button
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse text-center" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link
                style={currentTab(history, "/")}
                className="nav-link"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                style={currentTab(history, "/cart")}
                className="nav-link"
                to="/cart"
              >
                Cart
              </Link>
            </li>
            {isAuthenticated() && isAuthenticated().user.role === "admin" && (
              <li className="nav-item">
                <Link
                  style={currentTab(history, "/admin/dashboard")}
                  className="nav-link"
                  to="/admin/dashboard"
                >
                  A. Dashboard
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link
                style={currentTab(history, "/service")}
                className="nav-link"
                to="/service"
              >
                Services
              </Link>
            </li>
            {!isAuthenticated() && (
              <Fragment>
                <li className="nav-item">
                  <Link
                    style={currentTab(history, "/register")}
                    className="nav-link"
                    to="/register"
                  >
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    style={currentTab(history, "/login")}
                    className="nav-link"
                    to="/login"
                  >
                    Login
                  </Link>
                </li>
              </Fragment>
            )}
            {isAuthenticated() && (
              <li className="nav-item">
                <span
                  className="nav-link text-warning"
                  onClick={() => {
                    logout(() => {
                      history.push("/");
                    });
                  }}
                >
                  Logout
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default withRouter(Menu);
