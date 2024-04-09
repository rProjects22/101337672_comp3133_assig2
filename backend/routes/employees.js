const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

// Define routes for employee management

//route for getting all employees
router.get('/', employeeController.getAllEmployees);

//route for getting a specific employee by ID
router.get('/:id', employeeController.getEmployeeById);

//route for adding a new employee
router.post('/', employeeController.addEmployee);

//route for updating an existing employee
router.put('/:id', employeeController.updateEmployee);

//route for deleting an employee
router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;
