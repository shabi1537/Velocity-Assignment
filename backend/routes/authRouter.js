const express = require('express')
const authRouter = express.Router()

const {login, signup, logout, getDetails} = require('../controllers/authControllers')

authRouter.post('/login', login)
authRouter.post('/signup', signup)
authRouter.get('/mydetails', getDetails)
authRouter.post('/logout', logout)


module.exports = authRouter
