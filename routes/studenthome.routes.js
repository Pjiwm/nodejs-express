const express = require('express')
const router = express.Router()
const controller = require('../controllers/studenthome.controller')

router.post('/posthome', controller.addStudentHome)
router.get('/studenthome', controller.showStudentHomes)

module.exports = router