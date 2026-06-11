import React, { useEffect, useState } from "react";
import { FaSearch, FaTrash } from "react-icons/fa";
import "../css/reguser.css";

export default function Reguser() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 15;

  // Fetch Users
  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:2340/api/reguser");
      const data = await res.json();

      console.log(data);

      setUsers(data.users || []);
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete User
  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      await fetch(`http://localhost:2340/api/managequote/${id}`, {
        method: "DELETE",
      });

      setUsers((prev) => prev.filter((user) => user._id !== id));
    } catch (error) {
      console.log("Delete Error:", error);
    }
  };

  // Search Filter
  const filteredUsers = users.filter((user) => {
    const search = searchTerm.toLowerCase().trim();

    const fullName =
      `${user.firstName || ""} ${user.LastName || ""}`.toLowerCase();

    return (
      fullName.includes(search) ||
      user.email?.toLowerCase().includes(search) ||
      user.contact?.toString().includes(search)
    );
  });

  // Pagination Logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  const currentUsers = filteredUsers.slice(
    indexOfFirstUser,
    indexOfLastUser
  );

  const totalPages = Math.ceil(
    filteredUsers.length / usersPerPage
  );

  return (
    <div className="reg-container">
      <h2 className="reg-title">
        👤 Registered Users
      </h2>

      <div className="reg-controls">
        <div className="search-wrapper">
          <FaSearch className="search-icon" />

          <input
            type="text"
            placeholder="Search by name, email or contact..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="reg-total">
          Total Users : <span>{filteredUsers.length}</span>
        </div>
      </div>

      <div className="reg-table-wrapper">
        <table className="reg-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Register Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user, index) => (
                <tr key={user._id}>
                  <td>{indexOfFirstUser + index + 1}</td>

                  <td className="user-name">
                    {user.firstName} {user.LastName}
                  </td>

                  <td>{user.email}</td>

                  <td>{user.contact}</td>

                  <td>
                    {user.createdAt
                      ? new Date(
                          user.createdAt
                        ).toLocaleDateString()
                      : "N/A"}
                  </td>

                  <td>
                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteUser(user._id)
                      }
                    >
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="no-data"
                >
                  No Users Found 😢
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
                setCurrentPage((prev) => prev - 1)
              }
            >
              Previous
            </button>

            <span>
              Page {currentPage} of {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => prev + 1)
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