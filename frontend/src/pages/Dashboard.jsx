import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/Dashboard.css";

export default function Dashboard() {

  const [stats, setStats] = useState({
    totalOrder: 0,
    newOrder: 0,
    confirmedOrder: 0,
    outForDelivery: 0,
    delivered: 0,
    users: 0,
    sellPhoneReq: 0,
  });

  const fetchStats = async () => {
    try {

      const responses = await Promise.all([
        fetch("http://localhost:2340/api/orders/count"),
        fetch("http://localhost:2340/api/orderss/pendinglist/count"),
        fetch("http://localhost:2340/api/confirmcount"),
        fetch("http://localhost:2340/api/orderss/outfordeliverylist/count"),
        fetch("http://localhost:2340/api/orderss/deliveredlist/count"),
        fetch("http://localhost:2340/api/reguser"),
        fetch("http://localhost:2340/api/sellphone/count"),
      ]);

      responses.forEach((res, index) => {
        if (!res.ok) {
          throw new Error(`API ${index} Failed`);
        }
      });

      const data = await Promise.all(
        responses.map((res) => res.json())
      );

      console.log("Dashboard API:", data);

      setStats({
        totalOrder: data[0]?.count || 0,
        newOrder: data[1]?.count || 0,
        confirmedOrder: data[2]?.count || 0,
        outForDelivery: data[3]?.count || 0,
        delivered: data[4]?.count || 0,

        // ✅ FIXED HERE
        users: data[5]?.total || 0,

        sellPhoneReq: data[6]?.count || 0,
      });

    } catch (err) {
      console.log("Dashboard Error:", err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const data = [
    { title: "TOTAL ORDERS", value: stats.totalOrder, link: "/orderdata" },
    { title: "NEW ORDER", value: stats.newOrder, link: "/pending" },
    { title: "CONFIRMED ORDER", value: stats.confirmedOrder, link: "/confirm" },
    { title: "PRODUCT PICKUP", value: stats.outForDelivery, link: "/out" },
    { title: "TOTAL DELIVERED", value: stats.delivered, link: "/deliver" },
    { title: "TOTAL USERS", value: stats.users, link: "/users" },
    { title: "SELL PHONE REQUEST", value: stats.sellPhoneReq, link: "/selldata" },
  ];

  return (
    <div className="dash-container">

      <div className="mainnn">

        <div className="topbarrr">
          <h2>Product Management System</h2>

          <span>
            New :
            <Link to="/new" className="new-badge">
              {stats.newOrder}
            </Link>
          </span>

        </div>

        <div className="card-griddd">

          {data.map((item, i) => (
            <Link to={item.link} className="carddd" key={i}>
              <h4>{item.title}</h4>
              <h1>{item.value}</h1>
            </Link>
          ))}

        </div>

      </div>
    </div>
  );
}