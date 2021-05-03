const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const logger = require('tracer').colorConsole()

const controller = require('./controllers/default.controller')
const apiRoutes = require('./routes/api.routes')

app.use(express.json());

app.use(controller.showError)

app.use('/api', apiRoutes)

app.listen(port, () => {
    logger.info('Server is running')
})