const express = require('express')
const logger = require('tracer').colorConsole()
const app = express()
let database = require('../dao/studenthome.database')

let controller = {
    showStudentHomes(req, res) {
        res.status(200).json(database.db).end()
        logger.info('called all: GET studenthomes')
    },
    updateMeal(req, res) {

    },

    getMeal(req, res) {

    },

    getMealDetails(req, res) {

    },

    deleteMeal(req, res) {

    }

}

module.exports = controller