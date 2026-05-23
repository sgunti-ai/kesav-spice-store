import React from 'react'
import { useParams, Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { CATALOG, initialPrices } from '../data/catalog'

export default function Category(){
  const { slug } = useParams()
  let items = []
  let title = ''
  if(slug === 'spices'){ items = CATALOG.spices; title = 'Spices' }
  else if(slug === 'dry-fruits'){ items = CATALOG.dryFruits; title = 'Dry Fruits & Nuts' }
  else if(slug === 'seeds'){ items = CATALOG.seeds; title = 'Seeds' }
  else { items = [...CATALOG.dryFruits, ...CATALOG.spices, ...CATALOG.seeds]; title = 'All Products' }
  return (
    <main className="container">
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <h2>{title}</h2>
        <Link to="/products">Back to all products</Link>
      </div>
      <div className="grid-3" style={{ marginTop: 18 }}>
        {items.map(p => (
          <ProductCard key={p.id} product={p} price={initialPrices[p.priceKey]} onAdd={()=>{}} onView={()=>{}} />
        ))}
      </div>
    </main>
  )
}
