import React, { useEffect, useState } from "react";
import "../css/Subscribedata.css";

export default function Subscriberdata() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ PAGINATION STATES
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const response = await fetch("http://localhost:2340/api/subscribers");
      const result = await response.json();

      if (result.success) {
        setSubscribers(result.data);
      }
    } catch (error) {
      console.error("Error fetching subscribers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this subscriber?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:2340/api/subscriber/${id}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (result.success) {
        alert("Subscriber deleted successfully");

        setSubscribers((prev) =>
          prev.filter((item) => item._id !== id)
        );
      }
    } catch (error) {
      console.error("Delete Error:", error);
      alert("Something went wrong");
    }
  };

  // RESET PAGE IF DATA CHANGES
  React.useEffect(() => {
    setCurrentPage(1);
  }, [subscribers]);

  // PAGINATION LOGIC
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = subscribers.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(subscribers.length / itemsPerPage);

  const goToPage = (page) => setCurrentPage(page);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  if (loading) {
    return <div className="loading">Loading Subscribers...</div>;
  }

  return (
    <div className="subscriber-container">
      <div className="subscriber-header">
        <h2 className="subscriber-title">
          Newsletter Subscribers
        </h2>

        <div className="subscriber-count">
          Total: {subscribers.length}
        </div>
      </div>

      <div className="table-wrapper">
        <table className="subscriber-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Joined Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((subscriber, index) => (
                <tr key={subscriber._id}>
                  <td>
                    {indexOfFirstItem + index + 1}
                  </td>

                  <td>
                    <span className="email-badge">
                      {subscriber.email}
                    </span>
                  </td>

                  <td>
                    {new Date(
                      subscriber.createdAt
                    ).toLocaleDateString()}
                  </td>

                  <td>
                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleDelete(subscriber._id)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="empty">
                  No Subscribers Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {subscribers.length > itemsPerPage && (
        <div className="pagination">

          <button
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i + 1)}
              className={
                currentPage === i + 1 ? "active" : ""
              }
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>

        </div>
      )}
    </div>
  );
}