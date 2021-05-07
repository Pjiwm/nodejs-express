const logger = require('tracer').colorConsole()
let database = require('../dao/home.database')

class Homes {
    // creates a home inside the home.database's DB.
    create({ body }, res) {
        logger.info('[HomesController]: create')

        if (body.name === undefined || body.city === undefined || body.phoneNumber === undefined 
            || body.zipcode === undefined || body.street === undefined || body.streetNumber === undefined) {

            logger.info('[HomesController]: create failed')
            logger.debug('[HomesController]: create body:', body.name, body.city, body.phoneNumber, body.zipcode)
            res.status(400).send({ code: 400, error: "Insufficient data was given" })

        } else {

            logger.info('[HomesController]: create found all arguments for new home')
            const createdHome = database.createHome(body)

            if (createdHome !== undefined) {

                logger.info('[HomesController]: create successful')
                res.send(createdHome)

            } else {
                logger.info('[HomesController]: create failed')
                res.send({ message: "invalid or duplicate data was given", error: 400 })
            }
        }
        logger.debug('[HomesController] inserted data:', body)
    }

    // removes a home inside the home.database's DB. 
    remove({ params }, res) {
        logger.info('[HomesController]: remove')
        const home = database.getHome(params.homeId);
        console.log(home)

        if (home.length) {

            logger.info('[HomesController]: remove successful')
            logger.debug('[HomesController]: removed home with ID:', params.homeId)
            database.removeHome(params.homeId)
            res.send({ message: "removal successful" })

        } else {

            res.status(404).send({ code: 404, error: "Home doesn't exist" })
            logger.info('[HomesController]: remove failed')
        }
    }

    // updates a home inside the home.database's DB by replacing its own content with requested information.
    update({ params, body }, res) {
        logger.info('[HomesController]: update')
        const home = database.getHome(params.homeId)

        if (home.length) {

            const newHome = database.updateHome(params.homeId, body)

            if (body.name === undefined || body.city === undefined || body.phoneNumber === undefined 
                || body.zipcode === undefined || body.street === undefined || body.streetNumber === undefined) {
                logger.info('[HomesController]: update failed')
                logger.debug('[HomesController]: updated home is:', newHome)
                res.status(400).send({ message: "Insufficient data was given", error: 400 })

            } else {

                console.log('check of undef:', newHome)
                if (newHome !== undefined) {

                    res.send(newHome)
                    logger.info('[HomesController]: update succesful')
                    logger.debug('[HomesController]: updated home with ID:', params.homeId, 'from:', home, 'to:', body)

                } else {

                    res.status(400).send({ code: 400, error: "invalid or duplicate data was given" })
                    logger.info('[HomesController]: update failed')
                    logger.debug('[HomesController]: update body:', body.name, body.city, body.phoneNumber, body.zipcode)
                }
            }
        } else {

            res.status(404).send({ code: 404, error: "Home doesn't exist" })
            logger.info('[HomesController]: update failed')
        }
    }
    // finds a home based on the query data name and city.
    findByQuery({ query }, res) {
        logger.info('[HomesController]: findByQuery')

        if (Object.keys(query).length) {

            var queriedHomes = database.getHomeByNameAndCity(query.name, query.city)
            res.send(queriedHomes)
            logger.info('[HomesController]: findByQuery found matching information with query')

        } else {

            res.status(404).send({ message: "the name or city" + query.name + ", " + query.city + " does not exit", error: 404 })
            logger.info(`[HomesController]: findByQuery didn't find matching information with query, sending all`)
        }
        logger.debug('[HomesController]: findByQuery queriedhomes:', queriedHomes)
    }
    // displays a specific home that has been requested via its ID.
    findOneById({ params }, res) {
        logger.info('[HomesController]: findOneById')
        const home = database.getHome(params.homeId)

        if (home.length) {

            res.send(home)
            logger.info('[HomesController]: findOneById successful')

        } else {

            res.status(404).send({ code: 404, error: "Home with id " + params.homeId + "doesn't exist" })
            logger.info('[HomesController]: findOneById failed')
        }
    }
}
module.exports = Homes