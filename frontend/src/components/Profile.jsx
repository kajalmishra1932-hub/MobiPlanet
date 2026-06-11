// 📂 Profile.jsx

import React, { useEffect, useState } from "react";
import "../css/profile.css";

export default function Profile() {

  // USER ID
  const userId = localStorage.getItem("userId");

  const [formData, setFormData] = useState({
    firstName: "",
    LastName: "",
    email: "",
    contact: "",
    regDate: "",
  });

  const [loading, setLoading] = useState(true);

  // FETCH PROFILE
  const fetchProfile = async () => {

    try {

      if (!userId) {
        console.log("User ID Not Found");
        setLoading(false);
        return;
      }

      const response = await fetch(
        `http://localhost:2340/api/profile/${userId}`
      );

      const data = await response.json();

      console.log(data);

      if (!data.success) {

        alert(data.message);

        setLoading(false);

        return;
      }

      const user = data.user;

      setFormData({
        firstName: user.firstName || "",
        LastName: user.LastName || "",
        email: user.email || "",
        contact: user.contact || "",
        regDate: user.createdAt
          ? new Date(user.createdAt).toLocaleDateString()
          : "",
      });

      setLoading(false);

    } catch (error) {

      console.log(error);

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // HANDLE CHANGE
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  // UPDATE PROFILE
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch(
        `http://localhost:2340/api/profile/${userId}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      alert(data.message);

    } catch (error) {

      console.log(error);

    }
  };

  // LOADING
  if (loading) {
    return <h2 className="loading">Loading...</h2>;
  }

  return (
    <div className="profileContainer">

      <div className="profileBox">

        {/* HEADER */}

        <div className="profileHeader">

          <div>
            <h1>My Profile</h1>

            <p>Manage your account details</p>
          </div>

          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt=""
          />

        </div>

        {/* FORM */}

        <form onSubmit={handleSubmit}>

          <div className="inputGroup">

            <div>
              <label>First Name</label>

              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Last Name</label>

              <input
                type="text"
                name="LastName"
                value={formData.LastName}
                onChange={handleChange}
              />
            </div>

          </div>

          <div className="inputGroup">

            <div>
              <label>Email</label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Mobile Number</label>

              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
              />
            </div>

          </div>

          <div className="inputGroup">

            <div>
              <label>Registration Date</label>

              <input
                type="text"
                value={formData.regDate}
                readOnly
              />
            </div>

          </div>

          <button type="submit">
            Update Profile
          </button>

        </form>

      </div>

    </div>
  );
}