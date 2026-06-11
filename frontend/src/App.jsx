import { Routes, Route } from "react-router-dom";

import "./App.css";

/* LAYOUTS */
import Topnabar from "./layout/Topnabar";
import Sidebar from "./layout/Sidebar";
import Adminnavv from "./layout/adminnavv";

/* COMPONENTS */
import Home from "./components/Home";
import Profile from "./components/Profile";

/* PAGES */
import Changepassword from "./pages/Changepassword";
import AddPpoduct from "./pages/Addproduct";
import Categoryadd from "./pages/Categoryadd";
import Manageproducts from "./pages/Manageproduct";
import Categorydata from "./pages/Categorydata";
import Reguser from "./pages/Reguser";
import Productedit from "./pages/Productedit";
import Categoryyall from "./pages/Categoryyall";
import Productdetails from "./pages/Productdetails";
import Wishlist from "./pages/Wishlist";
import ProductCard from "./pages/ProductCard";
import Cart from "./pages/Cart";
import Account from "./pages/Account";
import Accountdetails from "./pages/Accountdetails";
import Order from "./pages/Orderdata";
import Orderdata from "./pages/Orderdata";
import View from "./pages/View";
import CategoryProducts from "./pages/Categoryproducts";
import Footer from "./pages/Footer";
import Sellphone from "./pages/Sellphone";
import Sellphonedata from "./pages/sellphonedata";
import Viewsell from "./pages/Viewsell";
import PendingOrders from "./pages/Pendingorders";
import OutforDeliver from "./pages/Outfordeliver";
import DelivereOrder from "./pages/Deliverorder";
import Confirm from "./pages/Confirm";
import Dashboard from "./pages/Dashboard";
import Subscriberdata from "./pages/Subscriberdata";
import Admin from "./components/Admin";
import ProtectedRoute from "./components/ProtectedRoute";
import Resetpassword from "./pages/Resetpassword";
import Verifyotp from "./pages/Veryfyotp";
import Forgetpassword from "./pages/Forgetpassword";
import ContactPage from "./pages/ContactPage";

function App() {

  return (

    <Routes>

      
      <Route path="/" element={<Topnabar />}>

        
        <Route
          index element={ <> <Home /><Categoryyall /><ProductCard /> <Footer></Footer> </>  }/>
            <Route path="/wishlist" element={<Wishlist></Wishlist>}></Route>
            <Route path="/cart" element={<Cart></Cart>}></Route>
              <Route path="/sellphone" element={<Sellphone></Sellphone>}></Route>
              <Route path="/category/:category" element={<CategoryProducts></CategoryProducts>}></Route>
                    <Route path="/resetpassword" element={<Resetpassword></Resetpassword>}></Route>
                          <Route path="/veryfy" element={<Verifyotp></Verifyotp>}></Route>
                          <Route path="/contact" element={<ContactPage></ContactPage>}></Route>


      <Route path="/forget" element={<Forgetpassword></Forgetpassword>}></Route>







       
        <Route path="products/:id" element={<Productdetails />} />

       
        <Route
          path="wishlist"
          element={<Wishlist />}
        />

       
        <Route element={<Sidebar />}>

          <Route
            path="profile"
            element={<Profile />}
          />
           <Route
            path="account"
            element={<Account></Account>}
          />
              <Route path='/detail/:orderNumber'element={<Accountdetails></Accountdetails>}></Route>


          <Route
            path="changepassword"
            element={<Changepassword />}
          />

        </Route>

      </Route>
     <Route path="/admin" element={<Admin></Admin>}></Route>

       <Route element={ <ProtectedRoute role={"admin"} />}>
      {/* 🔥 ADMIN LAYOUT */}
    <Route path="/" element={<Adminnavv />}>
     <Route path="add"element={<AddPpoduct />} />
    <Route path="addcategory" element={<Categoryadd />} />
    <Route path="manageproducts"element={<Manageproducts />} />
     <Route path="categorydata" element={<Categorydata />} />
       <Route path="users"element={<Reguser />}/>
       <Route path="edit/:id"element={<Productedit />}/>
         <Route path="orderdata" element={<Orderdata></Orderdata>}/>
        <Route path="/View/:orderNumber"element={<View></View>}/>
         <Route path="selldata" element={<Sellphonedata></Sellphonedata>}/>
        <Route path="/viewsell/:id" element={<Viewsell></Viewsell>} />
         <Route path="/pending" element={<PendingOrders></PendingOrders>} />
          <Route path="/out" element={<OutforDeliver></OutforDeliver>} />
           <Route path="/deliver" element={<DelivereOrder></DelivereOrder>} />
              <Route path="/confirm" element={<Confirm></Confirm>} />
                 <Route path="/dash" element={<Dashboard></Dashboard>} />
                   <Route path="/subscriber" element={<Subscriberdata></Subscriberdata>} />


      </Route>
      </Route>

    </Routes>

  );

}

export default App;