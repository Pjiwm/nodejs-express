const logger = require('tracer').colorConsole()


let controller = {
    getAll(req, res, next) {
        const requestMethod = req.method
        const reqUrl = req.url
        logger.info('[DefaultController] all:', requestMethod, reqUrl)
        next()
    },
    endpointNotFound(req, res, next) {
        next({
            message: "Endpoint " + req.baseUrl + " does not exist ",
            errorCode: 404
        })
        logger.info('[DefaultController] endpointNotFound')
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