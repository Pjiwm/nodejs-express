
process.env.PORT = 3001
process.env.NODE_ENV = "testing"

const chai = require("chai")
const chaiHttp = require('chai-http')
const app = require("../../server")
const seeder = require("../../src/helpers/seed")
const home = require("../../src/services/home.service")

const homeBody = {
    name: "same-name",
    street: "same-street",
    streetNumber: 5,
    userId: 1,
    zipcode: "1234TT",
    phoneNumber: "0612345678",
    city: "same-city"
}
require('dotenv').config()
chai.use(chaiHttp)

describe('UC-202 Overzicht van studentenhuizen', function () {
    beforeEach(async function () {
        // await seeder.wipeData()
        await home.create(homeBody)
        await home.create({ ...homeBody, streetNumber: 7, zipcode: "4321BA"})

    })

    it('TC-202-1 Toon nul studentenhuizen', async function () {
        await seeder.wipeData()
        chai
            .request(app)
            .get("/api/studenthome")
            .end(async function (err, response) {
                chai.expect(response).to.have.header('content-type', /json/)
                chai.expect(response.body).length(0)
                chai.expect(response).status(200)
            })
    })

    it('TC-202-2 Toon twee studentenhuizen ', function () {

        chai
            .request(app)
            .get("/api/studenthome")
            .end(async function (err, response) {
                chai.expect(response).to.have.header('content-type', /json/)
                chai.expect(response.body).length(2)
                chai.expect(response).status(200)
            })
    })
// TODO werkt nog niet - console logt niks met async en zonder???
    it('TC-202-3 Toon studentenhuizen met zoekterm op niet-bestaande stad', function () {
        
        chai
            .request(app)
            .get("/api/studenthome?city=non-existing-city-frefsdfdsfsf")
            .end(function (err, response) {
                console.log(1)
                console.log(response)
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

        chai
            .request(app)
            .get("/api/studenthome?city=same-city")
            .end(async function (err, response) {
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
            .end(async function (err, response) {
                chai.expect(response).to.have.header('content-type', /json/)
                chai.expect(response).status(200)
                chai.expect(response.body.length).greaterThan(0)
            })
    })
})