const mongoose = require('mongoose');
const Tv = require('./tv');


const tvSchema = new mongoose.Schema({
	title: String,
	imagelink: String,
	description: String,
	reviews: [{name: String,
				review: String,
				date: Date
				}]
})

module.exports = mongoose.model('Tv', tvSchema);