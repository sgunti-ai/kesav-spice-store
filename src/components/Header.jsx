import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../context/Store'

export default function Header(){
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const { cart, wishlist } = useStore()
  const cartCount = cart.reduce((sum, it) => sum + it.qty, 0)
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if(search.trim()) navigate(`/products?q=${encodeURIComponent(search.trim())}`)
  }

  return (
    <>
      <div className="announcement-bar">🌟 Free delivery on orders above Rs. 999 in Hyderabad &nbsp;|&nbsp; Premium Quality Guaranteed</div>
      <header className="site-header">
        <div className="container">
          <Link to="/" className="brand">KESAV</Link>
          <nav className="main-nav">
            <Link to="/">Home</Link>
            <Link to="/about">About Us</Link>
            <div className="products-dropdown"
              onMouseEnter={()=>setOpen(true)}
              onMouseLeave={()=>setOpen(false)}>
              <button className="dropdown-toggle"
                aria-haspopup="true" aria-expanded={open}
                onKeyDown={(e)=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); setOpen(o=>!o) } }}>
                Products ▾
              </button>
              {open && (
                <div className="dropdown-menu" role="menu">
                  <Link role="menuitem" to="/products" onClick={()=>setOpen(false)}>All Products</Link>
                  <Link role="menuitem" to="/products/category/dry-fruits" onClick={()=>setOpen(false)}>Dry Fruits & Nuts</Link>
                  <Link role="menuitem" to="/products/category/spices" onClick={()=>setOpen(false)}>Spices</Link>
                  <Link role="menuitem" to="/products/category/seeds" onClick={()=>setOpen(false)}>Seeds</Link>
                </div>
              )}
            </div>
            <Link to="/stores">Stores</Link>
            <Link to="/contact">Contact</Link>
          </nav>
          <div className="header-actions">
            <form className="search-form" onSubmit={handleSearch}>
              <input aria-label="Search products" placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)} />
            </form>
            <Link to="/wishlist" className="header-icon-btn" aria-label="Wishlist">
              ♡ Wishlist
              {wishlist.length > 0 && <span className="badge">{wishlist.length}</span>}
            </Link>
            <Link to="/cart" className="header-icon-btn" aria-label="Cart">
              🛒 Cart
              {cartCount > 0 && <span className="badge">{cartCount}</span>}
            </Link>
          </div>
        </div>
      </header>
    </>
  )
}
