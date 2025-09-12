import React, { useContext } from 'react'
import { AuthContext } from '../context/authContext'

export const Home = () => {

  const {user} = useContext(AuthContext)
  return (
    
    <div className='home-page'>
        {!user ? <p>Please Login</p>:
        <p>Go to details page to see your Details</p>}
    </div>
  )
}
