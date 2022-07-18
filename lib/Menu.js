const inquirer = require('inquirer')
const DbQuery = require('./queries')

// Display the default menu
const initiateMenu = () => {
    inquirer
        .prompt({
            type:'list',
            name: 'selection',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department','Add a role','Add an employee','Update an employee role']
        })
        .then(({ selection }) => {
            const dbQuery = new DbQuery()

            if (selection === 'View all departments') {
                dbQuery.viewDepartments()
            } else if (selection === 'View all roles') {
                dbQuery.viewRoles()
            } else if (selection === 'View all employees') {
                dbQuery.viewEmployees()
            } else if (selection === 'Add a department') {
                dbQuery.addDepartment()
            } else if (selection === 'Add a role') {
                dbQuery.addRole()
            } else if(selection === 'Add an employee') {
                dbQuery.addEmployee()
            } else if (selection === 'Update an employee role') {
                dbQuery.updateEmployeeRole()
            }
        })
}

module.exports = initiateMenu