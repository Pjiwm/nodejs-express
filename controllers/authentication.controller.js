const logger = require('tracer').colorConsole()

class Authentication {
    getInfo(req, res) {
        logger.info('[AuthenticationController]: getInfo')
        const student = {
            naam: "Pim Munne",
            studentnummer: "2170811",
            opleiding: "informatica",
            bescrhijving: "dit is een nodejs server voor samen eten",
            SonarQube: null,
        }
        res.json(student)
    }
}

module.exports = Authentication

