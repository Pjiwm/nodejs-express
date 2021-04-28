const express = require('express')
const app = express()
const port = process.env.PORT || 3000


// routes
const routes = require('./routes/default.routes.js')
const authentication = require('./routes/authentication.routes')
const  studenthomes = require('./routes/studenthome.routes')
app.use(express.json());

app.use('/api', authentication)
app.use('/api/studenthome', studenthomes)
app.use('/', routes)


app.listen(port, () => {
    console.log('server running')
})