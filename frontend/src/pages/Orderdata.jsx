import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "../css/orderdata.css";

export default function Orderdata() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  // ✅ FETCH ALL ORDERS
  const fetchOrders = async () => {
    try {
      const res = await fetch(
        "http://localhost:2340/api/orderdata"
      );

      const data = await res.json();

      console.log(data);

      setOrders(data.orders || []);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ✅ SEARCH FILTER
  const filteredOrders = orders.filter((o) => {
    const search = searchTerm.toLowerCase().trim();

    return (
      o.orderNumber?.toLowerCase().includes(search) ||
      o.totalAmount?.toString().includes(search) ||
      o.status?.toLowerCase().includes(search) ||
      o.paymentMethod?.toLowerCase().includes(search) ||
      o.address?.mobile?.toString().includes(search) ||
      o.userId?.mobile?.toString().includes(search) ||
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
    <div className="loo order-container">
      {/* TITLE */}
      <h2 className="loo order-title">
        📦 Manage Orders
      </h2>

      {/* SEARCH */}
      <div className="loo order-controls">
        <div className="loo search-box">
          <FaSearch className="loo search-icon" />

          <input
            className="loo search-input"
            type="text"
            placeholder="Search order, mobile, amount..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="loo order-count">
          Total Orders :
          <span> {filteredOrders.length}</span>
        </div>
      </div>

      {/* TABLE */}
      <div className="loo order-table-wrapper">
        <table className="loo order-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Order No</th>
              <th>Date</th>
              <th>Status</th>
              <th>Payment</th>
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

                  <td className="loo order-id table-data">
                    {q.orderNumber}
                  </td>

                  <td className="loo table-data">
                    {q.createdAt
                      ? new Date(
                          q.createdAt
                        ).toLocaleDateString()
                      : "N/A"}
                  </td>

                  <td className="loo status table-data">
                    {q.status}
                  </td>

                  <td className="loo table-data">
                    {q.paymentMethod}
                  </td>

                  <td className="loo amount table-data">
                    ₹ {q.totalAmount}
                  </td>

                  <td className="loo table-data">
                    <Link
                      to={`/View/${q.orderNumber}`}
                      className="loo view-btn"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="loo no-data"
                >
                  No Orders Found 😢
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