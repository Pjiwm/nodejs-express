process.env.PORT = 3001
process.env.NODE_ENV = "testing"

const chai = require("chai")
const chaiHttp = require('chai-http')
const app = require("../../server")
const seeder = require("../../src/helpers/seed")
require('dotenv').config()
chai.use(chaiHttp)


describe('UC-204 Studentenhuis verwijderen', function () {
    beforeEach(async function () {
        await seeder.wipeData()
    })


    it('TC-205-1 Studentenhuis bestaat niet', function () {
        chai
            .request(app)
            .delete("/api/studenthome/2")
            .set("Authentication", `Bearer ${process.env.JWT_TOKEN}`)
            .end(async function (err, response) {
                chai.expect(response).to.have.header('content-type', /json/)
                chai.expect(response).status(404)
            })
    })

    it('TC-205-4 Studentenhuis succesvol verwijderd', function () {
        // TODO zeer gers deze werkt alleen zonder await en async?
        chai
            .request(app)
            .delete("/api/studenthome/1")
            .set("Authentication", `Bearer ${process.env.JWT_TOKEN}`)
            .end(async function (err, response) {
                chai.expect(response).to.have.header('content-type', /json/)
                chai.expect(response).status(200)
            })
    })

})