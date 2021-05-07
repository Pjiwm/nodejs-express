
process.env.PORT = 3001
process.env.NODE_ENV = "testing";

const chai = require("chai")
const chaiHttp = require('chai-http')
const database = require('../../src/dao/home.database')

const logger = require("../../src/helpers/log")

const app = require("../../server")

chai.use(chaiHttp)

describe('UC-202 Overzicht van studentenhuizen', function () {
    beforeEach(function () {
        database.db = [];
    })

    it('TC-202-1 Toon nul studentenhuizen', function () {
        chai
            .request(app)
            .get("/api/studenthome")
            .end(function (err, response) {
                chai.expect(response).to.have.header('content-type', /json/)
                chai.expect(response.body).length(0)
                chai.expect(response).status(200)
            })
    })

    it('TC-202-2 Toon twee studentenhuizen ', function () {
        database.seed(2, { "city": "same-city" })

        chai
            .request(app)
            .get("/api/studenthome")
            .end(function (err, response) {
                chai.expect(response).to.have.header('content-type', /json/)
                chai.expect(response.body).length(2)
                chai.expect(response).status(200)
            })
    })

    it('TC-202-3 Toon studentenhuizen met zoekterm op niet-bestaande stad', function () {
        chai
            .request(app)
            .get("/api/studenthome?city=non-existing-city")
            .end(function (err, response) {
                chai.expect(response).to.have.header('content-type', /json/)
                chai.expect(response).status(404)
            })
    })

    it('TC-202-4 Toon studentenhuizen met zoekterm op niet - bestaande naam', function () {
        chai
            .request(app)
            .get("/api/studenthome?name=non-existing-name")
            .end(function (err, response) {
                chai.expect(response).to.have.header('content-type', /json/)
                chai.expect(response).status(404)
            })
    })

    it('TC-202-5 Toon studentenhuizen met zoekterm op bestaande stad', function () {
        database.seed(2, { "city": "same-city" })

        chai
            .request(app)
            .get("/api/studenthome?city=same-city")
            .end(function (err, response) {
                chai.expect(response).to.have.header('content-type', /json/)
                chai.expect(response).status(200)
                chai.expect(response.body.length).greaterThan(0)
            })
    })

    it('TC-202-6 Toon studentenhuizen met zoekterm op bestaande naam', function () {
        database.seed(2, {"name": "same-name"})
        chai
            .request(app)
            .get("/api/studenthome?name=same-name")
            .end(function (err, response) {
                chai.expect(response).to.have.header('content-type', /json/)
                chai.expect(response).status(200)
                chai.expect(response.body.length).greaterThan(0)
            })
    })
})