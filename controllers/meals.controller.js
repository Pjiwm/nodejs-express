const logger = require('tracer').colorConsole()
let database = require('../dao/studenthome.database')




let controller = {
    showStudentHomes(req, res) {

        res.status(200).json(database.db)
        logger.info('called all: GET studenthomes')
    },
    addMeal(req, res) {
        const homeId = req.params.homeId
        logger.debug(homeId)
        let index = findIndex(homeId)
        if (index !== undefined) {
            const id = req.body.id
            const name = req.body.name
            const type = req.body.type
            database.db[index].meals.push({
                id,
                name,
                type
            })

            logger.debug('added meal:', database.db[index].meals)
            logger.info('called: POST meal')
            res.send({ message: "successful" })
        } else {
            // error afhandeling
            res.status(400).send({message: "could not post object"})
        }

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

function findIndex(id) {
    if (id === undefined) {
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