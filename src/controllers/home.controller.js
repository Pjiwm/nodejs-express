const logger = require("../helpers/log")
let database = require('../dao/home.database')
const BodyValidator = require("../helpers/body.validator")
const home = require("../services/home.service")

const types = {
    name: "string",
    city: "string",
    phoneNumber: "string",
    zipcode: "string",
    street: "string",
    streetNumber: "number",
    userId: "number"
}

class HomeController {
    // creates a home inside the home.database's DB.
    async create({ body }, res, next) {

        logger.info('[HomesController]: create')

        const bodyValidator = new BodyValidator(types)

        if (!bodyValidator.validate(body)) {
            logger.info('[HomesController]: create failed')
            return next({
                code: 400,
                error: "Bad Request",
                message: bodyValidator.errors
            })
        }

        logger.info('[HomesController]: create found all arguments for new home')
        const homeWithZipcode = await home.findByPostalCode(body.zipcode)
        if (homeWithZipcode.length) {
            logger.info('[HomesController]: create failed')
            return next({
                code: 400,
                message: "Postalcode already exists",
                error: "Bad Request"
            })
        }

        const newHome = await home.create(body)
        return res.send(newHome)
    }

    // removes a home inside the home.database's DB. 
    async remove({ params }, res, next) {
        logger.info('[HomesController]: remove')
        const deletedHome = await home.findOne(params.homeId)
        if (!deletedHome.length) {
            logger.info('[HomesController]: remove failed')
            return next({
                code: 404,
                message: "Home doesn't exist",
                error: "Not Found"
            })

        }

        await home.removeFromId(params.homeId)
        logger.info('[HomesController]: remove successful')
        logger.debug('[HomesController]: removed home with ID:', params.homeId)
        res.send({ message: "removal successful" })
    }

    // updates a home inside the home.database's DB by replacing its own content with requested information.
    async update({ params, body }, res, next) {
        const bodyValidator = new BodyValidator(types)
        logger.info('[HomesController]: update')

        if (!bodyValidator.validate(body)) {
            logger.info('[HomesController]: update failed')
            return next({
                code: 404,
                error: "Bad Request",
                message: bodyValidator.errors
            })
        }

        const updatedHome = await home.findOne(params.homeId)
        const homeWithZipcode = await home.findByPostalCode(body.zipcode)
        if (!updatedHome.length) {
            return next({
                code: 404,
                error: "Home doesn't exist",
                message: "Not Found"
            })
        }

        if (homeWithZipcode.length) {
            if (params.homeId !== homeWithZipcode.id) {
                logger.info('[HomesController]: update failed')
                logger.debug('[HomesController]: update body:', body.name, body.city, body.phoneNumber, body.zipcode)
                return next({
                    code: 400,
                    message: "Postalcode already exists",
                    error: "Bad Request"
                })
            }
        }

        logger.info('[HomesController]: update successful')
        res.send(await home.update(params.homeId, body))
    }

    // finds a home based on the query data name and city.
    async findByQuery({ query }, res, next) {
        logger.info('[HomesController]: findByQuery')
        let returnValue
        if (query.name === undefined && query.city === undefined) {
            returnValue = await home.findAll()
        } else if (query.name === undefined) {
            returnValue = await home.findByCity(query.city)
        } else if (query.city === undefined) {
            returnValue = await home.findByName(query.name)
        } else {
            returnValue = await home.findByNameAndCity(query)
        }

        if (!returnValue.length) {
            return next({
                code: 404,
                message: "No homes found",
                error: "Not Found"
            })
        }
        res.send(returnValue)
    }

    async findOneById({ params }, res, next) {
        const newHome = await home.findOne(params.homeId)
        if (!newHome.length) {
            return next({
                code: 404,
                message: `Home with id ${params.homeId} doesn't exist`,
                error: "Not Found"
            })
        }
        return res.send(newHome)
    }

    seed({ params }, res) {
        const totalRows = params.count ? params.count : 10000

        database.seed(totalRows)

        res.send({
            message: "M'n zaad is gestrooid",
            results: database.db
        })
    }
}
module.exports = new HomeController()