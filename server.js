const express = require('express')
const app = express()
const port = process.env.PORT || 3000


app.all('*', (req, res, next) => {
    const requestMethod = req.method
    const reqUrl = req.url
    console.log('called all:', requestMethod, reqUrl)
    // res.status(200).json({message: "okay"})
    next()
})

app.get('/api/info', (req, res) => {
    const student = {
        naam: "Pim Munne",
        studentnummer: "2170811",
        opleiding: "informatica",
        bescrhijving: "dit is een nodejs server voor samen eten",
        SonarQube: null,
    }
    res.status(200).json(student).end()
    console.log('called GET info')
})

app.get('/api/movies/:movieId', (req, res, next) => {
    const movieId = req.params.movieId
    if (movieId == 0) {
        next({error: "movie does not exist", errorCode: 401})
    }
    console.log('called GET movie by ID')
})


app.all('*', (req, res) => {
    const error = {
        message: "Endpoint does not exist."
    }
    // res.status(400).json(error).end()
    next({message: "Endpoint " + req.url+ " does not exist ", errorCode: 401})
    console.log('called all: GET all')
})

app.use('*', (error, req, res, next) => {
    console.log('Errorhandler called!')
    console.log(error)
    res.status(error.errorCode).json({
        message: "Some error has occured",
        error: error
    })
})

// post method route
app.post('/api/post-test', (req, res) => {
    res.send('GET request to the homepage')
    const obj = req.body
    console.log(obj)
    res.status(200).json(obj).end()
})

// POST method route
app.post('/api', function (req, res) {
    res.send('POST request to the homepage')
})

// PuT method route
app.put('/api', function (req, res) {
    res.send('POST request to the homepage')
})




app.listen(port, () => {
    console.log('server running')
})