const express = require('express')
const router = express.Router()
const controller = require('../controllers/studenthome.controller')

router.post('', controller.addStudentHome)
router.get('/:homeId', controller.getStudentHomeDetails)
router.get('/:name/:city', controller.getStudentHomeNameCity)
router.delete('/:homeId', controller.deleteStudentHome)
router.put('/:homeId', controller.alterStudentHome)

// TODO - studenten filter lijst


// router.get('/studenthome', controller.showStudentHomes)

module.exports = router