import axios from '../api/instance'
import React, { useState } from 'react'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { Spinner } from '../components/Spinner';

export const Login = () => {

    const [formData, setFormData] = useState({
        email:'', password:''
    })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const {setUser, setGuestUsers} = useContext(AuthContext)

    const handleChange = (e)=>{

         const {name, type, value} = e.target

         setFormData((prev)=>(
            {...formData, [name]: value}
         ))
    }

    const handleSubmit = async (e)=>{

        e.preventDefault()
        setLoading(true)

        try {
            const res = await axios.post('/auth/login', formData)
            //console.log(res.data.message)
            setUser(res.data.user)

            if(res.data.user.role === 'admin'){
                console.log(res.data.guestUsers)
                setGuestUsers(res.data.guestUsers)
            }
            else{
                setGuestUsers([])
            }
            navigate('/mydetails')
        } catch (err) {
            console.error(err.response?.data?.message || 'Login failed')
        }
        finally{
            setLoading(false)
        }
    }

  return (
    <>
    {loading ? <Spinner/>:(
     <div>   
    <div className='form-heading'>Log In</div>
    <div>
        <form className='form-container' onSubmit={handleSubmit}>
            
            <label>Email :
                <input className='input' id='email' type="email" name='email' required value={formData.email} onChange={handleChange} />
            </label>
            <label>Password :
                <input className='input' id='password' type="password" name='password' required value={formData.password} onChange={handleChange} />
            </label>
            <button type='submit'>Submit</button>
        </form>
    </div></div>)
    
    }
    </>
  )
}
