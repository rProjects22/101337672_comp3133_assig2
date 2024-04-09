const Employee = require('../models/Employee');

exports.getAllEmployees = async () => {
  try {
    // Fetch all employees from the database
    const employees = await Employee.find();
    return employees;
  } catch (error) {
    throw new Error(`Failed to fetch employees: ${error.message}`);
  }
};

exports.getEmployeeById = async (id) => {
  try {
    // Find employee by ID in the database
    const employee = await Employee.findById(id);
    if (!employee) {
      throw new Error('Employee not found');
    }
    return employee;
  } catch (error) {
    throw new Error(`Failed to fetch employee: ${error.message}`);
  }
};

exports.addEmployee = async (employeeData) => {
  try {
    // Create a new employee object
    const newEmployee = new Employee(employeeData);
    await newEmployee.save();
    return newEmployee;
  } catch (error) {
    throw new Error(`Failed to add employee: ${error.message}`);
  }
};

exports.updateEmployee = async (id, updatedData) => {
  try {
    // Find employee by ID and update its data
    const updatedEmployee = await Employee.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedEmployee) {
      throw new Error('Employee not found');
    }
    return updatedEmployee;
  } catch (error) {
    throw new Error(`Failed to update employee: ${error.message}`);
  }
};

exports.deleteEmployee = async (id) => {
  try {
    // Find employee by ID and delete it
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    if (!deletedEmployee) {
      throw new Error('Employee not found');
    }
    return 'Employee deleted successfully';
  } catch (error) {
    throw new Error(`Failed to delete employee: ${error.message}`);
  }
};
