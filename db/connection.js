const mysql = require('mysql2')
const util = require('util')

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'pw_class',
        database: 'employee_tracker'
    }
)

db.query = util.promisify(db.query)

// Connect to database
// const db = mysql.createConnection(
//     {
//         host: 'localhost',
//         // MySQL User Name
//         user: 'root',
//         // PW
//         password: 'pw_class',
//         database: 'employee_tracker'
//     }
// )

module.exports = db
// async function example() {
//     const [rows] = await conn.query(`SELECT * FROM department ORDER BY name`)
//     console.table(rows)
//     await conn.end()

// }

// example()