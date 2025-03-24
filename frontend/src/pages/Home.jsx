import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div
      className="hero min-h-[90vh]"
      style={{
        backgroundImage: "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
      }}>
      <div className="hero-overlay"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl md:text-6xl font-bold">Hello there</h1>
          <p className="mb-5 md:text-xl">
          Easily create, manage, and share your memories with Memo. Stay organized and access your thoughts anytime, anywhere!
          </p>
          <Link to='/signup' className="btn bg-amber-50 text-black border-0 md:text-xl md:btn-xl">Get Started</Link>
        </div>
      </div>
    </div>
  )
}

export default Home