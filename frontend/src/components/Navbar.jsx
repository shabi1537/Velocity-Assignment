import React, { useContext } from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import axios from '../api/instance'

export const Navbar = () => {

  const {user, setUser} = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = async ()=>{
    try {
      const res = await axios.post('/auth/logout')
      setUser(null)
      navigate('/login')
      
    } catch (err) {
      console.log(console.error(err.response?.data?.message || 'Logout failed'))
    }
  }
  return (
    <div className='navbar-container'>
        <NavLink className='link' to='/'>Home</NavLink>
        {!user ? <NavLink className='link' to='/login'> Log In</NavLink>:
        <NavLink className='link' to='/login' onClick={handleLogout}> Log Out</NavLink>}
        {!user ? <NavLink className='link' to='/signup'> Sign Up</NavLink>: null}
        {user?.role ==='guest' ? <NavLink className='link' to='/mydetails'> My Details</NavLink> : null}
        {user?.role ==='admin' ? <NavLink className='link' to='/mydetails'> Dashboard</NavLink> : null}
    </div>
  )
}
