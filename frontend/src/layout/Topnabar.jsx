import React from 'react'

import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Categoryyall from '../pages/Categoryyall'
import ProductCard from '../pages/ProductCard'





export default function Topnabar() {
  return (
   
    
    <div>
       

      <Navbar></Navbar>
        
      
        <div>
          <Outlet />
        </div>
       
       
    </div>
  )
}
