import React, { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { CATALOG } from '../data/catalog'
import { useStore } from '../context/Store'

export default function ProductDetail(){
  const { id } = useParams()
  const navigate = useNavigate()
  const all = [...CATALOG.dryFruits, ...CATALOG.spices, ...CATALOG.seeds]
  const prod = all.find(p=>p.id===id)
  const { addToCart, toggleWishlist, priceFor, wishlist } = useStore()
  const [size, setSize] = useState('1KG')
  const [qty, setQty] = useState(1)
  if(!prod) return <div className="container" style={{padding:'60px 20px'}}>Product not found. <Link to="/products">Back to products</Link></div>
  const price = priceFor(prod.id)
  const isWishlisted = wishlist.includes(prod.id)
  return (
    <div className="container">
      <div className="breadcrumb"><Link to="/">Home</Link> › <Link to="/products">Products</Link> › {prod.name}</div>
      <div className="detail-grid">
        <div className="detail-img">
          <img loading="lazy" src={prod.image} alt={prod.name} width="600" height="600" />
        </div>
        <div className="detail-info">
          <h1>{prod.name}</h1>
          <div className="detail-price">Rs. {price}</div>
          <label htmlFor="size-select">Select Size</label>
          <select id="size-select" value={size} onChange={e=>setSize(e.target.value)}>
            <option>100GM</option><option>250GM</option><option>500GM</option><option>1KG</option>
          </select>
          <label>Quantity</label>
          <div className="qty-row">
            <button className="qty-btn" onClick={()=>setQty(q=>Math.max(1,q-1))} aria-label="Decrease">−</button>
            <span className="qty-val">{qty}</span>
            <button className="qty-btn" onClick={()=>setQty(q=>Math.min(5,q+1))} aria-label="Increase">+</button>
          </div>
          <div className="detail-actions">
            <button className="btn-primary" onClick={()=>addToCart(prod.id,size,qty)} style={{flex:1,border:'none',padding:'13px 20px',fontSize:14}}>Add to Cart</button>
            <button className="btn-buy" onClick={()=>{addToCart(prod.id,size,qty);navigate('/cart')}}>Buy Now</button>
            <button className={`btn-wish${isWishlisted?' active':''}`} onClick={()=>toggleWishlist(prod.id)} aria-label="Wishlist">{isWishlisted?'♥':'♡'}</button>
          </div>
          <div className="detail-desc">
            <h3>Description</h3>
            <p>{prod.desc}</p>
            <h3 style={{marginTop:16}}>Health Benefits</h3>
            <ul><li>May help with digestion</li><li>Rich in antioxidants</li><li>Traditionally used in wellness</li></ul>
          </div>
        </div>
      </div>
    </div>
  )
}
