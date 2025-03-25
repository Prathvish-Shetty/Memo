import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore';
import { logoutUser } from '../services/authService';

function Navbar() {
  const isAuthenticated = useAuthStore((state) => state.accessToken) != null
  const location = useLocation();
  const navigate = useNavigate()
  const getActiveClass = (path) => location.pathname === path ? 'btn' : 'btn btn-soft';

  const handleLogout = async () => {
    try {
      await logoutUser()
      navigate('/login');
    } catch (error) {
      console.error("Logout Failed:", error.message);
    }
  }

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li><Link to='/' className={getActiveClass('/')}>Home</Link></li>
            <li><Link to='/mems' className={getActiveClass('/mems')}>My Mems</Link></li>
          </ul>
        </div>
        <Link to='/' className="btn btn-ghost text-xl">Memo</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        {isAuthenticated && <ul className="menu menu-horizontal px-1 flex gap-1">
          <li><Link to='/' className={getActiveClass('/')}>Home</Link></li>
          <li><Link to='/mems' className={getActiveClass('/mems')}>My Mems</Link></li>
        </ul>}
      </div>
      <div className="navbar-end flex gap-2 mr-2">
        {!isAuthenticated &&
          <>
            <Link to="/signup" className={`bg-amber-100 text-black ${getActiveClass('/login')}`}>
              Signup
            </Link>
            <Link to="/login" className={`bg-amber-100 text-black ${getActiveClass('/login')}`}>
              Login
            </Link>
          </>}
        {isAuthenticated && <button onClick={handleLogout} className='btn bg-amber-100 text-black'>Logout</button>}
      </div>

    </div>
  )
}

export default Navbar
