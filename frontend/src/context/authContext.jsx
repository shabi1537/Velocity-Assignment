import React, {createContext, useEffect, useState} from 'react'
import axios from '../api/instance'

export const AuthContext = createContext()

export const AuthProvider = ({children})=>{

    const [user, setUser] = useState(null)
    const [guestUsers, setGuestUsers] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchUser = async ()=>{
        try {

            const res = await axios.get('/auth/mydetails')
            setUser(res.data.user)
            if (res.data.user?.role === 'admin' && res.data.guestUsers) {
                setGuestUsers(res.data.guestUsers);
            } else {
                setGuestUsers([]);
            }
        } 
        catch (error) {
            setUser(null)
            setGuestUsers([])
        }
        finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchUser()
    }, [])


    return (
        <AuthContext.Provider value={{user, setUser, guestUsers, setGuestUsers, loading}}>
            {children}
        </AuthContext.Provider>
    )
}