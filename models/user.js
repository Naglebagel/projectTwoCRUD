const mongoose = require('mongoose');
const User = require('./user');


const userSchema = new mongoose.Schema({
	username: String,
	password: String
})

module.exports = mongoose.model('User', userSchema);