import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/view.css";

export default function View() {

  const { orderNumber } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("Pending");
  const [remark, setRemark] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setFetching(true);

        const res = await fetch(
          `http://localhost:2340/api/orders/order/${orderNumber}`
        );

        const data = await res.json();

        if (data?.success) {
          setOrder(data.order);
          setStatus(data.order?.status || "Pending");
          setRemark(data.order?.restaurantRemark || "");
        } else {
          setOrder(null);
        }
      } catch (err) {
        setOrder(null);
      } finally {
        setFetching(false);
      }
    };

    if (orderNumber) fetchOrder();
  }, [orderNumber]);

  const updateOrder = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:2340/api/order/${order._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            status,
            restaurantRemark: remark,
          }),
        }
      );

      const data = await res.json();

      alert(data.message || "Updated");

      if (data?.data) setOrder(data.data);

      navigate("/dash");

    } catch (err) {
      alert("Error");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <p className="kj-loading">Loading...</p>;
  if (!order) return <p className="kj-loading">Order not found</p>;

  return (
    <div className="kj-main-container">

      {/* LEFT */}
      <div className="kj-left-box">
        <h2>User Details</h2>

        <table className="kj-table">
          <tbody>
            <tr>
              <td>Order Number</td>
              <td>{order.orderNumber}</td>
            </tr>

            <tr>
              <td>First Name</td>
              <td>{order?.user?.firstName || "N/A"}</td>
            </tr>

            <tr>
              <td>Last Name</td>
              <td>{order?.user?.LastName || "N/A"}</td>
            </tr>

            <tr>
              <td>Email</td>
              <td>{order?.user?.email || "N/A"}</td>
            </tr>

            <tr>
              <td>Mobile</td>
              <td>{order?.user?.contact || order?.address?.phone || "N/A"}</td>
            </tr>

            <tr>
              <td>Flat</td>
              <td>{order?.address?.flat || "N/A"}</td>
            </tr>

            <tr>
              <td>Area</td>
              <td>{order?.address?.area || "N/A"}</td>
            </tr>

            <tr>
              <td>City</td>
              <td>{order?.address?.city || "N/A"}</td>
            </tr>

            <tr>
              <td>Pincode</td>
              <td>{order?.address?.pincode || "N/A"}</td>
            </tr>

            <tr>
              <td>Order Date</td>
              <td>{new Date(order.createdAt).toLocaleString()}</td>
            </tr>

            <tr>
              <td>Status</td>
              <td>
                <span className={`kj-status ${order?.status?.toLowerCase().replace(/\s/g, "-")}`}>
                  {order.status}
                </span>
              </td>
            </tr>

            <tr>
              <td>Payment</td>
              <td>{order.paymentMethod}</td>
            </tr>

            <tr>
              <td>Total</td>
              <td>₹{order.totalAmount}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* RIGHT */}
      <div className="kj-right-box">
        <h2>Order Details</h2>

        <table className="kj-order-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {order?.items?.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>

                <td>
                  <img
                    src={`http://localhost:2340${item.image}`}
                    className="kj-product-img"
                    alt=""
                  />
                </td>

                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>₹{item.price}</td>
                <td>₹{item.price * item.quantity}</td>
              </tr>
            ))}

            <tr className="kj-total-row">
              <td colSpan="5">Grand Total</td>
              <td>₹{order.totalAmount}</td>
            </tr>
          </tbody>
        </table>

        {/* UPDATE */}
        <div className="kj-up-container">
          <h3>Update Order</h3>

          <textarea
            className="kj-textarea"
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
          />

          <select
            className="kj-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>Pending</option>
            <option>Confirm</option>
            <option>Out for Delivery</option>
            <option>Delivered</option>
          </select>

          <button
            className="kj-btn"
            onClick={updateOrder}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Order"}
          </button>
        </div>

      </div>
    </div>
  );
}