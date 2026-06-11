import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "../css/orderstatus.css";

export default function PendingOrders() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  // FETCH ORDERS
  const fetchOrders = async () => {
    try {
      const res = await fetch(
        "http://localhost:2340/api/orderss/pendinglist"
      );

      const data = await res.json();

      setOrders(data?.data || []);
    } catch (error) {
      console.log("Error:", error);
      setOrders([]);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // SEARCH FILTER
  const filteredOrders = orders.filter((o) => {
    const search = searchTerm.toLowerCase().trim();

    return (
      o.orderNumber?.toLowerCase().includes(search) ||
      o.totalAmount?.toString().includes(search) ||
      o.status?.toLowerCase().includes(search) ||
      (o.createdAt &&
        new Date(o.createdAt)
          .toLocaleString()
          .toLowerCase()
          .includes(search))
    );
  });

  // Pagination Logic
  const indexOfLastOrder =
    currentPage * ordersPerPage;

  const indexOfFirstOrder =
    indexOfLastOrder - ordersPerPage;

  const currentOrders =
    filteredOrders.slice(
      indexOfFirstOrder,
      indexOfLastOrder
    );

  const totalPages = Math.ceil(
    filteredOrders.length / ordersPerPage
  );

  return (
    <div className="order-container">
      <h2 className="order-title">
        🆕 Pending Orders
      </h2>

      {/* SEARCH + COUNT */}
      <div className="order-controls">
        <div className="search-box">
          <FaSearch className="search-icon" />

          <input
            type="text"
            placeholder="Search by order no, amount, date..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="order-count">
          Total Orders:
          <span>{filteredOrders.length}</span>
        </div>
      </div>

      {/* TABLE */}
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
            {currentOrders.length > 0 ? (
              currentOrders.map((q, index) => (
                <tr key={q._id}>
                  <td>
                    {indexOfFirstOrder +
                      index +
                      1}
                  </td>

                  <td className="order-id">
                    {q.orderNumber}
                  </td>

                  <td>
                    {q.createdAt
                      ? new Date(
                          q.createdAt
                        ).toLocaleDateString(
                          "en-IN"
                        )
                      : "N/A"}
                  </td>

                  <td>
                    <span className="pending-status">
                      {q.status}
                    </span>
                  </td>

                  <td className="amount">
                    ₹ {q.totalAmount}
                  </td>

                  <td>
                    <Link
                      to={`/View/${q.orderNumber}`}
                      className="view-btn"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="no-data"
                >
                  No orders found 😢
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage(
                  currentPage - 1
                )
              }
            >
              Previous
            </button>

            <span>
              Page {currentPage} of{" "}
              {totalPages}
            </span>

            <button
              disabled={
                currentPage === totalPages
              }
              onClick={() =>
                setCurrentPage(
                  currentPage + 1
                )
              }
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}