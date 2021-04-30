const express = require('express')
const homesRouter = express.Router()
const Homes = require('../controllers/home.controller')
const mealsRoutes = require('./meals.routes')

const homes = new Homes();

homesRouter.post('/', homes.create)
homesRouter.delete('/:homeId', homes.remove)
homesRouter.put('/:homeId', homes.update)
homesRouter.get('/:homeId', homes.findOneById)
homesRouter.get('/', homes.findByQuery)

homesRouter.use('/:homeId/meal', mealsRoutes);

// TODO - studenten filter lijst


// router.get('/studenthome', controller.showStudentHomes)

module.exports = homesRouter