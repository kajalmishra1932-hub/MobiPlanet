// 📂 AddProduct.jsx

import React, { useState, useEffect } from "react";
import "../css/addproduct.css";

export default function Addproduct() {
  const [categories, setCategories] = useState([]);

  const [productData, setProductData] = useState({
    category: "",
    brand: "",
    modelName: "",
    price: "",
    discount: "",
    stock: "In Stock",
    ram: "",
    storage: "",
    description: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);

  // ========================
  // 🔥 FETCH CATEGORIES
  // ========================
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:2340/api/categorydata");
        const data = await res.json();

        setCategories(data.data || []);
      } catch (err) {
        console.log("Category Fetch Error:", err.message);
      }
    };

    fetchCategories();
  }, []);

  // ========================
  // TEXT CHANGE
  // ========================
  const handleChange = (e) => {
    setProductData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ========================
  // FILE CHANGE
  // ========================
  const handleFileChange = (e) => {
    setProductData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  // ========================
  // SUBMIT
  // ========================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("category", productData.category);
      formData.append("brand", productData.brand);
      formData.append("modelName", productData.modelName);
      formData.append("price", productData.price);
      formData.append("discount", productData.discount);
      formData.append("stock", productData.stock);
      formData.append("ram", productData.ram);
      formData.append("storage", productData.storage);
      formData.append("description", productData.description);

      if (productData.image) {
        formData.append("image", productData.image);
      }

      const res = await fetch("http://localhost:2340/api/add", {
        method: "POST",
        body: formData,
      });

      const text = await res.text();

      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        console.log("NON-JSON RESPONSE:", text);
        throw new Error("Server error (not JSON response)");
      }

      if (!res.ok) {
        throw new Error(data.message || "Upload failed");
      }

      alert("Phone Uploaded Successfully 👍");

      // RESET FORM
      setProductData({
        category: "",
        brand: "",
        modelName: "",
        price: "",
        discount: "",
        stock: "In Stock",
        ram: "",
        storage: "",
        description: "",
        image: null,
      });

    } catch (error) {
      console.error("UPLOAD ERROR:", error.message);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="addProductContainer">
      <div className="addProductBox">

        <div className="productHeader">
          <div>
            <h1>Add New Phone</h1>
            <p>Upload mobile details here</p>
          </div>

          <img
            src="https://cdn-icons-png.flaticon.com/512/1041/1041885.png"
            alt=""
          />
        </div>

        <form onSubmit={handleSubmit}>

          {/* CATEGORY + BRAND */}
          <div className="inputGroup">
            <div>
              <label>Category</label>
              <select
                name="category"
                value={productData.category}
                onChange={handleChange}
              >
                <option value="">Select Category</option>

                {categories.map((item) => (
                  <option key={item._id} value={item.category}>
                    {item.category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Brand Name</label>
              <input
                type="text"
                name="brand"
                value={productData.brand}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* MODEL + PRICE */}
          <div className="inputGroup">
            <div>
              <label>Model Name</label>
              <input
                type="text"
                name="modelName"
                value={productData.modelName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Price</label>
              <input
                type="number"
                name="price"
                value={productData.price}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* DISCOUNT + STOCK */}
          <div className="inputGroup">
            <div>
              <label>Discount %</label>
              <input
                type="number"
                name="discount"
                value={productData.discount}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Stock</label>
              <select
                name="stock"
                value={productData.stock}
                onChange={handleChange}
              >
                <option value="In Stock">In Stock</option>
                <option value="Out Of Stock">Out Of Stock</option>
              </select>
            </div>
          </div>

          {/* RAM + STORAGE */}
          <div className="inputGroup">
            <div>
              <label>RAM</label>
              <input
                type="text"
                name="ram"
                value={productData.ram}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Storage</label>
              <input
                type="text"
                name="storage"
                value={productData.storage}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* IMAGE */}
          <div className="singleInput">
            <label>Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          {/* DESCRIPTION */}
          <div className="singleInput">
            <label>Description</label>
            <textarea
              name="description"
              value={productData.description}
              onChange={handleChange}
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Uploading..." : "Upload Phone"}
          </button>

        </form>
      </div>
    </div>
  );
}// 📂 AddProduct.jsx

