import React from 'react'

function Footer() {
  return (
    <footer className="footer sm:footer-horizontal footer-center bg-black text-base-content p-4">
      <aside>
        <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
      </aside>
    </footer>
  )
}

export default Footer