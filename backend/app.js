const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser');

app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json())


//routes
const authRouter = require('./routes/authRouter')

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('Database Connected....')
})
.catch((err)=>{
    console.log('Error....', err)
})

app.get('/api', (req, res)=>{
    return res.status(200).json({message:'welcome'})
})

app.use('/api/auth', authRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})