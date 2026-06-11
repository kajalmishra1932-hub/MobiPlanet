import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/viewsell.css";

export default function Viewsell() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [phone, setPhone] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPhone();
  }, []);

  const fetchPhone = async () => {
    try {
      const response = await fetch(
        `http://localhost:2340/api/sellphone/${id}`
      );

      const data = await response.json();

      if (data.success) {
        setPhone(data.data);
      }

      setLoading(false);

    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loadingBox">
        <div className="loader"></div>
        <h2>Loading Phone Details...</h2>
      </div>
    );
  }

  if (!phone) {
    return (
      <div className="notFound">
        <h1>Phone Not Found</h1>
      </div>
    );
  }

  return (
    <div className="viewSellContainer">

      {/* TOP BAR */}
      <div className="topBar">
        <button onClick={() => navigate(-1)}>
          ← Back
        </button>

        <h1>Sell Phone Details</h1>
      </div>

      {/* MAIN CARD */}
      <div className="viewCard">

        {/* RIGHT SECTION FULL WIDTH (IMAGE REMOVED) */}
        <div className="rightSection">

          {/* TITLE */}
          <div className="titleBox">

            <h2>
              {phone.brand} {phone.model}
            </h2>

            <span>{phone.condition}</span>

          </div>

          {/* INFO GRID */}
          <div className="infoGrid">

            <div className="infoCard">
              <h4>Storage</h4>
              <p>{phone.storage}</p>
            </div>

            <div className="infoCard">
              <h4>RAM</h4>
              <p>{phone.ram}</p>
            </div>

            <div className="infoCard">
              <h4>Battery</h4>
              <p>{phone.battery}</p>
            </div>

            <div className="infoCard">
              <h4>City</h4>
              <p>{phone.city}</p>
            </div>

          </div>

          {/* ADDRESS (NEW) */}
          <div className="descriptionBox">
            <h3>Address</h3>
            <p>
              {phone.address || "Address not provided"}
            </p>
          </div>

          {/* DESCRIPTION */}
          <div className="descriptionBox">
            <h3>Description</h3>
            <p>
              {phone.description || "No Description"}
            </p>
          </div>

          {/* DAMAGE + ACCESSORIES */}
          <div className="extraBox">

            {/* DAMAGE */}
            <div className="damageBox">
              <h3>Damages</h3>

              {
                phone.damage?.length > 0 ? (
                  <div className="tagWrap">
                    {phone.damage.map((item, index) => (
                      <span key={index}>{item}</span>
                    ))}
                  </div>
                ) : (
                  <p>No Damage</p>
                )
              }
            </div>

            {/* ACCESSORIES */}
            <div className="accessoriesBox">
              <h3>Accessories</h3>

              {
                phone.accessories?.length > 0 ? (
                  <div className="tagWrap">
                    {phone.accessories.map((item, index) => (
                      <span key={index}>{item}</span>
                    ))}
                  </div>
                ) : (
                  <p>No Accessories</p>
                )
              }
            </div>

          </div>

          {/* SELLER */}
          <div className="sellerBox">

            <h3>Seller Information</h3>

            <div className="sellerInfo">

              <div>
                <strong>Name</strong>
                <p>{phone.name}</p>
              </div>

              <div>
                <strong>Phone</strong>
                <p>{phone.phone}</p>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}