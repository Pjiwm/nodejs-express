const logger =  require("../helpers/log")
const faker = require("faker/locale/nl");
let database = require('../dao/home.database')

class Homes {
    // creates a home inside the home.database's DB.
    create({ body }, res, next) {
        logger.info('[HomesController]: create')

        if (body.name === undefined || body.city === undefined || body.phoneNumber === undefined 
            || body.zipcode === undefined || body.street === undefined || body.streetNumber === undefined) {

            logger.info('[HomesController]: create failed')
            logger.debug('[HomesController]: create body:', body.name, body.city, body.phoneNumber, body.zipcode)
            next({ code: 400, error: "Insufficient data was given" })

        } else {

            logger.info('[HomesController]: create found all arguments for new home')
            const createdHome = database.createHome(body)

            if (createdHome !== undefined) {

                logger.info('[HomesController]: create successful')
                res.send(createdHome)

            } else {
                logger.info('[HomesController]: create failed')
                next({ code: 400, error: "invalid or duplicate data was given"})
                // next()
            }
        }
        logger.debug('[HomesController] inserted data:', body)
    }

    // removes a home inside the home.database's DB. 
    remove({ params }, res, next) {
        logger.info('[HomesController]: remove')
        const home = database.getHome(params.homeId);
        console.log(home)

        if (home.length) {

            logger.info('[HomesController]: remove successful')
            logger.debug('[HomesController]: removed home with ID:', params.homeId)
            database.removeHome(params.homeId)
            res.send({ message: "removal successful" })

        } else {

            next({ code: 404, error: "Home doesn't exist" })
            logger.info('[HomesController]: remove failed')
        }
    }

    // updates a home inside the home.database's DB by replacing its own content with requested information.
    update({ params, body }, res, next) {
        logger.info('[HomesController]: update')
        const home = database.getHome(params.homeId)

        if (home.length) {

            const newHome = database.updateHome(params.homeId, body)

            if (body.name === undefined || body.city === undefined || body.phoneNumber === undefined 
                || body.zipcode === undefined || body.street === undefined || body.streetNumber === undefined) {
                logger.info('[HomesController]: update failed')
                logger.debug('[HomesController]: updated home is:', newHome)
                next({ error: "Insufficient data was given", code: 400 })

            } else {

                console.log('check of undef:', newHome)
                if (newHome !== undefined) {

                    res.send(newHome)
                    logger.info('[HomesController]: update succesful')
                    logger.debug('[HomesController]: updated home with ID:', params.homeId, 'from:', home, 'to:', body)

                } else {

                    next({ code: 400, error: "invalid or duplicate data was given" })
                    logger.info('[HomesController]: update failed')
                    logger.debug('[HomesController]: update body:', body.name, body.city, body.phoneNumber, body.zipcode)
                }
            }
        } else {

            next({ code: 404, error: "Home doesn't exist" })
            logger.info('[HomesController]: update failed')
        }
    }
    // finds a home based on the query data name and city.
    findByQuery({ query }, res, next) {
        logger.info('[HomesController]: findByQuery')

        if (!Object.keys(query).length) {
            logger.info('[HomesController]: findByQuery all')
            return res.send(database.db)
        }

        var queriedHomes = database.getHomeByNameAndCity(query.name, query.city)
        if(!queriedHomes.length) {
            return next({ code: 404, error: "no homes found" })
        }

        res.send(queriedHomes)
        logger.info('[HomesController]: findByQuery found matching information with query')
        
    }
    // displays a specific home that has been requested via its ID.
    findOneById({ params }, res, next) {
        logger.info('[HomesController]: findOneById')
        const home = database.getHome(params.homeId)

        if (home.length) {

            res.send(home)
            logger.info('[HomesController]: findOneById successful')

        } else {

            next({ code: 404, error: `Home with id ${params.homeId} doesn't exist` })
            logger.info('[HomesController]: findOneById failed')
        }
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