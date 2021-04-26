const express = require('express')
const app = express()
const router = express.Router()


app.all('*', (req, res, next) => {
    const requestMethod = req.method
    const reqUrl = req.url
    console.log('called all:', requestMethod, reqUrl)
    next()
})

router.get('/api/movies/:movieId', (req, res, next) => {
    const movieId = req.params.movieId
    if (movieId == 0) {
        next({ error: "movie does not exist", errorCode: 401 })
    }
    console.log('called GET movie by ID')
})


router.all('*', (req, res, next) => {
    const error = {
        message: "Endpoint does not exist."
    }
    // res.status(400).json(error).end()
    next({ message: "Endpoint " + req.url + " does not exist ", errorCode: 401 })
    console.log('called all: GET all')
})

router.use('*', (error, req, res, next) => {
    console.log('Errorhandler called!')
    console.log(error)
    res.status(error.errorCode).json({
        message: "Some error has occured",
        error: error
    })
})

module.exports = router
