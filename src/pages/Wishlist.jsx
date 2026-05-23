import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../context/Store'
import ProductCard from '../components/ProductCard'

export default function Wishlist(){
  const { wishlist, toggleWishlist, CATALOG, priceFor } = useStore()
  const navigate = useNavigate()
  const allProducts = [...CATALOG.dryFruits, ...CATALOG.spices, ...CATALOG.seeds]
  const wishlistItems = allProducts.filter(p => wishlist.includes(p.id))

  return (
    <main className="container">
      <h2>My Wishlist</h2>
      {wishlistItems.length === 0 ? (
        <div style={{ marginTop: 24, textAlign: 'center', color: '#666' }}>
          <p>Your wishlist is empty.</p>
          <Link to="/products" className="btn-primary" style={{ display: 'inline-block', marginTop: 12 }}>Browse Products</Link>
        </div>
      ) : (
        <div className="grid-3" style={{ marginTop: 18 }}>
          {wishlistItems.map(p => (
            <div key={p.id} style={{ position: 'relative' }}>
              <ProductCard
                product={p}
                price={priceFor(p.id)}
                onView={(id) => navigate(`/products/${id}`)}
              />
              <button
                onClick={() => toggleWishlist(p.id)}
                style={{ position: 'absolute', top: 10, right: 10, background: '#fff', border: '1px solid #eee', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', color: '#e33' }}
                aria-label={`Remove ${p.name} from wishlist`}
              >✕</button>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
