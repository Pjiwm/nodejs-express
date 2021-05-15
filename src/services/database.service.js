const logger = require("../helpers/log")
const mysql = require('mysql2/promise')
require('dotenv').config()

class Database {
    constructor() {
        this._connection
    }

    connect() {
        logger.info(`connecting to: ${process.env.DB_DATABASE}`)
        this._connection = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            database: process.env.DB_DATABASE,
            password: process.env.DB_PASSWORD
        })
    }

    async execute(query, stmts) {
        // TODO sonar - remove fields
        const [rows, fields] = await this._connection.query(query, stmts)
        return rows
    }

    disconnect() {
        // TODO sonar - this part is unused
        this._connection.end()
    }
}

module.exports = new Database()