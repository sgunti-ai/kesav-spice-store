import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../context/Store'

export default function Cart(){
  const { cart, updateQty, removeFromCart, priceFor, CATALOG } = useStore()
  const [address, setAddress] = useState({ city: '', pincode: '' })
  const allProducts = [...CATALOG.dryFruits, ...CATALOG.spices, ...CATALOG.seeds]
  const getProduct = (id) => allProducts.find(p=>p.id===id)
  const cartTotal = cart.reduce((sum,it)=>sum+(priceFor(it.productId)*it.qty),0)
  const isHyd = address.city.toLowerCase().includes('hyderabad')
  const codOk = isHyd && cartTotal >= 299 && cart.length > 0
  return (
    <div className="container cart-page">
      <h2>Your Cart {cart.length > 0 && <span style={{fontSize:16,color:'var(--muted)',fontFamily:'var(--font-body)',fontWeight:400}}>({cart.length} item{cart.length>1?'s':''})</span>}</h2>
      {cart.length === 0 ? (
        <div style={{textAlign:'center',padding:'80px 20px',color:'var(--muted)'}}>
          <div style={{fontSize:48,marginBottom:16}}>🛒</div>
          <p style={{marginBottom:20,fontSize:16}}>Your cart is empty</p>
          <Link to="/products" className="btn-primary" style={{border:'none'}}>Browse Products</Link>
        </div>
      ) : (
        <div style={{display:'grid',gridTemplateColumns:'1fr 360px',gap:32,alignItems:'start'}}>
          <div>
            {cart.map((it,idx)=>{
              const price = priceFor(it.productId)
              const product = getProduct(it.productId)
              return (
                <div key={idx} className="cart-item">
                  <img src={product?.image} alt={product?.name??it.productId} loading="lazy" width="90" height="90" />
                  <div className="cart-item-info">
                    <div className="name">{product?.name??it.productId}</div>
                    <div className="meta">{it.size} · Qty {it.qty}</div>
                    <button className="cart-remove" onClick={()=>removeFromCart(idx)}>Remove</button>
                  </div>
                  <div className="cart-item-controls">
                    <button onClick={()=>updateQty(idx,1)} aria-label="Increase">+</button>
                    <span style={{fontSize:14,fontWeight:700}}>{it.qty}</span>
                    <button onClick={()=>updateQty(idx,-1)} aria-label="Decrease">−</button>
                  </div>
                  <div className="cart-item-price">Rs. {price*it.qty}</div>
                </div>
              )
            })}
          </div>
          <div className="cart-summary">
            <div className="total-row">
              <span className="total-label">Order Total</span>
              <span className="total-val">Rs. {cartTotal}</span>
            </div>
            <p className="note">Inclusive of all taxes</p>
            <div className="address-row">
              <input placeholder="City" value={address.city} onChange={e=>setAddress({...address,city:e.target.value})} />
              <input placeholder="Pincode" value={address.pincode} onChange={e=>setAddress({...address,pincode:e.target.value})} />
            </div>
            <p className="cod-note">COD available for Hyderabad orders above Rs. 299</p>
            <button
              className="btn-primary"
              style={{width:'100%',border:'none',padding:'14px',fontSize:15}}
              onClick={()=>alert(codOk ? '✅ Order placed via COD! (demo)' : '❌ COD not available for this address/amount.')}
            >Place Order</button>
          </div>
        </div>
      )}
    </div>
  )
}
