const mysql = require('mysql2/promise')
require('dotenv').config()

class Database {
    constructor() {
        this._connection
    }

    connect() {
        console.log("hi")
        console.log(process.env.DB_HOST)
        this._connection = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            database: process.env.DB_DATABASE,
            password: process.env.DB_PASSWORD
        })
    }

    async execute(query, stmts) {
        const [rows, fields] = await this._connection.query(query, stmts)
        return rows
    }

    disconnect() {
        this._connection.end()
    }
}

module.exports = new Database()