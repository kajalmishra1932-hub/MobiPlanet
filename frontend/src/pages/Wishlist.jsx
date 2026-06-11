import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaStar, FaTrashAlt } from "react-icons/fa";
import "../css/wishlist.css";

export default function Wishlist() {
  const navigate = useNavigate(); // ✅ FIX 1

  const userId = localStorage.getItem("userId");

  const [wishlistProducts, setWishlistProducts] = useState([]); // ✅ FIX 2

  // LOAD WISHLIST
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlistProducts(data);
  }, []);

  // REMOVE FROM WISHLIST
  const removeFromWishlist = (id, e) => {
    e.stopPropagation();

    const updated = wishlistProducts.filter(
      (item) => item._id !== id
    );

    localStorage.setItem("wishlist", JSON.stringify(updated));
    setWishlistProducts(updated);
  };

  // ADD TO CART (BACKEND)
  const handleAddToCart = async (product, e) => {
    e.stopPropagation();

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
        alert("🛒 Added to cart");

        // remove from wishlist after add
        const updatedWishlist = wishlistProducts.filter(
          (item) => item._id !== product._id
        );

        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
        setWishlistProducts(updatedWishlist);

        window.dispatchEvent(new Event("storage"));

        navigate("/cart");
      } else {
        alert(data.message || "Failed to add to cart");
      }
    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  };

  return (
    <div className="wishlistContainer">

      {/* HEADER */}
      <div className="wishlistHeader">
        <div>
          <h1>My Wishlist ❤️</h1>
          <p>You have {wishlistProducts.length} premium items saved</p>
        </div>
      </div>

      {/* LIST */}
      <div className="wishlistItemsList">

        {wishlistProducts.length > 0 ? (
          wishlistProducts.map((item) => (
            <div
              className="wishlistRowItem"
              key={item._id}
              onClick={() => navigate(`/products/${item._id}`)}
            >

              {/* IMAGE */}
              <div className="itemImgCol">
                <img
                  src={`http://localhost:2340${item.image}`}
                  alt={item.modelName}
                />
              </div>

              {/* DETAILS */}
              <div className="itemDetailsCol">
                <span className="itemCategory">{item.category}</span>
                <h3 className="itemTitle">{item.modelName}</h3>

                <div className="itemRatingRow">
                  <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
                  <span>(4.9)</span>
                </div>

                <p className="itemDescription">
                  {item.description
                    ? `${item.description.slice(0, 110)}...`
                    : "No description available."}
                </p>
              </div>

              {/* PRICE */}
              <div className="itemPriceCol">
                <span className="itemPriceLabel">Price</span>
                <span className="itemActualPrice">
                  ₹{item.price}
                </span>
              </div>

              {/* ACTIONS */}
              <div className="itemActionsCol">

                <button
                  className="rowCartBtn"
                  onClick={(e) => handleAddToCart(item, e)}
                >
                  <FaShoppingCart /> Add To Cart
                </button>

                <button
                  className="rowRemoveBtn"
                  onClick={(e) => removeFromWishlist(item._id, e)}
                >
                  <FaTrashAlt /> Remove
                </button>

              </div>

            </div>
          ))
        ) : (
          <div className="emptyWishlistState">
            <div className="emptyHeartIcon">❤️</div>
            <h2>Your wishlist is feeling light!</h2>
            <p>Add products you like to find them easily here anytime.</p>

            <button
              className="continueShopBtn"
              onClick={() => navigate("/")}
            >
              Continue Shopping
            </button>
          </div>
        )}

      </div>
    </div>
  );
}