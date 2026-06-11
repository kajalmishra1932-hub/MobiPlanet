import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/resetpassword.css";

const Resetpassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;
  const otp = location.state?.otp;

  const handleResetPassword = async (e) => {
    e.preventDefault();

    // Check password match
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:2340/api/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            otp,
            newPassword,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert(data.message);
        navigate("/");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="reset-container">
      <form className="reset-form" onSubmit={handleResetPassword}>
        <h2>Reset Password</h2>

        <p className="reset-subtitle">
          Enter your new password below
        </p>

        <input
          className="reset-input"
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <input
          className="reset-input"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button className="reset-btn" type="submit">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default Resetpassword;