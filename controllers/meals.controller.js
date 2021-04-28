
const logger = require('tracer').colorConsole()

let database = []

let controller = {
    postMeal(req, res) {
        let meal = {
            id: 1,
            name: "egg",
            type: "chicken"
        }
        database.push(meal)
        logger.debug(database.db)
        logger.debug(meal.name, "has been added to database")
        res.send(meal.name, "has been added to the database")
    },
    updateMeal(req, res) {

    },

    getMeal(req, res) {

    },

    getMealDetails(req, res) {

    },

    deleteMeal(req, res) {

    }
    
}

module.exports = controller