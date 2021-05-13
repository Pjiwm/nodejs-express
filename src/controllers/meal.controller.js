const logger = require("../helpers/log")
let database = require('../dao/home.database')
const BodyValidator = require("../helpers/body.validator")
const meal = require("../services/meal.service")
const home = require("../services/home.service")

const createTypes = {
    id: "number",
    name: "string",
    description: "string",
    creationDate: "string",
    serveDate: "string",
    price: "number",
    allergy: "string",
    ingredients: "Array",
    maxParticipants: "number"
}
const updateTypes = {
    name: "string",
    description: "string",
    creationDate: "string",
    serveDate: "string",
    price: "number",
    allergy: "string",
    ingredients: "Array",
    maxParticipants: "number"
}
class MealController {
    // creates a meal inside the meal array of a home.
    async create({ params, body }, res, next) {
        logger.info('[MealsController]: create')
        const bodyValidator = new BodyValidator(createTypes)

        if (!bodyValidator.validate(body)) {
            logger.info('[MealsController]: create failed')
            return next({
                code: 400,
                error: "Bad Request",
                message: bodyValidator.errors
            })
        }

        let existingMeal = await meal.findOneByMealIdAndHomeId(body.id, params.homeId)
        if (existingMeal.length) {
            logger.info('[MealsController]: create failed')
            return next({
                code: 400,
                error: "Bad Request",
                message: `meal with id: ${body.id} already exists`
            })
        }

        existingMeal = await meal.findByHomeId(params.homeId)
        if (!existingMeal.length) {
            logger.info('[MealsController]: create failed')
            return next({
                code: 404,
                error: "Not Found",
                message: `no meals with home id: ${params.homeId}`
            })
        }

        res.send(await meal.create(params.homeId, body))
        logger.info('[MealsController]: create successful')
    }
    // displays all meals inside a student home
    async findAll({ params }, res, next) {
        logger.info('[MealsController]: findAll')
        const mealHome = await home.findOne(params.homeId)
        if (!mealHome.length) {
            logger.info('[MealsController]: findAll failed')
            return next({ error: "Not Found", message: "home does not exit", code: 404 })
        }

        logger.info('[MealsController]: findAll successful')
        res.send(await meal.findByHomeId(params.homeId))

    }
    // finds a specific meal inside a home
    async findOne({ params }, res, next) {
        logger.info('[MealsController]: findOne')
        const mealHome = await home.findOne(params.homeId)
        if (!mealHome.length) {
            logger.info('[MealsController]: findOne failed')
            return next({ error: "Not Found", message: "home does not exit", code: 404 })
        }

        const detailMeal = await meal.findOneByMealIdAndHomeId(params.mealId, params.homeId)
        if (!detailMeal.length) {
            logger.info('[MealsController]: findOne failed')
            return next({ error: "Not Found", message: "meal does not exit", code: 404 })
        }

        logger.info('[MealsController]: findOne successful')
        res.send(...detailMeal)
    }
    // updates the meal from a home by replacing its own content with the requested information.
    async update({ params, body }, res, next) {
        logger.info('[MealsController]: update')

        const bodyValidator = new BodyValidator(updateTypes)
        if (!bodyValidator.validate(body)) {
            logger.info('[MealsController]: update failed')
            return next({
                code: 400,
                error: "Bad Request",
                message: bodyValidator.errors
            })
        }

        const mealHome = await home.findOne(params.homeId)
        if (!mealHome.length) {
            logger.info('[MealsController]: findOne failed')
            return next({ error: "Not Found", message: "home does not exit", code: 404 })
        }

        const currentMeal = await meal.findOneByMealIdAndHomeId(params.mealId, params.homeId)
        if (!currentMeal.length) {
            logger.info('[MealsController]: findOne failed')
            return next({ error: "Not Found", message: "meal does not exit", code: 404 })
        }

        if (currentMeal.id === params.mealId) {
            logger.info('[MealsController]: findOne failed')
            return next({ error: "Not Found", message: `meal with id: ${params.mealId} already exists`, code: 404 })
        }

        res.send(await meal.update(params.homeId, params.mealId, body))
    }
 
    remove({ params }, res, next) {
        logger.info('[MealsController]: remove')
        const home = database.getHome(params.homeId)
    
        if (!home.length) {
            logger.info('[MealsController]: remove failed')
            return next({ error: "Not Found", message: "Home does not exist", code: 404 })
        }

    
        const meal = database.getMeal(params.homeId, params.mealId)
        if (meal.length) {
            database.removeMeal(params.homeId, params.mealId)
            logger.info('[MealsController]: remove successful')
            return res.send({ message: "successfull" })
    
        } else {
    
            logger.info('[MealsController]: remove failed')
            logger.debug('[MealsController]: remove meal:', meal)
            return next({ error: "Not Found", message: "Meal(s) do not exist", code: 404 })
    
        }
    
    }
}

module.exports = new MealController()