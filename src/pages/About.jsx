import React from 'react'
export default function About(){
  return (
    <>
      <div className="page-hero"><div className="container"><h1>About Kesav Spice Store</h1></div></div>
      <div className="container" style={{paddingBottom:60}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:48,alignItems:'center'}}>
          <div>
            <p style={{marginBottom:14,lineHeight:1.8}}>Kesav Spice Store is a Hyderabad-based retailer and wholesaler offering premium spices, dry fruits and seeds sourced from trusted partners across India and the Middle East.</p>
            <p style={{marginBottom:14,lineHeight:1.8}}>Founded with a passion for quality and authenticity, we serve thousands of customers from our stores in Boduppal, Hyderabad. Every product is handpicked for freshness and purity.</p>
            <p style={{lineHeight:1.8}}>Our mission is simple: bring you the finest natural products at honest prices, backed by friendly service you can count on.</p>
          </div>
          <div style={{borderRadius:12,overflow:'hidden'}}>
            <img src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&auto=format&fit=crop" alt="Store" loading="lazy" width="600" height="400" style={{width:'100%',height:320,objectFit:'cover'}} />
          </div>
        </div>
      </div>
    </>
  )
}
