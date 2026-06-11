import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/productcard.css";

import {
  FaHeart,
  FaShoppingCart,
  FaWhatsapp,
} from "react-icons/fa";

export default function ProductCard() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [wishlist, setWishlist] = useState([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 15;

  const userId = localStorage.getItem("userId");

  // =========================================
  // 📦 FETCH PRODUCTS
  // =========================================
  useEffect(() => {
    fetch("http://localhost:2340/api/products")
      .then((res) => res.json())
      .then((data) => {
        let productList = [];

        if (Array.isArray(data)) productList = data;
        else if (Array.isArray(data?.data))
          productList = data.data;
        else if (Array.isArray(data?.products))
          productList = data.products;

        setProducts(productList);
      })
      .catch(() => setProducts([]));
  }, []);

  // =========================================
  // ❤️ LOAD WISHLIST
  // =========================================
  useEffect(() => {
    const savedWishlist =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    setWishlist(
      savedWishlist.map((i) => i._id || i.id)
    );
  }, []);

  // =========================================
  // ❤️ TOGGLE WISHLIST
  // =========================================
  const toggleWishlist = (product, e) => {
    e.stopPropagation();

    const productId = product._id || product.id;

    let oldWishlist =
      JSON.parse(localStorage.getItem("wishlist")) ||
      [];

    const exists = oldWishlist.find(
      (item) =>
        (item._id || item.id) === productId
    );

    if (exists) {
      const updated = oldWishlist.filter(
        (item) =>
          (item._id || item.id) !== productId
      );

      localStorage.setItem(
        "wishlist",
        JSON.stringify(updated)
      );

      setWishlist(
        updated.map((i) => i._id || i.id)
      );
    } else {
      oldWishlist.push(product);

      localStorage.setItem(
        "wishlist",
        JSON.stringify(oldWishlist)
      );

      setWishlist(
        oldWishlist.map((i) => i._id || i.id)
      );
    }
  };

  // =========================================
  // 🛒 ADD TO CART
  // =========================================
  const addToCart = async (productId, e) => {
    e.stopPropagation();

    if (!userId) {
      alert("Please Login First");
      navigate("/login");
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:2340/api/addcart",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            userId,
            productId,
            quantity: 1,
          }),
        }
      );

      const data = await res.json();

      if (data.success)
        alert("🛒 Added to cart");
      else
        alert(
          data.message ||
            "Failed to add cart"
        );
    } catch {
      alert("Server Error");
    }
  };

  // =========================================
  // 🔍 SEARCH FILTER
  // =========================================
  const filteredProducts = products.filter(
    (item) =>
      item?.brand
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      item?.modelName
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      item?.category
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  // =========================================
  // 📄 PAGINATION
  // =========================================
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
    filteredProducts.length /
      productsPerPage
  );

  return (
    <div className="mainProductsContainer">
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/9318476116?text=Hello%20I%20want%20to%20know%20about%20your%20products"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-fixed"
      >
        <FaWhatsapp />
      </a>

      {/* HEADER */}
      <div className="topSection">
        <h1>Latest Products</h1>
        <p>Modern Electronic Collection</p>
      </div>

      {/* SEARCH */}
      <div className="searchBox">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* PRODUCTS */}
      <div className="productsWrapper">
        {currentProducts.length > 0 ? (
          currentProducts.map((item) => {
            const productId =
              item._id || item.id;

            const price = Number(
              item.price || 0
            );

            const discount = Number(
              item.discount || 0
            );

            const finalPrice =
              price -
              (price * discount) / 100;

            return (
              <div
                className="productCard"
                key={productId}
                onClick={() =>
                  navigate(
                    `/products/${productId}`
                  )
                }
              >
                <div className="productImgBox">
                  <img
                    src={`http://localhost:2340${item.image}`}
                    alt={item.modelName}
                  />
                </div>

                <div className="productDetails">
                  <h3>{item.modelName}</h3>

                  <p className="desc">
                    {item.description
                      ? item.description.slice(
                          0,
                          65
                        ) + "..."
                      : "No description available"}
                  </p>

                  <div className="btnActionRow">
                    <button
                      className="cartBtn"
                      onClick={(e) =>
                        addToCart(
                          productId,
                          e
                        )
                      }
                    >
                      <FaShoppingCart /> Add
                    </button>

                    <button
                      className={`wishlistBtnNew ${
                        wishlist.includes(
                          productId
                        )
                          ? "activeWish"
                          : ""
                      }`}
                      onClick={(e) =>
                        toggleWishlist(
                          item,
                          e
                        )
                      }
                    >
                      <FaHeart />
                    </button>
                  </div>

                  <div className="priceBox">
                    <span className="price">
                      ₹
                      {finalPrice.toFixed(
                        0
                      )}
                    </span>

                    {discount > 0 && (
                      <>
                        <span className="oldPrice">
                          ₹{price}
                        </span>

                        <span className="dynamicDiscountBadge">
                          {discount}% Off
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <h2 className="notFound">
            Product Not Found
          </h2>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage(
                (prev) => prev - 1
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
                (prev) => prev + 1
              )
            }
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}