const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.login = async (username, password) => {
  try {
    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error('User not found');
    }

    // Compare password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error('Incorrect password');
    }

    return { user };
  } catch (error) {
    throw new Error(`Login failed: ${error.message}`);
  }
};

exports.signup = async (username, email, password) => {
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    return { newUser };
  } catch (error) {
    throw new Error(`Signup failed: ${error.message}`);
  }
};
