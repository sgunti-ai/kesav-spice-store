import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Header(){
  const [open, setOpen] = useState(false)
  return (
    <header className="site-header">
      <div className="container">
        <div className="brand">KESAV</div>
        <nav className="main-nav">
          <Link to="/">HOME</Link>
          <Link to="/about">ABOUT US</Link>
          <div className="products-dropdown" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
            <button aria-haspopup="true" aria-expanded={open} className="dropdown-toggle" onKeyDown={(e)=>{ if(e.key==='Enter' || e.key===' '){ e.preventDefault(); setOpen(o=>!o) } }}>PRODUCTS ▾</button>
            {open && (
              <div className="dropdown-menu" role="menu">
                <Link role="menuitem" to="/products/category/dry-fruits">Dry Fruits & Nuts</Link>
                <Link role="menuitem" to="/products/category/spices">Spices</Link>
                <Link role="menuitem" to="/products/category/seeds">Seeds</Link>
              </div>
            )}
          </div>
          <Link to="/stores">STORES</Link>
          <Link to="/contact">CONTACT</Link>
        </nav>
        <div className="actions">
          <input aria-label="Search products" placeholder="Search" />
          <Link to="/cart">Cart</Link>
          <Link to="/wishlist">Wishlist</Link>
        </div>
      </div>
    </header>
  )
}
