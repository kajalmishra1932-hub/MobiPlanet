import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Forgetpassword.css"
const Forgetpassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:2340/api/send-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert(data.message);

        navigate("/veryfy", {
          state: { email },
        });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="forget-form" onSubmit={handleSendOtp}>
  <h2>Forgot Password</h2>

  <p className="forget-subtitle">
    Enter your email to receive an OTP
  </p>

  <input
    className="forget-input"
    type="email"
    placeholder="Enter Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
  />

  <button className="forget-btn" type="submit">
    Send OTP
  </button>
</form>
  );
};

export default Forgetpassword;