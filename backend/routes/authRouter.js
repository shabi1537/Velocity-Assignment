const express = require('express')
const authRouter = express.Router()

const {login, signup, logout, getDetails} = require('../controllers/authControllers')

authRouter.post('/login', login)
authRouter.post('/signup', signup)
authRouter.get('/mydetails', getDetails)


module.exports = authRouter
