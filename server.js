const http = require('http')

const port = process.env.PORT || 3000


const server = http.createServer((req, res) => {
    let result = {
        "response": "hi",
        "status": "ok",
    }
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(result))
})

server.listen(port, '127.0.0.1', () => {
    console.log(`Server running at http://${'127.0.0.1'}:${port}/`)
})