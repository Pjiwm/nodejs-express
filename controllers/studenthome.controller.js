const logger = require('tracer').colorConsole()
let database = require('../dao/studenthome.database')




let controller = {
    showStudentHomes(req, res) {

        res.status(200).json(database.db)
        logger.info('called all: GET studenthomes')
    },
    addStudentHome(req, res) {
        const id = database.db[database.db.length - 1].id + 1
        database.add({
            id,
            name: req.body.name
        })

        logger.info('called all: POST studenthome')
        logger.debug('added studenthome: ' + req.body)
        res.send({ request: "added" })
    },

    getMeal(req, res) {

    },

    getMealDetails(req, res) {

    },

    deleteMeal(req, res) {

    }

}

module.exports = controller