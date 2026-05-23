import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../context/Store'

export default function Header(){
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const { cart, wishlist } = useStore()
  const cartCount = cart.reduce((sum, it) => sum + it.qty, 0)

  const handleSearch = (e) => {
    e.preventDefault()
    if(search.trim()) window.location.href = `/products?q=${encodeURIComponent(search.trim())}`
  }

  return (
    <header className="site-header">
      <div className="container">
        <Link to="/" className="brand" style={{ textDecoration:'none' }}>KESAV</Link>
        <nav className="main-nav">
          <Link to="/">HOME</Link>
          <Link to="/about">ABOUT US</Link>
          <div
            className="products-dropdown"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <button
              aria-haspopup="true"
              aria-expanded={open}
              className="dropdown-toggle"
              onKeyDown={(e)=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); setOpen(o=>!o) } }}
            >
              PRODUCTS ▾
            </button>
            {open && (
              <div className="dropdown-menu" role="menu">
                <Link role="menuitem" to="/products/category/dry-fruits" onClick={()=>setOpen(false)}>Dry Fruits & Nuts</Link>
                <Link role="menuitem" to="/products/category/spices" onClick={()=>setOpen(false)}>Spices</Link>
                <Link role="menuitem" to="/products/category/seeds" onClick={()=>setOpen(false)}>Seeds</Link>
              </div>
            )}
          </div>
          <Link to="/stores">STORES</Link>
          <Link to="/contact">CONTACT</Link>
        </nav>
        <div className="actions">
          <form onSubmit={handleSearch} style={{ display:'inline' }}>
            <input
              aria-label="Search products"
              placeholder="Search"
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
            />
          </form>
          <Link to="/cart" style={{ position:'relative' }}>
            Cart {cartCount > 0 && <span style={{ background:'#caa43a', color:'#fff', borderRadius:'50%', fontSize:11, padding:'1px 5px', marginLeft:3 }}>{cartCount}</span>}
          </Link>
          <Link to="/wishlist" style={{ position:'relative' }}>
            Wishlist {wishlist.length > 0 && <span style={{ background:'#e33', color:'#fff', borderRadius:'50%', fontSize:11, padding:'1px 5px', marginLeft:3 }}>{wishlist.length}</span>}
          </Link>
        </div>
      </div>
    </header>
  )
}
