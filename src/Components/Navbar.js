import React from "react";
import { Link } from "react-router-dom";
import logo from "../Assets/sgbf-logo_0.png";
import "./Navbar.css";
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white customNav">
      <Link to="/" className="navbar-brand">
        <img src={logo} style={{ maxWidth: "230px" }} alt="logo" />
      </Link>
      <button
        type="button"
        className="navbar-toggler"
        data-toggle="collapse"
        data-target="#navbarCollapse"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        id="navbarCollapse"
        className="collapse navbar-collapse justify-content-start"
        style={{ marginTop: "-35px" }}
      >
        <div className="text-center" style={{ margin: "auto" }}>
          <div className="navbar-nav fontNav">
            <Link
              to="/about"
              className="nav-item nav-link mx-3"
              style={{ fontWeight: "bold" }}
            >
              About
            </Link>
            <Link to="/membership" className="nav-item nav-link mx-3">
              Membership
            </Link>
            <Link to="/" className="nav-item nav-link mx-3">
              Events
            </Link>
          </div>
          <hr
            className="hr_class"
            style={{
              position: "absolute",
              textDecoration: "underline",
              border: "1px solid",
              width: "420px",
            }}
          />
        </div>
        <div className="navbar-nav ml-auto action-buttons">
          <div className="nav-item m_center">
            <Link
              to=""
              className="sign-in-btn p-2"
              style={{ color: "#fff", marginRight: "40px", marginTop: "-40px" }}
            >
              <Link className="sign-in-btn p-2" to="">
                <span
                // className={`flag-icon flag-icon-${language["flag-icon"]}`}
                ></span>{" "}
                Arabic
              </Link>
            </Link>

            <Link
              to="/"
              className="sign-in-btn p-2"
              style={{
                background: "#DC5949",
                color: "#fff",
                marginRight: "40px",
                marginTop: "-40px",
              }}
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
