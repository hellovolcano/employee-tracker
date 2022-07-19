const inquirer = require('inquirer')
const DbQuery = require('./queries')
const db = require('../db/connection')

function getDepartmentNames() {
    const sql = `SELECT department.name FROM department ORDER BY name`
    const deptNames = []
    db.promise().query(sql, (err, rows) => {
        if (err) {
            console.log(`Error: ${err.message}`)
            return
        }
        // for each key/value in the rows returned, push just the name of the dept as a string into an array to return
        rows.forEach( row => {
            deptNames.push(row.name)
        })

        console.log(`in queries.js db.query: ${deptNames} \n`)
        // return deptNames
    })
        
    // console.log(`In queries.js outside db.query ${deptNames} \n`) 
    return deptNames
}

// Display the default menu
const initiateMenu = () => {
    inquirer
        .prompt({
            type:'list',
            name: 'selection',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department','Add a role','Add an employee','Update an employee role','Quit']
        })
        .then(({ selection }) => {
            actionMenu(selection)
        })
}

const actionMenu = (selection) => {
    const dbQuery = new DbQuery()
            

            if (selection === 'View all departments') {
                dbQuery.viewDepartments()
            } else if (selection === 'View all roles') {
                dbQuery.viewRoles()
            } else if (selection === 'View all employees') {
                dbQuery.viewEmployees()
            } else if (selection === 'Add a department') {
                inquirer
                    .prompt([
                        {
                            type: 'input',
                            name: 'name',
                            message: 'What is the name of the department?'
                        }
                    ])
                .then(deptInfo => {
                    dbQuery.addDepartment(deptInfo)
                })
            } else if (selection === 'Add a role') {
                inquirer
                    .prompt([
                        {
                            type:'input',
                            name: 'title',
                            message: 'What is the name of the role?'
                        },
                        {
                            type: 'input',
                            name: 'salary',
                            message: 'What is the salary of the role?'
                        },
                        {
                            type: 'input',
                            name: 'department',
                            message: 'Which department (ID) does the role belong to?'
                        }
                    ])
                    .then(roleData => {
                        dbQuery.addRole(roleData)
                    })
            } else if(selection === 'Add an employee') {
                inquirer
                    .prompt([
                        {
                            type: 'input',
                            name: 'firstName',
                            message: "What is the employee's first name?"
                        },
                        {
                            type: 'input',
                            name: 'lastName',
                            message: "What is the employee's last name?"
                        },
                        {
                            type: 'input',
                            name: 'role',
                            message: 'What is the role of the employee?'
                        }
                    ])
                    .then(employeeInfo => {
                        dbQuery.addEmployee(employeeInfo)

                        // initiateMenu()
                    })
                    .then(result => {
                        console.log (result)
                        if (result === undefined) {
                            
                            console.log("Error")
                            return
                        }

                    })
            } else if (selection === 'Update an employee role') {
                inquirer
                    .prompt([
                        {
                            type: 'input',
                            name: 'id',
                            message: 'Which employee (ID) do you want to update?'
                        },
                        {
                            type: 'input',
                            name: 'role_id',
                            message: 'Which role (ID) do you want to set?'
                        }
                    ])
                    .then (empRole => {
                        dbQuery.updateEmployeeRole(empRole)
                    })
                
            } else {
                return selection
            }
}

module.exports = initiateMenu, actionMenu