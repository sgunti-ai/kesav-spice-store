import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import Category from './pages/Category'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import About from './pages/About'
import Stores from './pages/Stores'
import Contact from './pages/Contact'
import Header from './components/Header'

export default function App(){
  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/products" element={<Products/>} />
          <Route path="/products/category/:slug" element={<Category/>} />
          <Route path="/products/:id" element={<ProductDetail/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/wishlist" element={<Wishlist/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/stores" element={<Stores/>} />
          <Route path="/contact" element={<Contact/>} />
        </Routes>
      </main>
    </div>
  )
}
