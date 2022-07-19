const db = require('../db/connection')
const initiateMenu  = require('./Menu')

class DbQuery {
    viewDepartments() {
        const sql = `SELECT * FROM department ORDER BY name `

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
            console.log(
                `
                ===========================
                ${rows}
                ===========================`)

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
    addDepartment(input) {
        const sql = `INSERT INTO department (name)
                        VALUES (?)
        `
        // Sample object data for development
        const dept = [ input.name ]

        db.query(sql, dept, (err, result) => {
            if (err) {
                console.log(`Error: ${err.message}`)
                return
            }
            console.log(` Successfully added department
                        ${result}`)
        })
    }
    addRole(role) {
        const sql = `INSERT INTO roles (title, salary, department_id)
                    VALUES (?,?,?)`
        // Sample object data for dev
        const roleArr = [role.title,role.salary,role.department]

        db.query(sql, roleArr, (err, result) => {
            if (err) {
                console.log(err.message)
                return
            }
            console.log(`Successfully added role
                    ${result}  `)
        })
    }
    addEmployee(employee) {
        const sql = `INSERT INTO employee (first_name, last_name, role_id)
                    VALUES (?,?,?)`
        const params = [ employee.firstName, employee.lastName, employee.role]

        db.query(sql, params, (err, result) => {
            if (err) {
                console.log(err.message)
                return
            }

            console.log( `Employee added
                        ${result}`)

                        return result         
        })
    }
        
    updateEmployeeRole(empRole) {
        const sql = `UPDATE employee SET role_id = ? WHERE id = ?`
        const params = [empRole.role_id, empRole.id]

        db.query(sql, params, (err, result) => {
            if (err) {
                console.log(err.message)
                return
            }

            console.log(`${result}`)
         
        })
    }
}

module.exports = DbQuery