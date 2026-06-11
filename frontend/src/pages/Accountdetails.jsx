import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/accountdetails.css";

export default function Accountdetails() {
  const { orderNumber } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:2340/api/orders/order/${orderNumber}`)
      .then((res) => res.json())
      .then((data) => setOrder(data.order))
      .catch((err) => console.log(err));
  }, [orderNumber]);

  if (!order) return <p className="oi-loading">Loading...</p>;

  return (
    <div className="oi-container">

      <h2 className="oi-title">
        Order #{order.orderNumber} Details
      </h2>

      {/* ORDER DETAILS */}
      <table className="oi-order-table">
        <tbody>

          <tr>
            <td><b>Order Number</b></td>
            <td>{order.orderNumber}</td>

            <td><b>Total Amount</b></td>
            <td>₹{order.totalAmount}</td>
          </tr>

          <tr>
            <td><b>Status</b></td>
            <td>{order.status}</td>

            <td><b>Payment</b></td>
            <td>{order.paymentMethod}</td>
          </tr>

          <tr>
            <td><b>Phone</b></td>
            <td>{order.address?.phone}</td>

            <td><b>City</b></td>
            <td>{order.address?.city}</td>
          </tr>

          <tr>
            <th colSpan="4" className="oi-section-header">
              Delivery Address
            </th>
          </tr>

          <tr>
            <td><b>Flat</b></td>
            <td>{order.address?.flat}</td>

            <td><b>Area</b></td>
            <td>{order.address?.area}</td>
          </tr>

          <tr>
            <td><b>Pincode</b></td>
            <td>{order.address?.pincode}</td>

            <td><b>City</b></td>
            <td>{order.address?.city}</td>
          </tr>

        </tbody>
      </table>

      {/* ITEMS */}
      <div className="oi-items-section">

        <div className="oi-table oi-header">
          <div>Image</div>
          <div>Product</div>
          <div>Qty</div>
          <div>Price</div>
          <div>Total</div>
        </div>

        {order.items.map((item, index) => (
          <div className="oi-table oi-row" key={index}>

            <div>
              <img
                src={`http://localhost:2340${item.image}`}
                alt={item.name}
              />
            </div>

            <div>{item.name}</div>

            <div>{item.quantity}</div>

            <div>₹{item.price}</div>

            <div>
              ₹{item.quantity * item.price}
            </div>

          </div>
        ))}

        <div className="oi-grand-total">
          <span>Grand Total</span>
          <span>₹{order.totalAmount}</span>
        </div>

      </div>

    </div>
  );
}