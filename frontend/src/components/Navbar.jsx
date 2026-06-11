import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FiHeart,
  FiInstagram,
  FiMapPin,
  FiMenu,
  FiMessageCircle,
  FiPhone,
  FiUser,
  FiX,
} from "react-icons/fi";
import { HiOutlineShoppingCart } from "react-icons/hi";
import "../css/navbar.css";

import mobi from '../image/mobiplanet.png'

export default function Navbar() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    firstName: "",
    LastName: "",
    email: "",
    password: "",
    contact: "",
  });

  useEffect(() => {
    const user = localStorage.getItem("mobileUser");
    if (user) setIsLogin(true);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:2340/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });
      const data = await response.json();

      if (data.success) {
        localStorage.setItem("mobileUser", JSON.stringify(data.user));
        localStorage.setItem("userId", data.user._id);
        setIsLogin(true);
        setShowLogin(false);
        alert("Login Success");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:2340/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
      });
      const data = await response.json();

      if (data.success) {
        alert("Signup Success! Please Login.");
        setShowSignup(false);
        setShowLogin(true);
        setSignupData({
          firstName: "",
          LastName: "",
          email: "",
          password: "",
          contact: "",
        });
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <header className="site-header">
        <div className="topbar">
          <div className="social">
            <a href="https://instagram.com/mobiplanet.in" target="_blank" rel="noreferrer">
              <FiInstagram />
              <span>mobiplanet.in</span>
            </a>

            <a href="https://wa.me/8527847832" target="_blank" rel="noreferrer">
              <FiMessageCircle />
              <span>8527847832</span>
            </a>
  <a href="tel:+8527847832">
              <FiPhone />
              <span>+91 8527847832</span>
            </a>
          </div>

          <div className="authbtn">
            {!isLogin ? (
              <>
                <button className="login-trigger" onClick={() => setShowLogin(true)}>
                  Login
                </button>
                <button className="signupbtn" onClick={() => setShowSignup(true)}>
                  Signup
                </button>
              </>
            ) : (
             <Link
  to="/profile"
  className="profile"
  aria-label="My Account"
>
  <FiUser />
  <span>My Account</span>
</Link>
            )}
          </div>
        </div>

        <nav className="navbar">
         <img src={mobi} alt=""  height={'100px'} width={'200px'}/>

          <button
            className="menu-toggle"
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((value) => !value)}
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>

          <div className={isMenuOpen ? "nav-panel open" : "nav-panel"}>
            <button
              type="button"
              className="icon-btn location"
              aria-label="Open location"
              onClick={() => {
                window.open(
                  "https://www.google.com/maps/search/Mobiplanet+kirari",
                  "_blank"
                );
                closeMenu();
              }}
            >
              <FiMapPin />
              <span>Location</span>
            </button>

            <ul className="nav-links">
              <li>
                <NavLink to="/" exact className="nav-link" activeClassName="active" onClick={closeMenu}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/sellphone"
                  className="nav-link"
                  activeClassName="active"
                  onClick={closeMenu}
                >
                  Sell Phone
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className="nav-link"
                  activeClassName="active"
                  onClick={closeMenu}
                >
                  Contact
                </NavLink>
              </li>
            </ul>

            <div className="nav-actions">
              <NavLink
                to="/wishlist"
                className="icon-btn wishlist"
                activeClassName="active"
                aria-label="Wishlist"
                onClick={closeMenu}
              >
                <FiHeart />
                <span>Wishlist</span>
              </NavLink>

              <Link to="/cart" className="icon-btn cart" aria-label="Cart" onClick={closeMenu}>
                <HiOutlineShoppingCart />
                <span>Cart</span>
              </Link>
            </div>
          </div>
        </nav>
      </header>
        {showLogin && (
        <div className="popup" onClick={() => setShowLogin(false)}>
          <form className="popupbox" onSubmit={handleLogin} onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" type="button" onClick={() => setShowLogin(false)}>
              x
            </button>
            <h2>Welcome Back</h2>
            <p className="subtitle">Login to your account to continue</p>

            <input
              type="email"
              placeholder="Enter Email"
              required
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            />

            <input
              type="password"
              placeholder="Enter Password"
              required
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            />
           

            <button type="submit" className="submit-btn">
              Login
            </button>
             <div className="forgot-password">
  

            <Link
    to="/forget"
    onClick={() => setShowLogin(false)}
  >
    Forgot Password?
  </Link>
  
</div>

            <p className="switch-auth">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  setShowLogin(false);
                  setShowSignup(true);
                }}
              >
                Create New Account
              </button>
            </p>
          </form>
        </div>
      )}

      {showSignup && (
        <div className="popup" onClick={() => setShowSignup(false)}>
          <form
            className="popupbox signup-box"
            onSubmit={handleSignup}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-btn" type="button" onClick={() => setShowSignup(false)}>
              x
            </button>
            <h2>Create Account</h2>
            <p className="subtitle">Join Mobi Planet today</p>

            <div className="form-grid">
              <input
                type="text"
                placeholder="First Name"
                required
                value={signupData.firstName}
                onChange={(e) => setSignupData({ ...signupData, firstName: e.target.value })}
              />
              <input
                type="text"
                placeholder="Last Name"
                value={signupData.LastName}
                onChange={(e) => setSignupData({ ...signupData, LastName: e.target.value })}
              />
            </div>

            <input
              type="email"
              placeholder="Enter Email"
              required
              value={signupData.email}
              onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
            />

            <input
              type="tel"
              placeholder="Contact Number"
              required
              value={signupData.contact}
              onChange={(e) => setSignupData({ ...signupData, contact: e.target.value })}
            />

            <input
              type="password"
              placeholder="Choose Password"
              required
              value={signupData.password}
              onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
            />

            <button type="submit" className="submit-btn">
              Signup
            </button>

            <p className="switch-auth">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  setShowSignup(false);
                  setShowLogin(true);
                }}
              >
                Login Here
              </button>
            </p>
          </form>
        </div>
      )}
    </>
  );
}