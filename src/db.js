const { Pool } = require('pg')

const pool = new Pool({
    password: "123852",
    database: "university",
    port: 5433,
    host: "localhost",
    user: 'postgres'
})

module.exports = pool