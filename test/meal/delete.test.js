process.env.PORT = 3001
process.env.NODE_ENV = "testing";

const chai = require("chai")
const chaiHttp = require('chai-http')
const database = require('../../src/dao/home.database')
const app = require("../../server")

chai.use(chaiHttp)

describe('UC-305 Maaltijd verwijderen', function () {
    beforeEach(function () {
        database.db = [];
    })
/*
* No data is sent when deleting. Therefore test case: TC-305-1 Verplicht veld ontbreekt
* From the document will be replaced with: TC-305-1 studentenhuis bestaat niet.
*/
    it('TC-305-1 studentenhuis bestaat niet', function () {
        database.seed(1)
        chai
            .request(app)
            .delete("/api/studenthome/2/meal/1")
            .end(function (err, response) {
                chai.expect(response).to.have.header('content-type', /json/)
                chai.expect(response).status(404)
            })
    })

    it('TC-305-4 Maaltijd bestaat niet', function () {
        database.seed(1)
        chai
            .request(app)
            .delete("/api/studenthome/1/meal/2")
            .end(function (err, response) {
                chai.expect(response).to.have.header('content-type', /json/)
                chai.expect(response).status(404)
            })
    })

    it('TC-305-5 Maaltijd succesvol verwijderd ', function () {
        database.seed(1)
        chai
            .request(app)
            .delete("/api/studenthome/1/meal/1")
            .end(function (err, response) {
                chai.expect(response).to.have.header('content-type', /json/)
                chai.expect(response).status(200)
            })
    })




})