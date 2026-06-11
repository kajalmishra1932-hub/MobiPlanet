import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../css/categoryall.css";

const categories = [
  {
    name: "All",
    value: "all",
    img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80",
  },

  // iPhone
  {
    name: "iPhone",
    value: "iphone",
    img: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&q=80",
  },

  // Android
  {
    name: "Android",
    value: "android",
    img: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&q=80",
  },

  {
    name: "Laptops",
    value: "laptops",
    img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80",
  },

  {
    name: "Gaming",
    value: "gaming",
    img: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&q=80",
  },
];

  

export default function Category() {

  const scrollRef = useRef(null);

  useEffect(() => {

    const container = scrollRef.current;

    if (!container) return;

    let animationFrame;
    let scrollAmount = 0;

    const slide = () => {

      scrollAmount += 0.5;
      container.scrollLeft += 0.5;

      if (scrollAmount >= container.scrollWidth / 2) {

        container.scrollLeft = 0;
        scrollAmount = 0;

      }

      animationFrame = requestAnimationFrame(slide);

    };

    animationFrame = requestAnimationFrame(slide);

    const stop = () =>
      cancelAnimationFrame(animationFrame);

    const start = () => {
      animationFrame = requestAnimationFrame(slide);
    };

    container.addEventListener("mouseenter", stop);
    container.addEventListener("mouseleave", start);

    return () => {

      cancelAnimationFrame(animationFrame);

      container.removeEventListener(
        "mouseenter",
        stop
      );

      container.removeEventListener(
        "mouseleave",
        start
      );

    };

  }, []);

  return (

    <div className="cat-wrapper">

      {/* CATEGORY SLIDER */}

      <div
        className="cat-container"
        ref={scrollRef}
      >

        {[...categories, ...categories].map(
          (cat, index) => (

            <Link
              key={index}

              to={
                cat.value === "all"
                  ? "/"
                  : `/category/${cat.value}`
              }

              className="cat-card"
            >

              <img
                src={cat.img}
                alt={cat.name}
                loading="lazy"
              />

              <div className="cat-overlay">

                <h3>{cat.name}</h3>

              </div>

            </Link>

          )
        )}

      </div>

    </div>

  );
}