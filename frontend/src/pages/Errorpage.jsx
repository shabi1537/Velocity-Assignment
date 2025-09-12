import React from 'react'
import { NavLink } from 'react-router-dom'

export const Errorpage = () => {
  return (
    <div className='error-container'>
        <strong >Error 404</strong>
        <NavLink className='link' to='/'>Go Home</NavLink>
    </div>
  )
}
