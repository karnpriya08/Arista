import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from "../../pages/Home";
import Shop from "../../pages/Shop";
import Cart from "../../pages/Cart";
import ProductDetails from "../../pages/ProductDetail";
import Wishlist from "../../pages/Wishlist";
import Error from "../../pages/Error";
import Login from "../../pages/Login";
import Register from "../../component/Register";
import Header from "../Header";
import Footer from "../Footer";
import Category from '../Category';
import WrappedComponent from '../WrappedComponent';
import FAQ from '../FAQ'
import AboutUs from '../AboutUs';
import Contact from "../Contact";
import TermConditions from '../TermsCondtitions';
import Career from '../Career'

const index = () => {
  return (
    <>
      <BrowserRouter>

      <WrappedComponent>
      <Header />
      </WrappedComponent>
     
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Shop/>} />
        <Route path='/products/:id' element={<ProductDetails/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path="/category" element={<Category/>} />
        <Route path='/wishlist' element={<Wishlist/>} />
        <Route path='/error' element={<Error/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/faq' element={<FAQ/>} />
        <Route path='/about' element={<AboutUs/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/terms'  element={<TermConditions/>}/>
        <Route path='/career' element={<Career/>}/>
      </Routes>

      <WrappedComponent>
      <Footer />
      </WrappedComponent>

      </BrowserRouter>
    </>
  )
}

export default index
