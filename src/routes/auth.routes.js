const express = require('express')
const userRouter = express.Router()
const userController = require('../controllers/user.controller')

// all routes for homes
userRouter.post('/register', userController.create)

module.exports = userRouter