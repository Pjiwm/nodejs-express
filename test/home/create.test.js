process.env.PORT = 3001
process.env.NODE_ENV = "testing";

const chai = require("chai")
const chaiHttp = require('chai-http')
const faker  = require('faker/locale/nl')
const logger =  require("../../src/helpers/log")
const app = require("../../server");
const { random } = require("faker/locale/nl");

chai.use(chaiHttp)
faker.seed(1236)
const fakeData = {
    "name": faker.lorem.word(),
    "city": faker.address.city(),
    "phoneNumber": faker.phone.phoneNumber("06########"),
    "zipcode": faker.address.zipCode("####??"),
    "street": faker.address.streetName(),
    "streetNumber": faker.datatype.number()
}
/*  
*   unlike other test files the tests for POST requests do not clean the database,
*   since no data is required to test.
*/ 

describe('UC-201 Maak studentenhuis', function () {

    it('TC-201-1 Verplicht veld ontbreekt', function () {
        chai
            .request(app)
            .post("/api/studenthome")
            .send({
                "name": faker.lorem.word() + "-unique",
                "city": faker.address.city(),
                "zipcode": faker.address.zipCode("####??"),
                "street": faker.address.streetName(),
                "streetNumber": faker.datatype.number()
            })
            .end(function (err, response) {
                chai.expect(response).to.have.header('content-type', /json/)
                chai.expect(response).status(400)
            })
    })

    it('TC-201-2 Invalide postcode', function () {
        chai
            .request(app)
            .post("/api/studenthome")
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

    it('TC-201-3 Invalide telefoonnummer', function () {
        chai
            .request(app)
            .post("/api/studenthome")
            .send({
                "name": faker.lorem.word(),
                "city": faker.address.city(),
                "phoneNumber":"666",
                "zipcode": faker.address.zipCode("####??"),
                "street": faker.address.streetName(),
                "streetNumber": faker.datatype.number()
            })
            .end(function (err, response) {
                chai.expect(response).to.have.header('content-type', /json/)
                chai.expect(response).status(400)
            })
    })

    it('TC-201-6 Studentenhuis succesvol toegevoegd', function () {
        chai
            .request(app)
            .post("/api/studenthome")
            .send(fakeData)
            .end(function (err, response) {
                chai.expect(response).to.have.header('content-type', /json/)
                chai.expect(response).status(200)
            })
    })

    it('TC-201-4 Studentenhuis bestaat al', function () {
        chai
            .request(app)
            .post("/api/studenthome")
            .send(fakeData)
            .end(function (err, response) {
                chai.expect(response).to.have.header('content-type', /json/)
                chai.expect(response).status(400)
            })
    })
})