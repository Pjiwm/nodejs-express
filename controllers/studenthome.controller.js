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
            name: req.body.name,
            city: req.body.city,
            meals: []
        })

        logger.info('called all: POST studenthome')
        logger.debug('added studenthome: ' + req.body)
        res.send({ message: "successful" })
    },
    // moet nog gefixt worden
    getStudentHomeNameCity(req, res) {
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
        let index = findIndex(id)
        if (database.db[index] !== undefined) {
            logger.info('called: GET studenthome details')
            res.send(database.db[index])
        } else {
            // error afhandeling
            res.status(204).send({
                message: "no data found",
                error: 204
            })
        }
    },


    deleteStudentHome(req, res) {
        const id = req.params.homeId
        logger.info('called: DELETE studenthome')
        let index = findIndex(id)

        if (database.db[index] !== undefined) {
            logger.debug('removed house:', database.db[index])
            database.db.splice(index)
            res.send({ message: "successfull" })
        } else {
            // error afhandeling
        }

    },
    alterStudentHome(req, res, next) {
        const id = req.params.homeId
        logger.info('called: PUT studenthome')
        logger.debug('params:', req.params)
        let index = findIndex(id)
        if (database.db[index] !== undefined) {
            logger.debug('edited house from:', database.db[id])
            database.db[index] = {
                id,
                name: req.body.name,
                city: req.body.city
            }
            logger.debug('to:', database.db[index])
            res.send({ message: "successful" })
        } else {
            res.status(204).send({
                message: "no data found",
                error: 204
            })
        }
    }


}


function findIndex(id) {
    if(id === undefined) {
        return undefined
    }

    logger.debug('finding index for id:', id)
    for (let i = 0; i < database.db.length; i++) {
        if (database.db[i].id == id) {
            logger.debug(database.db[i].id)
            logger.debug('object with id', id, 'is on index:', i)
            return i
        }
    }
    return undefined
}

module.exports = controller