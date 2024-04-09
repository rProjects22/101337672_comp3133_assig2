import Employee from '../models/Employee.js';
import User from '../models/User.js';

export const resolvers = {
  Query: {
    getAllEmployees: async () => {
      return await Employee.find();
    },
    getEmployee: async (_, { id }) => {
      return await Employee.findById(id);
    },
    login: async (_, { username, password }) => {
      const userLogin = await User.findOne({ username });

      if (!userLogin) {
        throw Error(`${username} does not exist`);
      }

      const validUser = await User.findOne({ password });

      if (!validUser) {
        throw Error('Password is incorrect');
      }

      return userLogin;
    },
  },

  Mutation: {
    signUp: async (_, args) => {
      const { username, email, password } = args;

      const newUser = new User({ username, email, password });

      if (email === User.findOne(email)) {
        throw Error('This email is already in use, try a different one');
      } else {
        await newUser.save();
      }

      return newUser;
    },

    addEmployee: async (_, { firstname, lastname, email, gender, salary }, {Employee}) => {
      try {
        const newEmployee = new Employee({ firstname, lastname, email, gender, salary });
        await newEmployee.save();
        return newEmployee;
      } catch (error) {
        throw new Error('Failed to add employee: ' + error.message);
      }
    },

    updateEmployee: async (_, args) => {
     const { id, firstName, lastName, email, gender, salary } = args;
     const updatedEmployee = await Employee.findByIdAndUpdate(
       id,
       { firstName, lastName, email, gender, salary },
       { new: true }
     );

     if (!updatedEmployee) {
       throw new Error('This employee does not exist');
     }

     return updatedEmployee;
   },

    deleteEmployee: async (_, { id }) => {
     const deletedEmployee = await Employee.findByIdAndDelete(id);
     if (!deletedEmployee) {
       throw new Error('This employee does not exist');
     }

     return 'Employee has been deleted successfully';
    },
  },
};

export default resolvers;