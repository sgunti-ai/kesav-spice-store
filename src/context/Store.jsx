import React, { createContext, useContext, useEffect, useState } from 'react'
import { CATALOG, initialPrices, fetchSimulatedPrices } from '../data/catalog'

const StoreContext = createContext(null)

export function StoreProvider({ children }){
  const [cart, setCart] = useState(() => {
    try{ return JSON.parse(localStorage.getItem('kesav_cart')||'[]') }catch{ return [] }
  })
  const [wishlist, setWishlist] = useState(() => {
    try{ return JSON.parse(localStorage.getItem('kesav_wishlist')||'[]') }catch{return [] }
  })
  const [prices, setPrices] = useState(initialPrices)

  useEffect(()=>{
    localStorage.setItem('kesav_cart', JSON.stringify(cart))
  },[cart])

  useEffect(()=>{
    localStorage.setItem('kesav_wishlist', JSON.stringify(wishlist))
  },[wishlist])

  useEffect(()=>{
    let mounted = true
    async function update(){
      try{
        const p = await fetchSimulatedPrices()
        if(mounted) setPrices(p)
      }catch(e){ console.warn('price fetch failed', e) }
    }
    update()
    const t = setInterval(update, 45000)
    return ()=>{ mounted=false; clearInterval(t) }
  },[])

  function addToCart(productId, size='1KG', qty=1){
    setCart(prev=>{
      const idx = prev.findIndex(i=>i.productId===productId && i.size===size)
      if(idx>=0){
        const copy = prev.slice(); copy[idx].qty = Math.min(2, copy[idx].qty + qty); return copy
      }
      return [...prev, { productId, size, qty }]
    })
  }

  function updateQty(index, delta){
    setCart(prev => prev.map((it,i)=> i===index ? { ...it, qty: Math.max(1, Math.min(2, it.qty + delta)) } : it))
  }

  function removeFromCart(index){ setCart(prev => prev.filter((_,i)=>i!==index)) }

  function toggleWishlist(productId){
    setWishlist(prev=> prev.includes(productId) ? prev.filter(p=>p!==productId) : [...prev, productId])
  }

  function priceFor(productId){
    for(const k of Object.keys(CATALOG)){
      const found = CATALOG[k].find(p=>p.id===productId)
      if(found) return prices[found.priceKey] ?? 0
    }
    return 0
  }

  return (
    <StoreContext.Provider value={{ cart, wishlist, prices, addToCart, updateQty, removeFromCart, toggleWishlist, priceFor, CATALOG }}>
      {children}
    </StoreContext.Provider>
  )
}

export function useStore(){
  const ctx = useContext(StoreContext)
  if(!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}
