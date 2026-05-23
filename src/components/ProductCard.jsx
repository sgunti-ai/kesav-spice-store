import React from 'react'
import { useStore } from '../context/Store'

export default function ProductCard({ product, price, onAdd, onView, badge }){
  const { addToCart, priceFor, wishlist, toggleWishlist } = useStore()
  const resolvedPrice = price ?? priceFor(product.id)
  const isWishlisted = wishlist.includes(product.id)

  const handleAdd = (e) => {
    e.stopPropagation()
    if(typeof onAdd === 'function') onAdd(product.id)
    else addToCart(product.id)
  }

  return (
    <article className="product-card" aria-labelledby={`prod-${product.id}`}>
      <div className="product-card-img-wrap" onClick={()=>onView&&onView(product.id)} style={{cursor: onView ? 'pointer' : 'default'}}>
        <img loading="lazy" src={product.image} alt={product.name} width="300" height="300" />
        {badge && <span className={`product-badge ${badge === 'NEW STOCK' ? 'new' : badge === 'LIMITED' ? 'limited' : ''}`}>{badge}</span>}
        <button
          className={`wishlist-btn${isWishlisted ? ' active' : ''}`}
          onClick={(e)=>{ e.stopPropagation(); toggleWishlist(product.id) }}
          aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
        >{isWishlisted ? '♥' : '♡'}</button>
      </div>
      <div className="product-card-body">
        <h3 id={`prod-${product.id}`}>{product.name}</h3>
        <p className="price"><span>From</span> Rs. {resolvedPrice}</p>
        <div className="card-actions">
          {onView && <button className="btn-view" onClick={()=>onView(product.id)}>View</button>}
          <button className="btn-add" onClick={handleAdd} aria-label={`Add ${product.name} to cart`}>Add to Cart</button>
        </div>
      </div>
    </article>
  )
}
