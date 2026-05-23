import React from 'react'
export default function Stores(){
  return (
    <>
      <div className="page-hero"><div className="container"><h1>Our Stores</h1></div></div>
      <div className="container" style={{paddingBottom:60}}>
        <div style={{background:'#fff',border:'1px solid var(--border)',borderRadius:10,padding:28,marginBottom:20,maxWidth:480}}>
          <h3 style={{marginBottom:6,fontFamily:'var(--font-display)'}}>Boduppal Store</h3>
          <p style={{color:'var(--muted)',fontSize:14,lineHeight:1.7}}>Near SBI Bank, Boduppal<br/>Hyderabad, Telangana — 500039<br/><strong>Hours:</strong> 9 AM – 9 PM (All days)<br/><strong>Phone:</strong> +91 70349 00009</p>
        </div>
        <div className="map-placeholder">📍 Google Maps Integration Coming Soon</div>
      </div>
    </>
  )
}
