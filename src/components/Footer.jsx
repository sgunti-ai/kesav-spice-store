import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer(){
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">KESAV</div>
            <p className="footer-tagline">Hyderabad's trusted source for premium spices, dry fruits and seeds. Quality you can taste, service you can trust.</p>
            <div className="footer-social">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">f</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">in</a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">▶</a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Products</h4>
            <ul>
              <li><Link to="/products/category/dry-fruits">Dry Fruits & Nuts</Link></li>
              <li><Link to="/products/category/spices">Spices</Link></li>
              <li><Link to="/products/category/seeds">Seeds</Link></li>
              <li><Link to="/products">All Products</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/stores">Our Stores</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Policies</h4>
            <ul>
              <li><Link to="/contact">Delivery Info</Link></li>
              <li><Link to="/contact">Refund Policy</Link></li>
              <li><Link to="/contact">Terms & Conditions</Link></li>
              <li><Link to="/contact">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Kesav Spice Store. All Rights Reserved.</span>
          <span>Boduppal, Hyderabad, Telangana</span>
        </div>
      </div>
    </footer>
  )
}
