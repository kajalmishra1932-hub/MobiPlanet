import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/veryfy.css";
const Verifyotp = () => {
  const [otp, setOtp] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:2340/api/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            otp,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert(data.message);

        navigate("/resetpassword", {
          state: { email, otp },
        });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="verify-container">
    <form className="verify-form" onSubmit={handleVerifyOtp}>
      <h2>Verify OTP</h2>

      <input
        className="verify-input"
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <button className="verify-btn" type="submit">
        Verify OTP
      </button>
    </form>
  </div>
  );
};

export default Verifyotp