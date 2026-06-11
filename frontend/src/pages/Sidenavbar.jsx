// 📂 Sidebar.jsx

import React from "react";

import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

import "../css/sidenavbar.css";

export default function Sidebar() {

  const navigate = useNavigate();

  const location = useLocation();

  // USER DATA
  const user = JSON.parse(
    localStorage.getItem("mobileUser")
  );

  // LOGOUT

  const logout = () => {

    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if(confirmLogout){

      // REMOVE STORAGE

      localStorage.removeItem("mobileUser");

      localStorage.removeItem("userId");

      // REDIRECT

      navigate("/");

      // REFRESH NAVBAR

      window.location.reload();

    }

  };

  return (

    <div className="sidebar">

      {/* USER CARD */}

      <div className="user-card">

        <div className="profile-top">

          <img
            className="avatar"
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt=""
          />

          <div className="user-info">

            <h3>
              {user?.firstName} {user?.LastName}
            </h3>

            <p>
              {user?.email}
            </p>

          </div>

        </div>

        {/* LOGOUT BUTTON */}

        <button
          className="signout-btn"
          onClick={logout}
        >
          SIGN OUT
        </button>

      </div>

      {/* MENU */}

      <div className="menu">

        {/* PROFILE */}

        <Link
          to="/profile"
          className={
            location.pathname === "/profile"
              ? "menu-item active"
              : "menu-item"
          }
        >

          <div className="menu-left">

            <span className="icon">
              👤
            </span>

            <span>
              Profile
            </span>

          </div>

          <span className="arrow">
            ›
          </span>

        </Link>

        {/* ORDERS */}

        <Link
          to="/account"
          className={
            location.pathname === "/orders"
              ? "menu-item active"
              : "menu-item"
          }
        >

          <div className="menu-left">

            <span className="icon">
              🛒
            </span>

            <span>
              My Orders
            </span>

          </div>

          <span className="arrow">
            ›
          </span>

        </Link>

        {/* CHANGE PASSWORD */}

        <Link
          to="/changepassword"
          className={
            location.pathname === "/changepassword"
              ? "menu-item active"
              : "menu-item"
          }
        >

          <div className="menu-left">

            <span className="icon">
              🔒
            </span>

            <span>
              Change Password
            </span>

          </div>

          <span className="arrow">
            ›
          </span>

        </Link>

      </div>

    </div>

  );
}