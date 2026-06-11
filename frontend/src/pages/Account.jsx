import React, { useEffect, useState } from "react";
import "../css/account.css";
import { Link } from "react-router-dom";

export default function Account() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");

  // ✅ FETCH USER ORDERS
  const fetchOrders = async (id) => {
    try {

      setLoading(true);

      if (!id) {
        setOrders([]);
        setLoading(false);
        return;
      }

      const res = await fetch(
        `http://localhost:2340/api/orders/${id}`
      );

      const data = await res.json();

      console.log("API RESPONSE =>", data);

      // ✅ FIX
      if (data.success) {
        setOrders(data.data || []);
      } else {
        setOrders([]);
      }

      setLoading(false);

    } catch (err) {

      console.log(err);

      setOrders([]);
      setLoading(false);

    }
  };

  useEffect(() => {
    if (userId) {
      fetchOrders(userId);
    }
  }, [userId]);

  return (
  <div className="gjj-profile-page">

  <div className="gjj-right">

    <h2 className="gjj-page-title">
      MY ORDERS
    </h2>

    {loading ? (

      <p>Loading orders...</p>

    ) : orders.length === 0 ? (

      <p>No orders found</p>

    ) : (

      orders.map((order) => (

        <div
          className="gjj-order-card"
          key={order._id}
        >

          <div className="gjj-order-img">
            ORDER
          </div>

          <div className="gjj-order-details">

            <p className="gjj-order-date">
              {order.createdAt
                ? new Date(order.createdAt).toLocaleString()
                : "N/A"}
            </p>

            <h3>
              Order #{order.orderNumber || order._id}
            </h3>

            <span className="gjj-status">
              {order.status || "Pending"}
            </span>

            <Link
              to={`/detail/${order.orderNumber}`}
              className="gjj-details-btn"
            >
              Order Details
            </Link>

            <p className="gjj-track">
              🚚 Track Order
            </p>

          </div>

        </div>

      ))

    )}

  </div>

</div>
  );
}