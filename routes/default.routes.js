const express = require('express')
const router = express.Router()
const controller = require('../controllers/default.controller')

router.all('*', controller.getAll)

// app.all('*', (req, res, next) => {
//     const requestMethod = req.method
//     const reqUrl = req.url
//     console.log('called all:', requestMethod, reqUrl)
//     next()
// })


// router.all('*', (req, res, next) => {
//     next({
//         message: "Endpoint " + req.url + " does not exist ",
//         errorCode: 401
//     })
//     console.log('called all: GET all')
// })
router.all('*', controller.getError)

// router.use('*', (error, req, res, next) => {
//     console.log('Errorhandler called!')
//     console.log(error)
//     res.status(error.errorCode).json({
//         message: "Some error has occured",
//         error: error
//     })
// })
router.use('*', controller.showError)

module.exports = router
