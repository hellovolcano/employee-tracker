const initiateMenu = require('./Menu')
const db = require('../db/connection')

class DbQuery {
    viewDepartments() {
        const sql = `SELECT * FROM department ORDER BY name`

        db.query(sql, (err, rows) => {
            if (err) {
                console.log(`Error: ${err.message}`)
                return
            }

            console.log(rows)
        })
    }
    viewRoles() {
        const sql = `SELECT 
                        roles.id,
                        roles.title,
                        department.name AS department,
                        roles.salary
                    FROM roles
                    LEFT JOIN department
                    ON roles.department_id = department.id`

        db.query(sql, (err, rows)=> {
            if (err) {
                console.log(`Error: ${err.message}`)
                return
            }
            console.log(rows)
        })
    }
    viewEmployees() {
        const sql = `SELECT
                        employee.id, 
                        employee.first_name, 
                        employee.last_name,
                        roles.title,
                        department.name AS department,
                        roles.salary
                     FROM employee
                     LEFT JOIN roles
                     ON employee.role_id = roles.id
                     LEFT JOIN department
                     ON roles.department_id = department.id
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
        const sql = `INSERT INTO department (name)
                        VALUES (?)
        `
        // Sample object data for development
        const dept = [ 'Tech Comm' ]

        db.query(sql, dept, (err, result) => {
            if (err) {
                console.log(`Error: ${err.message}`)
            }
            console.log(` Successfully added department
                        ${result}`)
        })
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