const express = require('express')
const logger = require('tracer').colorConsole()
const app = express()

let controller = {
    getAll(req, res, next) {
        const requestMethod = req.method
        const reqUrl = req.url
        logger.info('called all:', requestMethod, reqUrl)
        next()
    },
    getError(req, res, next) {
        next({
            message: "Endpoint " + req.url + " does not exist ",
            errorCode: 401
        })
        logger.info('called all: GET all')
    },
    showError(error, req, res, next) {
        
        res.status(error.errorCode).json({
            message: "Some error has occured",
            error: error
        })
        logger.info('Errorhandler called!')
        logger.info(error)
    }

}

module.exports = controller