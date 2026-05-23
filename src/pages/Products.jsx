import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { CATALOG, initialPrices } from '../data/catalog'

export default function Products(){
  const navigate = useNavigate()
  const handleView = (id) => navigate(`/products/${id}`)
  return (
    <main className="container">
      <h2>All Products</h2>
      <section style={{ marginTop: 18 }}>
        <h3>Dry Fruits & Nuts</h3>
        <div className="grid-3">
          {CATALOG.dryFruits.slice(0,6).map(p => <ProductCard key={p.id} product={p} price={initialPrices[p.priceKey]} onAdd={()=>{}} onView={handleView} />)}
        </div>
        <div style={{ marginTop: 8 }}><Link to="/products/category/dry-fruits">View All Dry Fruits & Nuts</Link></div>
      </section>
      <section style={{ marginTop: 24 }}>
        <h3>Spices</h3>
        <div className="grid-3">
          {CATALOG.spices.slice(0,6).map(p => <ProductCard key={p.id} product={p} price={initialPrices[p.priceKey]} onAdd={()=>{}} onView={handleView} />)}
        </div>
        <div style={{ marginTop: 8 }}><Link to="/products/category/spices">View All Spices</Link></div>
      </section>
      <section style={{ marginTop: 24 }}>
        <h3>Seeds</h3>
        <div className="grid-3">
          {CATALOG.seeds.slice(0,6).map(p => <ProductCard key={p.id} product={p} price={initialPrices[p.priceKey]} onAdd={()=>{}} onView={handleView} />)}
        </div>
        <div style={{ marginTop: 8 }}><Link to="/products/category/seeds">View All Seeds</Link></div>
      </section>
    </main>
  )
}
