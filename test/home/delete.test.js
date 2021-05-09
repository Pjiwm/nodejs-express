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

describe('UC-204 Studentenhuis verwijderen', function () {
    beforeEach(function () {
        database.db = [];
    })


    it('TC-205-1 Studentenhuis bestaat niet', function () {
        database.seed(1)
        chai
            .request(app)
            .delete("/api/studenthome/2")
            .end(function (err, response) {
                chai.expect(response).to.have.header('content-type', /json/)
                chai.expect(response).status(404)
            })
    })

    it('TC-205-4 Studentenhuis succesvol verwijderd', function () {
        database.seed(1)
        chai
            .request(app)
            .delete("/api/studenthome/1")
            .end(function (err, response) {
                chai.expect(response).to.have.header('content-type', /json/)
                chai.expect(response).status(200)
            })
    })

})