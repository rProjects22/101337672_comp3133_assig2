import mongoose from 'mongoose';

const employeeSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female','Other', 'Prefer not to say'],
        required: true
    },
    salary: {
        type: Number,
        required: true
    }
})

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;