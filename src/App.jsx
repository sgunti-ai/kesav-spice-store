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
import Footer from './components/Footer'

export default function App(){
  return (
    <div style={{ display:'flex', flexDirection:'column', minHeight:'100vh' }}>
      <Header />
      <main style={{ flex: 1 }}>
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
      <Footer />
      <a href="https://wa.me/917034900009" target="_blank" rel="noopener noreferrer"
        className="whatsapp-btn" aria-label="Chat on WhatsApp">💬</a>
    </div>
  )
}
