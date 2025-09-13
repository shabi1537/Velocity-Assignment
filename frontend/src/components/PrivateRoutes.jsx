import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/authContext'
import { Navigate } from 'react-router-dom'
import { Spinner } from './Spinner'

export const PrivateRoutes = ({children}) => {
  
  const {user, loading} = useContext(AuthContext)

  if(loading) return <Spinner/>

  return (
    user ? children : <Navigate to='/login' replace/>
  )
}
