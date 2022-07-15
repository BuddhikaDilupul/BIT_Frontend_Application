import React, { useState } from 'react'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from '../Navbar/index'
import Sidebar from '../Sidebar/index'
import SignIn from '../../pages/SignIn/SignIn'
import Home from '../../pages/Home/Home'
import About from '../../pages/About/About'
import ResetPassword from '../../pages/ResetPassword/resetPassword'
import Contact from '../../pages/Contact/Contact'
import Cart from '../../pages/Cart/Cart'
import Signup from '../../pages/Signup/Signup'
import Footer from '../Footer/Index'
import Checkout from './../../pages/Checkout/Checkout'
import Profile from './../../pages/Profile/Profile'
import MyOrders from './../../pages/MyOrders/Myorders'
import MyOrder from './../../pages/MyOrders/Myorder'
function Layout() {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => {
    setIsOpen(!isOpen)
  }
  return (
    <>
      <Router>
        <Sidebar isOpen={isOpen} toggle={toggle} />
        <Navbar toggle={toggle} />
        <Routes>
          <Route path="/" element={<Home />} exact></Route>
          <Route path="/about" element={<About />} exact></Route>
          <Route path="/contact" element={<Contact />} exact></Route>
          <Route path="/cart" element={<Cart />} exact></Route>
          <Route path="/signIn" element={<SignIn />} exact></Route>
          <Route path="/signup" element={<Signup />} exact></Route>
          <Route path="/profile" element={<Profile />} exact></Route>
          <Route path="/checkout" element={<Checkout />} exact></Route>
          <Route path="/myorders" element={<MyOrders />} exact></Route>
          <Route path="/myorders/:id" element={<MyOrder />} exact></Route>
          <Route path="/reset" element={<ResetPassword />} exact></Route>
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default Layout
