const express = require('express')
const mealsRoutes = express.Router({ mergeParams: true })
const Meals = require('../controllers/meals.controller')

const meals = new Meals();
mealsRoutes.put('/:mealId', meals.update)
mealsRoutes.post('/', meals.create)
mealsRoutes.get('/', meals.findAll)
mealsRoutes.get('/:mealId', meals.findOne)
mealsRoutes.delete('/:mealId', meals.remove)

module.exports = mealsRoutes