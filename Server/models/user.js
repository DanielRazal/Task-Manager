const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, 'Please provide a user name.'],
    minlength: [3, 'Please provide a UserName between 3 and 50 characters.'],
    maxlength: [50, 'Please provide a UserName between 3 and 50 characters.'],
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password.'],
    minlength: [3, 'Please provide a UserName between 3 and 50 characters.'],
    maxlength: [50, 'Please provide a UserName between 3 and 50 characters.'],
    trim: true,
  },
});

module.exports = mongoose.model('Users', userSchema);
