const mysql = require('mysql2/promise')

class Database {
    constructor() {
        this._connection
    }

    connect() {
        console.log("hi")
        this._connection = mysql.createPool({
            host: 'samen_eten_mariadb',
            user: 'root',
            database: 'studenthome',
            password: '1337'
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