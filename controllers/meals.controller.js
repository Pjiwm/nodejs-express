const logger = require('tracer').colorConsole()
let database = require('../dao/home.database');
const { param } = require('../routes/meals.routes');

class Meals {
    create({ params, body }, res) {
        logger.info('[MealsController]: create')
        const home = database.getHome(params.homeId);
        logger.debug('[MealsController] inserted data:', home)

        if (home.length) {

            res.send(database.createMeal(params.homeId, body))
            logger.info('[MealsController]: create successful')

        } else {

            res.status(400).send({message: "incomplete data", error: 400})
            logger.info('[MealsController]: create failed')
        }
    }

    findAll({ params }, res) {
        logger.info('[MealsController]: findAll')
        const home = database.getHome(params.homeId)[0]

        if (home !== undefined) {

            logger.debug('[MealsController]: findAll found meals:', home.meals)
            res.send(home.meals)
            logger.info('[MealsController]: findAll successful')

        } else {

            logget.debug('[MealsController]: findAll home:', home)
            logger.info('[MealsController]: findAll failed')
            res.status(404).send({message: "Meal(s) do not exit", error: 404})
        }
    }
// TODO add if statements for failed and successful states + logging
    findOne({ params }, res) {
        logger.info('[MealsController]: findOne')
        const meal = database.getMeal(params.homeId, params.mealId)
        logger.debug('[MealsController]: findOne meal:', meal)

        if(meal.length) {

            logger.info('[MealsController]: successful')
            res.send(meal)

        } else {

            logger.info('[MealsController]: findOne failed')
            res.status(404).send({ message: "Meal does not exits", error: 404 })
        }
        
    }

    remove({ params }, res) {
        logger.info('[MealsController]: remove')
        const meal = database.getMeal(params.homeId, params.mealId)
        if(meal.length) {
            database.removeMeal(params.homeId, params.mealId)
            logger.info('[MealsController]: remove successful')
            res.send({ message: "successfull" })
        } else {
            logger.info('[MealsController]: remove failed')
            logger.debug('[MealsController]: remove meal:', meal)
            res.send({ message: "Meal(s) do not exist", error: 404 })
        }
               
    }

    update({ params, body }, res) {
        logger.info('[MealsController]: update')
        const currentMeal = database.getMeal(params.homeId, params.mealId)
        if(currentMeal.length && body.name !== undefined && body.type !== undefined) {
            logger.info('[MealsController]: update successful')
            var newMeal = {
                id: Number(params.mealId),
                name: body.name,
                type: body.type

            }
            logger.debug('[MealsController]: updated meal with ID:', params.mealId, 'from:', currentMeal, 'to:', newMeal)
            res.send(database.updateMeal(params.homeId, params.mealId, newMeal))

        } else if (body.name === undefined || body.type === undefined){
            logger.info('[MealsController]: update failed')
            res.status(400).send({message: "missing arguments", error: 400})
        } else {
            logger.info('[MealsController]: update failed')
        
            res.status(404).send({ message: "Meal does not exist", error: 404})
        }
        logger.debug('[MealsController]: update newMeal:', newMeal)
    }
}

module.exports = Meals