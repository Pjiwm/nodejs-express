const logger = require('tracer').colorConsole()
const { getHome } = require('../dao/home.database')
let database = require('../dao/home.database')

class Homes {
    
    create({ body }, res) {
        logger.info('[HomesController]: create')
        res.send(database.createHome(body))
    }

    remove({ params }, res) {
        const id = params.homeId
        logger.info('[HomesController]: remove')

        const home = database.getHome(params.homeId);
        console.log(home)
        if (home.length) {
            
            logger.info(`[HomesController]: Removed home with ID: ${params.homeId}`)
            database.removeHome(params.homeId)
            res.send();

        } else {
            res.status(404).send({ code: 404, error: "Home doesn't exist" })
        }
    }

    update({ params, body }, res) {
        logger.info('[HomesController]: update')
        res.send(database.updateHome(params.homeId, body))
    }

    findByQuery({ query }, res) {
        logger.info('[HomesController]: remove')
        if (Object.keys(query).length) {
            const queriedHomes = database.getHomeByNameAndCity(query.name, query.city);
            res.send(queriedHomes);
        } else {
            res.send(database.db);
        }
    }

    findOneById({ params }, res) {
        logger.info(`[HomesController]: findOneById`)
        res.send(database.getHome(params.homeId)[0])
    }
};

module.exports = Homes;