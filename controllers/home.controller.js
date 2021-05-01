const logger = require('tracer').colorConsole()
const { getHome } = require('../dao/home.database')
let database = require('../dao/home.database')
const { param } = require('../routes/meals.routes')

class Homes {

    create({ body }, res) {
        logger.info('[HomesController]: create')
        if (body.name === undefined || body.city === undefined) {

            logger.info('[HomesController]: create failed')
            res.status(400).send({ code: 400, error: "Insufficient data was given" })

        } else {

            logger.info('[HomesController]: create successful')
            res.send(database.createHome(body))
        }
        logger.debug('[HomesController] inserted data:', body)

    }

    remove({ params }, res) {
        logger.info('[HomesController]: remove')

        const home = database.getHome(params.homeId);
        console.log(home)
        if (home.length) {

            logger.info('[HomesController]: remove successful')
            logger.debug('[HomesController]: removed home with ID:', params.homeId)
            database.removeHome(params.homeId)
            res.send()

        } else {

            res.status(404).send({ code: 404, error: "Home doesn't exist" })
            logger.info('[HomesController]: remove failed')
        }
    }

    update({ params, body }, res) {
        logger.info('[HomesController]: update')
        const home = database.getHome(params.homeId)
        if (home.length) {

            logger.info('[HomesController]: update')
            logger.debug('[HomesController]: updated home with ID:', params.homeId, 'from:', home, 'to:', body)
            res.send(database.updateHome(params.homeId, body))

        } else {

            res.status(404).send({ code: 404, error: "Home doesn't exist" })
            logger.info('[HomesController]: update failed')
        }
    }

    findByQuery({ query }, res) {
        logger.info('[HomesController]: findByQuery')
        if (Object.keys(query).length) {
            const queriedHomes = database.getHomeByNameAndCity(query.name, query.city);
            res.send(queriedHomes)
        } else {
            res.send(database.db)
        }
    }

    findOneById({ params }, res) {
        logger.info('[HomesController]: findOneById')
        res.send(database.getHome(params.homeId)[0])
    }
};

module.exports = Homes;