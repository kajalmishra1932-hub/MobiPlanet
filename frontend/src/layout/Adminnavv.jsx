import React from 'react'
import { Outlet } from 'react-router-dom'

import Adminnav from '../pages/adminnav'



export default function Adminnavv() {
  return (
    
      <div style={{ display: "flex" }}>
      <Adminnav></Adminnav>
    
        <div style={{ flex: 1, padding: "20px" }}>
          <Outlet />
        </div>
    </div>
  )
}

    