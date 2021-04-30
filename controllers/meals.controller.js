const logger = require('tracer').colorConsole()
let database = require('../dao/home.database')

class Meals {
    findAll({ params }, res) {
        const mealList = database.getHome(params.homeId)
        logger.debug('displaying:', mealList)
        res.send(mealList)
        logger.info('called all: GET meals')
    }
    findOne({ params }, res) {
        const meal = database.getMeal(params.homeId, params.mealId)
        logger.debug('given meal:', meal)
        logger.info('called: GET meal')
        res.send(meal)
    }


    create({ params, body }, res) {
        const home = database.getHome(params.homeId);

        if (home.length) {
            database.createMeal(params.homeId, body)

            // database.db[index].meals.push({
            //     id,
            //     name,
            //     type
            // })



            // database.db.filter(item => item.id === req.body.id)

            // logger.debug('added meal:', database.db[index].meals)
            // logger.info('called: POST meal')
            res.send({ message: "successful" })
        }
    }

    remove({ params }, send) {
        const index = findIndex(params.homeId)
        const mealIndex = findMealIndex(index, params.mealId)

        logger.info('called: DELETE meal')
        logger.debug('removed meal:', database.db[index].meals[mealIndex])
        database.db[index].meals.splice(mealIndex)

        res.send({ message: "successfull" })
    }

    update({ params, body }, res) {
        const homeId = params.homeId
        const mealId = params.mealId
        let homeIndex = findIndex(homeId)
        let mealIndex = findMealIndex(homeIndex, mealId)
        logger.info('called: PUT meal')
        logger.debug('params:', params)
        logger.info('edited meal from:', database.db[homeIndex])

        if (mealIndex !== undefined) {
            database.db[homeIndex].meals[mealIndex] = {
                id: mealId,
                name: body.name,
                type: body.type
            }
            logger.info('to:', req.body)
            res.send({ message: "successful" })

        } else {

            res.status(201).send({
                message: "failed to edit meal",
                error: 201
            })
        }
    }
}


module.exports = Meals;
// let controller = {
//     showMeals(req, res) {
//         const id = req.params.homeId
//         const mealList = database.db[findIndex(id)].meals
//         logger.debug('displaying:', mealList)
//         res.send(mealList)
//         logger.info('called all: GET studenthomes')
//     },
//     addMeal(req, res) {
//         const homeId = req.params.homeId
//         logger.debug(homeId)
//         let index = findIndex(homeId)
//         if (index !== undefined) {
//             const id = req.body.id
//             const name = req.body.name
//             const type = req.body.type
//             database.db[index].meals.push({
//                 id,
//                 name,
//                 type
//             })

//             logger.debug('added meal:', database.db[index].meals)
//             logger.info('called: POST meal')
//             res.send({ message: "successful" })
//         } else {
//             // error afhandeling
//             res.status(400).send({ message: "could not post object" })
//         }

//     },




//     getMealDetails(req, res) {
//         const index = findIndex(req.params.homeId)
//         const mealIndex = findMealIndex(index, req.params.mealId)
//         const meal = database.db[index].meals[mealIndex]

//         logger.debug('given meal:', meal)
//         res.send(meal)
//     },

//     deleteMeal(req, res) {
//         const index = findIndex(req.params.homeId)
//         const mealIndex = findMealIndex(index, req.params.mealId)

//         logger.info('called: DELETE meal')
//         logger.debug('removed meal:', database.db[index].meals[mealIndex])
//         database.db[index].meals.splice(mealIndex)
//         res.send({ message: "successfull" })
//     },

//     alterMeal(req, res, next) {
//         const homeId = req.params.homeId
//         const mealId = req.params.mealId
//         let homeIndex = findIndex(homeId)
//         let mealIndex = findMealIndex(homeIndex, mealId)
//         logger.info('called: PUT meal')
//         logger.debug('params:', req.params)
//         logger.info('edited meal from:', database.db[homeIndex])

//         if (mealIndex !== undefined) {
//             database.db[homeIndex].meals[mealIndex] = {
//                 id: mealId,
//                 name: req.body.name,
//                 type: req.body.type
//             }
//             logger.info('to:', req.body)
//             res.send({ message: "successful" })

//         } else {

//             res.status(201).send({
//                 message: "failed to edit meal",
//                 error: 201
//             })
//         }
//     }

// }

// function findIndex(id) {
//     if (id === undefined) {
//         return undefined
//     }

//     logger.debug('finding index for id:', id)
//     for (let i = 0; i < database.db.length; i++) {
//         if (database.db[i].id == id) {
//             logger.debug('object with id', id, 'is on index:', i)
//             return i
//         }
//     }
//     return undefined
// }



// function findMealIndex(homeIndex, mealId) {
//     let meals = database.db[homeIndex].meals
//     logger.debug(meals.length)
//     for (let i = 0; i < meals.length; i++) {
//         if (mealId == meals[i].id) {
//             logger.debug('object with id', mealId, 'is on mealIndex:', i)
//             return i
//         }
//     }
//     logger.debug('object with id', mealId, 'is', undefined)
//     return undefined
// }


module.exports = Meals