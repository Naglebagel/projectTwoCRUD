const mongoose = require('mongoose');
const Movie = require('./movie');


const movieSchema = new mongoose.Schema({
	title: String,
	imagelink: String,
	description: String,
	reviews: [{name: String,
				review: String,
				date: Date
				}]
})

module.exports = mongoose.model('Movie', movieSchema);