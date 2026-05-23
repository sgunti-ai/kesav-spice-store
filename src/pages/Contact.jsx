import React from 'react'
export default function Contact(){
  return (
    <main className="container">
      <h2>Contact Us</h2>
      <form onSubmit={(e)=>{e.preventDefault(); alert('Message sent (demo)')}}>
        <input placeholder="Name" style={{width:'100%', padding:8, marginBottom:8}} />
        <input placeholder="Email" style={{width:'100%', padding:8, marginBottom:8}} />
        <textarea placeholder="Message" style={{width:'100%', padding:8, marginBottom:8}} />
        <button type="submit" style={{padding:8, background:'#caa43a', color:'#fff', border:'none'}}>Send</button>
      </form>
    </main>
  )
}
