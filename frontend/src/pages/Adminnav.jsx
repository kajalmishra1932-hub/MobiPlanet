import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/adminnav.css";

import {
  FaTachometerAlt,
  FaUsers,
  FaBoxOpen,
  FaCommentDots,
  FaTags,
  FaChevronDown,
  FaChevronUp,
  FaMobileAlt,
  FaShoppingCart,
  FaChartBar,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Adminnav() {

  const [openOrders, setOpenOrders] = useState(true);
  const [openProducts, setOpenProducts] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [openSellPhone, setOpenSellPhone] = useState(false);

  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (

    <div className="sidebarr">

      {/* HEADER */}

      <div className="sidebar-header">

        <div className="admin-logo">
          K
        </div>

        <div>
          <h2 className="brand-name">harshyadav Admin</h2>
          <p className="brand-sub">Management Panel</p>
        </div>

      </div>

      {/* TITLE */}

      <h4 className="menu-title">MAIN MENU</h4>

      <ul className="sidebar-menu">

        {/* DASHBOARD */}

        <li className={isActive("/dash") ? "active" : ""}>

          <Link to="/dash">

            <span>
              <FaTachometerAlt />
              Dashboard
            </span>

          </Link>

        </li>

        {/* USERS */}

        <li className={isActive("/users") ? "active" : ""}>

          <Link to="/users">

            <span>
              <FaUsers />
              Registered Users
            </span>

          </Link>

        </li>

        {/* CATEGORY */}

        <li>

          <div
            className="dropdown-title"
            onClick={() => setOpenCategory(!openCategory)}
          >

            <span>
              <FaTags />
              Categories
            </span>

            {openCategory ? <FaChevronUp /> : <FaChevronDown />}

          </div>

          {openCategory && (

            <ul className="dropdown-menu">

              <li>
                <Link to="/addcategory">
                  Add Category
                </Link>
              </li>

              <li>
                <Link to="/categorydata">
                  Manage Categories
                </Link>
              </li>

            </ul>

          )}

        </li>

        {/* PRODUCTS */}

        <li>

          <div
            className="dropdown-title"
            onClick={() => setOpenProducts(!openProducts)}
          >

            <span>
              <FaBoxOpen />
              Products
            </span>

            {openProducts ? <FaChevronUp /> : <FaChevronDown />}

          </div>

          {openProducts && (

            <ul className="dropdown-menu">

              <li>
                <Link to="/add">
                  Add Product
                </Link>
              </li>

              <li>
                <Link to="/manageproducts">
                  Manage Products
                </Link>
              </li>

            </ul>

          )}

        </li>

        {/* SELL PHONE */}

        <li>

          <div
            className="dropdown-title"
            onClick={() => setOpenSellPhone(!openSellPhone)}
          >

            <span>
              <FaMobileAlt />
              Sell Phones
            </span>

            {openSellPhone ? <FaChevronUp /> : <FaChevronDown />}

          </div>

          {openSellPhone && (

            <ul className="dropdown-menu">

            
              <li>
                <Link to="/selldata">
                  Sell Phone Data
                </Link>
              </li>

            </ul>

          )}

        </li>

        {/* ORDERS */}

        <li>

          <div
            className="dropdown-title"
            onClick={() => setOpenOrders(!openOrders)}
          >

            <span>
              <FaShoppingCart />
              Orders
            </span>

            {openOrders ? <FaChevronUp /> : <FaChevronDown />}

          </div>

          {openOrders && (

            <ul className="dropdown-menu">

              <li>
                <Link to="/orderdata">
                  All Orders
                </Link>
              </li>

              <li>
                <Link to="/pending">
                  Pending Orders
                </Link>
              </li>

              <li>
                <Link to="/confirm">
                  Accepted Orders
                </Link>
              </li>

              <li>
                <Link to="/out">
                  Out For Delivery
                </Link>
              </li>

              <li>
                <Link to="/deliver">
                  Delivered Orders
                </Link>
              </li>

            </ul>

          )}

        </li>

        {/* REPORTS */}

        <li className={isActive("/reports") ? "active" : ""}>

          <Link to="/subscriber">

            <span>
              <FaChartBar />
             subsriber
            </span>

          </Link>

        </li>

        {/* SEARCH */}

        <li className={isActive("/search") ? "active" : ""}>

          <Link to="/search">

            <span>
              <FaCommentDots />
              Search
            </span>

          </Link>

        </li>

        {/* LOGOUT */}

        <li>

          <Link to="/">

            <span>
              <FaSignOutAlt />
              Logout
            </span>

          </Link>

        </li>

      </ul>

    </div>

  );
}