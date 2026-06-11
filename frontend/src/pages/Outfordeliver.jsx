import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "../css/orderstatus.css";

export default function OutforDeliver() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  const fetchOrders = async () => {
    try {
      const res = await fetch(
        "http://localhost:2340/api/orderss/outfordelivery"
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

  // Search Filter
  const filteredOrders = orders.filter((o) => {
    const search = searchTerm.toLowerCase();

    return (
      o.orderNumber?.toLowerCase().includes(search) ||
      o.status?.toLowerCase().includes(search)
    );
  });

  // Pagination Logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;

  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  const totalPages = Math.ceil(
    filteredOrders.length / ordersPerPage
  );

  return (
    <div className="order-container">
      <h2 className="order-title">
        🚚 Out For Delivery
      </h2>

      <div className="order-controls">
        <div className="search-box">
          <FaSearch className="search-icon" />

          <input
            type="text"
            placeholder="Search order..."
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
                    {indexOfFirstOrder + index + 1}
                  </td>

                  <td>{q.orderNumber}</td>

                  <td>
                    {new Date(
                      q.createdAt
                    ).toLocaleDateString("en-IN")}
                  </td>

                  <td>
                    <span className="delivery-status">
                      {q.status}
                    </span>
                  </td>

                  <td>₹ {q.totalAmount}</td>

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