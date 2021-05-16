// this file is referenced inside server.js
const express = require('express')
const apiRouter = express.Router()
const homeRoutes = require('./home.routes')
const authRoutes = require('./auth.routes')

function getInfo(req, res) {
    const student = {
        naam: "Pim Munne",
        studentnummer: "2170811",
        opleiding: "informatica",
        bescrhijving: "dit is een nodejs server voor samen eten",
        SonarQube: null,
    }
    res.send(student)
}


apiRouter.get('/info', getInfo)
apiRouter.use('/studenthome', homeRoutes)
apiRouter.use('/auth', authRoutes)

module.exports = apiRouter