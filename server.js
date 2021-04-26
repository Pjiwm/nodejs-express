const express = require('express')
const app = express()
const port = process.env.PORT || 3000


// routes
const routes = require('./routes/routes.js')
const authentication = require('./routes/authentication.routes')

app.use('/api', authentication)
app.use('/', routes)


app.listen(port, () => {
    console.log('server running')
})