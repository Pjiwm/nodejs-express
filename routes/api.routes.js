// this file is referenced inside server.js
const express = require('express');
const apiRouter = express.Router();
const studentHomes = require('./home.routes')
const Authentication = require('../controllers/authentication.controller')
const authentication = new Authentication()

apiRouter.get('/info', authentication.getInfo);
apiRouter.use('/studenthome', studentHomes)

module.exports = apiRouter;