import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { CATALOG } from '../data/catalog'
import { useStore } from '../context/Store'

export default function ProductDetail(){
  const { id } = useParams()
  const navigate = useNavigate()
  const all = [...CATALOG.dryFruits, ...CATALOG.spices, ...CATALOG.seeds]
  const prod = all.find(p=>p.id===id)
  const { addToCart, toggleWishlist, priceFor } = useStore()
  const [size, setSize] = useState('1KG')
  const [qty, setQty] = useState(1)
  if(!prod) return <div>Product not found</div>
  const price = priceFor(prod.id)
  const handleAdd = () => { addToCart(prod.id, size, qty) }
  const handleBuy = () => { addToCart(prod.id, size, qty); navigate('/cart') }
  return (
    <main className="container">
      <div className="detail-grid">
        <img loading="lazy" src={prod.image} alt={prod.name} />
        <div>
          <h1>{prod.name}</h1>
          <div className="price">Rs. {price}</div>
          <label htmlFor="size-select">Size</label>
          <select id="size-select" value={size} onChange={(e)=>setSize(e.target.value)}>
            <option>100GM</option>
            <option>250GM</option>
            <option>500GM</option>
            <option>1KG</option>
          </select>
          <div className="qty" style={{ marginTop: 12 }}>
            <label>Qty</label>
            <div>
              <button onClick={()=>setQty(q=>Math.max(1, q-1))} aria-label="Decrease quantity">-</button>
              <span style={{ margin: '0 8px' }}>{qty}</span>
              <button onClick={()=>setQty(q=>Math.min(2, q+1))} aria-label="Increase quantity">+</button>
            </div>
          </div>
          <div className="actions" style={{ marginTop: 14 }}>
            <button onClick={handleAdd} aria-label="Add to cart" style={{ marginRight: 8 }}>Add to Cart</button>
            <button onClick={handleBuy} aria-label="Buy it now">Buy It Now</button>
            <button onClick={()=>toggleWishlist(prod.id)} aria-pressed="false" style={{ marginLeft: 8 }}>♡</button>
          </div>
          <div className="desc" style={{ marginTop: 18 }}>
            <h3>Description</h3>
            <p>{prod.desc} Clove is useful for cooking and has medicinal properties. It adds aroma and flavor to both sweet and savory dishes.</p>
            <h4>Health Benefits of {prod.name.split(' ')[0]}</h4>
            <ul>
              <li>May help with digestion</li>
              <li>Rich in antioxidants</li>
              <li>Traditionally used for oral care</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}
