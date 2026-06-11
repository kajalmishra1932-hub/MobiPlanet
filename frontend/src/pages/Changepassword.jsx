// 📂 ChangePassword.jsx

import React, { useState } from "react";
import "../css/changepassword.css";

export default function Changepassword() {

  const userId = localStorage.getItem("userId");

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  // HANDLE CHANGE

  const handleChange = (e) => {

    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });

  };

  // CHANGE PASSWORD

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch(
        "http://localhost:2340/api/changepassword",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            userId,
            oldPassword: passwordData.oldPassword,
            newPassword: passwordData.newPassword,
          }),
        }
      );

      const data = await response.json();

      alert(data.message);

      if (data.success) {

        setPasswordData({
          oldPassword: "",
          newPassword: "",
        });

      }

    } catch (error) {

      console.log(error);

    }
  };

  return (
    <div className="changePasswordContainer">

      <div className="changePasswordBox">

        <h1>Change Password</h1>

        <p>Update your account password</p>

        <form onSubmit={handleSubmit}>

          <div className="inputBox">

            <label>Old Password</label>

            <input
              type="password"
              name="oldPassword"
              placeholder="Enter old password"
              value={passwordData.oldPassword}
              onChange={handleChange}
              required
            />

          </div>

          <div className="inputBox">

            <label>New Password</label>

            <input
              type="password"
              name="newPassword"
              placeholder="Enter new password"
              value={passwordData.newPassword}
              onChange={handleChange}
              required
            />

          </div>

          <button type="submit">
            Change Password
          </button>

        </form>

      </div>

    </div>
  );
}