const jwt = require('jsonwebtoken')
const logger = require("../helpers/log")
const user = require("../services/user.service")
const BodyValidator = require("../helpers/body.validator")
const bcrypt = require('bcrypt')
require('dotenv').config()
const loginTypes = {
    email: "email",
    password: "string"
}

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

    async login({ body }, res, next) {
        const bodyValidator = new BodyValidator(loginTypes)
        if (!bodyValidator.validate(body)) {
            logger.info('[AuthController]: login failed')
            return next({
                code: 400,
                error: "Bad Request",
                message: bodyValidator.errors
            })
        }

        const loginUser = await user.findByEmail(body.email)
        if (loginUser.Email) {
            logger.info('[AuthController]: login failed')
            return next({
                code: 400,
                error: "Bad Request",
                message: "User wit this email doesn't exist."
            })
        }

        console.log(body.password, loginUser[0].Password)
        const match = await bcrypt.compare(body.password, loginUser[0].Password)
        if (match === false) {
            logger.info('[AuthController]: login failed')
            return next({
                code: 400,
                error: "Bad Request",
                message: "Incorrect password"
            })
        }

        logger.info('[AuthController]: login successful')
        const secret = process.env.JWT_SECRET
        const token = jwt.sign(loginUser[0].ID, secret)
        res.send({token})
    }
}

module.exports = new AuthController()

