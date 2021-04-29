const express = require('express')
const router = express.Router()
const controller = require('../controllers/meals.controller')


router.post('/:homeId/meal', controller.addMeal)


module.exports = router