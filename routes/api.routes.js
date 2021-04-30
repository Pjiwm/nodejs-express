const express = require('express');
const apiRouter = express.Router();
const studentHomes = require('./home.routes')
const controller = require('../controllers/authentication.controller');

apiRouter.get('/info', controller.getInfo);
apiRouter.use('/studenthome', studentHomes)

module.exports = apiRouter;