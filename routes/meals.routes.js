const express = require('express')
const router = express.Router()
const controller = require('../controllers/meals.controller')

router.put('/:homeId/meal/:mealId', controller.alterMeal)
router.post('/:homeId/meal', controller.addMeal)
router.get('/:homeId/meal', controller.showMeals)
router.get('/:homeId/meal/:mealId', controller.showMeals)
router.delete('/:homeId/meal/:mealId', controller.deleteMeal)



module.exports = router