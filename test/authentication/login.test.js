process.env.PORT = 3001
process.env.NODE_ENV = "testing"

const chai = require("chai")
const chaiHttp = require('chai-http')
const app = require("../../server")
require('dotenv').config()

chai.use(chaiHttp)

describe('UC-102 Login', function () {

    it('TC-102-1 Verplicht veld ontbreekt', function () {
        chai
            .request(app)
            .post("/api/auth/login")
            .send({
                "password": "password"
            })
            .end(async function (err, response) {
                chai.expect(response).to.have.header('content-type', /json/)
                chai.expect(response).status(400)
            })
    })

    it('TC-102-2 Invalide email adres', function () {
        chai
            .request(app)
            .post("/api/auth/register")
            .send({
                "email": "t.com",
                "password": "password"
            })
            .end(async function (err, response) {
                chai.expect(response).to.have.header('content-type', /json/)
                chai.expect(response).status(400)
            })
    })

    it('TC-102-3 Invalide wachtwoord', function () {
        chai
            .request(app)
            .post("/api/auth/register")
            .send({
                "email": "adam@thetester.com",
                "password": 0000
            })
            .end(async function (err, response) {
                chai.expect(response).to.have.header('content-type', /json/)
                chai.expect(response).status(400)
            })
    })

    it('TC-102-4 Gebruiker bestaat niet', function () {
        chai
            .request(app)
            .post("/api/auth/register")
            .send({
                "email": "Fake_adam@thetester.com",
                "password": "I do not exist"
            })
            .end(async function (err, response) {
                chai.expect(response).to.have.header('content-type', /json/)
                chai.expect(response).status(400)
            })
    })

    it('TC-102-5 Gebruiker succesvol ingelogd', function () {
        chai
            .request(app)
            .post("/api/auth/register")
            .send({
                "email": "adam@thetester.com",
                "password": "password"
            })
            .end(async function (err, response) {
                chai.expect(response).to.have.header('content-type', /json/)
                chai.expect(response).status(200)
            })
    })

})