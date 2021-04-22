const express = require('express')
const app = express()
const port = process.env.PORT || 3000

let result = {
    "response": "hi 2 ",
    "status": "ok 2",
}


app.get('/', (req, res) => {
    res.status(200).json(result).end()
})




app.listen(port, () => {
    console.log(result)
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