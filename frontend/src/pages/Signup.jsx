import axios from '../api/instance'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const Signup = () => {

    const [formData, setFormData] = useState({
        name:'', email:'', password:'', dob:'', isAdmin: false
    })
    const navigate = useNavigate()
    const handleChange = (e)=>{
        const {name, value, type, checked} = e.target

        setFormData((prev)=>({
            ...formData, [name]: type ==='checkbox' ? checked : value
        }))
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()

        try {
            const res = await axios.post('/auth/signup', formData)
            navigate('/login'); 
        } catch (err) {
            console.error(err.response?.data?.message || 'Signup Failed')
        }
    }

  return (
    <div>
        <div className='form-heading'>Create Your Account</div>
        <form className='form-container' onSubmit={handleSubmit}>
                <label htmlFor='name'>Name :
                <input className='input' id='name' type='text' name='name' value={formData.name} required onChange={handleChange} />
                </label>
                <label htmlFor='email'>Email :
                <input className='input' id='email' type='email' name='email' value={formData.email} required onChange={handleChange} />
                </label>

                <label htmlFor='password'>Password :
                <input className='input' id='password' type='password' name='password' value={formData.password} required onChange={handleChange} />
                </label>

                <label htmlFor='dob'>DOB :
                <input className='input' id='dob' type='date' name='dob' value={formData.dob} required onChange={handleChange} />
                </label>

                <div>
                    <label htmlFor='isAdmin'>Admin :
                </label>
                <input id='isAdmin' type='checkbox' name='isAdmin' checked={formData.isAdmin} onChange={handleChange} />
                </div>

                <button type='submit'>Submit</button>
            </form>
    </div>
  )
}
