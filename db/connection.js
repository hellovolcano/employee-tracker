const mysql = require('mysql2')

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL User Name
        user: 'root',
        // PW
        password: 'pw_class',
        database: 'employee_tracker'
    }
)

module.exports = db