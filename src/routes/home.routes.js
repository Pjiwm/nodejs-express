const express = require('express')
const homesRouter = express.Router()
const Homes = require('../controllers/home.controller')
const mealsRoutes = require('./meals.routes')

const homes = new Homes();
// all routes for homes
homesRouter.post('/', homes.create)
homesRouter.delete('/:homeId', homes.remove)
homesRouter.put('/:homeId', homes.update)
homesRouter.get('/:homeId', homes.findOneById)
homesRouter.get('/', homes.findByQuery)

/*
*  The reason Meal routes are here is because the all meal routes 
*  use the same base url as the ones from the home routes.
*  This is because meals are always inside a studenthome.
*/ 

homesRouter.use('/:homeId/meal', mealsRoutes);


module.exports = homesRouter