import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    maxlength: 20,
    minLength: [6, 'Password is too short'],
    required: [true, 'Please enter a password'],
  },
});

const User = mongoose.model('User', userSchema);

export default User;