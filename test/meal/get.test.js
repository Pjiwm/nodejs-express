process.env.PORT = 3001
process.env.NODE_ENV = "testing";

const chai = require("chai")
const chaiHttp = require('chai-http')
const database = require('../../src/dao/home.database')
const app = require("../../server")

chai.use(chaiHttp)

describe('UC-303 Lijst van maaltijden opvragen', function () {
    beforeEach(function () {
        database.db = [];
    })

    it('TC-304-1 Maaltijd bestaat niet', function () {
        database.seed(1)
        chai
            .request(app)
            .get("/api/studenthome/1/meal/2")
            .end(function (err, response) {
                chai.expect(response).to.have.header('content-type', /json/)
                chai.expect(response).status(404)
            })
    })

    it('C-304-2 Details van maaltijd geretourneerd', function () {
        database.seed(1)
        chai
            .request(app)
            .get("/api/studenthome/1/meal/1")
            .end(function (err, response) {
                chai.expect(response).to.have.header('content-type', /json/)
                chai.expect(response).status(200)
            })
    })



})