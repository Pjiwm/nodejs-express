const logger = require("../helpers/log")


let controller = {
    getAll(req, res, next) {
        const requestMethod = req.method
        const reqUrl = req.url
        logger.info('[DefaultController] all:', requestMethod, reqUrl)
        next()
    },

    endpointNotFound(req, res, next) {
        next({
            error: "Endpoint " + req.baseUrl + " does not exist ",
            code: 404
        })
        logger.info('[DefaultController] endpointNotFound')
    },

    showError(error, req, res, next) {
        const errorCode = error.code || 500
        res.status(errorCode).json({
            ...error
        })
        logger.info('Errorhandler called!')
        logger.info(error)

    },

        getInfo(req, res) {
        logger.info('[AuthenticationController]: getInfo')
        const student = {
            naam: "Pim Munne",
            studentnummer: "2170811",
            opleiding: "informatica",
            bescrhijving: "dit is een nodejs server voor samen eten",
            SonarQube: null,
        }
        res.send(student)
    }

}

module.exports = controller