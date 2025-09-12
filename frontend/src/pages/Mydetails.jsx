import React, { useContext } from 'react'
import { AuthContext } from '../context/authContext'

export const Mydetails = () => {
  const { user } = useContext(AuthContext)

  return (
    <div className='userdetail'>
      {user ? (
        <div>
          <h2>User Details</h2>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Date of Birth:</strong> {new Date(user.dob).toLocaleDateString()}</p>
        </div>
      ) : (
        <h1>No user found</h1>
      )}
    </div>
  )
}
