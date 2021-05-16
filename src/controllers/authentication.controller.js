const logger = require("../helpers/log")

class AuthController {
    getInfo(req, res) {
        logger.info('[AuthenticationController]: getInfo')
        const student = {
            naam: "Pim Munne",
    
            opleiding: "informatica",
            bescrhijving: "dit is een nodejs server voor samen eten",
            SonarQube: null,
        }
        res.send(student)
    }
}

module.exports = new Auth()

