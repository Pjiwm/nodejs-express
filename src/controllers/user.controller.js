const logger = require("../helpers/log")
const BodyValidator = require("../helpers/body.validator")
const user = require("../services/user.service")
const types = {
    firstName: "string",
    lastName: "string",
    email: "email",
    studentNumber: "Number",
    password: "string"
}

class UserController {
    async create({body}, res, next) {
        logger.info('[UserController]: create')
        const bodyValidator = new BodyValidator(types)

        if (!bodyValidator.validate(body)) {
            logger.info('[UserController]: create failed')
            return next({
                code: 400,
                error: "Bad Request",
                message: bodyValidator.errors
            })
        }

        const existingUser = await user.findByEmail(body.email) 
        
        if(existingUser.length) {
            return next({
                code: 400,
                error: "Bad Request",
                message: "Email already in use"
            })
        }

        logger.info('[UserController]: create successful')
         return res.send(await user.create(body))
    }
}
 module.exports = new UserController()