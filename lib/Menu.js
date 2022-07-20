const inquirer = require('inquirer')
const db = require('../db/connection')
const cTable = require('console.table')

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
                // adding a console spacer -- probably a better way to do this
                console.log('             ')
                viewDepartments()
            } else if (initAction.selection === 'View all roles') {
                console.log('             ')
                viewRoles()
            } else if (initAction.selection === 'View all employees') {
                console.log('             ')
                viewEmployees()
            } else if (initAction.selection === 'Add a department') {
                console.log('             ')
                addDepartment()
            } else if (initAction.selection === 'Add a role') {
                console.log('             ')
                addRole()             
            } else if(initAction.selection === 'Add an employee') {
                console.log('             ')
                addEmployee()
            } else if (initAction.selection === 'Update an employee role') {
                console.log('             ')
                 updateEmployeeRole()               
            } else {
                console.log(`Bye!`)
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
                ON roles.department_id = department.id
                ORDER BY title`

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
                    roles.salary, 
                    CONCAT(mgr.first_name, " ", mgr.last_name) AS manager 
                FROM employee 
                LEFT JOIN roles ON employee.role_id = roles.id 
                LEFT JOIN department ON roles.department_id = department.id 
                LEFT JOIN employee mgr ON employee.manager_id = mgr.id;
    `

    const empArr = await db.query(sql)

    console.table(empArr)

    initiateMenu()
}

//Add department
const addDepartment = async(input) => {
    await inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is the name of the department?'
            }
        ])
    .then(deptInfo => {
        // Might be overkill, but mirroring the structure of other functions
        // Build and return params
        const params = [ deptInfo.name ]
        return params
    })
    .then(params => {
        const sql = `INSERT INTO department (name)
                    VALUES (?)
        `
        db.query(sql, params)
        
        console.log(`Success! ${params} added!`)

        initiateMenu()
    })

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

                        console.log(`Success! Added a role.`)

                        // display the initial menu again
                        initiateMenu()
                    })


    
}

// Add employee
const addEmployee = async() => {
    // get the list of roles for the inquirer list
    const roles = await db.query(`SELECT roles.title AS name, roles.id AS value FROM roles ORDER BY name`)
    const employees = await db.query(`SELECT CONCAT(first_name, " ", last_name) AS name, id AS value FROM employee ORDER BY name`)
    employees.push({ name: 'None', value: '0'})

    await inquirer
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
                            type: 'list',
                            name: 'role',
                            message: "What is the employee's role?",
                            choices: roles
                        },
                        {
                            type: 'list',
                            name: 'manager',
                            message: "Who is the employee's manager?",
                            choices: employees
                        }
                    ])
                    .then(empData => {
                        //Build and return params array we need
                        const params = [ empData.firstName, empData.lastName, empData.role, empData.manager]
                        return params
                    })
                    .then(params => {
                        // initialize the sql query variable
                        let sql = ``

                        // check to see if they selected "none" for manager
                        if (params[3] == 0) {

                            // remove the last value of the parameters array and remove the column & value from the query
                            params.pop()
                            sql = `INSERT INTO employee (first_name, last_name, role_id)
                                        VALUES (?,?,?)`
                        } else {
                            sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                                            VALUES (?,?,?,?)`
                        }  
                        db.query(sql, params)

                        console.log(`Success: added an employee!`)

                        initiateMenu()
                    })

}

// Update employee's role
const updateEmployeeRole = async(empRole) => {
    // get the list of employee names + id as value for the choices list
    const employees = await db.query(`SELECT CONCAT(first_name, " ", last_name) AS name, id AS value FROM employee ORDER BY name`)
    const roles = await db.query(`SELECT title AS name, id AS value FROM roles ORDER BY name`)

    await inquirer
        .prompt([
            {
                type: 'list',
                name: 'id',
                message: "Which employee's role do you want to update?",
                choices: employees
            },
            {
                type: 'list',
                name: 'role_id',
                message: "What is the employee's new role?",
                choices: roles
            }
        ])
        .then(empRoleData => {
            // Build and return params
            const params = [empRoleData.role_id, empRoleData.id]
            return params

        })
        .then(params => {
            const sql = `UPDATE employee SET role_id = ? WHERE id = ?`
            db.query(sql, params)

            console.log(`Success! Updated employee role`)

            initiateMenu()
        })
}

module.exports = { initiateMenu }