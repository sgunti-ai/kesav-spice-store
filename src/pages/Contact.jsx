import React, { useState } from 'react'
export default function Contact(){
  const [sent, setSent] = useState(false)
  const handleSubmit = (e) => { e.preventDefault(); setSent(true) }
  return (
    <>
      <div className="page-hero"><div className="container"><h1>Contact Us</h1></div></div>
      <div className="container" style={{paddingBottom:60}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:56,alignItems:'start'}}>
          <div>
            {sent ? (
              <div style={{padding:24,background:'#d4edda',borderRadius:10,color:'#155724',fontWeight:600}}>✅ Thank you! We'll get back to you shortly.</div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <label style={{fontSize:13,fontWeight:600,display:'block',marginBottom:4}}>Name</label>
                <input placeholder="Your name" required />
                <label style={{fontSize:13,fontWeight:600,display:'block',marginBottom:4}}>Email</label>
                <input type="email" placeholder="your@email.com" required />
                <label style={{fontSize:13,fontWeight:600,display:'block',marginBottom:4}}>Message</label>
                <textarea placeholder="How can we help?" required />
                <button type="submit" className="btn-primary" style={{border:'none',padding:'12px 28px'}}>Send Message</button>
              </form>
            )}
          </div>
          <div>
            <h3 style={{fontFamily:'var(--font-display)',marginBottom:16}}>Get in Touch</h3>
            <p style={{color:'var(--muted)',marginBottom:8}}>📍 Near SBI Bank, Boduppal, Hyderabad</p>
            <p style={{color:'var(--muted)',marginBottom:8}}>📞 +91 70349 00009</p>
            <p style={{color:'var(--muted)',marginBottom:8}}>🕘 Mon–Sun: 9 AM – 9 PM</p>
            <a href="https://wa.me/917034900009" target="_blank" rel="noopener noreferrer"
              className="btn-primary" style={{display:'inline-block',marginTop:16,border:'none',background:'#25d366'}}>💬 Chat on WhatsApp</a>
          </div>
        </div>
      </div>
    </>
  )
}
