const express = require('express')
const app = express()
const port = process.env.PORT || 3000




app.get('/api/info', (req, res) => {
    const student = {
        naam: "Pim Munne",
        studentnummer: "2170811",
        opleiding: "informatica",
        bescrhijving: "dit is een nodejs server voor samen eten",
        SonarQube: null,
    }
    res.status(200).json(student).end()
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

// const http = require('http')

// // const port = process.env.PORT || 3000





// const server = http.createServer((req, res) => {
//     let result = {
//         "response": "hi",
//         "status": "ok",
//     }
//     res.statusCode = 200
//     res.setHeader('Content-Type', 'application/json')
//     res.end(JSON.stringify(result))
// })

// server.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}/`)
// })