const express = require('express')
const logger = require('tracer').colorConsole()
const app = express()

let controller = {
    getInfo(req, res) {
        const student = {
            naam: "Pim Munne",
            studentnummer: "2170811",
            opleiding: "informatica",
            bescrhijving: "dit is een nodejs server voor samen eten",
            SonarQube: null,
        }
        res.status(200).json(student).end()
        logger.info('called GET info')
    }
}

module.exports = controller

