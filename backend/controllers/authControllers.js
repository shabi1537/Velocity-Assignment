const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

exports.signup = async (req, res)=> {
    try {
        const {name, email, password, dob, isAdmin} = req.body

        const user = await User.findOne({email})
        if(user) return res.status(400).json({message: 'user already exist'})

        const hashedPassword = await bcrypt.hash(password, 10)
        
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            dob,
            role: isAdmin ? 'admin' : 'guest'
        })

        await newUser.save()

        return res.status(201).json({message: 'user saved successfully'})
    } 
    catch (error) {
        return res.status(500).json({message: error.message})
    }
}

exports.login = async (req, res) =>{

    try {
        const {email, password} = req.body

        const user = await User.findOne({email})
        if(!user) return res.status(400).json({message: 'Invalid credentials'})
        
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if(!isPasswordCorrect) return res.status(400).json({message: 'Invalid credentials'})
       
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn:'1d'})
        
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        })

        const {password:pwd, ...userWithoutPassword} = user.toObject()

        return res.status(200).json({ message: 'Login successful', user: userWithoutPassword });
            
    } 
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

exports.getDetails = async (req, res) =>{
    try {
        const token = req.cookies.token
        if(!token) return res.status(401).json({message:'Unauthorized'})
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        
        const user = await User.findById(decoded.id).select('-password')
        if(!user) return res.status(401).json({message:'user not found'})

        return res.status(200).json({user});    
    }
    catch (error) {
        return res.status(404).json({message:'invalid token'})
    }
}


exports.logout = async(req, res)=>{
    res.clearCookie('token', {
        httpOnly: true,
    });
    return res.status(200).json({ message:'Logged out successfully'});
}