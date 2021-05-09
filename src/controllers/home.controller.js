const logger = require("../helpers/log")
let database = require('../dao/home.database')
const BodyValidator = require("../helpers/body.validator")

const types = {
    name: "string",
    city: "string",
    phoneNumber: "string",
    zipcode: "string",
    street: "string",
    streetNumber: "number"
}

class Homes {
    // creates a home inside the home.database's DB.
    create({ body }, res, next) {

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
        const createdHome = database.createHome(body)

        if (createdHome === undefined) {
            logger.info('[HomesController]: create failed')
            return next({ 
                code: 400, 
                message: "Invalid or duplicate data was given",
                error: "Bad Request"
            })
        }

        logger.info('[HomesController]: create successful')
        return res.send(createdHome)

        // logger.debug('[HomesController] inserted data:', body)
    }

    // removes a home inside the home.database's DB. 
    remove({ params }, res, next) {
        logger.info('[HomesController]: remove')
        const home = database.getHome(params.homeId);
        

        if (home.length) {

            logger.info('[HomesController]: remove successful')
            logger.debug('[HomesController]: removed home with ID:', params.homeId)
            database.removeHome(params.homeId)
            res.send({ message: "removal successful" })

        } else {

            next({ 
                code: 404, 
                message: "Home doesn't exist",
                error: "Not Found"
            })
            logger.info('[HomesController]: remove failed')
        }
    }

    // updates a home inside the home.database's DB by replacing its own content with requested information.
    update({ params, body }, res, next) {
        logger.info('[HomesController]: update')
        const home = database.getHome(params.homeId)

        if (!home.length) {
            logger.info('[HomesController]: update failed')
            return next({ 
                code: 404, 
                error: "Home doesn't exist",
                message: "Not Found"
            })
        }


        const bodyValidator = new BodyValidator(types)

        if (!bodyValidator.validate(body)) {
            logger.info('[HomesController]: update failed')
            return next({
                code: 404,
                error: "Bad Request",
                message: bodyValidator.errors
            })
        }

        const newHome = database.updateHome(params.homeId, body);

        if (newHome === undefined) {

            logger.info('[HomesController]: update failed')
            logger.debug('[HomesController]: update body:', body.name, body.city, body.phoneNumber, body.zipcode)
            return next({ 
                code: 400, 
                message: "Invalid or duplicate data was given",
                error: "Bad Request"
            })

        }
        logger.info('[HomesController]: update succesful')
        logger.debug('[HomesController]: updated home with ID:', params.homeId, 'from:', home, 'to:', body)
        return res.send(newHome)

    }

    // finds a home based on the query data name and city.
    findByQuery({ query }, res, next) {
        logger.info('[HomesController]: findByQuery')

        if (!Object.keys(query).length) {
            logger.info('[HomesController]: findByQuery all')
            return res.send(database.db)
        }

        var queriedHomes = database.getHomeByNameAndCity(query.name, query.city)
        if (!queriedHomes.length) {
            return next({ 
                code: 404, 
                message: "No homes found",
                error: "Bad Request"
            })
        }

        res.send(queriedHomes)
        logger.info('[HomesController]: findByQuery found matching information with query')

    }
    // displays a specific home that has been requested via its ID.
    findOneById({ params }, res, next) {
        logger.info('[HomesController]: findOneById')
        const home = database.getHome(params.homeId)

        if (!home.length) {
            logger.info('[HomesController]: findOneById failed')
            return next({ 
                code: 404, 
                message: `Home with id ${params.homeId} doesn't exist`,
                error: "Not Found"
            })
        }

        logger.info('[HomesController]: findOneById successful')
        res.send(home)
    }

    seed({ params }, res) {
        const totalRows = params.count ? params.count : 10000;

        database.seed(totalRows)

        res.send({
            message: "Mn zaad is gestrooid",
            results: database.db
        })
    }
}
module.exports = Homes