import React from 'react'
import Sidenavbar from '../pages/Sidenavbar'
import { Outlet } from "react-router-dom";
export default function Sidebar() {
  return (
    <div>
       <div style={{ display: "flex" }}>

      {/* LEFT SIDEBAR (NORMAL FLOW, NO FIXED) */}
      <div
        style={{
          marginTop: "60px", // 👈 thoda neeche
        }}
      >
     <Sidenavbar></Sidenavbar>
      </div>

      {/* RIGHT CONTENT */}
      <div
        style={{
          flex: 1,
          padding: "20px",
        }}
      >
        <Outlet />
      </div>

    </div>
    </div>
  )
}
