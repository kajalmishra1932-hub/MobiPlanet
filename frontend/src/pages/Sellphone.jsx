// 📂 SellPhone.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/sellphone.css";

export default function Sellphone() {

  const navigate = useNavigate();

  // INITIAL STATE
  const initialState = {
    brand: "",
    model: "",
    storage: "",
    ram: "",
    condition: "",
    battery: "",
    expectedPrice: "",
    damage: [],
    accessories: [],
    description: "",
    name: "",
    phone: "",
    city: "",
    address: "",
  };

  const [formData, setFormData] = useState(initialState);

  // AUTO LOCATION
  useEffect(() => {

    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(

        async (position) => {

          const { latitude, longitude } = position.coords;

          try {

            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );

            const data = await response.json();

            setFormData((prev) => ({
              ...prev,

              city:
                data.address.city ||
                data.address.town ||
                data.address.village ||
                "",

              address: data.display_name || "",
            }));

          } catch (error) {

            console.log("Location Error:", error);

          }
        },

        (error) => {
          console.log(error);
        }

      );
    }

  }, []);

  // HANDLE INPUT
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  // DAMAGE CHECKBOX
  const handleDamage = (value) => {

    if (formData.damage.includes(value)) {

      setFormData({
        ...formData,
        damage: formData.damage.filter((item) => item !== value),
      });

    } else {

      setFormData({
        ...formData,
        damage: [...formData.damage, value],
      });

    }
  };

  // ACCESSORIES CHECKBOX
  const handleAccessories = (value) => {

    if (formData.accessories.includes(value)) {

      setFormData({
        ...formData,
        accessories: formData.accessories.filter(
          (item) => item !== value
        ),
      });

    } else {

      setFormData({
        ...formData,
        accessories: [...formData.accessories, value],
      });

    }
  };

  // SUBMIT FORM
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch(
        "http://localhost:2340/api/sellphone",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {

        alert("Sell Request Submitted Successfully 🚀");

        console.log(data);

        // CLEAR FORM
        setFormData(initialState);

        // NAVIGATE HOME
        navigate("/");

      } else {

        alert(data.message || "Something went wrong");

      }

    } catch (error) {

      console.log(error);

      alert("Server Error");

    }
  };

  return (
    <div className="sell-container">

      {/* HERO */}
      <div className="sell-hero">

        <h1>Sell Your Old Phone</h1>

        <p>
          Get the best value for your smartphone instantly.
          Fast pickup • Secure payment • Trusted service
        </p>

      </div>

      {/* FORM */}
      <form className="sell-form" onSubmit={handleSubmit}>

        {/* PHONE DETAILS */}
        <div className="form-section">

          <h2>Phone Details</h2>

          <div className="form-grid">

            {/* BRAND */}
            <div className="input-box">

              <label>Brand</label>

              <select
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                required
              >
                <option value="">Select Brand</option>
                <option>Apple</option>
                <option>Samsung</option>
                <option>OnePlus</option>
                <option>Xiaomi</option>
                <option>Realme</option>
                <option>Vivo</option>
                <option>Oppo</option>
              </select>

            </div>

            {/* MODEL */}
            <div className="input-box">

              <label>Model</label>

              <input
                type="text"
                name="model"
                placeholder="iPhone 14 Pro"
                value={formData.model}
                onChange={handleChange}
                required
              />

            </div>

            {/* STORAGE */}
            <div className="input-box">

              <label>Storage</label>

              <select
                name="storage"
                value={formData.storage}
                onChange={handleChange}
                required
              >
                <option value="">Select Storage</option>
                <option>64GB</option>
                <option>128GB</option>
                <option>256GB</option>
                <option>512GB</option>
              </select>

            </div>

            {/* RAM */}
            <div className="input-box">

              <label>RAM</label>

              <select
                name="ram"
                value={formData.ram}
                onChange={handleChange}
                required
              >
                <option value="">Select RAM</option>
                <option>4GB</option>
                <option>6GB</option>
                <option>8GB</option>
                <option>12GB</option>
              </select>

            </div>

          </div>

        </div>

        {/* CONDITION */}
        <div className="form-section">

          <h2>Phone Condition</h2>

          <div className="condition-grid">

            {["Excellent", "Good", "Average", "Damaged"].map(
              (item, index) => (

                <label key={index} className="condition-card">

                  <input
                    type="radio"
                    name="condition"
                    value={item}
                    checked={formData.condition === item}
                    onChange={handleChange}
                  />

                  <span>{item}</span>

                </label>
              )
            )}

          </div>

        </div>

        {/* DAMAGE */}
        <div className="form-section">

          <h2>Damage Details</h2>

          <div className="checkbox-grid">

            {[
              "Screen Crack",
              "Battery Issue",
              "Camera Problem",
              "Speaker Problem",
              "Face ID Not Working",
              "Back Damage",
            ].map((item, index) => (

              <label key={index} className="checkbox-card">

                <input
                  type="checkbox"
                  checked={formData.damage.includes(item)}
                  onChange={() => handleDamage(item)}
                />

                <span>{item}</span>

              </label>

            ))}

          </div>

        </div>

        {/* ACCESSORIES */}
        <div className="form-section">

          <h2>Accessories Available</h2>

          <div className="checkbox-grid">

            {[
              "Original Box",
              "Original Charger",
              "Bill Available",
              "Earphones",
            ].map((item, index) => (

              <label key={index} className="checkbox-card">

                <input
                  type="checkbox"
                  checked={formData.accessories.includes(item)}
                  onChange={() => handleAccessories(item)}
                />

                <span>{item}</span>

              </label>

            ))}

          </div>

        </div>

        {/* EXTRA DETAILS */}
        <div className="form-section">

          <h2>Extra Information</h2>

          <div className="form-grid">

            {/* BATTERY */}
            <div className="input-box">

              <label>Battery Health</label>

              <input
                type="text"
                name="battery"
                placeholder="85%"
                value={formData.battery}
                onChange={handleChange}
              />

            </div>

            {/* PRICE */}
            <div className="input-box">

              <label>Expected Price</label>

              <input
                type="number"
                name="expectedPrice"
                placeholder="₹ 25000"
                value={formData.expectedPrice}
                onChange={handleChange}
                required
              />

            </div>

          </div>

          {/* DESCRIPTION */}
          <div className="input-box full-width">

            <label>Description</label>

            <textarea
              rows="5"
              name="description"
              placeholder="Write complete phone condition..."
              value={formData.description}
              onChange={handleChange}
            ></textarea>

          </div>

        </div>

        {/* USER DETAILS */}
        <div className="form-section">

          <h2>Your Details</h2>

          <div className="form-grid">

            {/* NAME */}
            <div className="input-box">

              <label>Full Name</label>

              <input
                type="text"
                name="name"
                placeholder="Enter Name"
                value={formData.name}
                onChange={handleChange}
                required
              />

            </div>

            {/* PHONE */}
            <div className="input-box">

              <label>Phone Number</label>

              <input
                type="text"
                name="phone"
                placeholder="9876543210"
                value={formData.phone}
                onChange={handleChange}
                required
              />

            </div>

            {/* CITY */}
            <div className="input-box">

              <label>City</label>

              <input
                type="text"
                name="city"
                placeholder="Delhi"
                value={formData.city}
                onChange={handleChange}
                required
              />

            </div>

          </div>

          {/* ADDRESS */}
          <div className="input-box full-width">

            <label>Live Address</label>

            <textarea
              rows="3"
              name="address"
              placeholder="Auto fetched address"
              value={formData.address}
              onChange={handleChange}
              required
            ></textarea>

          </div>

        </div>

        {/* BUTTON */}
        <button type="submit" className="submit-sell-btn">
          Submit Sell Request
        </button>

      </form>

    </div>
  );
}