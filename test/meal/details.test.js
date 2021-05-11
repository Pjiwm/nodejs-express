process.env.PORT = 3001
process.env.NODE_ENV = "testing"

const chai = require("chai")
const chaiHttp = require('chai-http')
const database = require('../../src/dao/home.database')
const app = require("../../server")

chai.use(chaiHttp)

describe('UC-304 Details van een maaltijd opvragen', function () {
    beforeEach(function () {
        database.db = []
    })

    it('TC-303-1 Lijst van maaltijden geretourneerd', function () {
        database.seed(1)
        chai
            .request(app)
            .get("/api/studenthome/1/meal")
            .end(function (err, response) {
                chai.expect(response).to.have.header('content-type', /json/)
                chai.expect(response).status(200)
            })
    })



})