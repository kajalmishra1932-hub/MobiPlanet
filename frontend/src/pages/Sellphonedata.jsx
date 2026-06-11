import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "../css/adminsell.css";

export default function Sellphonedata() {

  const [phones, setPhones] = useState([]);
  const [search, setSearch] = useState("");

  // ✅ PAGINATION STATES
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const navigate = useNavigate();

  useEffect(() => {
    fetchPhones();
  }, []);

  const fetchPhones = async () => {
    try {
      const response = await fetch("http://localhost:2340/api/sellphone");
      const data = await response.json();
      setPhones(data.data || []);
    } catch (error) {
      console.log(error);
      setPhones([]);
    }
  };

  // SEARCH FILTER
  const filteredPhones = phones.filter((item) => {
    const s = search.toLowerCase();

    return (
      item.model?.toLowerCase().includes(s) ||
      item.brand?.toLowerCase().includes(s) ||
      item.city?.toLowerCase().includes(s) ||
      item.phone?.toString().includes(s)
    );
  });

  // RESET PAGE WHEN SEARCH CHANGES
  React.useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // PAGINATION LOGIC
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPhones.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredPhones.length / itemsPerPage);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="admin-sell-container">

      {/* HEADER */}
      <div className="admin-header">
        <h1>📱 Sell Phone Requests</h1>
        <p>Manage all customer phone sell requests</p>
      </div>

      {/* SEARCH BAR */}
      <div className="search-wrapper">

        <FaSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search by brand, model, city, phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="total-box">
          Total: {filteredPhones.length}
        </div>

      </div>

      {/* TABLE */}
      <div className="table-wrapper">

        <table className="sell-table">

          <thead>
            <tr>
              <th>#</th>
              <th>Model</th>
              <th>Brand</th>
              <th>City</th>
              <th>Expected Price</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {currentItems.length > 0 ? (

              currentItems.map((item, index) => (

                <tr key={item._id}>

                  <td>{indexOfFirstItem + index + 1}</td>
                  <td>{item.model}</td>
                  <td>{item.brand}</td>
                  <td>{item.city}</td>
                  <td>₹ {item.expectedPrice}</td>

                  <td>
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>

                  <td>
                    <button
                      className="view-btn"
                      onClick={() => navigate(`/viewsell/${item._id}`)}
                    >
                      View
                    </button>
                  </td>

                </tr>

              ))

            ) : (

              <tr>
                <td colSpan="7" className="no-data">
                  No Sell Requests Found
                </td>
              </tr>

            )}

          </tbody>

        </table>
      </div>

      {/* PAGINATION CONTROLS */}
      {filteredPhones.length > itemsPerPage && (
        <div className="pagination">

          <button onClick={prevPage} disabled={currentPage === 1}>
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i + 1)}
              className={currentPage === i + 1 ? "active" : ""}
            >
              {i + 1}
            </button>
          ))}

          <button onClick={nextPage} disabled={currentPage === totalPages}>
            Next
          </button>

        </div>
      )}

    </div>
  );
}