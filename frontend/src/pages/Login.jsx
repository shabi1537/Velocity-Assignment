import axios from '../api/instance'
import React, { useState } from 'react'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

export const Login = () => {

    const [formData, setFormData] = useState({
        email:'', password:''
    })
    const navigate = useNavigate()
    const {setUser} = useContext(AuthContext)

    const handleChange = (e)=>{

         const {name, type, value} = e.target

         setFormData((prev)=>(
            {...formData, [name]: value}
         ))
    }

    const handleSubmit = async (e)=>{

        e.preventDefault()

        try {
            const res = await axios.post('/auth/login', formData)
            console.log(res.data.message)
            setUser(res.data.user)
            navigate('/mydetails')
        } catch (err) {
            console.error(err.response?.data?.message || 'Login failed')
        }
    }

  return (
    <>
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
    </div>
    </>
  )
}
