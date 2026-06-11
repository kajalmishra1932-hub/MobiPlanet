import React, { useEffect, useState } from "react";
import "../css/slider.css";

export default function Slider() {
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1600&q=80",
      title: "iPhone 16 Pro",
      subtitle: "Experience The Future With Apple",
      desc: "Titanium Design • A18 Pro Chip • Pro Camera System",
    },
 {
  image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1600&q=80",
  title: "MOBI PLANET",
  subtitle: "Premium Smartphone Collection",
  desc: "iPhone • Samsung • OnePlus • Xiaomi • Best Deals & Latest Technology",
},
 
    {
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1600&q=80",
      title: "iPhone Premium Case",
      subtitle: "Sleek Protection For Your Devices",
      desc: "MagSafe Compatible • Eco-Friendly Materials • Drop Protection",
    },
    {
      image: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=1600&q=80",
      title: "iPhone 15 Pro Max",
      subtitle: "The Ultimate Smartphone Experience",
      desc: "Super Retina XDR Display • Action Button • Ceramic Shield",
    },
    {
      image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1600&q=80",
      title: "MacBook Pro Studio",
      subtitle: "Built For Advanced Creators",
      desc: "Extreme Dynamic Range • ProMotion Display • Extreme Power",
    },
   
  ];

  const [current, setCurrent] = useState(0);

  // FAST AUTO SLIDER (2 seconds interval)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 2000); // 2000ms = 2 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="slider-container">
      <br />
      <br />
      <div className="slider">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide-item ${current === index ? "active" : ""}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="slide-overlay">
              <div className="slide-content">
                <span className="badge">New Arrival</span>
                <h1>{slide.title}</h1>
                <h3>{slide.subtitle}</h3>
                <p>{slide.desc}</p>
               
              </div>
            </div>
          </div>
        ))}

        {/* LEFT BUTTON */}
        <button
          className="nav-btn left-btn"
          onClick={() => setCurrent(current === 0 ? slides.length - 1 : current - 1)}
        >
          ❮
        </button>

        {/* RIGHT BUTTON */}
        <button
          className="nav-btn right-btn"
          onClick={() => setCurrent(current === slides.length - 1 ? 0 : current + 1)}
        >
          ❯
        </button>

        {/* DOTS */}
        <div className="dots-container">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`dot ${current === index ? "dot-active" : ""}`}
              onClick={() => setCurrent(index)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
}