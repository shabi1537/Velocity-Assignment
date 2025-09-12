import React, {createContext, useEffect, useState} from 'react'
import axios from '../api/instance'

export const AuthContext = createContext()

export const AuthProvider = ({children})=>{

    const [user, setUser] = useState(null)

    const fetchUser = async ()=>{
        try {
            const res = await axios.get('/auth/mydetails')
            setUser(res.data.user)
        } 
        catch (error) {
            setUser(null)
        }
    }

    useEffect(()=>{
        fetchUser()
    }, [])


    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}