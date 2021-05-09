process.env.PORT = 3001
process.env.NODE_ENV = "testing";

const chai = require("chai")
const chaiHttp = require('chai-http')
const database = require('../../src/dao/home.database')
const faker = require('faker/locale/nl')

const logger = require("../../src/helpers/log")

const app = require("../../server")

chai.use(chaiHttp)

const fakeData = {
    "name": faker.lorem.word(),
    "city": faker.address.city(),
    "phoneNumber": faker.phone.phoneNumber("06########"),
    "zipcode": faker.address.zipCode("####??"),
    "street": faker.address.streetName(),
    "streetNumber": faker.datatype.number()
}

describe('UC-204 Studentenhuis wijzigen', function () {
    beforeEach(function () {
        database.db = [];
    })

    it('TC-204-1 Verplicht veld ontbreekt', function () {
        database.seed(1)
        chai
            .request(app)
            .put("/api/studenthome/1")
            .send({
                "name": faker.lorem.word(),
                "city": faker.address.city(),
                "zipcode": faker.address.zipCode("####??"),
                "street": faker.address.streetName(),
                "streetNumber": faker.datatype.number()
            })
            .end(function (err, response) {
                chai.expect(response).to.have.header('content-type', /json/)
                chai.expect(response).status(404)
            })
    })

    it('TC-204-2 Invalide postcode', function () {
        database.seed(1)
        chai
            .request(app)
            .put("/api/studenthome/1")
            .send({
                "name": faker.lorem.word(),
                "city": faker.address.city(),
                "phoneNumber": faker.phone.phoneNumber("06########"),
                "zipcode": "666",
                "street": faker.address.streetName(),
                "streetNumber": faker.datatype.number()
            })
            .end(function (err, response) {
                chai.expect(response).to.have.header('content-type', /json/)
                chai.expect(response).status(400)
            })
    })

    it('TC-204-3 Invalide telefoonnummer', function () {
        database.seed(1)
        chai
            .request(app)
            .put("/api/studenthome/1")
            .send({
                "name": faker.lorem.word(),
                "city": faker.address.city(),
                "phoneNumber": "123456",
                "zipcode": faker.address.zipCode("####??"),
                "street": faker.address.streetName(),
                "streetNumber": faker.datatype.number()
            })
            .end(function (err, response) {
                chai.expect(response).to.have.header('content-type', /json/)
                chai.expect(response).status(400)
            })
    })

    it('TC-204-4 Studentenhuis bestaat niet', function () {
        database.seed(1)
        chai
            .request(app)
            .put("/api/studenthome/2")
            .send(fakeData)
            .end(function (err, response) {
                chai.expect(response).to.have.header('content-type', /json/)
                chai.expect(response).status(404)
            })
    })

    it('TC-204-6 Studentenhuis succesvol gewijzigd', function () {
        database.seed(1)
        chai
            .request(app)
            .put("/api/studenthome/1")
            .send(fakeData)
            .end(function (err, response) {
                chai.expect(response).to.have.header('content-type', /json/)
                chai.expect(response).status(200)
            })
    })

})