const initiateMenu = require('./Menu')
const db = require('../db/connection')

class DbQuery {
    viewDepartments() {
        const sql = `SELECT * FROM department`

        db.query(sql, (err, rows) => {
            if (err) {
                console.log(`Error: ${err.message}`)
                return
            }

            console.log(rows)
        })
    }
    viewRoles() {
        const sql = `SELECT * FROM roles`

        db.query(sql, (err, rows)=> {
            if (err) {
                console.log(`Error: ${err.message}`)
                return
            }
            console.log(rows)
        })

        
    }
    viewEmployees() {
        const sql = `SELECT * FROM employee
                     LEFT JOIN roles
                     ON employee.role_id = roles.id
        `

        db.query(sql, (err, rows) => {
            if (err) {
                console.log(`Error: ${err.message}`)
                return
            }
            console.log(rows)
        })
    }
    addDepartment() {
        console.log("Add Department")
    }
    addRole() {
        console.log("Add role")
    }
    addEmployee() {
        console.log("Add employee")
    }
    updateEmployeeRole() {
        console.log("Update employee role")
    }
}

module.exports = DbQuery