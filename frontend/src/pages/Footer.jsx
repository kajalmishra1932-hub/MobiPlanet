import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiInstagram,
  FiMail,
  FiMapPin,
  FiMessageCircle,
  FiPhone,
} from "react-icons/fi";
import "../css/footer.css";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:2340/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.success) {
        setMessage("Subscribed Successfully");
        setEmail("");
      } else {
        setMessage(data.message || "Subscription failed");
      }
    } catch (err) {
      console.log(err);
      setMessage("Something went wrong");
    }
  };

  return (
    <footer className="mobile-footer">
      <div className="mobile-footer-container">
        <div className="footer-brand">
          <Link to="/" className="mobile-footer-logo">
            Mobi Planet
          </Link>

          <p>
            Buy latest smartphones, gadgets, and accessories with quick support
            and secure delivery.
          </p>

          <div className="footer-contact-list">
            <a href="tel:+8527847832">
              <FiPhone />
              <span>+91 8527847832</span>
            </a>
            <a href="https://wa.me/8527847832" target="_blank" rel="noreferrer">
              <FiMessageCircle />
              <span>WhatsApp Support</span>
            </a>
            <a
              href="https://www.google.com/maps/search/Mobiplanet+kirari"
              target="_blank"
              rel="noreferrer"
            >
              <FiMapPin />
              <span>Main Road Shiamgir, Bihar</span>
            </a>
          </div>
        </div>

        <div className="mobile-footer-links">
          <div className="mobile-footer-box">
            <h3>Information</h3>
            <ul>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
              <li>
                <Link to="/sellphone">Sell Phone</Link>
              </li>
            </ul>
          </div>

          <div className="mobile-footer-box">
            <h3>My Account</h3>
            <ul>
              <li>
                <Link to="/account">My Account</Link>
              </li>
              <li>
                <Link to="/cart">My Cart</Link>
              </li>
              <li>
                <Link to="/account">My Orders</Link>
              </li>
              <li>
                <Link to="/track">Track Order</Link>
              </li>
            </ul>
          </div>

          <div className="mobile-footer-box">
            <h3>Quick Access</h3>
            <ul>
              <li>
                <Link to="/wishlist">Wishlist</Link>
              </li>
              <li>
                <Link to="/admin">Admin Login</Link>
              </li>
              <li>
                <a
                  href="https://instagram.com/mobiplanet.in"
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mobile-subscribe-box">
          <div className="subscribe-icon">
            <FiMail />
          </div>
          <h2>Subscribe</h2>
          <p>Get latest mobile launches, offers, and store updates.</p>

          <form className="mobile-subscribe-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" aria-label="Subscribe">
              <span>Subscribe</span>
              <FiArrowRight />
            </button>
          </form>

          {message && <p className="mobile-subscribe-message">{message}</p>}

          <div className="footer-social">
            <a
              href="https://instagram.com/mobiplanet.in"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <FiInstagram />
            </a>
            <a href="https://wa.me/8527847832" target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <FiMessageCircle />
            </a>
            <a href="mailto:support@mobiplanet.com" aria-label="Email">
              <FiMail />
            </a>
          </div>
        </div>
      </div>

      <div className="mobile-footer-bottom">
        <span>© 2026 Mobi Planet. All rights reserved.</span>
        <span>Mobile Products Ordering System</span>
      </div>
    </footer>
  );
}