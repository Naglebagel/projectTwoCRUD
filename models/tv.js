const mongoose = require('mongoose');
const Tv = require('./tv');


const tvSchema = new mongoose.Schema({
	title: String,
	imagelink: String,
	description: String,
})

module.exports = mongoose.model('Tv', tvSchema);