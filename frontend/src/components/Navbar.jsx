import React from 'react'
import {NavLink} from 'react-router-dom'

export const Navbar = () => {
  return (
    <div className='navbar-container'>
        <NavLink className='link' to='/'>Home</NavLink>
        <NavLink className='link' to='/login'> Log In</NavLink>
        <NavLink className='link' to='/signup'> Sign Up</NavLink>
        <NavLink className='link' to='/mydetails'> My Details</NavLink>
    </div>
  )
}
