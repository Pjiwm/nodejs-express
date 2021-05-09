const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const logger = require("./src/helpers/log");
let database = require('./src/dao/home.database');
const controller = require('./src/controllers/default.controller')
const apiRoutes = require('./src/routes/api.routes')

app.use(express.json())

app.use(controller.getAll)

app.use('/api', apiRoutes)

app.use('/*', controller.endpointNotFound)

app.use(controller.showError)

app.listen(port, () => {
    database.seed(100)
    logger.info('Server is running')
})

module.exports = app