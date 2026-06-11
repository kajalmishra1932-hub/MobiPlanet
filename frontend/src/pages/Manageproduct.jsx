import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import "../css/manageproduct.css";

export default function Manageproducts() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  // 📦 FETCH PRODUCTS
  const fetchProducts = async () => {
    setLoading(true);

    try {
      const res = await fetch("http://localhost:2340/api/products");
      const data = await res.json();

      if (data?.success) {
        setProducts(Array.isArray(data.data) ? data.data : []);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.log("Fetch error:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ❌ DELETE PRODUCT
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      const res = await fetch(
        `http://localhost:2340/api/deleteproduct/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (data?.success || res.ok) {
        setProducts((prev) =>
          prev.filter((p) => p._id !== id)
        );
      }
    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  // 📌 CATEGORY LIST
  const categories = useMemo(() => {
    return [
      "All",
      ...new Set(
        products
          .map((p) => p.category)
          .filter(Boolean)
      ),
    ];
  }, [products]);

  // 🔍 FILTER PRODUCTS
  const filteredProducts = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    return products.filter((p) => {
      const matchSearch =
        !search ||
        p.modelName?.toLowerCase().includes(search) ||
        p.brand?.toLowerCase().includes(search) ||
        p.category?.toLowerCase().includes(search) ||
        String(p.price || "").includes(search) ||
        p.storage?.toLowerCase().includes(search);

      const matchCategory =
        category === "All" ||
        p.category === category;

      return matchSearch && matchCategory;
    });
  }, [products, searchTerm, category]);

  // Pagination Logic
  const indexOfLastProduct =
    currentPage * productsPerPage;

  const indexOfFirstProduct =
    indexOfLastProduct - productsPerPage;

  const currentProducts =
    filteredProducts.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );

  const totalPages = Math.ceil(
    filteredProducts.length / productsPerPage
  );

  return (
    <div className="kl food-container">
      <h2 className="kl food-title">
        📱 Manage Products
      </h2>

      {/* 🔍 FILTERS */}
      <div className="kl food-filters">
        <div className="kl search-box">
          <FaSearch className="kl search-icon" />

          <input
            className="kl search-input"
            type="text"
            placeholder="Search brand, model..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <select
          className="kl category-select"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setCurrentPage(1);
          }}
        >
          {categories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* 📋 TABLE */}
      <div className="kl table-wrapper">
        <table className="kl food-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Model</th>
              <th>Price</th>
              <th>Storage</th>
              <th>RAM</th>
              <th>Stock</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="10" className="kl no-data">
                  Loading products...
                </td>
              </tr>
            ) : currentProducts.length > 0 ? (
              currentProducts.map((v, index) => (
                <tr key={v._id}>
                  <td>
                    {indexOfFirstProduct +
                      index +
                      1}
                  </td>

                  <td>
                    <span className="kl category-badge">
                      {v.category || "N/A"}
                    </span>
                  </td>

                  <td>{v.brand || "-"}</td>

                  <td>{v.modelName || "-"}</td>

                  <td>
                    ₹{v.price || 0}
                  </td>

                  <td>{v.storage || "-"}</td>

                  <td>{v.ram || "-"}</td>

                  <td>
                    <span
                      style={{
                        color:
                          v.stock === "In Stock"
                            ? "green"
                            : "red",
                        fontWeight: "bold",
                      }}
                    >
                      {v.stock || "N/A"}
                    </span>
                  </td>

                  <td>
                    {v.createdAt
                      ? new Date(
                          v.createdAt
                        ).toLocaleDateString()
                      : "N/A"}
                  </td>

                  <td>
                    <div className="kl action-btns">
                      <Link
                        to={`/edit/${v._id}`}
                        className="kl edit-btn"
                      >
                        <FaEdit />
                      </Link>

                      <button
                        className="kl delete-btn"
                        onClick={() =>
                          handleDelete(v._id)
                        }
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="10"
                  className="kl no-data"
                >
                  No products found 😢
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