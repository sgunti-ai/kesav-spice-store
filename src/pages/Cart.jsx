import React, { useState } from 'react'
import { useStore } from '../context/Store'

export default function Cart(){
  const { cart, updateQty, removeFromCart, priceFor, CATALOG } = useStore()
  const [address, setAddress] = useState({ city: '', pincode: '', line1: '' })

  const allProducts = [...CATALOG.dryFruits, ...CATALOG.spices, ...CATALOG.seeds]
  const getProduct = (id) => allProducts.find(p => p.id === id)

  const cartTotal = cart.reduce((sum, it) => sum + (priceFor(it.productId) * it.qty), 0)
  const isHyderabad = address.city.toLowerCase().includes('hyderabad')
  const codEligible = isHyderabad && cartTotal >= 299 && cart.length > 0

  return (
    <main className="container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <div style={{ marginTop: 12, color: '#666' }}>Your cart is empty.</div>
      ) : (
        <div style={{ marginTop: 12 }}>
          {cart.map((it, idx) => {
            const price = priceFor(it.productId)
            const product = getProduct(it.productId)
            return (
              <div key={idx} style={{ display:'flex', gap:12, alignItems:'center', padding:12, borderBottom:'1px solid #eee' }}>
                <img
                  src={product?.image}
                  alt={product?.name}
                  style={{ width:90, height:70, objectFit:'cover', borderRadius:6, background:'#f2f2f2' }}
                  loading="lazy"
                />
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:700 }}>{product?.name ?? it.productId}</div>
                  <div style={{ color:'#666', fontSize:14 }}>{it.size} &bull; Qty {it.qty}</div>
                </div>
                <div style={{ fontWeight:700 }}>Rs. {price * it.qty}</div>
                <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                  <button onClick={()=>updateQty(idx,1)} aria-label="Increase quantity">+</button>
                  <button onClick={()=>updateQty(idx,-1)} aria-label="Decrease quantity">-</button>
                  <button onClick={()=>removeFromCart(idx)} style={{ color:'#b33' }} aria-label="Remove item">Remove</button>
                </div>
              </div>
            )
          })}

          <div style={{ marginTop:16, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <div>
              <div style={{ fontSize:18, fontWeight:700 }}>Total</div>
              <div style={{ color:'#666', fontSize:13 }}>Inclusive of taxes (demo)</div>
            </div>
            <div style={{ fontSize:20, fontWeight:800 }}>Rs. {cartTotal}</div>
          </div>

          <div style={{ marginTop:18 }}>
            <input
              placeholder="City"
              value={address.city}
              onChange={(e)=>setAddress({...address, city: e.target.value})}
              style={{ padding:8, borderRadius:6, border:'1px solid #ddd', marginRight:8 }}
            />
            <input
              placeholder="Pincode"
              value={address.pincode}
              onChange={(e)=>setAddress({...address, pincode: e.target.value})}
              style={{ padding:8, borderRadius:6, border:'1px solid #ddd' }}
            />
          </div>
          <div style={{ marginTop:8, color:'#666', fontSize:13 }}>COD eligibility: Hyderabad only + min Rs. 299</div>
          <div style={{ marginTop:8 }}>
            <button
              onClick={()=>alert(codEligible ? 'COD available (demo) — order placed!' : 'COD not available for this address or cart total.')}
              style={{ padding:'10px 20px', borderRadius:6, background:'#28a745', color:'#fff', border:'none', fontWeight:700, cursor:'pointer' }}
            >
              Place Order (COD if eligible)
            </button>
          </div>
        </div>
      )}
    </main>
  )
}
