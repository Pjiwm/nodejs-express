const logger = require("../helpers/log")
let database = require('../dao/home.database')
const BodyValidator = require("../helpers/body.validator")
const types = {
    name: "string",
    description: "string",
    creationDate: "string",
    serveDate: "string",
    price: "string",
    allergy: "string",
    ingredients: "Array"
}
class Meals {
    // creates a meal inside the meal array of a home.
    create({ params, body }, res, next) {
        logger.info('[MealsController]: create')
        const home = database.getHome(params.homeId)
        const bodyValidator = new BodyValidator(types)

        if (!bodyValidator.validate(body)) {

            logger.info('[MealsController]: create failed')
            return next({
                code: 400,
                error: "Bad Request",
                message: bodyValidator.errors
            })
        }

        if (home.length) {

            res.send(database.createMeal(params.homeId, body))
            logger.info('[MealsController]: create successful')

        } else {

            next({ error: "Not Found", message: "Home doesn't exist", code: 404 })
            logger.info('[MealsController]: create failed')
        }
    }
    // displays all the meals that are inside a home.
    findAll({ params }, res, next) {
        logger.info('[MealsController]: findAll')
        const home = database.getHome(params.homeId)[0]


        if (home !== undefined) {

            logger.debug('[MealsController]: findAll found meals:', home.meals)
            res.send(home.meals)
            logger.info('[MealsController]: findAll successful')

        } else {

            logger.info('[MealsController]: findAll failed')
            next({ error: "Not Found", message: "Meal(s) do not exit", code: 404 })

        }
    }
    // displays specified meal inside a home via an ID
    findOne({ params }, res, next) {
        logger.info('[MealsController]: findOne')
        const meal = database.getMeal(params.homeId, params.mealId)
        logger.debug('[MealsController]: findOne meal:', meal)

        if (meal.length) {

            logger.info('[MealsController]: successful')
            res.send(meal)

        } else {

            logger.info('[MealsController]: findOne failed')
            res.status(404).send({ error: "Not Found", message: "Meal does not exits", code: 404 })
        }

    }
    // removes a meal from a home via the ID 
    remove({ params }, res, next) {
        logger.info('[MealsController]: remove')
        const meal = database.getMeal(params.homeId, params.mealId)
        if (meal.length) {

            database.removeMeal(params.homeId, params.mealId)

            logger.info('[MealsController]: remove successful')
            res.send({ message: "successfull" })

        } else {

            logger.info('[MealsController]: remove failed')
            logger.debug('[MealsController]: remove meal:', meal)
            next({ error: "Not Found", message: "Meal(s) do not exist", code: 404 })

        }

    }
    // updates the meal from a home by replacing its own content with the requested information.
    update({ params, body }, res, next) {
        logger.info('[MealsController]: update')
        const currentMeal = database.getMeal(params.homeId, params.mealId)

        if (!currentMeal.length) {
            logger.info('[MealsController]: update failed')
            return next({ error: "Not Found", message: "Meal does not exist", code: 404 })
        }

            const bodyValidator = new BodyValidator(types)
        if (!bodyValidator.validate(body)) {
            logger.info('[MealsController]: create failed')
            return next({
                code: 400,
                error: "Bad Request",
                message: bodyValidator.errors
            })
        }
        return res.send(database.updateMeal(params.homeId, params.mealId, { ...body, id: Number(params.mealId) }))
       
        if (currentMeal.length && body.name !== undefined && body.type !== undefined) {

            logger.info('[MealsController]: update successful')
            var newMeal = {
                id: Number(params.mealId),
                name: body.name,
                type: body.type

            }
            logger.debug('[MealsController]: updated meal with ID:', params.mealId, 'from:', currentMeal, 'to:', newMeal)
            res.send(database.updateMeal(params.homeId, params.mealId, newMeal))

        } else if (body.name === undefined || body.type === undefined) {

            logger.info('[MealsController]: update failed')
            next({ error: "Bad Request", message: "missing arguments", code: 400 })

        } else {

            logger.info('[MealsController]: update failed')
            next({ error: "Not Found", message: "Meal does not exist", code: 404 })
        }
        logger.debug('[MealsController]: update newMeal:', newMeal)
    }
}

module.exports = Meals