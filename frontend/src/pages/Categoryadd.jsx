import React, { useState } from "react";
import "../css/categoryadd.css";

export default function Categoryadd() {
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category.trim()) {
      alert("Category required");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:2340/api/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message);
        setCategory("");
      } else {
        alert(data.message || "Error occurred");
      }

    } catch (error) {
      alert("Server not responding");
    } finally {
      setLoading(false);
    }
  };

  return (
   <div className="categoryAddContainer">
  <div className="categoryAddBox">

    <div className="categoryAddHeader">
      <h1>Add Category</h1>
      <p>Create new product category</p>
    </div>

    <form onSubmit={handleSubmit}>
      <div className="categoryAddInput">
        <label>Category Name</label>
        <input
          type="text"
          placeholder="Enter category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Category"}
      </button>
    </form>

  </div>
</div>
  );
}