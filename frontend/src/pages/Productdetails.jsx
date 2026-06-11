import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaStar,
  FaHeart,
  FaShoppingCart,
  FaCheck,
} from "react-icons/fa";

import "../css/productdetails.css";

export default function Productdetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  const userId = localStorage.getItem("userId");

  // =========================================
  // 📦 FETCH PRODUCT
  // =========================================
  useEffect(() => {
    fetch(`http://localhost:2340/api/product/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  // =========================================
  // 🛒 ADD TO CART
  // =========================================
  const addToCart = async () => {
    if (!userId) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    try {
      const res = await fetch("http://localhost:2340/api/addcart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          productId: product._id,
          quantity: 1,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("🛒 Added to Cart");
      } else {
        alert(data.message || "Failed to add cart");
      }
    } catch (error) {
      console.log(error);
      alert("Server Error");
    }
  };

  if (!product) {
    return <h1 className="loading">Loading...</h1>;
  }

  return (
    <div className="detailsContainer">

      {/* LEFT */}
      <div className="leftSide">
        <div className="mainImageBox">
          <img
            src={`http://localhost:2340${product.image}`}
            alt={product.modelName}
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="rightSide">

        <h1>
          {product.brand} {product.modelName}
        </h1>

        {/* ⭐ RATING */}
        <div className="ratingRow">
          <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
          <span>(4.9)</span>
        </div>

        <p className="description">
          {product.description}
        </p>

        {/* INFO */}
        <div className="infoBox">
          <div><span>Category :</span><p>{product.category}</p></div>
          <div><span>RAM :</span><p>{product.ram}</p></div>
          <div><span>Storage :</span><p>{product.storage}</p></div>
          <div><span>Stock :</span><p>{product.stock}</p></div>
        </div>

        {/* PRICE */}
        <div className="priceRow">

          <h2>
            ₹{product.price - (product.price * (product.discount || 0)) / 100}
          </h2>

          <del>₹{product.price}</del>

          <span className="offer">
            {product.discount || 10}% OFF
          </span>

        </div>

        {/* STOCK */}
        <div className="stockRow">
          <FaCheck />
          <span>{product.stock}</span>
        </div>

        {/* BUTTONS */}
        <div className="btns">

          <button className="wishlistBtn2">
            <FaHeart />
          </button>

          <button
            className="cartBtn2"
            onClick={addToCart}
          >
            <FaShoppingCart />
            Add To Cart
          </button>

        </div>

      </div>
    </div>
  );
}