import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  FaShoppingCart,
  FaHeart,
  FaSearch,
} from "react-icons/fa";

import "../css/categoryproduct.css";

export default function CategoryProducts() {

  const { category } = useParams();

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [wishlist, setWishlist] = useState([]);

  // =========================
  // LOAD WISHLIST
  // =========================

  useEffect(() => {
    const savedWishlist =
      JSON.parse(
        localStorage.getItem("wishlist")
      ) || [];

    setWishlist(
      savedWishlist.map(
        (item) => item._id || item.id
      )
    );
  }, []);

  // =========================
  // CATEGORY BANNERS
  // =========================

  const categoryBanners = {

    mobile: [
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=1800&q=100",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1800&q=100",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=1800&q=100",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=1800&q=100",
    ],

    laptops: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1800&q=100",
      "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?w=1800&q=100",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1800&q=100",
    ],

    macbook: [
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=1800&q=100",
      "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?w=1800&q=100",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1800&q=100",
    ],

    gaming: [
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1800&q=100",
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=1800&q=100",
      "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=1800&q=100",
    ],

    chargers: [
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=1800&q=100",
      "https://images.unsplash.com/photo-1615526675159-e248c3021d3f?w=1800&q=100",
    ],

    headphones: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1800&q=100",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=1800&q=100",
    ],

    smartwatch: [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=1800&q=100",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1800&q=100",
    ],

    camera: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1800&q=100",
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=1800&q=100",
    ],

    speakers: [
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=1800&q=100",
      "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=1800&q=100",
    ],
  };

  const banners =
    categoryBanners[category] || [];

  const [currentBanner, setCurrentBanner] =
    useState(0);

  // =========================
  // AUTO BANNER SLIDER
  // =========================

  useEffect(() => {

    if (banners.length <= 1) return;

    const interval = setInterval(() => {

      setCurrentBanner((prev) =>
        prev === banners.length - 1
          ? 0
          : prev + 1
      );

    }, 3000);

    return () =>
      clearInterval(interval);

  }, [banners]);

  // =========================
  // FETCH PRODUCTS
  // =========================

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {

    try {

      const res = await fetch(
        `http://localhost:2340/api/mobiledata/${category}`
      );

      const data = await res.json();

      setProducts(
        data.data || []
      );

    } catch (error) {
      console.log(error);
    }

  };


    // =========================
  // SEARCH FILTER
  // =========================

  const filteredProducts = useMemo(() => {

    return products.filter((item) => {

      const text = search.toLowerCase();

      return (
        item?.modelName
          ?.toLowerCase()
          .includes(text) ||

        item?.brand
          ?.toLowerCase()
          .includes(text) ||

        item?.category
          ?.toLowerCase()
          .includes(text)
      );

    });

  }, [products, search]);

  // =========================
  // ADD TO CART
  // =========================

  const addToCart = (product, e) => {

    e.stopPropagation();

    let cartItems =
      JSON.parse(
        localStorage.getItem("cart")
      ) || [];

    const productId =
      product._id || product.id;

    const exists = cartItems.find(
      (item) =>
        (item._id || item.id) === productId
    );

    if (exists) {

      exists.quantity =
        (exists.quantity || 1) + 1;

    } else {

      cartItems.push({
        ...product,
        quantity: 1,
      });

    }

    localStorage.setItem(
      "cart",
      JSON.stringify(cartItems)
    );

    alert("🛒 Added To Cart");
  };

  // =========================
  // WISHLIST
  // =========================

  const toggleWishlist = (
    product,
    e
  ) => {

    e.stopPropagation();

    const productId =
      product._id || product.id;

    let wishlistData =
      JSON.parse(
        localStorage.getItem("wishlist")
      ) || [];

    const exists =
      wishlistData.find(
        (item) =>
          (item._id || item.id) === productId
      );

    if (exists) {

      wishlistData =
        wishlistData.filter(
          (item) =>
            (item._id || item.id) !== productId
        );

    } else {

      wishlistData.push(product);

    }

    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlistData)
    );

    setWishlist(
      wishlistData.map(
        (item) =>
          item._id || item.id
      )
    );
  };

  return (

    <div className="mainProductsContainer">

      {/* CATEGORY BANNER */}

      {banners.length > 0 && (

        <div className="categoryBanner">

          <img
            src={banners[currentBanner]}
            alt={category}
          />

          <div className="bannerOverlay">

            <h1>
              {category}
            </h1>

            <p>
              Explore Premium Collection
            </p>

          </div>

        </div>

      )}

      {/* HEADER */}

      <div className="topSection">

        <h1>
          {category}
        </h1>

        <p>
          Modern Electronic Collection
        </p>

      </div>

      {/* SEARCH */}

      <div className="searchBox">

        <FaSearch
          className="searchIcon"
        />

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />

      </div>

      {/* PRODUCTS */}

      <div className="productsWrapper">

        {filteredProducts.length > 0 ? (

          filteredProducts.map(
            (item) => {

              const productId =
                item._id || item.id;

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
                                    {/* IMAGE */}

                  <div className="productImgBox">

                    <img
                      src={`http://localhost:2340${item.image}`}
                      alt={item.modelName}
                    />

                  </div>

                  {/* DETAILS */}

                  <div className="productDetails">

                    <h3>
                      {item.modelName}
                    </h3>

                    <p className="desc">

                      {item.description
                        ? item.description.slice(
                            0,
                            65
                          ) + "..."
                        : "No description available"}

                    </p>

                    {/* BUTTONS */}

                    <div className="btnActionRow">

                      <button
                        className="cartBtn"
                        onClick={(e) =>
                          addToCart(
                            item,
                            e
                          )
                        }
                      >
                        <FaShoppingCart />
                        Add
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

                    {/* PRICE */}

                    <div className="priceBox">

                      <span className="price">
                        ₹{item.price}
                      </span>

                      <span className="oldPrice">
                        ₹
                        {Number(
                          item.price || 0
                        ) + 10000}
                      </span>

                      <span className="dynamicDiscountBadge">

                        {item.discount || 10}% Off

                      </span>

                    </div>

                  </div>

                </div>

              );

            }

          )

        ) : (

          <h2 className="notFound">

            Product Not Found 😢

          </h2>

        )}

      </div>

    </div>

  );

}