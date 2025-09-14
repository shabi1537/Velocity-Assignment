import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/authContext'
import axios from '../api/instance'

export const Mydetails = () => {

  const { user, guestUsers, setGuestUsers} = useContext(AuthContext)

  const deleteGuest = async (id)=>{
    try {
      const res = await axios.post('/auth/deleteGuest', {id})
      setGuestUsers(res.data.guestUsers)
    } catch (error) {
      console.log('error..')
    }
  }

  if (user.role ==='guest') return (
    <>
    <strong className='userdetail'>Your Details</strong>
    <div className='guestuser-detail-container'>
        <div>
          
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Contact:</strong> {user.phone}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Date of Birth:</strong> {new Date(user.dob).toLocaleDateString()}</p>
        </div>
    </div>
    </>
  )

  return (
        <>
          <strong className='userdetail'>Welcome Admin</strong>
          <div className='guest-users-wrapper'>
            {guestUsers.length !== 0 ? guestUsers.map((g) => (
              <div key={g._id} className='user-detail-container'>
                <div className='user-detail'>
                  <p><strong>Name:</strong> {g.name}</p>
                  <p><strong>Email:</strong> {g.email}</p>
                  <p><strong>Contact:</strong> {g.phone}</p>
                  <p><strong>Role:</strong> {g.role}</p>
                  <p><strong>DOB:</strong> {new Date(g.dob).toLocaleDateString()}</p>
                  <button className='delete-user-btn' onClick={()=> deleteGuest(g._id)}>Delete User</button>
                </div>
              </div>
            )) : <p>No guest users found.</p>}
          </div>

        </>
      
  )
}
