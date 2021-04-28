const express = require('express')
const app = express()
const router = express.Router()
const controller = require('../controllers/studenthome.controller')

router.use('/studenthomes', controller.showStudentHomes)

module.exports = router