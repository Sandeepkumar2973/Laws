import React from 'react'
import Header from '../Navbar/Header';
import Footer from '../Navbar/Footer';
export const Library = () => {
  return (
    <>
      <Header />
      <div style={{ minHeight: '80vh', padding: '2rem' }}>
        <h1>Library</h1>
        <p>Library Content Goes Here</p>
      </div>
      <Footer />
    </>
  )
}
