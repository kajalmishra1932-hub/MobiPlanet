import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "../css/orderstatus.css";

export default function Confirm() {

  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchOrders = async () => {

    try {

      const res = await fetch(
        "http://localhost:2340/api/confirmlist"
      );

      const data = await res.json();

      setOrders(data?.data || []);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((o) => {

    const search = searchTerm.toLowerCase();

    return (
      o.orderNumber?.toLowerCase().includes(search) ||
      o.status?.toLowerCase().includes(search)
    );
  });

  return (
    <div className="order-container">

      <h2 className="order-title">
        📦 Confirm Orders
      </h2>

      <div className="order-controls">

        <div className="search-box">

          <FaSearch className="search-icon" />

          <input
            type="text"
            placeholder="Search order..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

        </div>

        <div className="order-count">
          Total Orders: <span>{filteredOrders.length}</span>
        </div>

      </div>

      <div className="order-table-wrapper">

        <table className="order-table">

          <thead>
            <tr>
              <th>#</th>
              <th>Order No</th>
              <th>Date</th>
              <th>Status</th>
              <th>Total ₹</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {filteredOrders.length > 0 ? (

              filteredOrders.map((q, index) => (

                <tr key={q._id}>

                  <td>{index + 1}</td>

                  <td>{q.orderNumber}</td>

                  <td>
                    {new Date(q.createdAt).toLocaleDateString("en-IN")}
                  </td>

                  <td>
                    <span className="confirm-status">
                      {q.status}
                    </span>
                  </td>

                  <td>₹ {q.totalAmount}</td>

                  <td>

                    <Link
                      to={`/view-order/${q._id}`}
                      className="view-btn"
                    >
                      View
                    </Link>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td colSpan="6" className="no-data">
                  No Orders Found 😢
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}