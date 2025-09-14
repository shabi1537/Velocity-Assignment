const express = require('express')
const authRouter = express.Router()

const {login, signup, logout, getDetails, deleteGuest} = require('../controllers/authControllers')

authRouter.post('/login', login)
authRouter.post('/signup', signup)
authRouter.get('/mydetails', getDetails)
authRouter.post('/logout', logout)
authRouter.post('/deleteGuest', deleteGuest)


module.exports = authRouter
