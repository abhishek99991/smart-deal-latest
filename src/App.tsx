import React from "react";
import Home from "./Pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import About from "./Pages/About us/About";
import Contact from "./Pages/Contact us/Contact";
import Shop from "./Pages/Shop/Shop";
import User from "./Pages/User/User";
import Coupan from "./Pages/Coupan/Coupan";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import Cart from "./Pages/Cart/Cart";
import SearchResult from "./Pages/SearchResult/SearchResult";
import LoginSecurity from "./Pages/LoginSecurity/LoginSecurity";
import Adress from "./Pages/Address/Address";
import Order from "./Pages/Order/Order";
import { Toaster } from "react-hot-toast";
import ChangePassword from "../src/Pages/Pop ups/ChangePassword";
// import ForgetPassword from "../src/Pages/Pop ups/forgetPassword"

function App() {
  return (
    <div>
      <BrowserRouter>
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:id" element={<Shop />} />
          <Route path="/user" element={<User />} />
          <Route path="/coupan" element={<Coupan />} />
          <Route path="/product-details/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search-result" element={<SearchResult />} />
          <Route path="/login-security" element={<LoginSecurity />} />
          <Route path="/address" element={<Adress />} />
          <Route path="/order" element={<Order />} />
          <Route path="/order" element={<Order />} />
          <Route path="/change-password" element={<ChangePassword />} />
          {/* <Route path='/forget-password' element={<ForgetPassword/>}/> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
