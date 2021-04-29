const logger = require('tracer').colorConsole()
let database = require('../dao/studenthome.database')




let controller = {
    showStudentHomes(req, res) {

        res.status(200).json(database.db)
        logger.info('called all: GET studenthomes')
    },
    addMeal(req, res) {
        const id = req.params.homeId
        database.db[id].meal = {

        }

        logger.info('called all: POST studenthome')
        logger.debug('added studenthome: ' + req.body)
        res.send({ message: "successful" })
    },
    // moet nog gefixt worden
    getStudentHome(req, res) {
        const name = req.params.name
        const city = req.params.city
        let returnList = []
        logger.debug('given name and city:', city, name)
        for (let i = 0; i < database.db.length; i++) {
            if (name == database.db[i].name && city == database.db[i].city) {
                returnList.push(database.db[i])
                logger.debug('to request list added: ' + database.db[i])
                logger.info('called: GET studenthome')
            }
        }
        res.send(returnList)


    },

    getStudentHomeDetails(req, res) {
        const id = req.params.homeId
        res.send(database.db[id])
    },

    deleteStudentHome(req, res) {
        const id = req.params.homeId
        logger.info('called: DELETE studenthome')
        logger.debug('removed house:', database.db[id])
        database.db.splice(id)
        res.send({ message: "successfull" })
    },
    alterStudentHome(req, res, next) {
        const id = req.params.homeId
        logger.info('called: PUT studenthome')
        logger.debug('params:', req.params)
        logger.debug('edited house from:', database.db[id])
        database.db[id] = {
            id,
            name: req.body.name,
            city: req.body.city
        }
        if (database.db[id] == undefined) {
            res.send({
                message: "no data found",
                error: 204
            })
        } else {

            logger.debug('to:', database.db[id])
            res.send({ message: "successful" })
        }
    }

}

module.exports = controller