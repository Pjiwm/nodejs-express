process.env.PORT = 3001
process.env.NODE_ENV = "testing";

const chai = require("chai")
const chaiHttp = require('chai-http')
const database = require('../../src/dao/home.database')

const logger = require("../../src/helpers/log")

const app = require("../../server")

chai.use(chaiHttp)

describe('UC-203 Details van studentenhuis', function () {
    beforeEach(function () {
        database.db = [];
    })

    it('TC-203-1 Studentenhuis-ID bestaat niet', function () {
        database.seed(10)
        chai
            .request(app)
            .get("/api/studenthome/11")
            .end(function (err, response) {
                chai.expect(response).to.have.header('content-type', /json/)
                chai.expect(response).status(404)
            })
    })

    it('TC-203-2 Studentenhuis-ID bestaat', function () {
        database.seed(1)
        chai
            .request(app)
            .get("/api/studenthome/1")
            .end(function (err, response) {
                chai.expect(response).to.have.header('content-type', /json/)
                chai.expect(response.body).length(1)
                chai.expect(response).status(200)
            })
    })

})