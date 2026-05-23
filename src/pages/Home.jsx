import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { CATALOG, initialPrices } from '../data/catalog'

const CATEGORIES = [
  { label: 'Dry Fruits', icon: '🥜', slug: 'dry-fruits' },
  { label: 'Spices',     icon: '🌶️', slug: 'spices' },
  { label: 'Seeds',      icon: '🌱', slug: 'seeds' },
  { label: 'Gifting',    icon: '🎁', slug: 'dry-fruits' },
]

const STATS = [
  { number: '15+', label: 'Years of Trust' },
  { number: '50+', label: 'Premium Products' },
  { number: '2', label: 'Store Locations' },
  { number: '10K+', label: 'Happy Customers' },
]

const TESTIMONIALS = [
  { text: 'Best quality spices in Hyderabad! The cloves are incredibly fragrant and fresh.', author: 'Priya S.' },
  { text: 'Kesav store has been my go-to for dry fruits for years. Highly recommended!', author: 'Ravi M.' },
  { text: 'Great packaging and prompt delivery. The cardamom is top notch quality.', author: 'Anitha K.' },
]

export default function Home(){
  const navigate = useNavigate()

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-image-overlay" />
        <div className="container">
          <div className="hero-content">
            <p className="hero-eyebrow">Premium Quality Since 2010</p>
            <h1>Finest Spices &amp; Dry Fruits from Hyderabad</h1>
            <p>Handpicked, fresh and authentic — delivered straight to your door.</p>
            <Link to="/products" className="btn-primary">Shop Now →</Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="stats-banner">
        <div className="container">
          {STATS.map(s => (
            <div key={s.label} className="stat-item">
              <div className="stat-number">{s.number}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CATEGORIES */}
      <div className="category-strip">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Shop by Category</h2>
          </div>
          <div className="category-grid">
            {CATEGORIES.map(c => (
              <div key={c.label} className="category-card" onClick={()=>navigate(`/products/category/${c.slug}`)}>
                <div className="category-icon">{c.icon}</div>
                <span>{c.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FEATURED PRODUCTS */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Kesav Delicacies</h2>
            <Link to="/products" className="view-all">View All →</Link>
          </div>
          <div className="grid-4">
            {CATALOG.dryFruits.map((p, i) => (
              <ProductCard key={p.id} product={p} price={initialPrices[p.priceKey]}
                badge={i === 0 ? 'NEW STOCK' : null}
                onView={id => navigate(`/products/${id}`)} />
            ))}
            {CATALOG.spices.slice(0,2).map(p => (
              <ProductCard key={p.id} product={p} price={initialPrices[p.priceKey]}
                onView={id => navigate(`/products/${id}`)} />
            ))}
          </div>
        </div>
      </section>

      {/* SPICES SECTION */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Premium Spices</h2>
            <Link to="/products/category/spices" className="view-all">View All →</Link>
          </div>
          <div className="grid-3">
            {CATALOG.spices.map((p, i) => (
              <ProductCard key={p.id} product={p} price={initialPrices[p.priceKey]}
                badge={i === 2 ? 'LIMITED' : null}
                onView={id => navigate(`/products/${id}`)} />
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT STRIP */}
      <div className="about-strip">
        <div className="container">
          <div>
            <h2>Our Story</h2>
            <p>Kesav Spice Store is a Hyderabad-based retailer and wholesaler offering premium spices, dry fruits and seeds sourced from trusted partners across India and abroad.</p>
            <p>We believe in quality, freshness and fair pricing — every product is handpicked and packed with care.</p>
            <Link to="/about" className="btn-outline" style={{ marginTop: 8, display: 'inline-block' }}>Read More</Link>
          </div>
          <div className="about-img">
            <img src="https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=700&auto=format&fit=crop" alt="Spices and dry fruits" loading="lazy" width="700" height="320" />
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div className="features-strip">
        <div className="container">
          <div className="features-grid">
            {[
              { icon: '🚚', title: 'Free Delivery', sub: 'Orders above Rs. 999' },
              { icon: '✅', title: '100% Authentic', sub: 'Directly sourced products' },
              { icon: '🌿', title: 'Fresh Stock', sub: 'Regular new arrivals' },
              { icon: '💬', title: 'WhatsApp Support', sub: 'Instant query resolution' },
            ].map(f => (
              <div key={f.title} className="feature-item">
                <span className="feature-icon">{f.icon}</span>
                <div className="feature-text">
                  <strong>{f.title}</strong>
                  <span>{f.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <section className="testimonials">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What Our Customers Say</h2>
          </div>
          <div className="testimonial-grid">
            {TESTIMONIALS.map(t => (
              <div key={t.author} className="testimonial-card">
                <div className="stars">★★★★★</div>
                <p>{t.text}</p>
                <div className="author">{t.author}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
