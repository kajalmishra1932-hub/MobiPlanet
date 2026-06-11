import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/cart.css";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const [form, setForm] = useState({
    address: {
      flat: "",
      street: "",
      area: "",
      landmark: "",
      city: "",
      pincode: "",
      phone: "",
    },
    paymentMethod: "Online",
  });

  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  // =========================
  // 💳 LOAD RAZORPAY
  // =========================
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // =========================
  // 🛒 FETCH CART
  // =========================
  const fetchCart = async () => {
    const res = await fetch(
      `http://localhost:2340/api/getcart/${userId}`
    );
    const data = await res.json();
    setCart(data.data || []);
  };

  useEffect(() => {
    if (userId) fetchCart();
  }, [userId]);

  // =========================
  // 💰 TOTAL
  // =========================
  useEffect(() => {
    let sum = 0;

    cart.forEach((item) => {
      sum +=
        Number(item.productId?.price || 0) *
        Number(item.quantity || 1);
    });

    setTotal(sum);
  }, [cart]);

  // =========================
  // ❌ REMOVE ITEM
  // =========================
  const removeItem = async (id) => {
    await fetch(
      `http://localhost:2340/api/removecart/${id}`,
      { method: "DELETE" }
    );

    fetchCart();
  };

  // =========================
  // 📍 ADDRESS CHANGE
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value,
      },
    }));
  };

  // =========================
  // 💳 RAZORPAY PAYMENT
  // =========================
  const handlePayment = async () => {
    const ok = await loadRazorpay();
    if (!ok) return alert("Razorpay failed");

    // CREATE ORDER
    const res = await fetch(
      "http://localhost:2340/api/payment/order",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: total + 40,
        }),
      }
    );

    const data = await res.json();

    if (!data.order) return alert("Order failed");

    const order = data.order;

    const options = {
      key: "rzp_test_Sk17vHFhO6fl8D",
      amount: order.amount,
      currency: "INR",
      name: "My Store",
      description: "Order Payment",
      order_id: order.id,

      handler: async function (response) {
        // VERIFY
        const verify = await fetch(
          "http://localhost:2340/api/payment/verify",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          }
        );

        const vData = await verify.json();

        if (!vData.success) {
          return alert("Payment Failed");
        }

        // PLACE ORDER
        const payload = {
          userId,
          paymentId: response.razorpay_payment_id,
          paymentMethod: "Online",

          cart: cart.map((item) => ({
            productId:
              item.productId?._id || item.productId,
            quantity: Number(item.quantity || 1),
          })),

          address: form.address,
        };

        const orderRes = await fetch(
          "http://localhost:2340/api/order",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );

        const final = await orderRes.json();

        if (final.success) {
          alert("Order Placed Successfully");
          setCart([]);
          navigate("/");
        } else {
          alert("Order Failed");
        }
      },

      prefill: {
        name: "User",
        email: "test@test.com",
        contact: "9999999999",
      },

      theme: {
        color: "#2563eb",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // =========================
  // 🧾 PLACE ORDER
  // =========================
  const placeOrder = async () => {
    if (form.paymentMethod === "Online") {
      handlePayment();
      return;
    }

    const payload = {
      userId,
      paymentMethod: "COD",

      cart: cart.map((item) => ({
        productId:
          item.productId?._id || item.productId,
        quantity: Number(item.quantity || 1),
      })),

      address: form.address,
    };

    const res = await fetch(
      "http://localhost:2340/api/order",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json();

    if (data.success) {
      alert("COD Order Placed");
      setCart([]);
      navigate("/");
    }
  };

  return (
    <div className="cart-page">

      {/* CART BOX */}
      <div className="cart-box">

        <div className="cart-top">
          <h2>🛒 Your Cart</h2>

          <div className="cart-badge">
            {cart.length} Items • ₹{total}
          </div>
        </div>

        <div className="cart-header">
          <p>Image</p>
          <p>Name</p>
          <p>Qty</p>
          <p>Price</p>
          <p>Total</p>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart">
            Your Cart is Empty
          </div>
        ) : (
          cart.map((item) => {
            const p = item.productId;
            const price = p?.price || 0;

            return (
              <div className="cart-item" key={item._id}>

                <div className="cart-image">
                  <img
                    src={`http://localhost:2340${p?.image}`}
                    alt=""
                  />
                </div>

                <div className="cart-name">
                  {p?.modelName}
                </div>

                <div className="cart-qty">
                  {item.quantity}
                </div>

                <div className="cart-price">
                  ₹{price}
                </div>

                <div className="cart-total">
                  ₹{price * item.quantity}
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeItem(item._id)}
                >
                  ✕
                </button>

              </div>
            );
          })
        )}
      </div>

      {/* ADDRESS BOX */}
      <div className="address-box">

        <h2>📍 Delivery Address</h2>

        <div className="form-grid">

          <input name="flat" placeholder="Flat / House No" onChange={handleChange} />
          <input name="street" placeholder="Street" onChange={handleChange} />
          <input name="area" placeholder="Area" onChange={handleChange} />
          <input name="landmark" placeholder="Landmark" onChange={handleChange} />
          <input name="city" placeholder="City" onChange={handleChange} />
          <input name="pincode" placeholder="Pincode" onChange={handleChange} />
          <input name="phone" placeholder="Phone Number" onChange={handleChange} />

        </div>

        <h2 className="payment-title">💳 Payment Method</h2>

        <div className="payment-methods">

          <div
            className={`payment-card ${
              form.paymentMethod === "Online"
                ? "active-payment"
                : ""
            }`}
            onClick={() =>
              setForm({
                ...form,
                paymentMethod: "Online",
              })
            }
          >
            <input type="radio" checked={form.paymentMethod === "Online"} readOnly />
            Online 💳
          </div>

          <div
            className={`payment-card ${
              form.paymentMethod === "COD"
                ? "active-payment"
                : ""
            }`}
            onClick={() =>
              setForm({
                ...form,
                paymentMethod: "COD",
              })
            }
          >
            <input type="radio" checked={form.paymentMethod === "COD"} readOnly />
            COD 💵
          </div>

        </div>

        <button className="place-order-btn" onClick={placeOrder}>
          Place Order 🚀
        </button>

      </div>

    </div>
  );
}