import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/editproduct.css";

export default function Productedit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    category: "",
    brand: "",
    modelName: "",
    price: "",
    discount: "",
    stock: "In Stock",
    ram: "",
    storage: "",
    description: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  // 📥 GET PRODUCT BY ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `http://localhost:2340/api/product/${id}`
        );
        const data = await res.json();

        if (data.success) {
          setProduct({
            category: data.data.category || "",
            brand: data.data.brand || "",
            modelName: data.data.modelName || "",
            price: data.data.price || "",
            discount: data.data.discount || "",
            stock: data.data.stock || "In Stock",
            ram: data.data.ram || "",
            storage: data.data.storage || "",
            description: data.data.description || "",
          });

          setPreview(`http://localhost:2340${data.data.image}`);
        }
      } catch (err) {
        console.log("Fetch Error:", err);
      }
    };

    fetchProduct();
  }, [id]);

  // 🖼 IMAGE CHANGE
  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // ✍️ INPUT CHANGE
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // 🚀 UPDATE PRODUCT
  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(product).forEach((key) => {
      formData.append(key, product[key]);
    });

    if (image) {
      formData.append("image", image);
    }

    try {
      const res = await fetch(
        `http://localhost:2340/api/product/${id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      const data = await res.json();

      if (data.success) {
        alert("Product Updated Successfully!");
        navigate("/manageproducts");
      } else {
        alert(data.message || "Update Failed");
      }
    } catch (err) {
      console.log(err);
      alert("Server Error");
    }
  };

  return (
    <div className="editContainer">
      <div className="editBox">
        <div className="editHeader">
          <h1>Edit Product</h1>
          <p>Update product details</p>
        </div>

        <form onSubmit={handleUpdate}>
          {/* CATEGORY + BRAND */}
          <div className="inputGroup">
            <div>
              <label>Category</label>
              <input
                name="category"
                value={product.category}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Brand</label>
              <input
                name="brand"
                value={product.brand}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* MODEL + PRICE */}
          <div className="inputGroup">
            <div>
              <label>Model Name</label>
              <input
                name="modelName"
                value={product.modelName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Price</label>
              <input
                name="price"
                value={product.price}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* DISCOUNT + STOCK */}
          <div className="inputGroup">
            <div>
              <label>Discount</label>
              <input
                name="discount"
                value={product.discount}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Stock</label>
              <select
                name="stock"
                value={product.stock}
                onChange={handleChange}
              >
                <option value="In Stock">In Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>
          </div>

          {/* RAM + STORAGE */}
          <div className="inputGroup">
            <div>
              <label>RAM</label>
              <input
                name="ram"
                value={product.ram}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Storage</label>
              <input
                name="storage"
                value={product.storage}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="singleInput">
            <label>Description</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
            />
          </div>

          {/* IMAGE */}
          <div className="singleInput">
            <label>Image</label>
            <input type="file" onChange={handleImage} />
          </div>

          {/* PREVIEW */}
          <div className="imgBox">
            {preview && <img src={preview} alt="product" />}
          </div>

          <button type="submit">Update Product</button>
        </form>
      </div>
    </div>
  );
}