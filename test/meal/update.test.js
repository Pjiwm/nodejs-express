process.env.PORT = 3001
process.env.NODE_ENV = "testing";

const chai = require("chai")
const chaiHttp = require('chai-http')
const database = require('../../src/dao/home.database')

const logger = require("../../src/helpers/log")

const app = require("../../server")

chai.use(chaiHttp)
const fakeData = {
    "name": "frkandels",
    "description": "snack",
    "creationDate": "20-11-2020",
    "serveDate": "21-11-2020",
    "price": "€29,-",
    "allergy": "contains curry",
    "ingredients": ["meat", "curry"]
}

describe('UC-302 Maaltijd wijzigen', function () {
    beforeEach(function () {
        database.db = [];
    })

    it('TC-302-1 Verplicht veld ontbreekt', function () {
        database.seed(1)
        chai
            .request(app)
            .put("/api/studenthome/1/meal/1")
            .send({
                "name": "frkandels",
                "description": "snack",
                "creationDate": "20-11-2020",
                "serveDate": "21-11-2020",
                // "price": "€29,-",
                "allergy": "contains curry",
                "ingredients": ["meat", "curry"]
            })
            .end(function (err, response) {
                chai.expect(response).to.have.header('content-type', /json/)
                chai.expect(response).status(400)
            })
    })

    it('TC-302-4 Maaltijd bestaat niet', function () {
        database.seed(1)
        chai
            .request(app)
            .put("/api/studenthome/1/meal/2")
            .send(fakeData)
            .end(function (err, response) {
                chai.expect(response).to.have.header('content-type', /json/)
                chai.expect(response).status(404)
            })
    })

    it('TC-302-5 Maaltijd succesvol gewijzigd ', function () {
        database.seed(1)
        chai
            .request(app)
            .put("/api/studenthome/1/meal/1")
            .send(fakeData)
            .end(function (err, response) {
                chai.expect(response).to.have.header('content-type', /json/)
                chai.expect(response).status(200)
            })
    })





})