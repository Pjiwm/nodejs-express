const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const routes = require('./routes/routes.js')



// app.all('*', (req, res, next) => {
//     const requestMethod = req.method
//     const reqUrl = req.url
//     console.log('called all:', requestMethod, reqUrl)
//     next()
// })
// info 
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

app.use('/', routes)





// app.get('/api/movies/:movieId', (req, res, next) => {
//     const movieId = req.params.movieId
//     if (movieId == 0) {
//         next({error: "movie does not exist", errorCode: 401})
//     }
//     console.log('called GET movie by ID')
// })


// app.all('*', (req, res) => {
//     const error = {
//         message: "Endpoint does not exist."
//     }
//     // res.status(400).json(error).end()
//     next({message: "Endpoint " + req.url+ " does not exist ", errorCode: 401})
//     console.log('called all: GET all')
// })

// app.use('*', (error, req, res, next) => {
//     console.log('Errorhandler called!')
//     console.log(error)
//     res.status(error.errorCode).json({
//         message: "Some error has occured",
//         error: error
//     })
// })

app.listen(port, () => {
    console.log('server running')
})