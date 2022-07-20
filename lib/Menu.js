const inquirer = require('inquirer')
// const { viewRoles, viewDepartments } = require('./queries')
const db = require('../db/connection')
const cTable = require('console.table')

// let deptsss = []

// const getDepartmentNames = async (data) => {
//     const sql = `SELECT department.name FROM department ORDER BY name`

//     const deptNames = await db.query(sql)
//         // for each key/value in the rows returned, push just the name of the dept as a string into an array to return
    
//     const deptsList = []
//     deptNames.forEach(item => {
//         deptsList.push(item.name)
//     })
        

//     deptsss = deptsList
// }

// Display the default menu
const initiateMenu = () => {
    inquirer
        .prompt({
            type:'list',
            name: 'selection',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department','Add a role','Add an employee','Update an employee role','Quit']
        })
        .then(initAction => {

            if (initAction.selection === 'View all departments') {
                console.log('             ')
                viewDepartments()
            } else if (initAction.selection === 'View all roles') {
                viewRoles()
            } else if (initAction.selection === 'View all employees') {
                viewEmployees()
            } else if (initAction.selection === 'Add a department') {
                inquirer
                    .prompt([
                        {
                            type: 'input',
                            name: 'name',
                            message: 'What is the name of the department?'
                        }
                    ])
                .then(deptInfo => {
                    addDepartment(deptInfo)

                })
            } else if (initAction.selection === 'Add a role') {
                addRole()

                // inquirer
                //     .prompt([
                //         {
                //             type:'input',
                //             name: 'title',
                //             message: 'What is the name of the role?'
                //         },
                //         {
                //             type: 'input',
                //             name: 'salary',
                //             message: 'What is the salary of the role?'
                //         },
                //         {
                //             type: 'input',
                //             name: 'department',
                //             message: 'Which department (ID) does the role belong to?'
                //         }
                //     ])
                //     .then(roleData => {
                //         addRole(roleData)

                //     }) 
                
            } else if(initAction.selection === 'Add an employee') {
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
                        addEmployee(employeeInfo)

                    })
            } else if (initAction.selection === 'Update an employee role') {
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
                        updateEmployeeRole(empRole)
                    })
                
            } else {
                process.exit()
            }
                })
}

// View all departments
const viewDepartments = async() => {
    const sql = `SELECT * FROM department ORDER BY name `

    const deptArr = await db.query(sql)

    console.table(deptArr)

    initiateMenu()

}
      
// View all roles
const viewRoles = async() => {
    const sql = `SELECT 
                    roles.id,
                    roles.title,
                    department.name AS department,
                    roles.salary
                FROM roles
                LEFT JOIN department
                ON roles.department_id = department.id`

    const rolesArr = await db.query(sql)
    console.table(rolesArr)    
    
    initiateMenu()
}

// View all employees
const viewEmployees = async() => {
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

    const empArr = await db.query(sql)
    console.table(empArr)

    initiateMenu()
}

//Add department
const addDepartment = async(input) => {
    const sql = `INSERT INTO department (name)
                    VALUES (?)
    `
    // Sample object data for development
    const dept = [ input.name ]

    await db.query(sql, input.name)
    
    console.log(`${input.name} added!`)

    initiateMenu()


}

// Add role
const addRole = async() => {
    // get the list of departments for the list
    const depts = await db.query(`SELECT department.name, department.id AS value FROM department ORDER BY name`)
 
    await inquirer
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
                            type: 'list',
                            name: 'department',
                            message: 'Which department does the role belong to?',
                            choices: depts
                        }
                    ])
                    .then(roleData => {

                        // Build and return the array that we need from the inquirer prompt
                        const roleArr = [roleData.title,roleData.salary,roleData.department]
                        return roleArr


                    })
                    .then(roleArr => {
                        // build the sql query with the array we need
                        const sql = `INSERT INTO roles (title, salary, department_id)
                                    VALUES (?,?,?)`
                        db.query(sql,roleArr)

                        // display the initial menu again
                        initiateMenu()
                    })


    
}

// Add employee
const addEmployee = async(employee) => {
    const sql = `INSERT INTO employee (first_name, last_name, role_id)
                VALUES (?,?,?)`
    const params = [ employee.firstName, employee.lastName, employee.role]

    await db.query(sql, params)

    console.log(`Success!`)

    initiateMenu()
}

// Update employee's role
const updateEmployeeRole = async(empRole) => {
    const sql = `UPDATE employee SET role_id = ? WHERE id = ?`
    const params = [empRole.role_id, empRole.id]

    await db.query(sql, params)

    console.log(`Success!`)

    initiateMenu()
}

module.exports = { initiateMenu }