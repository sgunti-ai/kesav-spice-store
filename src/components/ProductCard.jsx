import React from 'react'
import { useStore } from '../context/Store'

export default function ProductCard({ product, price, onAdd, onView }){
  const { addToCart, priceFor } = useStore()
  const resolvedPrice = price ?? priceFor(product.id)
  const handleAdd = () => {
    if(typeof onAdd === 'function') onAdd(product.id)
    else addToCart(product.id)
  }
  return (
    <article className="product-card" aria-labelledby={`prod-${product.id}`}>
      <img loading="lazy" src={product.image} alt={product.name} />
      <h3 id={`prod-${product.id}`}>{product.name}</h3>
      <p className="price">Rs. {resolvedPrice}</p>
      <div className="actions">
        <button onClick={()=>onView && onView(product.id)} aria-label={`View ${product.name}`}>View</button>
        <button onClick={handleAdd} aria-label={`Add ${product.name} to cart`}>Add to Cart</button>
      </div>
    </article>
  )
}
